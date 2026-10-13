import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

const AUTO_RESTART = true;
const AUTO_START = true;
const AUTO_START_DELAY = 700;
const RESTART_KEY = { key: "t", code: "KeyT", keyCode: 84 };
const STEER_GAIN = 3.5;
const LAT_ACCEL = 40;
const LOOK_BASE = 6;
const LOOK_SPEED = 0.09;
const LOOK_MAX = 34;
const STEER_SIGN = -1;
const FORWARD_SIGN = 1;
const DECODE_OFFSET = 4;

// Temporary route storage. The bot replaces it with a route extracted
// from the loaded track before steering along that route.
const ROUTE = Array.from({ length: 239 }, (_, i) => [i, 0, 0, 140]);

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptAdaptiveBot) return;

  const ROUTE = ${JSON.stringify(ROUTE)};
  const N = ROUTE.length;
  const STEP = 0.5;

  function rotatePoint(v, q) {
    const x = v[0], y = v[1], z = v[2];
    const qx = q[0], qy = q[1], qz = q[2], qw = q[3];

    const tx = 2 * (qy * z - qz * y);
    const ty = 2 * (qz * x - qx * z);
    const tz = 2 * (qx * y - qy * x);

    return [
      x + qw * tx + (qy * tz - qz * ty),
      y + qw * ty + (qz * tx - qx * tz),
      z + qw * tz + (qx * ty - qy * tx)
    ];
  }

  function shapeInfo(v) {
    if (!Array.isArray(v) || v.length < 9 || v.length % 3) {
      return null;
    }

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;

    for (let i = 0; i + 2 < v.length; i += 3) {
      const x = v[i], y = v[i + 1], z = v[i + 2];

      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      if (z < minZ) minZ = z;
      if (z > maxZ) maxZ = z;
    }

    const dx = maxX - minX;
    const dy = maxY - minY;
    const dz = maxZ - minZ;
    const vertexCount = v.length / 3;

    // Include simple road tiles too; several pieces between jumps have only
    // a small number of vertices. Tiny support posts remain excluded by size.
    const eligible =
      vertexCount >= 12 &&
      Math.min(dx, dz) >= 8 &&
      (dy <= 20 || vertexCount >= 300);

    return { eligible, dx, dy, dz, vertexCount };
  }

  function extractRoadRoute(data, targetCount) {
    targetCount = Math.max(32, Math.floor(targetCount || 239));

    if (
      !data ||
      !Array.isArray(data.parts) ||
      !data.lib ||
      !data.start ||
      !Array.isArray(data.start.p)
    ) {
      return null;
    }

    const shapes = Object.create(null);

    for (const id of Object.keys(data.lib)) {
      const v = data.lib[id] && data.lib[id].v;
      const info = shapeInfo(v);

      if (info && info.eligible) {
        shapes[id] = { v, info };
      }
    }

    // Find upward-facing triangles on road-sized track meshes.
    const faces = [];
    let minX = Infinity, maxX = -Infinity;
    let minZ = Infinity, maxZ = -Infinity;

    const usedIds = Object.create(null);
    // Saved track part origins are grid coordinates; mesh vertices and the
    // start transform are in world units.
    const partScale = Number.isFinite(data.partSize) && data.partSize > 0
      ? data.partSize
      : 1;

    for (const p of data.parts) {
      if (!Array.isArray(p) || p.length < 12) continue;

      const x = +p[0] * partScale;
      const y = +p[1] * partScale;
      const z = +p[2] * partScale;
      const id = String(p[3]);
      const shape = shapes[id];

      if (!shape) continue;

      const v = shape.v;
      const q = p.slice(8, 12).map(Number);

      usedIds[id] = true;

      for (let i = 0; i + 8 < v.length; i += 9) {
        const a = rotatePoint(
          [v[i], v[i + 1], v[i + 2]], q
        );
        const b = rotatePoint(
          [v[i + 3], v[i + 4], v[i + 5]], q
        );
        const c = rotatePoint(
          [v[i + 6], v[i + 7], v[i + 8]], q
        );

        a[0] += x; a[1] += y; a[2] += z;
        b[0] += x; b[1] += y; b[2] += z;
        c[0] += x; c[1] += y; c[2] += z;

        const abx = b[0] - a[0];
        const aby = b[1] - a[1];
        const abz = b[2] - a[2];

        const acx = c[0] - a[0];
        const acy = c[1] - a[1];
        const acz = c[2] - a[2];

        const nx = aby * acz - abz * acy;
        const ny = abz * acx - abx * acz;
        const nz = abx * acy - aby * acx;
        const nl = Math.sqrt(nx * nx + ny * ny + nz * nz);

        if (nl < 1e-8 || ny / nl < 0.5) continue;

        const face = [a, b, c];
        faces.push(face);

        for (const vtx of face) {
          if (vtx[0] < minX) minX = vtx[0];
          if (vtx[0] > maxX) maxX = vtx[0];
          if (vtx[2] < minZ) minZ = vtx[2];
          if (vtx[2] > maxZ) maxZ = vtx[2];
        }
      }
    }

    if (
      faces.length < 80 ||
      !Number.isFinite(minX) ||
      !Number.isFinite(minZ)
    ) {
      return null;
    }

    minX = Math.floor((minX - 3) / STEP) * STEP;
    maxX = Math.ceil((maxX + 3) / STEP) * STEP;
    minZ = Math.floor((minZ - 3) / STEP) * STEP;
    maxZ = Math.ceil((maxZ + 3) / STEP) * STEP;

    const W = Math.round((maxX - minX) / STEP) + 1;
    const H = Math.round((maxZ - minZ) / STEP) + 1;
    const size = W * H;

    if (W < 10 || H < 10 || size > 1500000) {
      return null;
    }

    let mask = new Uint8Array(size);
    const ySum = new Float64Array(size);
    const yCount = new Uint16Array(size);

    // Rasterize projected road triangles and estimate their height.
    for (const tri of faces) {
      const a = tri[0], b = tri[1], c = tri[2];

      const c1 = (a[0] - minX) / STEP;
      const r1 = (a[2] - minZ) / STEP;
      const c2 = (b[0] - minX) / STEP;
      const r2 = (b[2] - minZ) / STEP;
      const c3 = (c[0] - minX) / STEP;
      const r3 = (c[2] - minZ) / STEP;

      const denom =
        (r2 - r3) * (c1 - c3) +
        (c3 - c2) * (r1 - r3);

      if (Math.abs(denom) < 1e-7) continue;

      const left = Math.max(0, Math.floor(Math.min(c1, c2, c3)));
      const right = Math.min(W - 1, Math.ceil(Math.max(c1, c2, c3)));
      const top = Math.max(0, Math.floor(Math.min(r1, r2, r3)));
      const bottom = Math.min(H - 1, Math.ceil(Math.max(r1, r2, r3)));

      // Skip extremely large projections, which are often walls or
      // degenerate faces rather than useful road surfaces.
      if ((right - left + 1) * (bottom - top + 1) > 8000) {
        continue;
      }

      const y = (a[1] + b[1] + c[1]) / 3;

      for (let r = top; r <= bottom; r++) {
        for (let col = left; col <= right; col++) {
          const alpha =
            ((r2 - r3) * (col - c3) +
             (c3 - c2) * (r - r3)) / denom;

          const beta =
            ((r3 - r1) * (col - c3) +
             (c1 - c3) * (r - r3)) / denom;

          const gamma = 1 - alpha - beta;

          if (
            alpha < -0.001 ||
            beta < -0.001 ||
            gamma < -0.001
          ) {
            continue;
          }

          const idx = r * W + col;
          mask[idx] = 1;
          ySum[idx] += y;

          if (yCount[idx] < 65535) {
            yCount[idx]++;
          }
        }
      }
    }

    // Close tiny gaps between adjacent road triangles.
    const dilated = new Uint8Array(size);

    for (let r = 1; r < H - 1; r++) {
      const base = r * W;

      for (let c = 1; c < W - 1; c++) {
        const i = base + c;

        if (
          mask[i] ||
          mask[i - 1] ||
          mask[i + 1] ||
          mask[i - W] ||
          mask[i + W]
        ) {
          dilated[i] = 1;
        }
      }
    }

    const closed = new Uint8Array(size);

    for (let r = 1; r < H - 1; r++) {
      const base = r * W;

      for (let c = 1; c < W - 1; c++) {
        const i = base + c;

        if (
          dilated[i] &&
          dilated[i - 1] &&
          dilated[i + 1] &&
          dilated[i - W] &&
          dilated[i + W]
        ) {
          closed[i] = 1;
        }
      }
    }

    mask = closed;

    // Remove tiny isolated components.
    const seen = new Uint8Array(size);
    const queue = new Int32Array(size);

    for (let i = 0; i < size; i++) {
      if (!mask[i] || seen[i]) continue;

      let head = 0, tail = 0;
      queue[tail++] = i;
      seen[i] = 1;

      while (head < tail) {
        const u = queue[head++];
        const r = Math.floor(u / W);
        const c = u - r * W;

        const nbrs = [
          c > 0 ? u - 1 : -1,
          c + 1 < W ? u + 1 : -1,
          r > 0 ? u - W : -1,
          r + 1 < H ? u + W : -1
        ];

        for (const v of nbrs) {
          if (v >= 0 && mask[v] && !seen[v]) {
            seen[v] = 1;
            queue[tail++] = v;
          }
        }
      }

      if (tail <= 4) {
        for (let k = 0; k < tail; k++) {
          mask[queue[k]] = 0;
        }
      }
    }

    // Thin the broad road surface into an approximate centerline.
    const skel = mask.slice();
    const del = [];

    for (let iter = 0; iter < 60; iter++) {
      let changed = false;

      for (let pass = 0; pass < 2; pass++) {
        del.length = 0;

        for (let r = 1; r < H - 1; r++) {
          const base = r * W;

          for (let c = 1; c < W - 1; c++) {
            const i = base + c;
            if (!skel[i]) continue;

            const p2 = skel[i - W];
            const p3 = skel[i - W + 1];
            const p4 = skel[i + 1];
            const p5 = skel[i + W + 1];
            const p6 = skel[i + W];
            const p7 = skel[i + W - 1];
            const p8 = skel[i - 1];
            const p9 = skel[i - W - 1];

            const B = p2+p3+p4+p5+p6+p7+p8+p9;

            if (B < 2 || B > 6) continue;

            const seq = [p2,p3,p4,p5,p6,p7,p8,p9,p2];
            let A = 0;

            for (let j = 0; j < 8; j++) {
              if (seq[j] === 0 && seq[j + 1] === 1) A++;
            }

            if (A !== 1) continue;

            if (pass === 0) {
              if (p2*p4*p6 !== 0 || p4*p6*p8 !== 0) continue;
            } else {
              if (p2*p4*p8 !== 0 || p2*p6*p8 !== 0) continue;
            }

            del.push(i);
          }
        }

        if (del.length) {
          changed = true;
          for (const i of del) skel[i] = 0;
        }
      }

      if (!changed) break;
    }

    const cellToNode = new Int32Array(size);
    cellToNode.fill(-1);

    const rows = [], cols = [];

    for (let i = 0; i < size; i++) {
      if (skel[i]) {
        cellToNode[i] = rows.length;
        rows.push(Math.floor(i / W));
        cols.push(i % W);
      }
    }

    const n = rows.length;
    if (n < 20) return null;

    const degree = new Uint8Array(n);
    const startP = data.start.p;
    let startNode = -1, startD2 = Infinity;

    for (let k = 0; k < n; k++) {
      const x = minX + cols[k] * STEP;
      const z = minZ + rows[k] * STEP;
      const dx = x - startP[0];
      const dz = z - startP[2];
      const d2 = dx*dx + dz*dz;

      if (d2 < startD2) {
        startD2 = d2;
        startNode = k;
      }

      let d = 0;

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;

          const rr = rows[k] + dr;
          const cc = cols[k] + dc;

          if (
            rr >= 0 && rr < H &&
            cc >= 0 && cc < W &&
            cellToNode[rr * W + cc] >= 0
          ) {
            d++;
          }
        }
      }

      degree[k] = d;
    }

    if (startNode < 0) return null;

    // Search the connected centerline and choose the farthest endpoint.
    const dist = new Float64Array(n);
    dist.fill(Infinity);

    const prev = new Int32Array(n);
    prev.fill(-1);

    const done = new Uint8Array(n);
    const heapD = [], heapN = [];

    function push(d, node) {
      let i = heapD.length;
      heapD.push(d);
      heapN.push(node);

      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heapD[p] <= d) break;

        heapD[i] = heapD[p];
        heapN[i] = heapN[p];
        i = p;
      }

      heapD[i] = d;
      heapN[i] = node;
    }

    function pop() {
      if (!heapD.length) return null;

      const out = [heapD[0], heapN[0]];
      const lastD = heapD.pop();
      const lastN = heapN.pop();

      if (heapD.length) {
        let i = 0;

        while (true) {
          let c = i * 2 + 1;
          if (c >= heapD.length) break;

          if (
            c + 1 < heapD.length &&
            heapD[c + 1] < heapD[c]
          ) {
            c++;
          }

          if (heapD[c] >= lastD) break;

          heapD[i] = heapD[c];
          heapN[i] = heapN[c];
          i = c;
        }

        heapD[i] = lastD;
        heapN[i] = lastN;
      }

      return out;
    }

    dist[startNode] = 0;
    push(0, startNode);

    while (heapD.length) {
      const item = pop();
      if (!item) break;

      const du = item[0], u = item[1];

      if (du !== dist[u] || done[u]) continue;
      done[u] = 1;

      const r = rows[u], c = cols[u];

      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (!dr && !dc) continue;

          const rr = r + dr, cc = c + dc;

          if (rr < 0 || rr >= H || cc < 0 || cc >= W) {
            continue;
          }

          const v = cellToNode[rr * W + cc];
          if (v < 0 || done[v]) continue;

          const nd = du + STEP * ((dr && dc) ? Math.SQRT2 : 1);

          if (nd < dist[v]) {
            dist[v] = nd;
            prev[v] = u;
            push(nd, v);
          }
        }
      }
    }

    // Label connected skeleton components; big jumps can leave the launch
    // and landing meshes disconnected in the 2D road mask.
    const component = new Int32Array(n);
    component.fill(-1);
    const componentQueue = new Int32Array(n);
    let componentCount = 0;

    for (let seed = 0; seed < n; seed++) {
      if (component[seed] >= 0) continue;

      let qh = 0, qt = 0;
      component[seed] = componentCount;
      componentQueue[qt++] = seed;

      while (qh < qt) {
        const u = componentQueue[qh++];
        const rr = rows[u], cc = cols[u];

        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (!dr && !dc) continue;

            const r2 = rr + dr, c2 = cc + dc;
            if (r2 < 0 || r2 >= H || c2 < 0 || c2 >= W) continue;

            const v = cellToNode[r2 * W + c2];
            if (v >= 0 && component[v] < 0) {
              component[v] = componentCount;
              componentQueue[qt++] = v;
            }
          }
        }
      }

      componentCount++;
    }

    // Pick the finish marker's closest road node, not an arbitrary dead end.
    let finishNode = -1, finishGap = Infinity;
    for (const finish of (Array.isArray(data.finishes) ? data.finishes : [])) {
      const fp = Array.isArray(finish)
        ? finish
        : finish && Array.isArray(finish.p) ? finish.p : null;
      if (!fp || fp.length < 3) continue;

      for (let k = 0; k < n; k++) {
        const x = minX + cols[k] * STEP;
        const z = minZ + rows[k] * STEP;
        const gap = Math.hypot(x - fp[0], z - fp[2]);

        if (gap < finishGap) {
          finishGap = gap;
          finishNode = k;
        }
      }
    }

    // Default to the furthest reachable endpoint in the start component.
    let target = -1, farthest = -1;
    for (let k = 0; k < n; k++) {
      if (
        degree[k] === 1 &&
        Number.isFinite(dist[k]) &&
        dist[k] > farthest
      ) {
        farthest = dist[k];
        target = k;
      }
    }
    if (target < 0) {
      for (let k = 0; k < n; k++) {
        if (Number.isFinite(dist[k]) && dist[k] > farthest) {
          farthest = dist[k];
          target = k;
        }
      }
    }

    let extraTailNodes = [];
    if (finishNode >= 0 && finishGap <= 35) {
      if (Number.isFinite(dist[finishNode])) {
        // The finish is already connected to the start.
        target = finishNode;
        farthest = dist[finishNode];
      } else {
        // A jump can separate the launch and landing meshes. Find the entry
        // node in the finish component nearest the launch-side path endpoint.
        const exitNode = target;
        const finishComponent = component[finishNode];
        let entryNode = -1, entryGap = Infinity;
        const ex = minX + cols[exitNode] * STEP;
        const ez = minZ + rows[exitNode] * STEP;

        for (let k = 0; k < n; k++) {
          if (component[k] !== finishComponent) continue;
          const x = minX + cols[k] * STEP;
          const z = minZ + rows[k] * STEP;
          const gap = Math.hypot(x - ex, z - ez);
          if (gap < entryGap) {
            entryGap = gap;
            entryNode = k;
          }
        }

        if (entryNode >= 0) {
          const prev2 = new Int32Array(n);
          prev2.fill(-1);
          const seen2 = new Uint8Array(n);
          const queue2 = new Int32Array(n);
          let qh = 0, qt = 0;
          queue2[qt++] = entryNode;
          seen2[entryNode] = 1;

          // Trace the disconnected landing component from its entry to finish.
          while (qh < qt && !seen2[finishNode]) {
            const u = queue2[qh++];
            const rr = rows[u], cc = cols[u];

            for (let dr = -1; dr <= 1; dr++) {
              for (let dc = -1; dc <= 1; dc++) {
                if (!dr && !dc) continue;

                const r2 = rr + dr, c2 = cc + dc;
                if (r2 < 0 || r2 >= H || c2 < 0 || c2 >= W) continue;

                const v = cellToNode[r2 * W + c2];
                if (v < 0 || component[v] !== finishComponent || seen2[v]) continue;

                seen2[v] = 1;
                prev2[v] = u;
                queue2[qt++] = v;
              }
            }
          }

          if (seen2[finishNode]) {
            const reverseTail = [];
            for (
              let cur = finishNode, guard = 0;
              cur >= 0 && guard <= n;
              cur = prev2[cur], guard++
            ) {
              reverseTail.push(cur);
              if (cur === entryNode) break;
            }
            if (reverseTail[reverseTail.length - 1] === entryNode) {
              extraTailNodes = reverseTail.reverse();
            }
          }

          console.log("PTBOT_AUTO_ROUTE finish bridge", {
            gap: +entryGap.toFixed(1),
            finishGap: +finishGap.toFixed(1),
            components: componentCount,
            stitched: extraTailNodes.length > 0
          });
        }

        // Do not silently use a partial route when a finish marker was found.
        if (!extraTailNodes.length) return null;
      }
    }

    if (target < 0 || farthest < 25) return null;

    const path = [];

    for (
      let cur = target, guard = 0;
      cur >= 0 && guard <= n;
      cur = prev[cur], guard++
    ) {
      const r = rows[cur], c = cols[cur];
      const cell = r * W + c;

      let py = yCount[cell] ? ySum[cell] / yCount[cell] : NaN;

      if (!Number.isFinite(py)) {
        let foundHeight = false;

        for (let rad = 1; rad <= 4 && !foundHeight; rad++) {
          for (let dr = -rad; dr <= rad && !foundHeight; dr++) {
            for (let dc = -rad; dc <= rad; dc++) {
              const rr = r + dr, cc = c + dc;

              if (rr < 0 || rr >= H || cc < 0 || cc >= W) {
                continue;
              }

              const j = rr * W + cc;

              if (yCount[j]) {
                py = ySum[j] / yCount[j];
                foundHeight = true;
                break;
              }
            }
          }
        }

        if (!foundHeight) {
          py = path.length ? path[path.length - 1][1] : startP[1];
        }
      }

      path.push([minX + c*STEP, py, minZ + r*STEP]);
    }

    path.reverse();

    // Append the finish-side path if a jump disconnected it from the launch.
    if (extraTailNodes.length) {
      for (const k of extraTailNodes) {
        const r = rows[k], c = cols[k], cell = r * W + c;
        let py = yCount[cell] ? ySum[cell] / yCount[cell] : NaN;

        if (!Number.isFinite(py)) {
          py = path.length ? path[path.length - 1][1] : startP[1];
        }

        path.push([minX + c * STEP, py, minZ + r * STEP]);
      }
    }

    if (path.length < 20) return null;

    // Smooth raster noise before resampling the centerline.
    const smooth = path.map((p, i) => {
      let sx = 0, sy = 0, sz = 0, count = 0;

      for (
        let j = Math.max(0, i - 2);
        j <= Math.min(path.length - 1, i + 2);
        j++
      ) {
        sx += path[j][0];
        sy += path[j][1];
        sz += path[j][2];
        count++;
      }

      return [sx/count, sy/count, sz/count];
    });

    const cumulative = [0];

    for (let i = 1; i < smooth.length; i++) {
      const a = smooth[i - 1], b = smooth[i];

      cumulative.push(
        cumulative[i - 1] +
        Math.hypot(b[0]-a[0], b[1]-a[1], b[2]-a[2])
      );
    }

    const total = cumulative[cumulative.length - 1];

    if (!Number.isFinite(total) || total < 25) return null;

    const route = [];
    let seg = 1;

    for (let i = 0; i < targetCount; i++) {
      const want = total * i / (targetCount - 1);

      while (
        seg < cumulative.length - 1 &&
        cumulative[seg] < want
      ) {
        seg++;
      }

      const a = smooth[seg - 1], b = smooth[seg];
      const span = cumulative[seg] - cumulative[seg - 1];
      const t = span > 1e-8
        ? (want - cumulative[seg - 1]) / span
        : 0;

      route.push([
        a[0] + (b[0]-a[0])*t,
        a[1] + (b[1]-a[1])*t,
        a[2] + (b[2]-a[2])*t,
        140
      ]);
    }

    // Anchor the first point's height to the actual start transform.
    const yOffset = startP[1] - route[0][1];

    for (const point of route) {
      point[1] += yOffset;
    }

    return {
      route,
      pathLength: Math.round(total * 10) / 10,
      skeletonPoints: n,
      roadFaces: faces.length,
      start: route[0].slice(0, 3),
      end: route[route.length - 1].slice(0, 3),
      shapeIds: Object.keys(usedIds).map(Number).sort((a,b)=>a-b)
    };
  }

  const SPEED_FACTOR = 1.0;
  const STEER_GAIN = 3.5;
  const LAT_ACCEL = 40;
  const LOOK_BASE = 6;
  const LOOK_SPEED = 0.09;
  const LOOK_MAX = 34;
  const DECODE_OFFSET = 4;
  const STEER_SIGN = -1;
  const FORWARD_SIGN = 1;

  let dynamicRoute = false;

  const bot = {
    idx: Object.create(null),
    acc: Object.create(null),
    lastFrames: Object.create(null),
    lastPos: Object.create(null),
    dbg: null
  };

  const ch = typeof BroadcastChannel !== "undefined"
    ? new BroadcastChannel("ptbot")
    : null;

  function rebuildRouteData() {
    bot.cap = new Array(N).fill(1000);

    for (let i = 0; i < N; i++) {
      let maxCurv = 0;

      for (
        let j = Math.max(1, i - 2);
        j <= Math.min(N - 2, i + 2);
        j++
      ) {
        const ax = ROUTE[j][0] - ROUTE[j - 1][0];
        const az = ROUTE[j][2] - ROUTE[j - 1][2];
        const bx = ROUTE[j + 1][0] - ROUTE[j][0];
        const bz = ROUTE[j + 1][2] - ROUTE[j][2];

        const la = Math.hypot(ax, az);
        const lb = Math.hypot(bx, bz);

        const turn = Math.abs(
          Math.atan2(ax*bz - az*bx, ax*bx + az*bz)
        );

        maxCurv = Math.max(
          maxCurv,
          turn / Math.max((la + lb) / 2, 1e-6)
        );
      }

      bot.cap[i] = maxCurv > 1e-6
        ? Math.sqrt(LAT_ACCEL / maxCurv) * 3.6
        : 1000;
    }
  }

  rebuildRouteData();

  function decode(buf) {
    const e = new Uint8Array(buf);
    const d = new DataView(e.buffer, e.byteOffset, e.byteLength);

    if (e.length < 48) return null;

    let o = DECODE_OFFSET;
    const frames = e[o] | (e[o+1] << 8) | (e[o+2] << 16);
    o += 3;

    const speedKmh = d.getFloat32(o, true);
    o += 4;

    const flags = e[o++];
    let finishFrames = null;

    if (flags & 2) {
      finishFrames = e[o] | (e[o+1] << 8) | (e[o+2] << 16);
      o += 3;
    }

    const nextCheckpointIndex = d.getUint16(o, true);
    o += 2;

    const position = {
      x: d.getFloat32(o, true),
      y: d.getFloat32(o+4, true),
      z: d.getFloat32(o+8, true)
    };
    o += 12;

    const quaternion = {
      x: d.getFloat32(o, true),
      y: d.getFloat32(o+4, true),
      z: d.getFloat32(o+8, true),
      w: d.getFloat32(o+12, true)
    };

    if (
      ![
        speedKmh,
        position.x, position.y, position.z,
        quaternion.x, quaternion.y, quaternion.z, quaternion.w
      ].every(Number.isFinite)
    ) {
      return null;
    }

    return {
      frames,
      speedKmh,
      hasStarted: !!(flags & 1),
      wheels: (flags >> 3) & 15,
      finishFrames,
      nextCheckpointIndex,
      position,
      quaternion
    };
  }

  function rotateVec(q, v) {
    const ix = q.w*v.x + q.y*v.z - q.z*v.y;
    const iy = q.w*v.y + q.z*v.x - q.x*v.z;
    const iz = q.w*v.z + q.x*v.y - q.y*v.x;
    const iw = -q.x*v.x - q.y*v.y - q.z*v.z;

    return {
      x: ix*q.w + iw*-q.x + iy*-q.z - iz*-q.y,
      y: iy*q.w + iw*-q.y + iz*-q.x - ix*-q.z,
      z: iz*q.w + iw*-q.z + ix*-q.y - iy*-q.x
    };
  }

  function nearestIndex(p, id, forceGlobal) {
    let best = 0, bestD = Infinity;
    const last = bot.idx[id] ?? 0;

    const lo = forceGlobal ? 0 : Math.max(0, last - 5);
    const hi = forceGlobal ? N - 1 : Math.min(N - 1, last + 45);

    for (let i = lo; i <= hi; i++) {
      const dx = p.x - ROUTE[i][0];
      const dz = p.z - ROUTE[i][2];
      const d = dx*dx + dz*dz;

      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }

    if (!forceGlobal && bestD > 30*30) {
      for (let i = 0; i < N; i++) {
        const dx = p.x - ROUTE[i][0];
        const dz = p.z - ROUTE[i][2];
        const d = dx*dx + dz*dz;

        if (d < bestD) {
          bestD = d;
          best = i;
        }
      }
    }

    bot.idx[id] = best;
    return best;
  }

  function lookAhead(p, distance, i) {
    let j = i;
    if (j < N - 1) {
      const dx = ROUTE[j + 1][0] - ROUTE[j][0];
      const dz = ROUTE[j + 1][2] - ROUTE[j][2];
      if ((p.x - ROUTE[j][0]) * dx + (p.z - ROUTE[j][2]) * dz > 0) j++;
    }

    let ax = p.x, ay = p.y, az = p.z;
    let left = distance;

    for (let k = j; k < N; k++) {
      const b = ROUTE[k];
      const dx = b[0] - ax;
      const dz = b[2] - az;
      const length = Math.hypot(dx, dz);

      if (length >= left) {
        const t = left / Math.max(length, 1e-9);

        return {
          x: ax + dx*t,
          y: ay + (b[1]-ay)*t,
          z: az + dz*t,
          index: k
        };
      }

      left -= length;
      ax = b[0];
      ay = b[1];
      az = b[2];
    }

    const b = ROUTE[N-1];

    return {
      x: b[0],
      y: b[1],
      z: b[2],
      index: N-1
    };
  }

  function lateral(p, i) {
    const k = Math.max(0, Math.min(N - 2, i));
    const ax = ROUTE[k][0], az = ROUTE[k][2];
    const bx = ROUTE[k + 1][0], bz = ROUTE[k + 1][2];
    const dx = bx - ax, dz = bz - az;
    const length = Math.hypot(dx, dz) || 1e-9;

    let t = ((p.x - ax) * dx + (p.z - az) * dz) / (length * length);
    t = Math.max(0, Math.min(1, t));

    const ox = p.x - (ax + dx * t);
    const oz = p.z - (az + dz * t);
    return -(dz * ox - dx * oz) / length;
  }

  function choose(state, id) {
    if (!state) {
      return { up:true, right:false, down:false, left:false, reset:false };
    }

    const lastFrame = bot.lastFrames[id];
    let respawned = false;
    const lastPos = bot.lastPos[id];

    if (
      lastPos &&
      Math.hypot(
        state.position.x-lastPos.x,
        state.position.y-lastPos.y,
        state.position.z-lastPos.z
      ) > 5
    ) {
      respawned = true;
    }

    if (
      lastFrame === undefined ||
      state.frames < lastFrame ||
      respawned
    ) {
      bot.idx[id] = 0;
      bot.acc[id] = 0;
    }

    bot.lastFrames[id] = state.frames;
    bot.lastPos[id] = { ...state.position };

    if (!state.hasStarted) {
      return { up:true, right:false, down:false, left:false, reset:false };
    }

    if (state.finishFrames !== null) {
      if (ch && !bot.finishSent) {
        bot.finishSent = true;
        ch.postMessage({ type:"restart", delay:1800 });
      }

      return { up:false, right:false, down:false, left:false, reset:false };
    }

    bot.finishSent = false;

    // Do not follow the temporary placeholder route.
    if (!dynamicRoute) {
      return { up:true, right:false, down:false, left:false, reset:false };
    }

    const speed = Math.abs(state.speedKmh);
    const i = nearestIndex(state.position, id, respawned);

    const ld = Math.max(
      LOOK_BASE,
      Math.min(LOOK_MAX, LOOK_BASE + speed * LOOK_SPEED)
    );

    const target = lookAhead(state.position, ld, i);
    const f = rotateVec(state.quaternion, { x: 0, y: 0, z: FORWARD_SIGN });
    const dx = target.x - state.position.x;
    const dz = target.z - state.position.z;
    const fl = Math.hypot(f.x, f.z) || 1;
    const tl = Math.hypot(dx, dz) || 1;
    const fx = f.x / fl, fz = f.z / fl;
    const tx = dx / tl, tz = dz / tl;
    const angle = Math.atan2(fz * tx - fx * tz, fx * tx + fz * tz);

    const steerAngle = angle + 0.03 * Math.max(-8, Math.min(8, lateral(state.position, i)));
    let acc = (bot.acc[id] || 0) + Math.max(-1, Math.min(1, steerAngle * STEER_GAIN * (1 + 2 * Math.max(0, 1 - speed / 150)) * STEER_SIGN));
    let right = false, left = false;
    if (acc >= 1) { right = true; acc -= 1; }
    else if (acc <= -1) { left = true; acc += 1; }
    bot.acc[id] = acc;

    let targetSpeed = 1000;
    for (let j = i; j <= Math.min(N - 1, i + 22); j++) {
      targetSpeed = Math.min(targetSpeed, bot.cap[j] + (j - i) * 5);
    }
    targetSpeed = Math.max(35, targetSpeed);
    const up = speed < targetSpeed - 2;
    const down = speed > targetSpeed + 8;

    bot.dbg = {
      index: i,
      speed: Math.round(speed),
      targetSpeed: Math.round(targetSpeed),
      angle: +angle.toFixed(3),
      dynamicRoute
    };
    return { up, right, down, left, reset: false };
  }

  const TRACK_LIB = Object.create(null);
  let activeTrackCode = null;
  const round3 = v => Math.round(v * 1000) / 1000;

  function captureTrack(m) {
    if (!m || typeof m !== "object") return;

    if (m.messageType === 0 && Array.isArray(m.trackParts)) {
      for (const p of m.trackParts) {
        TRACK_LIB[p.id] = {
          v: p.vertices,
          detector: p.detector || null,
          startOffset: p.startOffset || null
        };
      }
      return;
    }

    if (
      m.messageType !== 3 ||
      typeof m.trackData !== "string" ||
      m.carRecording != null ||
      m.trackData === activeTrackCode
    ) return;

    try {
      if (
        typeof Ko === "undefined" ||
        typeof eo === "undefined" ||
        typeof Lo === "undefined"
      ) {
        console.log("PTBOT_AUTO_ROUTE missing PolyTrack decoder globals");
        return;
      }

      const track = Ko.fromSaveString(m.trackData);
      if (!track) {
        console.log("PTBOT_AUTO_ROUTE could not decode track data");
        return;
      }

      const parts = [], used = Object.create(null);

      track.forEachPart((x, y, z, id, rot, axis, color, cpo, so) => {
        const q = eo[axis][rot];
        if (!q) return;

        parts.push([
          x, y, z, id, rot, axis,
          cpo == null ? -1 : cpo,
          so == null ? -1 : so,
          round3(q.x), round3(q.y), round3(q.z), round3(q.w)
        ]);

        used[id] = true;
      });

      const lib = {};
      for (const id of Object.keys(used)) {
        const e = TRACK_LIB[id];
        if (e && e.v) {
          lib[id] = {
            v: Array.from(e.v, round3),
            detector: e.detector,
            startOffset: e.startOffset
          };
        }
      }

      let start = null;
      try {
        const st = track.getStartTransform();
        start = {
          p: [st.position.x, st.position.y, st.position.z],
          q: [st.quaternion.x, st.quaternion.y, st.quaternion.z, st.quaternion.w]
        };
      } catch (_) {}

      if (!start) {
        console.log("PTBOT_AUTO_ROUTE could not read track start");
        return;
      }

      const partScale = Number.isFinite(Lo.partSize) && Lo.partSize > 0
        ? Lo.partSize
        : 1;
      const finishes = [];

      for (const p of parts) {
        const shape = lib[String(p[3])];
        const detector = shape && shape.detector;
        if (!detector || Number(detector.type) !== 1) continue;

        const center = Array.isArray(detector.center)
          ? detector.center
          : [0, 0, 0];
        const q = p.slice(8, 12).map(Number);
        const offset = rotatePoint(center, q);

        finishes.push({
          p: [
            +p[0] * partScale + offset[0],
            +p[1] * partScale + offset[1],
            +p[2] * partScale + offset[2]
          ]
        });
      }

      const data = {
        partSize: Lo.partSize,
        parts,
        lib,
        start,
        checkpoints: null,
        finishes,
        mountainOffset: m.mountainOffset || null
      };

      const found = extractRoadRoute(data, N);
      if (!found) {
        console.log("PTBOT_AUTO_ROUTE could not build a road route; extractor needs adjustment");
        return;
      }

      const startGap = Math.hypot(
        found.route[0][0] - start.p[0],
        found.route[0][2] - start.p[2]
      );

      if (found.route.length !== N || startGap > 10 || found.pathLength < 40) {
        console.log("PTBOT_AUTO_ROUTE rejected candidate: startGap=" + startGap.toFixed(1) + "m length=" + found.pathLength + "m");
        return;
      }

      ROUTE.splice(0, ROUTE.length, ...found.route);
      rebuildRouteData();
      dynamicRoute = true;
      activeTrackCode = m.trackData;

      bot.idx = Object.create(null);
      bot.acc = Object.create(null);
      bot.lastFrames = Object.create(null);
      bot.lastPos = Object.create(null);
      bot.finishSent = false;

      console.log("PTBOT_AUTO_ROUTE READY", {
        points: N,
        length: found.pathLength,
        startGap: +startGap.toFixed(2),
        roadFaces: found.roadFaces,
        skeleton: found.skeletonPoints,
        shapeIds: found.shapeIds
      });
    } catch (err) {
      console.log("PTBOT_AUTO_ROUTE error: " + (err && err.stack ? err.stack : String(err)));
    }
  }

  try {
    const originalOnMessage = onmessage;
    onmessage = function(ev) {
      try { captureTrack(ev.data); }
      catch (err) { console.log("PTBOT_AUTO_ROUTE capture error", err); }
      return originalOnMessage.call(this, ev);
    };
  } catch (err) {
    console.log("PTBOT_AUTO_ROUTE could not install worker message hook", err);
  }

  globalThis.__ptAdaptiveBot = {
    decode,
    choose,
    route: ROUTE,
    get ready() { return dynamicRoute; },
    get debug() { return bot.dbg; }
  };
})();
`;

const BOT_BODY = `
if (e.userControls && globalThis.__ptAdaptiveBot) {
  const __b = globalThis.__ptAdaptiveBot;
  let __state = null;
  try {
    __state = __b.decode(new Uint8Array(t.HEAPU8.buffer, i, 227).slice().buffer);
  } catch (_) {}

  if (__state) {
    r = __b.choose(__state, e.id);
  } else {
    r = { up: true, right: false, down: false, left: false, reset: false };
  }
}
`;

function setupMainThread() {
  if (typeof BroadcastChannel === "undefined") return;
  const ch = new BroadcastChannel("ptbot");

  function fire(type, k) {
    const ev = new KeyboardEvent(type, {
      key: k.key,
      code: k.code,
      keyCode: k.keyCode,
      which: k.keyCode,
      bubbles: true,
      cancelable: true
    });
    (document.activeElement || document.body || document).dispatchEvent(ev);
  }

  function tap(k, ms) {
    fire("keydown", k);
    setTimeout(() => fire("keyup", k), ms);
  }

  ch.onmessage = ev => {
    const m = ev.data || {};
    if (m.type === "restart" && AUTO_RESTART) {
      setTimeout(() => {
        tap(RESTART_KEY, 60);
        if (AUTO_START) {
          setTimeout(() => {
            tap({ key: "ArrowUp", code: "ArrowUp", keyCode: 38 }, 100);
            tap({ key: "w", code: "KeyW", keyCode: 87 }, 100);
          }, AUTO_START_DELAY);
        }
      }, m.delay || 300);
    }
  };
}

class PolyTrackAdaptiveBot extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Adaptive Driving Bot";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.6.5";
    this.touchingPhysics = true;
  }

  init = pml => {
    try { setupMainThread(); }
    catch (err) { console.log("PTBOT setup failed", err); }

    pml.registerSimWorkerMixin({
      type: MixinType.INSERT,
      token: "function n(e, r) {",
      func: BOT_BODY
    });

    pml.registerSimWorkerMixin({
      type: MixinType.INSERT,
      token: "(($o.length = 0), (onmessage = r));",
      func: WORKER_HELPERS
    });
  };
}

export let polyMod = new PolyTrackAdaptiveBot();
