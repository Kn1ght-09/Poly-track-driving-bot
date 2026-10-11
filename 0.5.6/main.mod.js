
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
  [-120.5,29.2,89.4,170],[-121,27.9,93.8,170],
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
  const N = ROUTE.length;
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
  }

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
    const hi=cp[s] ? Math.max(cp[s].idx,lo+1) : N;
    return [lo,Math.min(hi,N)];
  }

  function requestRestart(delay,why,frames) {
    L.pending=true;
    L.pendingFrame=frames;
    console.log("PTBOT_LEARN restart ("+why+")");
    post({type:"restart", delay:delay});
  }

  function failRun(why,state) {
    if(!LEARN || L.pending) return;
    if(L.run) L.run.failed=true;
    console.log("PTBOT_LEARN fail: "+why+" (frame "+state.frames+", checkpoints done this run: "+(L.run ? L.run.cps.length : 0)+")");
    requestRestart(300,why,state.frames);
  }

  function startRun() {
    L.runNo++;
    L.pending=false;
    const B=L.best;
    const seg=[];
    for(let s=0;s<Math.max(B.cp.length,1);s++) {
      const p=B.seg[s] || DEF;
      seg.push({sp:p.sp, off:0, br:p.br, ab:p.ab||0});
    }
    const maxS=Math.min(B.gt.length,seg.length);
    const offs=B.offs.slice();
    const spd=B.spd.slice();
    const mutated=[];
    const desc=[];
    const scale=0.5+1.0*Math.exp(-L.runNo/EXPLORE_RUNS);

    function bump(arr,r,amp,lim) {
      const span=r[1]-r[0];
      const c=r[0]+Math.random()*span;
      const wd=3+Math.random()*(Math.random()<0.3 ? 22 : 10);
      for(let j=r[0];j<r[1];j++) {
        const edge=Math.min(1,(j-r[0])/6,(r[1]-1-j)/6);
        arr[j]=clampv(arr[j]+amp*Math.exp(-((j-c)*(j-c))/(2*wd*wd))*Math.max(0,edge),-lim,lim);
      }
      return Math.round(c);
    }

    if(LEARN && maxS>0) {
      for(let s=0;s<maxS;s++) { if(Math.random()<0.4) mutated.push(s); }
      if(!mutated.length) mutated.push(Math.floor(Math.random()*maxS));

      for(const s of mutated) {
        const g=seg[s];
        const r=rangeOf(s);
        const ok=(r[1]-r[0])>=8;
        const n=Math.random()<0.3 ? 2 : 1;

        for(let t=0;t<n;t++) {
          const w=Math.random();
          if(w<0.40 && ok) {
            const amp=rnd(1.0*scale);
            const c=bump(offs,r,amp,MAX_LINE_SHIFT);
            desc.push("line "+(amp>0?"right ":"left ")+Math.abs(amp).toFixed(1)+" m near point "+c);
          } else if(w<0.64 && ok) {
            const amp=rnd(0.06*scale);
            const c=bump(spd,r,amp,MAX_SPEED_SHIFT);
            desc.push("speed "+(amp>0?"+":"")+(amp*100).toFixed(0)+"% near point "+c);
          } else if(w<0.74) {
            g.sp=clampv(g.sp+rnd(0.03*scale),0.8,1.12);
            desc.push("speed x"+g.sp.toFixed(2)+" in stretch "+(s+1));
          } else if(w<0.84) {
            g.br=clampv(g.br+rnd(1*scale),3,10);
            desc.push("braking "+g.br.toFixed(1)+" in stretch "+(s+1));
          } else if(AIRBRAKE) {
            g.ab=clampv((g.ab||0)+rnd(0.06),-0.35,0.35);
            desc.push("landing tilt "+g.ab.toFixed(2)+" rad in stretch "+(s+1));
          }
        }
      }
    }

    L.cur={seg:seg,offs:offs,spd:spd};
    L.run={n:L.runNo,cps:[],mut:mutated,failed:false};
    console.log("PTBOT_LEARN run "+L.runNo+": "+B.gt.length+" checkpoints in the ghost, trying: "+(desc.length ? desc.join("; ") : "nothing (measuring baseline)"));
  }

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
    const stretchBetter=(sdt-screds)<-3;

    if(stretchBetter) {
      const c=L.cur.seg[k] || DEF;
      B.seg[k]={sp:c.sp,off:0,br:c.br,ab:c.ab||0};
      const rg=rangeOf(k);
      for(let j=rg[0];j<rg[1];j++) {
        B.offs[j]=Math.round(L.cur.offs[j]*1000)/1000;
        B.spd[j]=Math.round(L.cur.spd[j]*1000)/1000;
      }
      B.dur[k]=dur;
      B.vexit[k]=speed;
      const gain=Math.max(0,B.gt[k]-frames);
      B.gt[k]=frames;
      B.gv[k]=speed;
      for(let j=k+1;j<B.gt.length;j++) B.gt[j]=Math.max(0,B.gt[j]-gain);
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> AHEAD, changes kept, carrying on");
      saveBest();
      console.log("PTBOT_LEARN_STATE",JSON.stringify(B));
    } else {
      console.log("PTBOT_LEARN "+name+" vs ghost: "+info+" -> ahead, carrying on (this stretch itself was not better, so its changes are not kept)");
    }
  }

  if(ch) {
    ch.onmessage=(ev) => {
      const m=ev.data || {};
      if(m.type==="load" && m.data && m.data.n===N && m.data.best &&
         Array.isArray(m.data.best.gt) && Array.isArray(m.data.best.spd) &&
         Array.isArray(m.data.best.offs) && m.data.best.offs.length===N &&
         m.data.best.spd.length===N && L.best.cp.length===0 && L.runNo<=1) {
        L.best=m.data.best;
        console.log("PTBOT_LEARN loaded saved progress: "+L.best.gt.length+" checkpoints in the ghost");
        L.runNo=0;
        startRun();
      }
    };
    post({type:"hello"});
  }

  if(LEARN) startRun();

  function groundPitch(i,speedKmh) {
    const D=Math.max(8,speedKmh/3.6*AIR_LOOK_SEC);
    let acc=0,j=i;
    while(j<N-1 && acc<D) {
      acc+=Math.hypot(ROUTE[j+1][0]-ROUTE[j][0],ROUTE[j+1][2]-ROUTE[j][2]);
      j++;
    }
    const k=Math.max(1,j);
    const dh=Math.hypot(ROUTE[k][0]-ROUTE[k-1][0],ROUTE[k][2]-ROUTE[k-1][2])||1;
    return Math.atan2(ROUTE[k][1]-ROUTE[k-1][1],dh);
  }

  function targetSpeed(i) {
    let best=Infinity;
    const hi=Math.min(N-1,i+25);
    const Pi=paramsAt(i);

    for(let j=i;j<=hi;j++) {
      const Pj=paramsAt(j);
      let zc=1000;
      for(const z of SLOW_ZONES) { if(j>=z[0] && j<=z[1] && z[2]<zc) zc=z[2]; }
      const v=Math.min(ROUTE[j][3]*SPEED_FACTOR*Pj.sp*(1+spdAt(j)),CAP[j],zc)+Pi.br*(j-i);
      if(v<best) best=v;
    }
    return Math.max(best,25);
  }

  function rotateVec(q,v) {
    const qx=q.x,qy=q.y,qz=q.z,qw=q.w;
    const ix=qw*v.x+qy*v.z-qz*v.y;
    const iy=qw*v.y+qz*v.x-qx*v.z;
    const iz=qw*v.z+qx*v.y-qy*v.x;
    const iw=-qx*v.x-qy*v.y-qz*v.z;
    return {
      x:ix*qw+iw*-qx+iy*-qz-iz*-qy,
      y:iy*qw+iw*-qy+iz*-qx-ix*-qz,
      z:iz*qw+iw*-qz+ix*-qy-iy*-qx
    };
  }

  function decode(buf) {
    const e=new Uint8Array(buf);
    const d=new DataView(e.buffer,e.byteOffset,e.byteLength);
    if(e.length<48) return null;
    let o=DECODE_OFFSET;
    const frames=e[o]|(e[o+1]<<8)|(e[o+2]<<16);
    o+=3;
    const speed=d.getFloat32(o,true);
    o+=4;
    const flags=e[o++];
    let finish=null;
    if(flags&2) {
      finish=e[o]|(e[o+1]<<8)|(e[o+2]<<16);
      o+=3;
    }
    const checkpoint=d.getUint16(o,true);
    o+=2;
    const position={x:d.getFloat32(o,true),y:d.getFloat32(o+4,true),z:d.getFloat32(o+8,true)};
    o+=12;
    const quaternion={
      x:d.getFloat32(o,true),y:d.getFloat32(o+4,true),
      z:d.getFloat32(o+8,true),w:d.getFloat32(o+12,true)
    };

    if(![speed,position.x,position.y,position.z,quaternion.x,quaternion.y,quaternion.z,quaternion.w].every(Number.isFinite) ||
       Math.abs(speed)>1000 || Math.abs(position.x)>100000 ||
       Math.abs(position.y)>100000 || Math.abs(position.z)>100000) return null;

    return {
      frames,speedKmh:speed,hasStarted:!!(flags&1),wheels:(flags>>3)&15,
      finishFrames:finish,nextCheckpointIndex:checkpoint,
      hasCheckpointToRespawnAt:!!(flags&4),position,quaternion
    };
  }

  function choose(state,id) {
    if(!state) return {up:true,right:false,down:false,left:false,reset:false};

    const lf=bot.lastFrames[id];
    if(lf===undefined || state.frames<lf) {
      bot.idx[id]=0;
      bot.acc[id]=0;
      bot.stuck[id]=0;
      bot.lastPos[id]=undefined;
      bot.hist[id]=[];
      bot.lastCrash[id]=-100000;
      bot.lastOff[id]=-100000;
      bot.finLogged[id]=false;
      bot.lastCp[id]=undefined;
      bot.lastAirborne[id]=false;
      bot.landSteerUntil[id]=0;
      bot.airSince[id]=undefined;
      bot.airV0[id]=undefined;
      bot.lastPitch[id]=undefined;
      bot.airMatched[id]=false;
      if(LEARN && lf!==undefined) startRun();
    }
    bot.lastFrames[id]=state.frames;

    if(LEARN && L.pending && state.frames-L.pendingFrame>6000) {
      L.pendingFrame=state.frames;
      console.log("PTBOT_LEARN still waiting for a restart - sending it again (press T yourself if nothing happens)");
      post({type:"restart",delay:0});
    }

    if(!state.hasStarted) return {up:true,right:false,down:false,left:false,reset:false};

    if(state.finishFrames!==null) {
      if(!bot.finLogged[id]) {
        bot.finLogged[id]=true;
        console.log("PTBOT_FINISH","frames="+state.finishFrames);
        if(LEARN) {
          onCheckpoint(state.finishFrames,Math.abs(state.speedKmh),N-1,true,state);
          if(!L.pending) requestRestart(2500,"finished the track",state.frames);
        }
      }
      return {up:true,right:false,down:false,left:false,reset:false};
    }

    const previousPos=bot.lastPos[id];
    let respawned=false;
    if(previousPos) {
      const dx=state.position.x-previousPos.x;
      const dy=state.position.y-previousPos.y;
      const dz=state.position.z-previousPos.z;
      if(Math.hypot(dx,dy,dz)>5) {
        respawned=true;
        failRun("sudden position jump (respawn)",state);
        bot.idx[id]=0;
        bot.acc[id]=0;
        bot.stuck[id]=0;
        bot.hist[id]=[];
      }
    }

    const speed=Math.abs(state.speedKmh);
    const i=nearestIndex(state.position,id,respawned);

    if(LEARN) {
      const lc=bot.lastCp[id];
      if(lc!==undefined && state.nextCheckpointIndex>lc) onCheckpoint(state.frames,speed,i,false,state);
      bot.lastCp[id]=state.nextCheckpointIndex;
    }

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
    const dot=Math.max(-1,Math.min(1,fx*tx+fz*tz));
    const angle=Math.atan2(cross,dot);
    const abs=Math.abs(angle);

    const tSpeed=targetSpeed(i);
    let up=true,down=false;
    if(speed>tSpeed+8 && speed>40) { up=false;down=true; }
    else if(speed>tSpeed) up=false;
    if(abs>1.0 && speed>60) up=false;

    const lat=lateral(state.position,i)-(LEARN ? offAt(i) : 0);

    // Detect landing, then briefly soften heading correction to reduce sharp swerves.
    const airborneNow=state.wheels===0;
    const wasAirborne=bot.lastAirborne[id]===true;
    if(wasAirborne && !airborneNow) bot.landSteerUntil[id]=state.frames+18;
    bot.lastAirborne[id]=airborneNow;

    const landing=state.frames<(bot.landSteerUntil[id]||0);
    const headingScale=landing ? 0.65 : 1;
    const steerAngle=angle*headingScale+
      LINE_PULL*Math.max(-8,Math.min(8,lat));

    const s=Math.max(-1,Math.min(1,
      steerAngle*STEER_GAIN*
      (1+LOW_SPEED_BOOST*Math.max(0,1-speed/150))*STEER_SIGN
    ));

    let e=(bot.acc[id]??0)+s;
    let right=false,left=false;
    if(e>=1) { right=true;e-=1; }
    else if(e<=-1) { left=true;e+=1; }
    bot.acc[id]=e;

    let reset=false;
    const lp=bot.lastPos[id];
    if(lp) {
      const mdx=state.position.x-lp.x;
      const mdy=state.position.y-lp.y;
      const mdz=state.position.z-lp.z;
      const moved=Math.sqrt(mdx*mdx+mdy*mdy+mdz*mdz);
      if(moved<0.18 && speed<5) bot.stuck[id]=(bot.stuck[id]??0)+1;
      else bot.stuck[id]=0;
    }

    if((bot.stuck[id]??0)>1500) {
      bot.stuck[id]=0;
      if(LEARN) failRun("stuck",state);
      else reset=true;
    }

    bot.lastPos[id]={x:state.position.x,y:state.position.y,z:state.position.z};

    const err=crossTrack(state.position,i);
    let hist=bot.hist[id];
    if(!hist) { hist=[];bot.hist[id]=hist; }
    if(state.frames%10===0 && (hist.length===0 || hist[hist.length-1][0]!==state.frames)) {
      hist.push([state.frames,speed]);
      if(hist.length>14) hist.shift();
    }

    let vmax=0;
    for(const h of hist) if(h[0]>=state.frames-120 && h[1]>vmax) vmax=h[1];

    if(vmax-speed>45 && state.frames-(bot.lastCrash[id]??-100000)>2000) {
      bot.lastCrash[id]=state.frames;
      if(vmax-speed>80) failRun("crash (big speed drop)",state);
      console.log("PTBOT_CRASH","frame="+state.frames,"idx="+i+"/"+(N-1),
        "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0),
        "speed="+Math.round(vmax)+"->"+Math.round(speed),
        "offLine="+err.toFixed(1)+"m","want="+Math.round(tSpeed),"ang="+angle.toFixed(2));
    }

    if(LEARN && err>MAX_LINE_SHIFT+8) failRun("far off the line ("+err.toFixed(0)+" m)",state);
    if(err>5 && state.frames-(bot.lastOff[id]??-100000)>150) {
      bot.lastOff[id]=state.frames;
      console.log("PTBOT_OFF","frame="+state.frames,"idx="+i+"/"+(N-1),
        "side="+(lat>0?"right":"left"),"off="+err.toFixed(1)+"m",
        "speed="+Math.round(speed),"pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0));
    }

    if(reset) console.log("PTBOT_RESET","frame="+state.frames,"idx="+i+"/"+(N-1),
      "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0));

    bot.dbg={i,v:Math.round(speed),want:Math.round(tSpeed),ang:+angle.toFixed(2),
      steer:+s.toFixed(2),off:+err.toFixed(1),lat:+lat.toFixed(1)};

    // ---- AIRBORNE HANDLING ----
    const airborne=(state.wheels===0);
    const pitch=Math.asin(Math.max(-1,Math.min(1,f.y)));

    if(airborne) {
      if(bot.airSince[id]===undefined) {
        bot.airSince[id]=state.frames;
        bot.airV0[id]=speed;
        bot.airMatched[id]=false;
      }
    } else if(bot.airSince[id]!==undefined) {
      const t=state.frames-bot.airSince[id];
      if(t>60) {
        console.log("PTBOT_JUMP","airtime="+t,
          "speed="+Math.round(bot.airV0[id])+"->"+Math.round(speed),
          "idx="+i+"/"+(N-1),"angle="+angle.toFixed(2),"steer="+s.toFixed(2),
          "left="+left,"right="+right,"up="+up,"down="+down,
          "off="+err.toFixed(1),"lat="+lat.toFixed(1),
          "landing tilt="+(pitch*57.3).toFixed(0),
          "ground="+(groundPitch(i,speed)*57.3).toFixed(0));
      }
      bot.airSince[id]=undefined;
      bot.airMatched[id]=false;
    }

    const airFor=airborne ? state.frames-bot.airSince[id] : 0;
    const prevPitch=bot.lastPitch[id];
    bot.lastPitch[id]=pitch;

    if(airborne && airFor>AIR_DELAY && AIRBRAKE) {
      const rate=(prevPitch===undefined)?0:(pitch-prevPitch);
      const want=(AIR_MATCH_SLOPE?groundPitch(i,speed):0)+AIR_BIAS+(LEARN?(paramsAt(i).ab||0):0);
      const predicted=pitch+rate*AIR_LEAD;
      const eAir=want-predicted;
      up=false;down=false;
      const err2=want-pitch;

      if(bot.airMatched[id]) {
        if(Math.abs(err2)>AIR_DEADBAND*3) bot.airMatched[id]=false;
      } else if(Math.abs(err2)<AIR_DEADBAND) {
        bot.airMatched[id]=true;
      }

      if(!bot.airMatched[id]) {
        if(eAir>AIR_DEADBAND && err2>0.02) {
          if(AIR_DOWN_IS_NOSE_UP) down=true; else up=true;
        } else if(eAir<-AIR_DEADBAND && err2<-0.02) {
          if(AIR_DOWN_IS_NOSE_UP) up=true; else down=true;
        }
      }
      bot.dbg.air={t:airFor,pitch:+pitch.toFixed(2),want:+want.toFixed(2),level:!!bot.airMatched[id]};
    }

    return {up,right,down,left,reset};
  }

  function record(state,id) {
    if(!state) return;
    if(bot.recLastFrames!==undefined && state.frames<bot.recLastFrames) {
      bot.recRun++;
      bot.recChunk=[];
      bot.recChunkIndex=0;
      bot.recDone=false;
      bot.recLastSample=-1;
      console.log("PTBOT_LAP_NEW_RUN",bot.recRun);
    }
    bot.recLastFrames=state.frames;
    if(bot.recDone) return;

    if(state.finishFrames!==null) {
      if(bot.recChunk.length>0) console.log("PTBOT_LAP","run="+bot.recRun,"chunk="+bot.recChunkIndex,JSON.stringify(bot.recChunk));
      console.log("PTBOT_LAP_DONE","run="+bot.recRun,"finishFrames="+state.finishFrames);
      bot.recChunk=[];
      bot.recDone=true;
      return;
    }

    if(!state.hasStarted) return;
    if(state.frames%100!==0 || state.frames===bot.recLastSample) return;
    bot.recLastSample=state.frames;
    bot.recChunk.push([+state.position.x.toFixed(1),+state.position.y.toFixed(1),
      +state.position.z.toFixed(1),Math.round(state.speedKmh)]);

    if(bot.recChunk.length>=100) {
      console.log("PTBOT_LAP","run="+bot.recRun,"chunk="+bot.recChunkIndex,JSON.stringify(bot.recChunk));
      bot.recChunkIndex++;
      bot.recChunk=[];
    }
  }

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

function reconSummary(v,d) {
  if(v===null || v===undefined) return String(v);
  const t=typeof v;
  if(t==="string") return JSON.stringify(v.length>60?v.slice(0,60)+"...("+v.length+" chars)":v);
  if(t==="number" || t==="boolean") return String(v);
  if(t==="function") return "fn";
  if(v instanceof ArrayBuffer) return "ArrayBuffer("+v.byteLength+")";
  if(ArrayBuffer.isView(v)) {
    let head="";
    try { head=Array.from(v.subarray?v.subarray(0,12):[]).join(","); } catch (_) {}
    return v.constructor.name+"("+v.length+")["+head+(v.length>12?",...":"")+"]";
  }
  if(Array.isArray(v)) {
    if(d>=3) return "Array("+v.length+")";
    return "Array("+v.length+")["+v.slice(0,3).map(x=>reconSummary(x,d+1)).join(", ")+(v.length>3?", ...":"")+"]";
  }
  if(t==="object") {
    if(d>=3) return "{...}";
    const ks=Object.keys(v);
    return "{"+ks.slice(0,14).map(k=>k+": "+reconSummary(v[k],d+1)).join(", ")+(ks.length>14?", ...("+ks.length+" keys)":"")+"}";
  }
  return t;
}

function installRecon() {
  const OrigWorker=window.Worker;
  if(!OrigWorker || window.__ptReconInstalled) return;
  window.__ptReconInstalled=true;
  window.__ptWorkers=[];
  window.Worker=function(url,opts) {
    const w=new OrigWorker(url,opts);
    const id=window.__ptWorkers.length;
    const entry={w,url:String(url),opts};
    window.__ptWorkers.push(entry);
    console.log("PTBOT_RECON worker #"+id+" created: "+String(url).slice(0,140)+" options="+JSON.stringify(opts||{}));
    try {
      if(String(url).indexOf("blob:")===0) {
        fetch(url).then(r=>r.text()).then(txt=>{
          entry.src=txt;
          console.log("PTBOT_RECON worker #"+id+" source is "+txt.length+" characters long");
        }).catch(()=>{});
      }
    } catch (_) {}
    const origPost=w.postMessage.bind(w);
    let nOut=0,nIn=0;
    w.postMessage=function(m,t) {
      nOut++;
      if(nOut<=40 || nOut%500===0) console.log("PTBOT_RECON #"+id+" game -> worker, message "+nOut+": "+reconSummary(m,0));
      return origPost(m,t);
    };
    w.addEventListener("message",ev=>{
      nIn++;
      if(nIn<=40 || nIn%500===0) console.log("PTBOT_RECON #"+id+" worker -> game, message "+nIn+": "+reconSummary(ev.data,0));
    });
    return w;
  };
  window.Worker.prototype=OrigWorker.prototype;
  console.log("PTBOT_RECON installed (watching for physics workers)");
}

function setupMainThread() {
  if(RECON) { try { installRecon(); } catch(err) { console.log("PTBOT_RECON failed",err); } }
  if(typeof BroadcastChannel==="undefined") return;
  const ch=new BroadcastChannel("ptbot");
  const STORE="ptbot_learn_v5";

  function fire(type,k) {
    const ev=new KeyboardEvent(type,{
      key:k.key,code:k.code,keyCode:k.keyCode,which:k.keyCode,bubbles:true,cancelable:true
    });
    (document.activeElement||document.body||document).dispatchEvent(ev);
  }

  function tap(k,ms) {
    fire("keydown",k);
    setTimeout(()=>fire("keyup",k),ms);
  }

  ch.onmessage=ev=>{
    const m=ev.data||{};
    if(m.type==="hello") {
      try {
        const d=localStorage.getItem(STORE);
        ch.postMessage({type:"load",data:d?JSON.parse(d):null});
      } catch (_) {}
    } else if(m.type==="save") {
      try { localStorage.setItem(STORE,JSON.stringify(m.data)); } catch (_) {}
    } else if(m.type==="restart" && AUTO_RESTART) {
      setTimeout(()=>{
        tap(RESTART_KEY,60);
        if(AUTO_START) {
          setTimeout(()=>{
            tap({key:"ArrowUp",code:"ArrowUp",keyCode:38},AUTO_START_MS);
            tap({key:"w",code:"KeyW",keyCode:87},AUTO_START_MS);
          },AUTO_START_DELAY);
        }
      },m.delay||300);
    }
  };
}

class TutorialBot extends PolyMod {
  constructor() {
    super();
    this.modName="PolyTrack Tutorial Bot";
    this.modAuthor="Kn1ght-09";
    this.modID="polytrack-tutorial-bot";
    this.modVersion="0.5.6";
    this.touchingPhysics=true;
  }

  init=(pml)=>{
    try { setupMainThread(); } catch(err) { console.log("PTBOT main-thread setup failed",err); }
    pml.registerSimWorkerMixin({
      type:MixinType.INSERT,
      token:"function n(e, r) {",
      func:BOT_BODY
    });
    pml.registerSimWorkerMixin({
      type:MixinType.INSERT,
      token:"(($o.length = 0), (onmessage = r));",
      func:WORKER_HELPERS
    });
  };
}

export let polyMod=new TutorialBot();
