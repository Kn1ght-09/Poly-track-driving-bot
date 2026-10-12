import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// "drive" = the bot drives the recorded lap.
// "record" = you drive manually and the mod records the lap.
const MODE = "drive";

// ---- SELF-LEARNING ----
const LEARN = true;

// ---- RECON ----
const RECON = true;

// ---- AIRBRAKE ----
const AIRBRAKE = true;
const AIR_DELAY = 120;
const AIR_MATCH_SLOPE = false;
const AIR_BIAS = 0;
const AIR_DOWN_IS_NOSE_UP = true;
const AIR_LEAD = 40;
const AIR_DEADBAND = 0.08;
const AIR_LOOK_SEC = 0.36;

const SPEED_VALUE = 0.8;
const MAX_LINE_SHIFT = 6;
const MAX_SPEED_SHIFT = 0.2;
const EXPLORE_RUNS = 60;
const AUTO_RESTART = true;
const AUTO_START = true;
const AUTO_START_MS = 100;
const AUTO_START_DELAY = 700;
const RESTART_KEY = { key: "t", code: "KeyT", keyCode: 84 };

// ---- DRIVING SETTINGS ----
const SPEED_FACTOR = 1.0;
const STEER_GAIN = 3.5;
const LAT_ACCEL = 40;
const SLOW_ZONES = [[5, 17, 95]];
const LOW_SPEED_BOOST = 2;
const LINE_PULL = 0.03;
const LOOK_BASE = 6;
const LOOK_SPEED = 0.09;
const LOOK_MAX = 34;
const DECODE_OFFSET = 4;
const STEER_SIGN = -1;
const FORWARD_SIGN = 1;

// Your recorded lap: [x, height, z, speed in km/h]
const ROUTE = [
  [319.0,55.3,20.0,5],[318.6,55.3,20,7],[318.3,55.3,20,14],
  [317.8,55.3,20,21],[317.1,55.3,20,28],[316.2,55.3,20,35],
  [315.2,55.3,19.8,41],[313.9,55.3,19.7,48],[312.5,55.3,19.6,55],
  [310.9,55.3,19.4,61],[309.1,55.3,19.3,68],[307.2,55.3,18.9,74],
  [305.1,55.3,18.4,80],[302.9,55.3,17.8,87],[300.4,55.3,17.2,93],
  [297.9,55.3,16.5,99],[295.2,55.3,15.6,105],[292.3,55.3,14.7,111],
  [289.3,55.3,13.7,117],[286.1,55.3,12.7,123],[282.8,55.3,11.7,129],
  [279.3,55.3,10.6,135],[275.7,55.3,9.4,140],[271.9,55.3,8.2,146],
  [267.9,55.3,7.2,152],[263.7,55.3,6.4,157],[259.3,55.3,5.5,163],
  [254.8,55.3,4.7,168],[250.1,55.3,3.9,173],[245.2,55.3,3.4,178],
  [240.2,55.3,3,184],[235.1,55.3,2.6,189],[229.8,55.3,2.2,194],
  [224.3,55.3,1.7,199],[218.7,55.3,1.3,204],[213,55.3,0.8,209],
  [207.1,55.3,0.4,214],[201.1,55.3,-0.1,219],[195,55.3,-0.6,224],
  [188.7,55.3,-1.1,229],[182.3,55.3,-1.6,234],[175.8,55.3,-2.1,238],
  [169.1,55.3,-2.6,243],[162.3,55.2,-3.2,243],[155.7,54.9,-3.7,241],
  [149,54.5,-4.2,238],[142.5,53.9,-4.7,236],[136,53.1,-5.3,234],
  [129.7,52.1,-5.8,232],[123.4,50.9,-6.3,230],[117.1,49.6,-6.8,229],
  [111,48.2,-7.2,227],[104.9,46.6,-7.7,226],[98.9,44.8,-8.2,225],
  [93,42.8,-8.7,224],[87.2,40.8,-9.1,223],[81.4,38.5,-9.6,222],
  [75.8,36.1,-10.1,222],[70.2,33.6,-10.5,221],[64.7,30.9,-11,221],
  [59.2,28.1,-11.4,221],[53.9,25.2,-11.8,221],[48.6,22.1,-12.3,221],
  [43.4,18.8,-12.7,221],[38.3,15.5,-13.1,221],[33.2,12,-13.5,222],
  [28.3,8.3,-13.9,222],[23.4,4.6,-14.4,223],[18.6,0.7,-14.8,198],
  [13.8,0.3,-15.2,171],[9.1,0.3,-15.5,170],[4.3,0.3,-15.9,175],
  [-0.6,0.3,-16.3,180],[-5.7,0.3,-16.7,186],[-10.9,0.3,-17.2,191],
  [-16.2,0.3,-17.6,196],[-21.7,0.3,-18.1,201],[-27.4,0.3,-18.5,206],
  [-33.1,0.3,-19,211],[-39.1,0.3,-19.5,216],[-45.1,0.3,-19.9,221],
  [-51.3,0.3,-19.9,225],[-57.6,0.3,-19.6,230],[-64.1,0.3,-19.3,235],
  [-70.6,0.3,-18.7,239],[-77.2,0.3,-17.7,242],[-83.8,0.3,-16.1,247],
  [-90.5,0.3,-14.4,251],[-97.4,0.3,-12.6,256],[-104.3,0.3,-10.9,260],
  [-111.4,0.3,-9,265],[-118.5,0.3,-7.2,269],[-125.8,0.3,-5.3,273],
  [-133.3,0.3,-3.4,278],[-140.8,0.3,-1.7,282],[-148.6,0.3,-0.4,286],
  [-156.5,0.3,0.9,290],[-164.5,0.3,1.7,288],[-172.5,0.3,2.1,285],
  [-180.3,0.3,1.9,282],[-188.1,0.3,1.2,279],[-195.7,0.7,-0.1,275],
  [-202.9,2.4,-1.8,271],[-209.5,5.1,-4,262],[-215.3,8,-6.6,244],
  [-220.7,10.7,-9.5,235],[-225.6,13.1,-12.7,225],
  [-230.1,15.4,-16.2,215],[-234.1,17.4,-19.9,204],
  [-237.6,19.2,-23.8,197],[-240.8,20.7,-27.9,192],
  [-243.5,22.1,-32.2,186],[-245.7,23.2,-36.6,181],
  [-247.6,24.1,-41.1,175],[-249,24.8,-45.6,170],
  [-249.9,25.3,-50.2,165],[-250.5,25.6,-54.7,161],
  [-250.7,25.7,-59.1,158],[-250.4,25.6,-63.4,155],
  [-249.8,25.3,-67.6,153],[-248.9,24.8,-71.7,152],
  [-248,24.3,-75.8,151],[-247.1,23.9,-79.9,149],
  [-246.1,23.4,-83.9,155],[-244.7,22.7,-88,159],
  [-243,21.8,-92.1,164],[-240.8,20.8,-96,169],
  [-238.3,19.5,-99.9,174],[-235.5,18.1,-103.6,180],
  [-232.3,16.5,-107.3,186],[-229,14.9,-111,192],
  [-225.3,13.3,-114.7,197],[-221.3,11.9,-118.1,201],
  [-216.8,11,-121.5,206],[-212,10.4,-124.6,209],
  [-206.9,10.4,-127.3,211],[-201.5,10.4,-129.9,216],
  [-196,10.4,-132.3,221],[-190.2,10.4,-134.4,224],
  [-184.1,10.4,-136.1,228],[-177.9,10.4,-137.3,227],
  [-171.7,10.4,-138,224],[-165.5,10.4,-138.2,222],
  [-159.3,10.4,-138,220],[-153.3,10.4,-137.2,217],
  [-147.4,10.4,-136,215],[-141.7,10.3,-134.4,213],
  [-136.2,10.3,-132.4,210],[-130.9,10.3,-129.9,208],
  [-126,10.3,-127.2,196],[-121.6,10.3,-124.2,188],
  [-117.6,10.3,-120.9,181],[-114.1,10.3,-117.4,178],
  [-111,10.3,-113.7,175],[-108.3,10.3,-109.7,172],
  [-106,10.3,-105.5,168],[-104.1,10.3,-101.3,166],
  [-102.6,10.3,-97,167],[-101.5,10.3,-92.4,172],
  [-100.7,10.3,-87.6,176],[-100.3,10.3,-82.7,180],
  [-100.2,10.3,-77.6,185],[-100,10.3,-72.4,191],
  [-99.9,10.3,-67,196],[-99.7,10.3,-61.5,201],
  [-99.7,10.3,-55.9,206],[-100.1,10.3,-50.1,210],
  [-100.8,10.8,-44.3,214],[-101.5,12,-38.5,218],
  [-102.4,14.1,-32.8,221],[-103.3,16.7,-27.2,223],
  [-104.2,19.1,-21.7,219],[-105.1,21.4,-16.2,215],
  [-106,23.5,-10.7,212],[-106.8,25.5,-5.3,208],
  [-107.7,27.2,0.1,205],[-108.5,28.7,5.5,201],
  [-109.4,30.1,10.8,198],[-110.2,31.3,16.1,195],
  [-111,32.3,21.3,192],[-111.8,33.1,26.5,190],
  [-112.5,33.8,31.6,187],[-113.3,34.3,36.7,185],
  [-114,34.6,41.8,183],[-114.7,34.7,46.7,180],
  [-115.4,34.7,51.7,179],[-116.1,34.6,56.6,177],
  [-116.8,34.3,61.4,175],[-117.4,33.8,66.2,174],
  [-118.1,33.2,70.9,173],[-118.7,32.4,75.6,172],
  [-119.3,31.5,80.2,171],[-119.9,30.4,84.8,170],
  [-120.5,29.2,89.4,170],[-121,27.9,93.8,169],
  [-121.6,26.4,98.3,169],[-122.1,24.7,102.6,169],
  [-122.7,23,107,169],[-123.2,21.1,111.3,170],
  [-123.6,20.4,115.5,153],[-124,20.4,119.7,151],
  [-124.5,20.4,123.9,155],[-125.3,20.4,128.2,160],
  [-126.1,20.4,132.7,166],[-127,20.4,137.3,171],
  [-127.9,20.4,142,177],[-129.2,20.4,146.8,181],
  [-130.8,20.4,151.7,186],[-132.4,20.4,156.6,192],
  [-134.1,20.4,161.8,197],[-135.8,20.4,167,202],
  [-137.8,20.4,172.3,206],[-140.2,20.4,177.7,211],
  [-142.6,20.4,183.1,216],[-145.3,20.4,188.5,221],
  [-148.4,20.4,193.9,225],[-151.7,20.4,199.3,230],
  [-155.2,20.4,204.7,234],[-159.1,20.4,209.9,239],
  [-163.2,20.3,215.2,243],[-167.5,20.3,220.6,248],
  [-172.1,20.3,225.7,251],[-177.2,20.3,230.6,255],
  [-182.4,20.3,235.5,260],[-187.7,20.3,240.4,264],
  [-193.1,20.3,245.5,268],[-198.8,20.3,250.3,272],
  [-204.9,20.3,254.8,275],[-211.4,20.3,259,278],
  [-218.2,20.3,262.7,281],[-225.4,20.3,266,284],
  [-232.7,20.3,269,288],[-240.3,20.3,271.9,292],
  [-248.1,20.3,274.3,295],[-256.1,20.3,276.2,298],
  [-264.3,20.3,277.6,301],[-272.6,20.3,278.4,304],
  [-281.1,20.3,278.7,307],[-289.6,20.3,278.5,309]
];

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptTutorialBot) return;
  const ROUTE = ${JSON.stringify(ROUTE)};
  const AUTO_ROUTE = true;
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
    if (!Array.isArray(v) || v.length < 9 || v.length % 3) return null;
    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (let i = 0; i + 2 < v.length; i += 3) {
      const x = v[i], y = v[i + 1], z = v[i + 2];
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
      if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }
    const dx = maxX - minX, dy = maxY - minY, dz = maxZ - minZ;
    const vertexCount = v.length / 3;
    const eligible = vertexCount >= 70 && Math.min(dx, dz) >= 12 && (dy <= 6.5 || vertexCount >= 300);
    return { eligible, dx, dy, dz, vertexCount };
  }

  function extractRoadRoute(data, targetCount) {
    targetCount = Math.max(32, Math.floor(targetCount || 239));
    if (!data || !Array.isArray(data.parts) || !data.lib || !data.start || !Array.isArray(data.start.p)) return null;
    const shapes = Object.create(null);
    for (const id of Object.keys(data.lib)) {
      const v = data.lib[id] && data.lib[id].v;
      const info = shapeInfo(v);
      if (info && info.eligible) shapes[id] = { v, info };
    }

    // Keep only triangles on upward-facing, road-sized meshes.
    const faces = [];
    let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
    const usedIds = Object.create(null);
    for (const p of data.parts) {
      if (!Array.isArray(p) || p.length < 12) continue;
      const x = +p[0], y = +p[1], z = +p[2], id = String(p[3]);
      const shape = shapes[id];
      if (!shape) continue;
      const v = shape.v, q = p.slice(8, 12).map(Number);
      usedIds[id] = true;
      for (let i = 0; i + 8 < v.length; i += 9) {
        const a = rotatePoint([v[i], v[i + 1], v[i + 2]], q);
        const b = rotatePoint([v[i + 3], v[i + 4], v[i + 5]], q);
        const c = rotatePoint([v[i + 6], v[i + 7], v[i + 8]], q);
        a[0] += x; a[1] += y; a[2] += z;
        b[0] += x; b[1] += y; b[2] += z;
        c[0] += x; c[1] += y; c[2] += z;
        const abx = b[0] - a[0], aby = b[1] - a[1], abz = b[2] - a[2];
        const acx = c[0] - a[0], acy = c[1] - a[1], acz = c[2] - a[2];
        const nx = aby * acz - abz * acy;
        const ny = abz * acx - abx * acz;
        const nz = abx * acy - aby * acx;
        const nl = Math.sqrt(nx * nx + ny * ny + nz * nz);
        if (nl < 1e-8 || ny / nl < 0.5) continue;
        const face = [a, b, c];
        faces.push(face);
        for (const vtx of face) {
          if (vtx[0] < minX) minX = vtx[0]; if (vtx[0] > maxX) maxX = vtx[0];
          if (vtx[2] < minZ) minZ = vtx[2]; if (vtx[2] > maxZ) maxZ = vtx[2];
        }
      }
    }
    if (faces.length < 80 || !Number.isFinite(minX) || !Number.isFinite(minZ)) return null;

    minX = Math.floor((minX - 3) / STEP) * STEP;
    maxX = Math.ceil((maxX + 3) / STEP) * STEP;
    minZ = Math.floor((minZ - 3) / STEP) * STEP;
    maxZ = Math.ceil((maxZ + 3) / STEP) * STEP;
    const W = Math.round((maxX - minX) / STEP) + 1;
    const H = Math.round((maxZ - minZ) / STEP) + 1;
    const size = W * H;
    if (W < 10 || H < 10 || size > 1_500_000) return null;
    let mask = new Uint8Array(size);
    const ySum = new Float64Array(size);
    const yCount = new Uint16Array(size);

    // Fill the 2-D projection of each top-facing triangle, retaining approximate road height.
    for (const tri of faces) {
      const a = tri[0], b = tri[1], c = tri[2];
      const c1 = (a[0] - minX) / STEP, r1 = (a[2] - minZ) / STEP;
      const c2 = (b[0] - minX) / STEP, r2 = (b[2] - minZ) / STEP;
      const c3 = (c[0] - minX) / STEP, r3 = (c[2] - minZ) / STEP;
      const denom = (r2 - r3) * (c1 - c3) + (c3 - c2) * (r1 - r3);
      if (Math.abs(denom) < 1e-7) continue;
      const left = Math.max(0, Math.floor(Math.min(c1, c2, c3)));
      const right = Math.min(W - 1, Math.ceil(Math.max(c1, c2, c3)));
      const top = Math.max(0, Math.floor(Math.min(r1, r2, r3)));
      const bottom = Math.min(H - 1, Math.ceil(Math.max(r1, r2, r3)));
      // Very large projected triangles are likely vertical/degenerate collision faces; skip them.
            if ((right - left + 1) * (bottom - top + 1) > 8000) continue;
      const y = (a[1] + b[1] + c[1]) / 3;
      for (let r = top; r <= bottom; r++) {
        const z = r;
        for (let col = left; col <= right; col++) {
          const alpha = ((r2 - r3) * (col - c3) + (c3 - c2) * (z - r3)) / denom;
          const beta = ((r3 - r1) * (col - c3) + (c1 - c3) * (z - r3)) / denom;
          const gamma = 1 - alpha - beta;
          if (alpha < -0.001 || beta < -0.001 || gamma < -0.001) continue;
          const idx = r * W + col;
          mask[idx] = 1;
          ySum[idx] += y;
          if (yCount[idx] < 65535) yCount[idx]++;
        }
      }
    }

    // Binary closing bridges tiny raster gaps between triangles/pieces.
    const dilated = new Uint8Array(size);
    for (let r = 1; r < H - 1; r++) {
      const base = r * W;
      for (let c = 1; c < W - 1; c++) {
        const i = base + c;
        if (mask[i] || mask[i - 1] || mask[i + 1] || mask[i - W] || mask[i + W]) {
          dilated[i] = 1;
        }
      }
    }
    const closed = new Uint8Array(size);
    for (let r = 1; r < H - 1; r++) {
      const base = r * W;
      for (let c = 1; c < W - 1; c++) {
        const i = base + c;
        if (dilated[i] && dilated[i - 1] && dilated[i + 1] && dilated[i - W] && dilated[i + W]) closed[i] = 1;
      }
    }
    mask = closed;

    // Remove tiny isolated components (4-connected), not the connected course surfaces.
    const seen = new Uint8Array(size);
    const queue = new Int32Array(size);
    for (let i = 0; i < size; i++) {
      if (!mask[i] || seen[i]) continue;
      let head = 0, tail = 0;
      queue[tail++] = i; seen[i] = 1;
      while (head < tail) {
        const u = queue[head++], r = Math.floor(u / W), c = u - r * W;
        const nbrs = [c > 0 ? u - 1 : -1, c + 1 < W ? u + 1 : -1, r > 0 ? u - W : -1, r + 1 < H ? u + W : -1];
        for (const v of nbrs) if (v >= 0 && mask[v] && !seen[v]) { seen[v] = 1; queue[tail++] = v; }
      }
      if (tail <= 4) for (let k = 0; k < tail; k++) mask[queue[k]] = 0;
    }

    // Zhang-Suen thinning: reduce the filled road surface to a one-cell-wide centerline skeleton.
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
            const p2 = skel[i - W], p3 = skel[i - W + 1], p4 = skel[i + 1], p5 = skel[i + W + 1];
            const p6 = skel[i + W], p7 = skel[i + W - 1], p8 = skel[i - 1], p9 = skel[i - W - 1];
            const B = p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;
            if (B < 2 || B > 6) continue;
            const seq = [p2, p3, p4, p5, p6, p7, p8, p9, p2];
            let A = 0;
            for (let j = 0; j < 8; j++) if (seq[j] === 0 && seq[j + 1] === 1) A++;
            if (A !== 1) continue;
            if (pass === 0) {
              if (p2 * p4 * p6 !== 0 || p4 * p6 * p8 !== 0) continue;
            } else {
              if (p2 * p4 * p8 !== 0 || p2 * p6 * p8 !== 0) continue;
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

    const cellToNode = new Int32Array(size); cellToNode.fill(-1);
    const rows = [], cols = [];
    for (let i = 0; i < size; i++) if (skel[i]) {
      cellToNode[i] = rows.length;
      rows.push(Math.floor(i / W)); cols.push(i % W);
    }
    const n = rows.length;
    if (n < 20) return null;
    const degree = new Uint8Array(n);
    const startP = data.start.p;
    let startNode = -1, startD2 = Infinity;
    for (let k = 0; k < n; k++) {
      const x = minX + cols[k] * STEP, z = minZ + rows[k] * STEP;
      const dx = x - startP[0], dz = z - startP[2], d2 = dx * dx + dz * dz;
      if (d2 < startD2) { startD2 = d2; startNode = k; }
      let d = 0;
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const rr = rows[k] + dr, cc = cols[k] + dc;
        if (rr >= 0 && rr < H && cc >= 0 && cc < W && cellToNode[rr * W + cc] >= 0) d++;
      }
      degree[k] = d;
    }
    if (startNode < 0) return null;

    // Dijkstra from start; choose the farthest reachable endpoint to trace an open course.
    const dist = new Float64Array(n); dist.fill(Infinity);
    const prev = new Int32Array(n); prev.fill(-1);
    const done = new Uint8Array(n);
    const heapD = [], heapN = [];
    function push(d, node) {
      let i = heapD.length; heapD.push(d); heapN.push(node);
      while (i > 0) {
        const p = (i - 1) >> 1;
        if (heapD[p] <= d) break;
        heapD[i] = heapD[p]; heapN[i] = heapN[p]; i = p;
      }
      heapD[i] = d; heapN[i] = node;
    }
    function pop() {
      if (!heapD.length) return null;
      const out = [heapD[0], heapN[0]], lastD = heapD.pop(), lastN = heapN.pop();
      if (heapD.length) {
        let i = 0;
        while (true) {
          let c = i * 2 + 1;
          if (c >= heapD.length) break;
          if (c + 1 < heapD.length && heapD[c + 1] < heapD[c]) c++;
          if (heapD[c] >= lastD) break;
          heapD[i] = heapD[c]; heapN[i] = heapN[c]; i = c;
        }
        heapD[i] = lastD; heapN[i] = lastN;
      }
      return out;
    }
    dist[startNode] = 0; push(0, startNode);
    while (heapD.length) {
      const item = pop(); if (!item) break;
      const du = item[0], u = item[1];
      if (du !== dist[u] || done[u]) continue;
      done[u] = 1;
      const r = rows[u], c = cols[u];
      for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
        if (!dr && !dc) continue;
        const rr = r + dr, cc = c + dc;
        if (rr < 0 || rr >= H || cc < 0 || cc >= W) continue;
        const v = cellToNode[rr * W + cc]; if (v < 0 || done[v]) continue;
        const nd = du + STEP * ((dr && dc) ? Math.SQRT2 : 1);
        if (nd < dist[v]) { dist[v] = nd; prev[v] = u; push(nd, v); }
      }
    }
    let target = -1, farthest = -1;
    for (let k = 0; k < n; k++) if (degree[k] === 1 && Number.isFinite(dist[k]) && dist[k] > farthest) {
      farthest = dist[k]; target = k;
    }
    if (target < 0) for (let k = 0; k < n; k++) if (Number.isFinite(dist[k]) && dist[k] > farthest) { farthest = dist[k]; target = k; }
    if (target < 0 || farthest < 25) return null;

    const path = [];
    for (let cur = target, guard = 0; cur >= 0 && guard <= n; cur = prev[cur], guard++) {
      const r = rows[cur], c = cols[cur], cell = r * W + c;
      let py = yCount[cell] ? ySum[cell] / yCount[cell] : NaN;
      if (!Number.isFinite(py)) {
        let found = false;
        for (let rad = 1; rad <= 4 && !found; rad++) {
          for (let dr = -rad; dr <= rad && !found; dr++) for (let dc = -rad; dc <= rad; dc++) {
            const rr = r + dr, cc = c + dc;
            if (rr < 0 || rr >= H || cc < 0 || cc >= W) continue;
            const j = rr * W + cc;
            if (yCount[j]) { py = ySum[j] / yCount[j]; found = true; break; }
          }
        }
        if (!found) py = path.length ? path[path.length - 1][1] : startP[1];
      }
      path.push([minX + c * STEP, py, minZ + r * STEP]);
    }
    path.reverse();
    if (path.length < 20) return null;

    // Smooth one-pixel raster noise and resample to the existing driver's fixed route length.
    const smooth = path.map((p, i) => {
      let sx = 0, sy = 0, sz = 0, count = 0;
      for (let j = Math.max(0, i - 2); j <= Math.min(path.length - 1, i + 2); j++) {
        sx += path[j][0]; sy += path[j][1]; sz += path[j][2]; count++;
      }
      return [sx / count, sy / count, sz / count];
    });
    const cumulative = [0];
    for (let i = 1; i < smooth.length; i++) {
      const a = smooth[i - 1], b = smooth[i];
      cumulative.push(cumulative[i - 1] + Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]));
    }
    const total = cumulative[cumulative.length - 1];
    if (!Number.isFinite(total) || total < 25) return null;
    const route = [];
    let seg = 1;
    for (let i = 0; i < targetCount; i++) {
      const want = total * i / (targetCount - 1);
      while (seg < cumulative.length - 1 && cumulative[seg] < want) seg++;
      const a = smooth[seg - 1], b = smooth[seg];
      const span = cumulative[seg] - cumulative[seg - 1];
      const t = span > 1e-8 ? (want - cumulative[seg - 1]) / span : 0;
      route.push([
        a[0] + (b[0] - a[0]) * t,
        a[1] + (b[1] - a[1]) * t,
        a[2] + (b[2] - a[2]) * t,
        140
      ]);
    }
    // Track piece coordinates and the game's start transform can have different vertical origins.
    // Preserve the extracted elevation profile while anchoring the first point to the actual start height.
    const yOffset = startP[1] - route[0][1];
    for (const point of route) point[1] += yOffset;
    return {
      route,
      pathLength: Math.round(total * 10) / 10,
      skeletonPoints: n,
      roadFaces: faces.length,
      start: route[0].slice(0, 3),
      end: route[route.length - 1].slice(0, 3),
      shapeIds: Object.keys(usedIds).map(Number).sort((a, b) => a - b)
    };
  }
  
  const SPEED_FACTOR = ${SPEED_FACTOR};
  const STEER_GAIN = ${STEER_GAIN};
  const LAT_ACCEL = ${LAT_ACCEL};
  const LINE_PULL = ${LINE_PULL};
  const LOW_SPEED_BOOST = ${LOW_SPEED_BOOST};
  const SLOW_ZONES = ${JSON.stringify(SLOW_ZONES)};
  const LOOK_BASE = ${LOOK_BASE};
  const LEARN = ${LEARN};
  const AIRBRAKE = ${AIRBRAKE};
  const AIR_DELAY = ${AIR_DELAY};
  const AIR_MATCH_SLOPE = ${AIR_MATCH_SLOPE};
  const AIR_BIAS = ${AIR_BIAS};
  const AIR_DOWN_IS_NOSE_UP = ${AIR_DOWN_IS_NOSE_UP};
  const AIR_LEAD = ${AIR_LEAD};
  const AIR_DEADBAND = ${AIR_DEADBAND};
  const AIR_LOOK_SEC = ${AIR_LOOK_SEC};
  const MAX_LINE_SHIFT = ${MAX_LINE_SHIFT};
  const MAX_SPEED_SHIFT = ${MAX_SPEED_SHIFT};
  const EXPLORE_RUNS = ${EXPLORE_RUNS};
  const SPEED_VALUE = ${SPEED_VALUE};
  const AVG_MS = 55;
  const LOOK_SPEED = ${LOOK_SPEED};
  const LOOK_MAX = ${LOOK_MAX};
  const DECODE_OFFSET = ${DECODE_OFFSET};
  const FORWARD_SIGN = ${FORWARD_SIGN};
  const STEER_SIGN = ${STEER_SIGN};

  const bot = {
    mode: "${MODE}",
    enabled: true,
    idx: Object.create(null),
    acc: Object.create(null),
    stuck: Object.create(null),
    lastPos: Object.create(null),
    lastFrames: Object.create(null),
    hist: Object.create(null),
    lastCrash: Object.create(null),
    lastOff: Object.create(null),
    lastCp: Object.create(null),
    airSince: Object.create(null),
    airV0: Object.create(null),
    lastAirborne: Object.create(null),
    landSteerUntil: Object.create(null),
    lastPitch: Object.create(null),
    airMatched: Object.create(null),
    finLogged: Object.create(null),
    dbg: null,
    recRun: 0,
    recChunk: [],
    recChunkIndex: 0,
    recDone: false,
    recLastFrames: undefined,
    recLastSample: -1
  };

  function dist2(p,q) {
    const dx=p.x-q[0], dy=p.y-q[1], dz=p.z-q[2];
    return dx*dx+dy*dy+dz*dz;
  }

  function nearestIndex(p,id,forceGlobal=false) {
    const start=bot.idx[id] ?? 0;
    let best=start, bestD=Infinity;
    const lo=forceGlobal ? 0 : Math.max(0,start-5);
    const hi=forceGlobal ? N-1 : Math.min(N-1,start+40);

    for(let i=lo;i<=hi;i++) {
      const d=dist2(p,ROUTE[i]);
      if(d<bestD) { bestD=d; best=i; }
    }

    if(!forceGlobal && bestD>30*30) {
      for(let i=0;i<N;i++) {
        const d=dist2(p,ROUTE[i]);
        if(d<bestD) { bestD=d; best=i; }
      }
    }

    bot.idx[id]=best;
    return best;
  }

  function lookAhead(p,ld,i) {
    let j=i;
    if(j<N-1) {
      const dx=ROUTE[j+1][0]-ROUTE[j][0];
      const dz=ROUTE[j+1][2]-ROUTE[j][2];
      if((p.x-ROUTE[j][0])*dx+(p.z-ROUTE[j][2])*dz>0) j++;
    }

    let ax=p.x, ay=p.y, az=p.z;
    let remaining=ld;

    for(let k=j;k<N;k++) {
      const bx=ROUTE[k][0], by=ROUTE[k][1], bz=ROUTE[k][2];
      const len=Math.hypot(bx-ax,bz-az);
      if(len>=remaining) {
        const f=remaining/Math.max(len,1e-9);
        return {x:ax+(bx-ax)*f,y:ay+(by-ay)*f,z:az+(bz-az)*f,index:k};
      }
      remaining-=len;
      ax=bx; ay=by; az=bz;
    }

    const last=ROUTE[N-1];
    return {x:last[0],y:last[1],z:last[2],index:N-1};
  }

  function crossTrack(p,i) {
    let best=Infinity;
    for(let k=Math.max(0,i-1);k<=Math.min(N-2,i);k++) {
      const ax=ROUTE[k][0], az=ROUTE[k][2];
      const bx=ROUTE[k+1][0], bz=ROUTE[k+1][2];
      const dx=bx-ax, dz=bz-az;
      const l2=dx*dx+dz*dz || 1e-9;
      let t=((p.x-ax)*dx+(p.z-az)*dz)/l2;
      t=Math.max(0,Math.min(1,t));
      const d=Math.hypot(p.x-(ax+dx*t),p.z-(az+dz*t));
      if(d<best) best=d;
    }
    return best===Infinity ? 0 : best;
  }

  const CAP=[];
  const SPD=[];
  function rebuildRouteData() {
    CAP.length=0;
    SPD.length=0;
    for(let k=0;k<N;k++) {
      let kmax=0;
      for(let m=Math.max(1,k-2);m<=Math.min(N-2,k+2);m++) {
        const ax=ROUTE[m][0]-ROUTE[m-1][0], az=ROUTE[m][2]-ROUTE[m-1][2];
        const bx=ROUTE[m+1][0]-ROUTE[m][0], bz=ROUTE[m+1][2]-ROUTE[m][2];
        const la=Math.hypot(ax,az), lb=Math.hypot(bx,bz);
        const dh=Math.abs(Math.atan2(ax*bz-az*bx,ax*bx+az*bz));
        const curv=dh/Math.max((la+lb)/2,1e-6);
        if(curv>kmax) kmax=curv;
      }
      CAP.push(kmax>1e-6 ? Math.sqrt(LAT_ACCEL/kmax)*3.6 : 1000);
      SPD.push(ROUTE[k][3]);
    }

    // Smooth sudden speed drops while retaining curvature-based speed caps.
    for(let k=1;k<N;k++) {
      if(ROUTE[k-1][3]-ROUTE[k][3]>12) {
        const keep=ROUTE[k-1][3];
        for(let m=k;m<Math.min(N,k+10);m++) SPD[m]=Math.max(SPD[m],keep);
      }
    }
  }
  rebuildRouteData();

  function lateral(p,i) {
    const k=Math.max(0,Math.min(N-2,i));
    const ax=ROUTE[k][0], az=ROUTE[k][2], bx=ROUTE[k+1][0], bz=ROUTE[k+1][2];
    const dx=bx-ax, dz=bz-az;
    const l=Math.hypot(dx,dz)||1e-9;
    let t=((p.x-ax)*dx+(p.z-az)*dz)/(l*l);
    t=Math.max(0,Math.min(1,t));
    const ox=p.x-(ax+dx*t), oz=p.z-(az+dz*t);
    return -(dz*ox-dx*oz)/l;
  }

  // ================= SELF-LEARNING =================
  const ch = (typeof BroadcastChannel !== "undefined") ? new BroadcastChannel("ptbot") : null;
  const L = bot.learn = {
    best:{cp:[],seg:[],dur:[],vexit:[],gt:[],gv:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)},
    cur:{seg:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)},
    run:null,runNo:0,pending:false,pendingFrame:0
  };
  const DEF = {sp:1, off:0, br:6, ab:0};
  function clampv(v,a,b) { return Math.max(a,Math.min(b,v)); }
  function rnd(a) { return (Math.random()*2-1)*a; }
  function post(m) { if(ch) { try { ch.postMessage(m); } catch(_) {} } }
  function saveBest() { post({type:"save", data:{n:N, best:L.best}}); }

  function segOf(i) {
    const cp=L.best.cp;
    let s=0;
    for(let j=0;j<cp.length;j++) {
      if(cp[j].idx<=i) s=j+1; else break;
    }
    return s;
  }

  function paramsAt(i) {
    if(!LEARN) return DEF;
    return L.cur.seg[segOf(i)] || DEF;
  }

  function offAt(k) {
    if(!LEARN) return 0;
    return L.cur.offs[Math.max(0,Math.min(N-1,k))] || 0;
  }

  function spdAt(k) {
    if(!LEARN) return 0;
    return L.cur.spd[Math.max(0,Math.min(N-1,k))] || 0;
  }

  function rangeOf(s) {
    const cp=L.best.cp;
    const lo=s>0 && cp[s-1] ? cp[s-1].idx : 0;
    const hi=cp[s] ? Math.max(cp[s].idx,lo
      function onCheckpoint(frames,speed,idx,isFinish,state) {
    if(!LEARN || !L.run || L.run.failed || L.pending) return;

    const R=L.run, B=L.best, k=R.cps.length;
    const prevFrames=k>0 ? R.cps[k-1].frames : 0;
    const dur=frames-prevFrames;
    R.cps.push({frames:frames,speed:speed,idx:idx});
    const name=isFinish ? "finish" : "checkpoint "+(k+1);

    if(k>=B.gt.length) {
      B.cp[k]={idx:idx};
      B.gt[k]=frames; B.gv[k]=speed;
      B.dur[k]=dur; B.vexit[k]=speed;
      console.log("PTBOT_LEARN ghost set at "+name+": "+(frames/1000).toFixed(2)+" s, "+Math.round(speed)+" km/h");
      saveBest();
      return;
    }

    const dt=frames-B.gt[k];
    const dv=speed-B.gv[k];
    const last=B.gt.length-1;
    const remFrames=Math.max(0,B.gt[last]-B.gt[k]);
    const credit=SPEED_VALUE*clampv(dv,-20,20)/3.6*remFrames/AVG_MS;
    const dEff=dt-credit;

    // Never fail a run at a checkpoint if the bot is already ahead AND faster.
    // Still allow the faster stretch to be saved by the normal improvement logic below.
    const aheadAndFaster = dt <= 0 && dv >= -2;
    const worse = !aheadAndFaster && (dEff > 25 || dt > 250);

    console.log("PTBOT_RESTART_CHECK", {
      checkpoint: name,
      dt,
      dv,
      dEff,
      aheadAndFaster,
      worse,
      shouldRestart: worse && !aheadAndFaster
    });

    const info = (dt > 0 ? "+" : "") +
      (dt / 1000).toFixed(3) + " s, " +
      (dv > 0 ? "+" : "") + Math.round(dv) + " km/h";

    console.log("PTBOT_CHECKPOINT_DIAG", {
      checkpoint: name,
      botFrames: frames,
      ghostFrames: B.gt[k],
      dtSeconds: +(dt / 1000).toFixed(3),
      botSpeed: +speed.toFixed(1),
      ghostSpeed: +B.gv[k].toFixed(1),
      dv: +dv.toFixed(1),
      dEff: +dEff.toFixed(3),
      aheadAndFaster,
      worse
    });

    if(worse && !aheadAndFaster) {
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> not enough, restarting");
      failRun("behind the ghost at "+name,state);
      return;
    }

    if(dEff>=-3) {
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> "+(aheadAndFaster ? "ahead and faster; continuing" : "keeping up, carrying on"));
      return;
    }

    const sdt=dur-B.dur[k];
    const sdv=speed-B.vexit[k];
    const screds=SPEED_VALUE*clampv(sdv,-20,20)/3.6*remFrames/AVG_MS;
    const stretchBetter=(sdt-screds)<
        let ld=Math.max(LOOK_BASE,Math.min(LOOK_MAX,LOOK_BASE+speed*LOOK_SPEED));
    let target=lookAhead(state.position,ld,i);
    if(LEARN) {
      const toff=offAt(target.index);
      if(toff) {
        const k=Math.max(1,Math.min(N-1,target.index));
        const ddx=ROUTE[k][0]-ROUTE[k-1][0],ddz=ROUTE[k][2]-ROUTE[k-1][2];
        const ll=Math.hypot(ddx,ddz)||1;
        target={x:target.x+toff*(-ddz/ll),y:target.y,z:target.z+toff*(ddx/ll),index:target.index};
      }
    }

    const f=rotateVec(state.quaternion,{x:0,y:0,z:FORWARD_SIGN});
    const dx=target.x-state.position.x;
    const dz=target.z-state.position.z;
    const fl=Math.hypot(f.x,f.z)||1;
    const tl=Math.hypot(dx,dz)||1;
    const fx=f.x/fl,fz=f.z/fl,tx=dx/tl,tz=dz/tl;
    const cross=fz*tx-fx*tz;
    const dot=Math.max(-
            try { if(ch) ch.postMessage({type:"track",data:clean}); else console.log("PTBOT_TRACK no channel"); }
        catch(err) { console.log("PTBOT_TRACK send failed: "+String(err)); }
      }
      console.log("PTBOT_TRACK sent: "+parts.length+" placed parts, "+Object.keys(lib).length+" part shapes");
    }
  }
  try {
    const origOnMessage=onmessage;
    onmessage=function(ev) {
      try { captureTrack(ev.data); } catch(err) { console.log("PTBOT_TRACK capture failed: "+String(err)); }
      return origOnMessage.call(this,ev);
    };
  } catch(err) { console.log("PTBOT_TRACK hook failed: "+String(err)); }

  bot.record=record;
  bot.decode=decode;
  bot.choose=choose;
  bot.route=ROUTE;
  globalThis.__ptTutorialBot=bot;
})();
`;

const BOT_BODY = `
  if (e.userControls && globalThis.__ptTutorialBot) {
    const __ptBot = globalThis.__ptTutorialBot;
    let previous = null;
    try {
      const previousBuffer = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      previous = __ptBot.decode(previousBuffer.buffer);
    } catch (_) {}

    if (__ptBot.mode === "record") {
      try { __ptBot.record(previous,e.id); } catch (_) {}
    } else if (__ptBot.enabled) {
      if(previous) r=__ptBot.choose(previous,e.id);
      else r={up:true,right:false,down:false,left:false,reset:false};

      try {
        globalThis.__ptDbgCount=(globalThis.__ptDbgCount||0)+1;
        if(globalThis.__ptDbgCount%120===1 && globalThis.__ptDbgCount<500) {
          console.log("PTBOT_STATE",globalThis.__ptDbgCount,"raw:",
            JSON.stringify(Array.from(new Uint8Array(t.HEAPU8.buffer,i,48))),
            "state:",previous?JSON.stringify({
              frames:previous.frames,speed:previous.speedKmh,pos:previous.position,q:previous.quaternion
            }):"decode returned null",
            "controls:",JSON.stringify(r),"dbg:",JSON.stringify(__ptBot.dbg));
        }
      } catch (_) {}
    }
  }
`;

function rlog(s) {
  try { (window.__ptReconLines=window.__ptReconLines||[]).push(s); } catch (_) {}
  console.log(s);
}

function ptDownload(name,text) {
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([text],{type:"text/plain"}));
  a.download=name;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>a.remove(),500);
}

// In the console: ptReconDump() saves all recon lines as a file; ptWorkerSource(0) saves the physics worker's code.
window.ptReconDump=()=>ptDownload("ptbot_recon.txt",(window.__ptReconLines||[]).join("\n"));
window.ptWorkerSource=(id)=>{
  const e=(
    export let polyMod=new TutorialBot();
