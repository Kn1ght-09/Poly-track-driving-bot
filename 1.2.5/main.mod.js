import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// "drive" = the bot drives the recorded lap.
// "record" = you drive manually and the mod records the lap.
const MODE = "drive";

// ---- FAST SIM TEST ----
// true = the bot also drives replay cars. The game simulates replays much faster than real time,
// so this tests whether the bot can run at that speed. (For this test LEARN and EXACT_REPLAY are off.)
const FAST_SIM = false;

// Where the driving line comes from:
//   "auto"      = use your recorded lap if it belongs to the loaded track, otherwise build a line from the track itself
//   "recorded"  = always use the recorded lap
//   "generated" = always build a line from the track itself (even on the track you recorded)
const ROUTE_SOURCE = "auto";

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
// ---- STEERING v2: the bot measures how fast its car really turns and steers by yaw rate (with damping) ----
const CTRL2 = true;        // false = the old steering everywhere
const C2_KW = 1.0;         // damping: how hard it fights a turn rate that is too fast or too slow
const C2_G0 = 0.8;         // first guess of the car's full-steer turn rate (rad/s); it learns the real value while driving
const C2_FF = 0;           // steering preview: how much of the bend ahead the bot starts turning for early (0 = none)
const SMOOTH_SHIFT = 0.8; // the line is straightened out by up to this many metres so turns start earlier and gentler (0 = off)
const THR_LIFT = 3;   // km/h over the wanted speed before the bot lifts off the gas
const THR_BRAKE = 12; // km/h over before it brakes
const THR_BIG = 15;   // km/h over: acts immediately
const LIFT_MS = 80;  // too fast for this long (ms) before lifting
const BRAKE_MS = 40;  // too fast for this long (ms) before braking
const CURV_DEAD = 0.03; // tiny wobbles in the line (under this many radians per point) don't count as a corner, so the bot stops slowing down in straight corridors
const EXACT_REPLAY = true; // a replay you teach (O while a replay plays) is also stored frame by frame; the bot presses exactly those buttons from the start, and only takes over if the car leaves the replay's path
const EXACT_OPT = true; // on a track with an exact replay the bot tries one tiny change per run (a press moved a few thousandths of a second earlier or later) and keeps it only if the run finishes faster
const EXACT_TAP = false; // on later runs of an exact replay the bot tries fast tapping instead of long steering holds (skids less), keeps whichever finishes first
const EXACT_TAP_RUN = 100; // only steering holds at least this many ms long are turned into taps
const EXACT_TAP_TOL = 6; // metres off the replay's path allowed while a tap variant is being tried
const EXACT_TOL = 2.5;
const EXACT_OPT_TOL = 12; // while trying a change, how far (m) the car may be from the replay's path before the run is stopped (a change that works can put the car ahead of or beside the old line) // metres off the replay's path before the bot takes over
const TIGHT_ON = 9, TIGHT_OFF = 1; // hard turns (steering above TAP_HOLD) are pressed as fast taps of this many ms on / off instead of one long hold, so the car turns without skidding. TIGHT_OFF = 0 goes back to holding.
const TAP_MS = 80;   // tapping: steering is pressed in short taps of this many ms instead of a blur of 1 ms presses (0 = off). Hard turns are still held.
const TAP_HOLD = 0.9; // steering stronger than this is held down instead of tapped
const NOTRIAL_NY = 0.85; // no random line/speed trials where the surface is steeper than this (1 = flat, 0 = vertical wall). 0.85 is about 32 degrees
const REPLAY = true;   // on ramps, walls and slopes that you taught, the bot presses what YOU pressed there (kept in step with where the car is)
const REPLAY_FF = 0.6;   // how much of YOUR steering is added on top of the bot's own steering on ramps/walls (0 = bot steers alone, 1 = your full steering)
const REPLAY_FIX = 0.25; // (old setting, not used any more)
const BEHIND_MS = 1000; // restart a learning run when it is this many ms behind the best run's pace (part-way between checkpoints)
const NO_BEND_CAP = true; // true = the bot's own bend speed guess (about 305 km/h) no longer holds it back on gentle bends; the measured grip limit (capG) still protects tight corners
const IGNORE_RECORDED_SPEED_CAP = false; // true = the speed you drove in a lesson is NOT used as the bot's speed limit (only corner grip limits it). It can make the bot arrive at corners too fast.
const FAR_W = 0;         // early aim: how much the bot leans toward where the line goes further ahead (0 = off)
const FAR_SEC = 0.9;     // how many seconds ahead the early aim looks
const C2_GRIP_FRAC = 1.2;  // corners are taken at no more than this fraction of the sideways grip the bot has measured
const LESSON_SPEED = 1.05; // taught sections: the bot aims for this fraction of YOUR speed (1.0 = same as you, 1.05 = 5% faster)
const DOWNLOAD_DRIVE = false; // true = also save a ptbot_drive.json file every time you stop recording
const USE_3D = true; // build lines on the road surface itself (ramps, banks, walls, loops); false = old flat-road builder
const REC_KEY = "o"; // press once to start recording YOUR driving (bot steps aside), press again to stop and save
const AUTO_RESTART = true;
const AUTO_START = true;
const AUTO_START_MS = 100;
const AUTO_START_DELAY = 60;
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

// Builds a driving line from the track pieces (runs inside the physics worker).
// Self-contained: builds a driving line for any track. No outside references.
// dec = { parts:[[x,y,z,id,rot,axis,cpo,so,qx,qy,qz,qw],...], lib:{id:{v:[...],detector,startOffset}}, start:{p:[x,y,z]} }
function generateRoute3D(dec, opt) {
  opt = opt || {};
  var S = opt.step || 1.3, SPACING = opt.spacing || 5.5, MINCLR = opt.minClr || 3.0, VMAX = opt.vmax || 400;
  var GRAV = 16.0, VHS = [12, 35, 55, 75], VH = 55.0;
  // big tracks: measure the surface first and widen the sampling grid so the number of samples stays manageable
  // (a track that needs 2.5 million samples would freeze the game before it could give up)
  var AREA_ = 0;
  for (var pj = 0; pj < dec.parts.length; pj++) {
    var ee = dec.lib[dec.parts[pj][3]]; if (!ee) continue; var vv = ee.v;
    for (var ii = 0; ii + 8 < vv.length; ii += 9) {
      var ux_=vv[ii+3]-vv[ii], uy_=vv[ii+4]-vv[ii+1], uz_=vv[ii+5]-vv[ii+2], wx_=vv[ii+6]-vv[ii], wy_=vv[ii+7]-vv[ii+1], wz_=vv[ii+8]-vv[ii+2];
      var tx_=uy_*wz_-uz_*wy_, ty_=uz_*wx_-ux_*wz_, tz_=ux_*wy_-uy_*wx_;
      AREA_ += 0.5*Math.sqrt(tx_*tx_+ty_*ty_+tz_*tz_);
    }
  }
  var NODE_BUDGET = opt.nodeBudget || 300000;
  var S_need = 1.3*Math.sqrt(0.96*AREA_/NODE_BUDGET);
  if (S_need > S) S = Math.min(6, S_need);
  var NB = 16, RAD = S*1.7, T0 = Date.now();

  function qrot(q, x, y, z) {
    var n = Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3]) || 1;
    var qx=q[0]/n, qy=q[1]/n, qz=q[2]/n, qw=q[3]/n;
    return [
      (1-2*(qy*qy+qz*qz))*x + 2*(qx*qy-qz*qw)*y + 2*(qx*qz+qy*qw)*z,
      2*(qx*qy+qz*qw)*x + (1-2*(qx*qx+qz*qz))*y + 2*(qy*qz-qx*qw)*z,
      2*(qx*qz-qy*qw)*x + 2*(qy*qz+qx*qw)*y + (1-2*(qx*qx+qy*qy))*z
    ];
  }

  // ---- 1. surface samples: every face of every part, with its outward normal ----
  var cap = 200000, PX = new Float32Array(cap), PY = new Float32Array(cap), PZ = new Float32Array(cap);
  var NX = new Float32Array(cap), NY = new Float32Array(cap), NZ = new Float32Array(cap);
  var n = 0, seen = new Set();
  function grow() {
    cap *= 2;
    function g(a) { var b = new Float32Array(cap); b.set(a); return b; }
    PX = g(PX); PY = g(PY); PZ = g(PZ); NX = g(NX); NY = g(NY); NZ = g(NZ);
  }
  function addNode(x, y, z, nx, ny, nz) {
    var ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    var dom = ax >= ay && ax >= az ? (nx > 0 ? 0 : 1) : (ay >= az ? (ny > 0 ? 2 : 3) : (nz > 0 ? 4 : 5));
    var key = (((Math.floor(x/0.6)+8192)*16384 + (Math.floor(y/0.6)+8192))*16384 + (Math.floor(z/0.6)+8192))*8 + dom;
    if (seen.has(key)) return;
    seen.add(key);
    if (n >= cap) grow();
    PX[n] = x; PY[n] = y; PZ[n] = z; NX[n] = nx; NY[n] = ny; NZ[n] = nz; n++;
  }
  for (var pi = 0; pi < dec.parts.length; pi++) {
    var p = dec.parts[pi], e = dec.lib[p[3]];
    if (!e) continue;
    var v = e.v, q = [p[8], p[9], p[10], p[11]], ox = p[0]*5, oy = p[1]*5, oz = p[2]*5;
    for (var i = 0; i + 8 < v.length; i += 9) {
      var a = qrot(q, v[i], v[i+1], v[i+2]), b = qrot(q, v[i+3], v[i+4], v[i+5]), c = qrot(q, v[i+6], v[i+7], v[i+8]);
      a[0]+=ox; a[1]+=oy; a[2]+=oz; b[0]+=ox; b[1]+=oy; b[2]+=oz; c[0]+=ox; c[1]+=oy; c[2]+=oz;
      var ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2], wx=c[0]-a[0], wy=c[1]-a[1], wz=c[2]-a[2];
      var tx=uy*wz-uz*wy, ty=uz*wx-ux*wz, tz=ux*wy-uy*wx, L=Math.sqrt(tx*tx+ty*ty+tz*tz);
      if (L < 1e-9) continue;
      tx/=L; ty/=L; tz/=L;
      var nu = Math.max(1, Math.ceil(Math.sqrt(ux*ux+uy*uy+uz*uz)/S)), nv = Math.max(1, Math.ceil(Math.sqrt(wx*wx+wy*wy+wz*wz)/S));
      for (var iu = 0; iu <= nu; iu++) for (var iv = 0; iv <= nv; iv++) {
        var fu = iu/nu, fv = iv/nv;
        if (fu + fv > 1.0001) continue;
        addNode(a[0]+ux*fu+wx*fv, a[1]+uy*fu+wy*fv, a[2]+uz*fu+wz*fv, tx, ty, tz);
      }
      if (n > 1500000) return { ok: false, why: "track too large" };
    }
  }
  seen = null;
  if (n < 50) return { ok: false, why: "no surfaces found" };

  // ---- 2. spatial hash (cell = 1.8 m) ----
  var CS = Math.max(1.8, RAD), HS = 1 << 22, HM = HS - 1;
  var head = new Int32Array(HS).fill(-1), nxt = new Int32Array(n), CX = new Int32Array(n), CY = new Int32Array(n), CZ = new Int32Array(n);
  function hsh(ix, iy, iz) { return (((ix*73856093) ^ (iy*19349663) ^ (iz*83492791)) >>> 0) & HM; }
  for (var h0 = 0; h0 < n; h0++) {
    var ix = Math.floor(PX[h0]/CS), iy = Math.floor(PY[h0]/CS), iz = Math.floor(PZ[h0]/CS);
    CX[h0] = ix; CY[h0] = iy; CZ[h0] = iz;
    var hh = hsh(ix, iy, iz); nxt[h0] = head[hh]; head[hh] = h0;
  }
  function near(x, y, z, r, fn) {
    var ix = Math.floor(x/CS), iy = Math.floor(y/CS), iz = Math.floor(z/CS);
    for (var a = -1; a <= 1; a++) for (var b = -1; b <= 1; b++) for (var c = -1; c <= 1; c++) {
      var jx = ix+a, jy = iy+b, jz = iz+c;
      for (var j = head[hsh(jx, jy, jz)]; j >= 0; j = nxt[j]) {
        if (CX[j] !== jx || CY[j] !== jy || CZ[j] !== jz) continue;
        fn(j);
      }
    }
  }

  // ---- 3. blocked: something solid just above the surface (walls, curbs, ceilings) ----
  var blocked = new Uint8Array(n);
  for (var i1 = 0; i1 < n; i1++) {
    var bx = PX[i1], by = PY[i1], bz = PZ[i1], bnx = NX[i1], bny = NY[i1], bnz = NZ[i1], hit = false;
    near(bx, by, bz, 1.8, function (j) {
      if (hit || j === i1) return;
      var dx = PX[j]-bx, dy = PY[j]-by, dz = PZ[j]-bz, hgt = dx*bnx + dy*bny + dz*bnz;
      if (hgt < 0.6 || hgt > 1.8) return;
      var pr = dx*dx+dy*dy+dz*dz - hgt*hgt;
      if (pr <= 0.64) hit = true;
    });
    if (hit) blocked[i1] = 1;
  }

  // ---- 4. smooth neighbours: close, same surface, similar direction ----
  var nbr = new Int32Array(n*NB).fill(-1), cnt = new Uint8Array(n);
  for (var i2 = 0; i2 < n; i2++) {
    if (blocked[i2]) continue;
    var cx0 = PX[i2], cy0 = PY[i2], cz0 = PZ[i2], n0x = NX[i2], n0y = NY[i2], n0z = NZ[i2], k = 0;
    near(cx0, cy0, cz0, RAD, function (j) {
      if (j === i2 || blocked[j] || k >= NB) return;
      var dx = PX[j]-cx0, dy = PY[j]-cy0, dz = PZ[j]-cz0, d2 = dx*dx+dy*dy+dz*dz;
      if (d2 > RAD*RAD || d2 < 0.01) return;
      if (n0x*NX[j] + n0y*NY[j] + n0z*NZ[j] < 0.82) return;
      var d = Math.sqrt(d2);
      if (Math.abs(dx*n0x+dy*n0y+dz*n0z) > 0.4*d || Math.abs(dx*NX[j]+dy*NY[j]+dz*NZ[j]) > 0.4*d) return;
      nbr[i2*NB + k] = j; k++;
    });
    cnt[i2] = k;
  }

  // ---- heap ----
  function Heap() { this.k = []; this.v = []; }
  Heap.prototype.push = function (key, val) {
    var k = this.k, v = this.v, i = k.length; k.push(key); v.push(val);
    while (i > 0) { var pr = (i-1) >> 1; if (k[pr] <= key) break; k[i] = k[pr]; v[i] = v[pr]; i = pr; }
    k[i] = key; v[i] = val;
  };
  Heap.prototype.pop = function () {
    var k = this.k, v = this.v, tk = k[0], tv = v[0], lk = k.pop(), lv = v.pop(), len = k.length;
    if (len > 0) {
      var i = 0;
      for (;;) { var c = 2*i+1; if (c >= len) break; if (c+1 < len && k[c+1] < k[c]) c++; if (k[c] >= lk) break; k[i] = k[c]; v[i] = v[c]; i = c; }
      k[i] = lk; v[i] = lv;
    }
    return [tk, tv];
  };
  Heap.prototype.size = function () { return this.k.length; };

  // ---- 5. clearance = distance along the surface to the nearest edge ----
  var clr = new Float64Array(n).fill(1e9), hp = new Heap();
  for (var i3 = 0; i3 < n; i3++) if (!blocked[i3] && cnt[i3] < 6) { clr[i3] = 0.5; hp.push(0.5, i3); }
  while (hp.size()) {
    var tp = hp.pop(), dc = tp[0], ic = tp[1];
    if (dc > clr[ic]) continue;
    for (var q2 = 0; q2 < cnt[ic]; q2++) {
      var jn = nbr[ic*NB+q2], nd2 = dc + Math.hypot(PX[jn]-PX[ic], PY[jn]-PY[ic], PZ[jn]-PZ[ic]);
      if (nd2 < clr[jn]) { clr[jn] = nd2; hp.push(nd2, jn); }
    }
  }

  function nearestNode(x, y, z, needUp) {
    var best = -1, bd = 1e18;
    for (var rr = 1; rr <= 4 && best < 0; rr++) {
      var R = rr*1.6;
      var ix = Math.floor(x/CS), iy = Math.floor(y/CS), iz = Math.floor(z/CS), m = Math.ceil(R/CS);
      for (var a = -m; a <= m; a++) for (var b = -m; b <= m; b++) for (var c = -m; c <= m; c++) {
        var jx = ix+a, jy = iy+b, jz = iz+c;
        for (var j = head[hsh(jx, jy, jz)]; j >= 0; j = nxt[j]) {
          if (CX[j] !== jx || CY[j] !== jy || CZ[j] !== jz) continue;
          if (blocked[j] || !cnt[j]) continue;
          if (needUp && NY[j] < 0.5) continue;
          var d2 = (PX[j]-x)*(PX[j]-x) + (PY[j]-y)*(PY[j]-y) + (PZ[j]-z)*(PZ[j]-z);
          if (d2 < bd) { bd = d2; best = j; }
        }
      }
    }
    return best;
  }

  // ---- 6. jumps: leave the end of a surface, fly, land on the first surface below ----
  function jumpEdges(i, hx, hz, slope) {
    var x0 = PX[i], y0 = PY[i], z0 = PZ[i], out = new Map(), angs = [-12,-8,-4,0,4,8,12];
    for (var vi = 0; vi < VHS.length; vi++) for (var ai = 0; ai < angs.length; ai++) {
      var vh = VHS[vi], ar = angs[ai]*Math.PI/180, c = Math.cos(ar), s = Math.sin(ar);
      var dx = hx*c - hz*s, dz = hx*s + hz*c, found = -1;
      for (var d = 3; d <= 150 && found < 0; d += 1) {
        var ty = y0 + slope*d - GRAV*d*d/(2*vh*vh), x = x0+dx*d, z = z0+dz*d;
        if (ty < minY - 3) break;
        near(x, ty, z, 1.2, function (j) {
          if (found >= 0 || blocked[j] || !cnt[j] || NY[j] < 0.5) return;
          var df = ty - PY[j], hd = Math.hypot(PX[j]-x, PZ[j]-z);
          if (hd <= 0.9 && df >= -1.2 && df <= 0.6) found = j;
        });
        if (found >= 0) { if (clr[found] >= 3.0 && (!out.has(found) || out.get(found) > d)) out.set(found, d); }
      }
    }
    var res = []; out.forEach(function (d, j) { res.push([j, d]); });
    return res;
  }
  var minY = 1e9;
  for (var iy2 = 0; iy2 < n; iy2++) if (PY[iy2] < minY) minY = PY[iy2];

  // ---- 7. search ----
  var dist = new Float64Array(n), prev = new Int32Array(n), hxA = new Float32Array(n), hzA = new Float32Array(n), slA = new Float32Array(n);
  var jumpFrom = new Uint8Array(n);
  function search(src, goal) {
    var dst = -1;
    dist.fill(1e18); prev.fill(-1); jumpFrom.fill(0);
    dist[src] = 0; hxA[src] = 1; hzA[src] = 0; slA[src] = 0;
    var pq = new Heap(); pq.push(0, src);
    while (pq.size()) {
      var tp = pq.pop(), dd = tp[0], i = tp[1];
      if (dd > dist[i]) continue;
      if (goal[i] && i !== src) { dst = i; break; }
      var x1 = PX[i], y1 = PY[i], z1 = PZ[i], fwd = false;
      for (var q = 0; q < cnt[i]; q++) {
        var j = nbr[i*NB+q], x2 = PX[j], y2 = PY[j], z2 = PZ[j];
        var Ld = Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1)+(z2-z1)*(z2-z1)), cj = clr[j];
        var pen = 1 + 8*Math.pow(Math.max(0, (4-cj)/4), 2);
        if (cj < 1.5) pen += 40;
        var nd = dd + Ld*pen;
        var hl = Math.hypot(x2-x1, z2-z1);
        if (hl > 0.3 && ((x2-x1)*hxA[i] + (z2-z1)*hzA[i]) / hl > 0.5) fwd = true;
        if (nd < dist[j]) {
          dist[j] = nd; prev[j] = i; jumpFrom[j] = 0;
          if (hl > 0.2) {
            var ux = (x2-x1)/hl, uz = (z2-z1)/hl, mx = hxA[i]*0.8 + ux*0.2, mz = hzA[i]*0.8 + uz*0.2, ml = Math.hypot(mx, mz) || 1;
            hxA[j] = mx/ml; hzA[j] = mz/ml; slA[j] = slA[i]*0.8 + 0.2*(y2-y1)/hl;
          } else { hxA[j] = hxA[i]; hzA[j] = hzA[i]; slA[j] = slA[i]; }
          pq.push(nd, j);
        }
      }
      if (!fwd && NY[i] > 0.5 && (cnt[i] < 10)) {
        var je = jumpEdges(i, hxA[i], hzA[i], Math.max(-0.5, Math.min(1.0, slA[i])));
        for (var q3 = 0; q3 < je.length; q3++) {
          var jj = je[q3][0], dj = je[q3][1], nd3 = dd + dj*2 + 80;
          if (nd3 < dist[jj]) {
            dist[jj] = nd3; prev[jj] = i; jumpFrom[jj] = 1;
            var jx = PX[jj]-x1, jz = PZ[jj]-z1, jl = Math.hypot(jx, jz) || 1;
            hxA[jj] = jx/jl; hzA[jj] = jz/jl; slA[jj] = -0.3;
            pq.push(nd3, jj);
          }
        }
      }
    }
    search.approx = false;
    if (dst < 0) {
      var gl = [];
      for (var g1 = 0; g1 < n; g1++) if (goal[g1]) gl.push(g1);
      var bestD = 1e18, bestN = -1;
      for (var k1 = 0; k1 < n; k1++) {
        if (dist[k1] > 1e17 || k1 === src) continue;
        for (var h1 = 0; h1 < gl.length; h1++) {
          var e1 = PX[k1]-PX[gl[h1]], e2 = PZ[k1]-PZ[gl[h1]], e3 = PY[k1]-PY[gl[h1]], d1 = e1*e1+e2*e2+e3*e3;
          if (d1 < bestD) { bestD = d1; bestN = k1; }
        }
      }
      if (bestN < 0) return null;
      dst = bestN; search.approx = true;
    }
    var path = [dst];
    while (path[path.length-1] !== src) path.push(prev[path[path.length-1]]);
    path.reverse();
    return path;
  }

  // ---- 8. way points ----
  var wps = [], st = dec.start.p;
  wps.push({ name: "start", x: st[0], y: st[1], z: st[2] });
  var cps = [];
  for (var pi2 = 0; pi2 < dec.parts.length; pi2++) {
    var pp = dec.parts[pi2], ee = dec.lib[pp[3]];
    if (pp[6] >= 0 && ee && ee.detector) cps.push(pp);
  }
  cps.sort(function (a, b) { return a[6] - b[6]; });
  function centreOf(pp, ee) {
    var cc = ee.detector.center, r = qrot([pp[8], pp[9], pp[10], pp[11]], cc[0], cc[1], cc[2]);
    return { x: r[0] + pp[0]*5, y: r[1] + pp[1]*5, z: r[2] + pp[2]*5 };
  }
  var seenOrder = {};
  for (var ci2 = 0; ci2 < cps.length; ci2++) {
    if (seenOrder[cps[ci2][6]]) continue; seenOrder[cps[ci2][6]] = true;
    var cc2 = centreOf(cps[ci2], dec.lib[cps[ci2][3]]);
    wps.push({ name: "checkpoint " + (cps[ci2][6]+1), x: cc2.x, y: cc2.y, z: cc2.z, part: cps[ci2] });
  }
  var fin = null, finPart = null;
  for (var pi3 = 0; pi3 < dec.parts.length; pi3++) {
    var pf = dec.parts[pi3], ef = dec.lib[pf[3]];
    if (ef && ef.detector && ef.detector.type === 1) { fin = centreOf(pf, ef); finPart = pf; break; }
  }
  if (!fin) return { ok: false, why: "no finish line found" };
  wps.push({ name: "finish", x: fin.x, y: fin.y, z: fin.z, part: finPart });

  function qinv(q) { return [-q[0], -q[1], -q[2], q[3]]; }
  function gateGoal(pp, ee, fx, fy, fz) {
    var det = ee.detector, cc = det.center, sz = det.size, qi = qinv([pp[8], pp[9], pp[10], pp[11]]);
    var ox = pp[0]*5, oy = pp[1]*5, oz = pp[2]*5, flags = new Uint8Array(n), count = 0;
    for (var i = 0; i < n; i++) {
      if (blocked[i] || !cnt[i]) continue;
      var l = qrot(qi, PX[i]-ox, PY[i]-oy, PZ[i]-oz);
      if (Math.abs(l[0]-cc[0]) <= sz[0]/2 + 1.0 && Math.abs(l[1]-cc[1]) <= sz[1]/2 + 1.2 && Math.abs(l[2]-cc[2]) <= sz[2]/2 + 1.0) { flags[i] = 1; count++; }
    }
    if (!count) { var fb = nearestNode(fx, fy, fz, false); if (fb >= 0) { flags[fb] = 1; count = 1; } }
    return { flags: flags, count: count };
  }
  var startNode = nearestNode(st[0], st[1] - 0.2, st[2], true);
  if (startNode < 0) return { ok: false, why: "no road under the start" };
  var gates = [];
  for (var wi = 1; wi < wps.length; wi++) {
    var gp = wps[wi].part, ge = dec.lib[gp[3]];
    gates.push(gateGoal(gp, ge, wps[wi].x, wps[wi].y, wps[wi].z));
    if (!gates[gates.length-1].count) return { ok: false, why: "no road near the " + wps[wi].name };
  }
  var path = [], src = startNode, reached = 0, partialWhy = null, jumpAt = [];
  for (var wk = 0; wk < gates.length; wk++) {
    var seg = search(src, gates[wk].flags);
    if (!seg) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name; break; }
    for (var sk = (path.length ? 1 : 0); sk < seg.length; sk++) { path.push(seg[sk]); }
    if (search.approx) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name + " (drove as close as the road goes)"; break; }
    src = seg[seg.length-1]; reached = wk + 1;
  }
  if (!reached && path.length < 5) return { ok: false, why: partialWhy || "no path" };

  // ---- 9. resample in 3D, smooth along the surface, mark jumps ----
  var pts = [], jumpEdge = [], jumps = 0;
  for (var pk = 0; pk < path.length; pk++) {
    var nd9 = path[pk];
    pts.push([PX[nd9], PY[nd9], PZ[nd9], NX[nd9], NY[nd9], NZ[nd9]]);
    var big = pk > 0 && Math.hypot(PX[nd9]-PX[path[pk-1]], PZ[nd9]-PZ[path[pk-1]], PY[nd9]-PY[path[pk-1]]) > 4.0;
    jumpEdge.push(big); if (big) jumps++;
  }
  var segLen = [0];
  for (var k3 = 1; k3 < pts.length; k3++) segLen.push(segLen[k3-1] + Math.hypot(pts[k3][0]-pts[k3-1][0], pts[k3][1]-pts[k3-1][1], pts[k3][2]-pts[k3-1][2]));
  var total = segLen[segLen.length-1], m2 = Math.max(8, Math.round(total/SPACING)) + 1;
  var out = [], isj = [], kk = 1;
  for (var mi = 0; mi < m2; mi++) {
    var sdist = total*mi/(m2-1);
    while (kk < pts.length-1 && segLen[kk] < sdist) kk++;
    var pa = pts[kk-1], pb = pts[kk], Ls = segLen[kk]-segLen[kk-1];
    var tt = Ls < 1e-9 ? 0 : Math.min(1, Math.max(0, (sdist-segLen[kk-1])/Ls));
    var nrm = [pa[3]+(pb[3]-pa[3])*tt, pa[4]+(pb[4]-pa[4])*tt, pa[5]+(pb[5]-pa[5])*tt], nl = Math.hypot(nrm[0], nrm[1], nrm[2]) || 1;
    out.push([pa[0]+(pb[0]-pa[0])*tt, pa[1]+(pb[1]-pa[1])*tt, pa[2]+(pb[2]-pa[2])*tt, nrm[0]/nl, nrm[1]/nl, nrm[2]/nl]);
    isj.push(jumpEdge[kk] && tt > 0 && tt < 1);
  }
  var pinned = [];
  for (var mp = 0; mp < m2; mp++) pinned.push(isj[mp] || (mp > 0 && isj[mp-1]) || (mp < m2-1 && isj[mp+1]));
  pinned[0] = true; pinned[m2-1] = true;
  function snap(x, y, z, nrm, tol) {
    var best = -1, bd = 1e18;
    near(x, y, z, tol, function (j) {
      if (blocked[j] || !cnt[j]) return;
      if (NX[j]*nrm[0] + NY[j]*nrm[1] + NZ[j]*nrm[2] < 0.6) return;
      var d2 = (PX[j]-x)*(PX[j]-x) + (PY[j]-y)*(PY[j]-y) + (PZ[j]-z)*(PZ[j]-z);
      if (d2 < bd && d2 <= tol*tol) { bd = d2; best = j; }
    });
    return best;
  }
  for (var it = 0; it < 60; it++) {
    for (var mq = 1; mq < m2-1; mq++) {
      if (pinned[mq]) continue;
      var P = out[mq];
      var nxp = P[0] + 0.45*((out[mq-1][0]+out[mq+1][0])/2 - P[0]);
      var nyp = P[1] + 0.45*((out[mq-1][1]+out[mq+1][1])/2 - P[1]);
      var nzp = P[2] + 0.45*((out[mq-1][2]+out[mq+1][2])/2 - P[2]);
      var jl = snap(nxp, nyp, nzp, P.slice(3), 1.6);
      if (jl < 0 || clr[jl] < MINCLR) continue;
      var okk = true, nb = [out[mq-1], out[mq+1]];
      for (var bi = 0; bi < 2; bi++) {
        var jm = snap((nxp+nb[bi][0])/2, (nyp+nb[bi][1])/2, (nzp+nb[bi][2])/2, P.slice(3), 2.2);
        if (jm < 0 || clr[jm] < MINCLR*0.8) { okk = false; break; }
      }
      if (!okk) continue;
      P[0] = nxp; P[1] = nyp; P[2] = nzp; P[3] = NX[jl]; P[4] = NY[jl]; P[5] = NZ[jl];
    }
  }
  var mj = 0;
  while (mj < m2) {
    if (isj[mj]) {
      var ja = mj; while (ja > 0 && isj[ja-1]) ja--;
      var jb = mj; while (jb < m2-1 && isj[jb]) jb++;
      var pA = out[Math.max(0, ja-1)], pB = out[Math.min(m2-1, jb)];
      var Dtot = Math.hypot(pB[0]-pA[0], pB[2]-pA[2]) || 1;
      var sl0 = ja >= 2 ? (out[ja-1][1]-out[ja-2][1])/Math.max(1e-6, Math.hypot(out[ja-1][0]-out[ja-2][0], out[ja-1][2]-out[ja-2][2])) : 0;
      var endBal = pA[1] + sl0*Dtot - GRAV*Dtot*Dtot/(2*VH*VH);
      for (var jj2 = ja; jj2 < jb; jj2++) {
        var dd2 = Math.hypot(out[jj2][0]-pA[0], out[jj2][2]-pA[2]);
        var bal = pA[1] + sl0*dd2 - GRAV*dd2*dd2/(2*VH*VH);
        out[jj2][1] = bal + (pB[1]-endBal)*(dd2/Dtot);
        out[jj2][3] = 0; out[jj2][4] = 1; out[jj2][5] = 0;
      }
      mj = jb;
    }
    mj++;
  }
  var route = [];
  function r2(v) { return Math.round(v*100)/100; }
  for (var ri = 0; ri < m2; ri++) route.push([r2(out[ri][0]), r2(out[ri][1]), r2(out[ri][2]), ri === 0 ? 5 : VMAX, r2(out[ri][3]), r2(out[ri][4]), r2(out[ri][5])]);
  var res = { ok: true, partial: partialWhy, reachedGates: reached, route: route, jumpPoints: isj.filter(Boolean).length, jumps: jumps, nodes: n, ms: Date.now()-T0, lengthM: Math.round(total), waypoints: wps.map(function (w) { return { name: w.name, x: w.x, y: w.y, z: w.z }; }) };
  if (opt.debug) res.debug = { n: n, PX: PX, PY: PY, PZ: PZ, NX: NX, NY: NY, NZ: NZ, blocked: blocked, nbr: nbr, cnt: cnt, NB: NB, nearestNode: nearestNode, clr: clr };
  return res;
}

function generateRoute(dec, opt) {
  opt = opt || {};
  var CELL = opt.cell || 1.0, SPACING = opt.spacing || 5.5, MINCLR = opt.minClr || 3.3, VMAX = opt.vmax || 400;
  var GRAV = 16.0, VH = 55.0, VHS = [12, 35, 55, 75];
  var t0 = Date.now();

  function qrot(q, x, y, z) {
    var n = Math.sqrt(q[0]*q[0]+q[1]*q[1]+q[2]*q[2]+q[3]*q[3]) || 1;
    var qx=q[0]/n, qy=q[1]/n, qz=q[2]/n, qw=q[3]/n;
    return [
      (1-2*(qy*qy+qz*qz))*x + 2*(qx*qy-qz*qw)*y + 2*(qx*qz+qy*qw)*z,
      2*(qx*qy+qz*qw)*x + (1-2*(qx*qx+qz*qz))*y + 2*(qy*qz-qx*qw)*z,
      2*(qx*qz-qy*qw)*x + 2*(qy*qz+qx*qw)*y + (1-2*(qx*qx+qy*qy))*z
    ];
  }

  // ---- 1. world triangles, split into upward faces (drivable) and steep faces (walls, curbs) ----
  var ups = [], sides = [];
  var minx = 1e9, minz = 1e9, maxx = -1e9, maxz = -1e9;
  for (var pi = 0; pi < dec.parts.length; pi++) {
    var p = dec.parts[pi];
    var e = dec.lib[p[3]];
    if (!e) continue;
    var v = e.v, q = [p[8], p[9], p[10], p[11]];
    var ox = p[0]*5, oy = p[1]*5, oz = p[2]*5;
    for (var i = 0; i + 8 < v.length; i += 9) {
      var a = qrot(q, v[i], v[i+1], v[i+2]), b = qrot(q, v[i+3], v[i+4], v[i+5]), c = qrot(q, v[i+6], v[i+7], v[i+8]);
      a[0]+=ox; a[1]+=oy; a[2]+=oz; b[0]+=ox; b[1]+=oy; b[2]+=oz; c[0]+=ox; c[1]+=oy; c[2]+=oz;
      var ux=b[0]-a[0], uy=b[1]-a[1], uz=b[2]-a[2], wx=c[0]-a[0], wy=c[1]-a[1], wz=c[2]-a[2];
      var nx=uy*wz-uz*wy, ny=uz*wx-ux*wz, nz=ux*wy-uy*wx;
      var L = Math.sqrt(nx*nx+ny*ny+nz*nz);
      if (L < 1e-9) continue;
      var tri = [a, b, c];
      if (ny/L > 0.6) {
        ups.push(tri);
        for (var k = 0; k < 3; k++) {
          if (tri[k][0] < minx) minx = tri[k][0]; if (tri[k][0] > maxx) maxx = tri[k][0];
          if (tri[k][2] < minz) minz = tri[k][2]; if (tri[k][2] > maxz) maxz = tri[k][2];
        }
      } else if (Math.abs(ny/L) <= 0.6) sides.push(tri);
    }
  }
  if (ups.length < 20) return { ok: false, why: "no road surfaces found" };
  minx = Math.floor(minx) - 6; minz = Math.floor(minz) - 6; maxx = Math.ceil(maxx) + 6; maxz = Math.ceil(maxz) + 6;
  { var cs_ = Math.sqrt(((maxx-minx)*(maxz-minz))/1500000); if (cs_ > CELL) CELL = cs_; }
  var W = Math.floor((maxx-minx)/CELL) + 1, H = Math.floor((maxz-minz)/CELL) + 1;
  if (W*H > 6000000) return { ok: false, why: "track too large" };

  // ---- 2. height layers per 1 m cell ----
  var cells = new Map();
  function addSample(x, z, y) {
    var cx = Math.floor((x-minx)/CELL), cz = Math.floor((z-minz)/CELL);
    if (cz < 0 || cz >= H || cx < 0 || cx >= W) return;
    var key = cx*H + cz, arr = cells.get(key);
    if (!arr) { cells.set(key, [y]); return; }
    for (var m = 0; m < arr.length; m++) {
      if (Math.abs(arr[m]-y) <= 0.5) { if (y > arr[m]) arr[m] = y; return; }
    }
    arr.push(y);
  }
  var S = 0.5;
  for (var t = 0; t < ups.length; t++) {
    var A = ups[t][0], B = ups[t][1], C = ups[t][2];
    var x0 = Math.min(A[0],B[0],C[0]), x1 = Math.max(A[0],B[0],C[0]);
    var z0 = Math.min(A[2],B[2],C[2]), z1 = Math.max(A[2],B[2],C[2]);
    var d = (B[2]-C[2])*(A[0]-C[0]) + (C[0]-B[0])*(A[2]-C[2]);
    if (Math.abs(d) < 1e-9) continue;
    for (var gx = Math.floor(x0/S)*S + S/2; gx < x1 + S; gx += S) {
      for (var gz = Math.floor(z0/S)*S + S/2; gz < z1 + S; gz += S) {
        var al = ((B[2]-C[2])*(gx-C[0]) + (C[0]-B[0])*(gz-C[2]))/d;
        var be = ((C[2]-A[2])*(gx-C[0]) + (A[0]-C[0])*(gz-C[2]))/d;
        var ga = 1 - al - be;
        if (al < -0.02 || be < -0.02 || ga < -0.02) continue;
        addSample(gx, gz, al*A[1] + be*B[1] + ga*C[1]);
      }
    }
  }
  // number the nodes
  var nodeKey = [], nodeY = [];
  cells.forEach(function (arr, key) { for (var m = 0; m < arr.length; m++) { nodeKey.push(key); nodeY.push(arr[m]); } });
  var n = nodeKey.length;
  var minNodeY = 1e9;
  for (var iy = 0; iy < n; iy++) if (nodeY[iy] < minNodeY) minNodeY = nodeY[iy];
  if (n < 50) return { ok: false, why: "too few road nodes" };
  var cellNodes = new Map();
  for (var i2 = 0; i2 < n; i2++) { var l = cellNodes.get(nodeKey[i2]); if (l) l.push(i2); else cellNodes.set(nodeKey[i2], [i2]); }
  function nodesAt(cx, cz) { if (cz < 0 || cz >= H || cx < 0 || cx >= W) return []; return cellNodes.get(cx*H + cz) || []; }
  function nx_(i) { return minx + (Math.floor(nodeKey[i]/H) + 0.5)*CELL; }
  function nz_(i) { return minz + (nodeKey[i] % H + 0.5)*CELL; }

  // ---- 3. block nodes that have walls or curbs rising just above them ----
  var blocked = new Uint8Array(n);
  for (var s2 = 0; s2 < sides.length; s2++) {
    var A2 = sides[s2][0], B2 = sides[s2][1], C2 = sides[s2][2];
    var lab = Math.max(Math.hypot(B2[0]-A2[0],B2[1]-A2[1],B2[2]-A2[2]), Math.hypot(C2[0]-A2[0],C2[1]-A2[1],C2[2]-A2[2]), Math.hypot(C2[0]-B2[0],C2[1]-B2[1],C2[2]-B2[2]));
    var mm = Math.max(1, Math.ceil(lab/0.5));
    for (var a1 = 0; a1 <= mm; a1++) for (var b1 = 0; b1 <= mm - a1; b1++) {
      var uu = a1/mm, vv = b1/mm;
      var px = A2[0] + (B2[0]-A2[0])*uu + (C2[0]-A2[0])*vv;
      var py = A2[1] + (B2[1]-A2[1])*uu + (C2[1]-A2[1])*vv;
      var pz = A2[2] + (B2[2]-A2[2])*uu + (C2[2]-A2[2])*vv;
      var lst = nodesAt(Math.floor((px-minx)/CELL), Math.floor((pz-minz)/CELL));
      var CURB_BLOCK_MIN = 0.6;
      var CURB_BLOCK_MAX = 1.8;
      for (var li = 0; li < lst.length; li++) {
        var nd = lst[li];
        if (py >= nodeY[nd] + CURB_BLOCK_MIN && py <= nodeY[nd] + CURB_BLOCK_MAX) blocked[nd] = 1;
      }
    }
  }

  // ---- 4. neighbours (8 directions, slope limited) ----
  var nbr = new Int32Array(n*8).fill(-1), ncount = new Uint8Array(n);
  var DX = [1,-1,0,0,1,1,-1,-1], DZ = [0,0,1,-1,1,-1,1,-1];
  for (var i3 = 0; i3 < n; i3++) {
    if (blocked[i3]) continue;
    var cx3 = Math.floor(nodeKey[i3]/H), cz3 = nodeKey[i3] % H;
    for (var dd = 0; dd < 8; dd++) {
      var cand = nodesAt(cx3+DX[dd], cz3+DZ[dd]);
      var best = -1, bd = 9, dist = Math.hypot(DX[dd], DZ[dd])*CELL;
      for (var ci = 0; ci < cand.length; ci++) {
        var j = cand[ci]; if (blocked[j]) continue;
        var dy = Math.abs(nodeY[j]-nodeY[i3]);
        if (dy <= 1.0*dist && dy < bd) { bd = dy; best = j; }
      }
      if (best >= 0) { nbr[i3*8 + ncount[i3]] = best; ncount[i3]++; }
    }
  }

  // ---- tiny binary heap ----
  function Heap() { this.k = []; this.v = []; }
  Heap.prototype.push = function (key, val) {
    var k = this.k, v = this.v, i = k.length; k.push(key); v.push(val);
    while (i > 0) { var pr = (i-1) >> 1; if (k[pr] <= key) break; k[i] = k[pr]; v[i] = v[pr]; i = pr; }
    k[i] = key; v[i] = val;
  };
  Heap.prototype.pop = function () {
    var k = this.k, v = this.v, topK = k[0], topV = v[0], lastK = k.pop(), lastV = v.pop(), len = k.length;
    if (len > 0) {
      var i = 0;
      for (;;) { var c = 2*i+1; if (c >= len) break; if (c+1 < len && k[c+1] < k[c]) c++; if (k[c] >= lastK) break; k[i] = k[c]; v[i] = v[c]; i = c; }
      k[i] = lastK; v[i] = lastV;
    }
    return [topK, topV];
  };
  Heap.prototype.size = function () { return this.k.length; };

  // ---- 5. clearance = distance to the nearest road edge ----
  var clr = new Float32Array(n).fill(1e9);
  var hp = new Heap();
  for (var i4 = 0; i4 < n; i4++) if (!blocked[i4] && ncount[i4] < 8) { clr[i4] = 0.5; hp.push(0.5, i4); }
  while (hp.size()) {
    var tp = hp.pop(), dcur = tp[0], ic = tp[1];
    if (dcur > clr[ic]) continue;
    for (var q2 = 0; q2 < ncount[ic]; q2++) {
      var jn = nbr[ic*8+q2], nd2 = dcur + Math.hypot(nx_(jn)-nx_(ic), nz_(jn)-nz_(ic));
      if (nd2 < clr[jn]) { clr[jn] = nd2; hp.push(nd2, jn); }
    }
  }

  function nearestNode(x, z, y) {
    var cx = Math.floor((x-minx)/CELL), cz = Math.floor((z-minz)/CELL), best = -1, bd = 1e18;
    for (var r = 0; r <= 6; r++) {
      for (var ddx = -r; ddx <= r; ddx++) for (var ddz = -r; ddz <= r; ddz++) {
        if (Math.max(Math.abs(ddx), Math.abs(ddz)) !== r) continue;
        var lst2 = nodesAt(cx+ddx, cz+ddz);
        for (var u = 0; u < lst2.length; u++) {
          var j = lst2[u]; if (blocked[j] || !ncount[j]) continue;
          var ex = nx_(j)-x, ez = nz_(j)-z, ey = (nodeY[j]-y)*3, dsq = ex*ex+ez*ez+ey*ey;
          if (dsq < bd) { bd = dsq; best = j; }
        }
      }
      if (best >= 0 && r >= 1) break;
    }
    return best;
  }

  // ---- 6. jumps: where the road ends, fly along the heading and land on the first surface below ----
  function surfaceAhead(x, y, z) {
    var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL));
    for (var u = 0; u < lst.length; u++) if (!blocked[lst[u]] && Math.abs(nodeY[lst[u]]-y) <= 1.5) return true;
    return false;
  }
  function jumpEdges(i, hx, hz, slope) {
    var x0 = nx_(i), y0 = nodeY[i], z0 = nz_(i);
    if (surfaceAhead(x0+hx*2.5, y0+slope*2.5, z0+hz*2.5)) return [];
    var out = new Map(), angs = [-12,-8,-4,0,4,8,12];
    for (var vi = 0; vi < VHS.length; vi++) for (var ai = 0; ai < angs.length; ai++) {
      var VH = VHS[vi];
      var ar = angs[ai]*Math.PI/180, c = Math.cos(ar), s = Math.sin(ar);
      var dx = hx*c - hz*s, dz = hx*s + hz*c;
      for (var d = 3; d <= 150; d += 1) {
        var ty = y0 + slope*d - GRAV*d*d/(2*VH*VH), x = x0+dx*d, z = z0+dz*d, hit = -1;
        if (ty < minNodeY - 3) break;
        var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL));
        for (var u = 0; u < lst.length; u++) {
          var j = lst[u]; if (blocked[j] || !ncount[j]) continue;
          var df = ty - nodeY[j];
          if (df >= -1.2 && df <= 0.6) { hit = j; break; }
        }
        if (hit >= 0) {
          var MIN_CLR_LONG_JUMP = 3.0;
          var MIN_CLR_SHORT_JUMP = 1.2;
          var minClrNeeded = (d <= 8) ? MIN_CLR_SHORT_JUMP : MIN_CLR_LONG_JUMP;
          if (clr[hit] >= minClrNeeded && (!out.has(hit) || out.get(hit) > d)) out.set(hit, d);
          break;
        }
      }
    }
    var res = []; out.forEach(function (d, j) { res.push([j, d]); });
    return res;
  }

  // ---- 7. shortest path with a penalty near road edges ----
  var dist = new Float64Array(n), prev = new Int32Array(n), hxA = new Float32Array(n), hzA = new Float32Array(n), slA = new Float32Array(n);
  function search(src, goal) {
    var dst = -1;
    dist.fill(1e18); prev.fill(-1);
    dist[src] = 0; hxA[src] = 1; hzA[src] = 0; slA[src] = 0;
    var pq = new Heap(); pq.push(0, src);
    while (pq.size()) {
      var tp = pq.pop(), dd = tp[0], i = tp[1];
      if (dd > dist[i]) continue;
      if (goal[i] && i !== src) { dst = i; break; }
      var x1 = nx_(i), y1 = nodeY[i], z1 = nz_(i);
      for (var q = 0; q < ncount[i]; q++) {
        var j = nbr[i*8+q], x2 = nx_(j), y2 = nodeY[j], z2 = nz_(j);
        var hl = Math.hypot(x2-x1, z2-z1), Ld = Math.sqrt(hl*hl + (y2-y1)*(y2-y1)), cj = clr[j];
        var pen = 1 + 8*Math.pow(Math.max(0, (4-cj)/4), 2);
        if (cj < 1.5) pen += 40;
        var nd = dd + Ld*pen;
        if (nd < dist[j]) {
          dist[j] = nd; prev[j] = i;
          var ux = (x2-x1)/hl, uz = (z2-z1)/hl, mx = hxA[i]*0.8 + ux*0.2, mz = hzA[i]*0.8 + uz*0.2, ml = Math.hypot(mx, mz) || 1;
          hxA[j] = mx/ml; hzA[j] = mz/ml; slA[j] = slA[i]*0.8 + 0.2*(y2-y1)/hl;
          pq.push(nd, j);
        }
      }
      if (ncount[i] < 8) {
        var je = jumpEdges(i, hxA[i], hzA[i], slA[i]);
        for (var q3 = 0; q3 < je.length; q3++) {
          var jj = je[q3][0], dj = je[q3][1], nd3 = dd + dj*2 + 80;
          if (nd3 < dist[jj]) {
            dist[jj] = nd3; prev[jj] = i;
            var jx = nx_(jj)-x1, jz = nz_(jj)-z1, jl = Math.hypot(jx, jz) || 1;
            hxA[jj] = jx/jl; hzA[jj] = jz/jl; slA[jj] = -0.3;
            pq.push(nd3, jj);
          }
        }
      }
    }
    search.approx = false;
    if (dst < 0) {
      var gl = [];
      for (var g1 = 0; g1 < n; g1++) if (goal[g1]) gl.push(g1);
      var bestD = 1e18, bestN = -1;
      for (var k1 = 0; k1 < n; k1++) {
        if (dist[k1] > 1e17 || k1 === src) continue;
        for (var h1 = 0; h1 < gl.length; h1++) {
          var e1 = nx_(k1)-nx_(gl[h1]), e2 = nz_(k1)-nz_(gl[h1]), e3 = nodeY[k1]-nodeY[gl[h1]], d1 = e1*e1+e2*e2+e3*e3;
          if (d1 < bestD) { bestD = d1; bestN = k1; }
        }
      }
      if (bestN < 0) return null;
      dst = bestN; search.approx = true;
    }
    var path = [dst];
    while (path[path.length-1] !== src) path.push(prev[path[path.length-1]]);
    path.reverse();
    return path;
  }

  // ---- 8. way points: start, checkpoints in order, finish ----
  var wps = [];
  var st = dec.start.p; wps.push({ name: "start", x: st[0], y: st[1], z: st[2] });
  var cps = [];
  for (var pi2 = 0; pi2 < dec.parts.length; pi2++) {
    var pp = dec.parts[pi2], ee = dec.lib[pp[3]];
    if (pp[6] >= 0 && ee && ee.detector) cps.push(pp);
  }
  cps.sort(function (a, b) { return a[6] - b[6]; });
  function centreOf(pp, ee) {
    var cc = ee.detector.center, r = qrot([pp[8], pp[9], pp[10], pp[11]], cc[0], cc[1], cc[2]);
    return { x: r[0] + pp[0]*5, y: r[1] + pp[1]*5, z: r[2] + pp[2]*5 };
  }
  var seenOrder = {};
  for (var ci2 = 0; ci2 < cps.length; ci2++) {
    if (seenOrder[cps[ci2][6]]) continue; seenOrder[cps[ci2][6]] = true;
    var cc2 = centreOf(cps[ci2], dec.lib[cps[ci2][3]]);
    wps.push({ name: "checkpoint " + (cps[ci2][6]+1), x: cc2.x, y: cc2.y, z: cc2.z, part: cps[ci2] });
  }
  var fin = null, finPart = null;
  for (var pi3 = 0; pi3 < dec.parts.length; pi3++) {
    var pf = dec.parts[pi3], ef = dec.lib[pf[3]];
    if (ef && ef.detector && ef.detector.type === 1) { fin = centreOf(pf, ef); finPart = pf; break; }
  }
  if (!fin) return { ok: false, why: "no finish line found" };
  wps.push({ name: "finish", x: fin.x, y: fin.y, z: fin.z, part: finPart });

  function qinv(q) { return [-q[0], -q[1], -q[2], q[3]]; }
  function gateGoal(pp, ee, fallback) {
    var det = ee.detector, cc = det.center, sz = det.size, qi = qinv([pp[8], pp[9], pp[10], pp[11]]);
    var ox = pp[0]*5, oy = pp[1]*5, oz = pp[2]*5, flags = new Uint8Array(n), count = 0;
    for (var i = 0; i < n; i++) {
      if (blocked[i] || !ncount[i]) continue;
      var l = qrot(qi, nx_(i)-ox, nodeY[i]-oy, nz_(i)-oz);
      if (Math.abs(l[0]-cc[0]) <= sz[0]/2 + 1.0 && Math.abs(l[2]-cc[2]) <= sz[2]/2 + 1.0 && l[1] >= -0.8 && l[1] <= cc[1] + sz[1]/2 + 0.5) { flags[i] = 1; count++; }
    }
    if (!count && fallback >= 0) { flags[fallback] = 1; count = 1; }
    return { flags: flags, count: count };
  }
  var gates = [];
  var startNode = nearestNode(wps[0].x, wps[0].z, wps[0].y - 2.0);
  if (startNode < 0) return { ok: false, why: "no road near the start" };
  for (var wi = 1; wi < wps.length; wi++) {
    var gp = wps[wi].part, ge = dec.lib[gp[3]];
    var nn = nearestNode(wps[wi].x, wps[wi].z, wps[wi].y - 2.0);
    gates.push(gateGoal(gp, ge, nn));
    if (!gates[gates.length-1].count) return { ok: false, why: "no road near the " + wps[wi].name };
  }
  var path = [], src = startNode, reached = 0, partialWhy = null;
  for (var wk = 0; wk < gates.length; wk++) {
    var seg = search(src, gates[wk].flags);
    if (!seg) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name; break; }
    for (var sk = (path.length ? 1 : 0); sk < seg.length; sk++) path.push(seg[sk]);
    if (search.approx) { partialWhy = "no way from the " + wps[wk].name + " to the " + wps[wk+1].name + " (drove as close as the road goes)"; break; }
    src = seg[seg.length-1]; reached = wk + 1;
  }
  if (!reached) return { ok: false, why: partialWhy };

  // ---- 9. resample, smooth inside the road, mark jumps ----
  var pts = path.map(function (i) { return [nx_(i), nodeY[i], nz_(i)]; });
  var jumpEdge = new Array(pts.length).fill(false);
  var jumps = 0;
  for (var k2 = 1; k2 < pts.length; k2++) if (Math.hypot(pts[k2][0]-pts[k2-1][0], pts[k2][1]-pts[k2-1][1], pts[k2][2]-pts[k2-1][2]) > 4.0) { jumpEdge[k2] = true; jumps++; }
  var segLen = [0];
  for (var k3 = 1; k3 < pts.length; k3++) segLen.push(segLen[k3-1] + Math.hypot(pts[k3][0]-pts[k3-1][0], pts[k3][2]-pts[k3-1][2]));
  var total = segLen[segLen.length-1], m2 = Math.max(8, Math.round(total/SPACING)) + 1;
  var out = [], isj = [], kk = 1;
  for (var mi = 0; mi < m2; mi++) {
    var sdist = total*mi/(m2-1);
    while (kk < pts.length-1 && segLen[kk] < sdist) kk++;
    var pa = pts[kk-1], pb = pts[kk], Ls = segLen[kk]-segLen[kk-1];
    var tt = Ls < 1e-9 ? 0 : Math.min(1, Math.max(0, (sdist-segLen[kk-1])/Ls));
    out.push([pa[0]+(pb[0]-pa[0])*tt, pa[1]+(pb[1]-pa[1])*tt, pa[2]+(pb[2]-pa[2])*tt]);
    isj.push(jumpEdge[kk] && tt > 0 && tt < 1);
  }
  var pinned = [];
  for (var mp = 0; mp < m2; mp++) pinned.push(isj[mp] || (mp > 0 && isj[mp-1]) || (mp < m2-1 && isj[mp+1]));
  pinned[0] = true; pinned[m2-1] = true;
  function layerNear(x, z, y, tol) {
    var lst = nodesAt(Math.floor((x-minx)/CELL), Math.floor((z-minz)/CELL)), best = -1, bd = 1e9;
    for (var u = 0; u < lst.length; u++) {
      var j = lst[u]; if (blocked[j]) continue;
      var df = Math.abs(nodeY[j]-y);
      if (df < bd && df <= tol) { bd = df; best = j; }
    }
    return best;
  }
  for (var it = 0; it < 80; it++) {
    for (var mq = 1; mq < m2-1; mq++) {
      if (pinned[mq]) continue;
      var P = out[mq];
      var nxp = P[0] + 0.45*((out[mq-1][0]+out[mq+1][0])/2 - P[0]);
      var nzp = P[2] + 0.45*((out[mq-1][2]+out[mq+1][2])/2 - P[2]);
      var jl = layerNear(nxp, nzp, P[1], 1.6);
      if (jl < 0 || clr[jl] < MINCLR) continue;
      var okk = true, nb = [out[mq-1], out[mq+1]];
      for (var bi = 0; bi < 2; bi++) {
        var jm = layerNear((nxp+nb[bi][0])/2, (nzp+nb[bi][2])/2, (P[1]+nb[bi][1])/2, 2.2);
        if (jm < 0 || clr[jm] < MINCLR*0.8) { okk = false; break; }
      }
      if (!okk) continue;
      P[0] = nxp; P[2] = nzp; P[1] = nodeY[jl];
    }
  }
  // height inside a jump: the arc a car follows, bent so it ends on the landing spot
  var mj = 0;
  while (mj < m2) {
    if (isj[mj] || (mj > 0 && isj[mj-1] && false)) {
      var ja = mj; while (ja > 0 && isj[ja-1]) ja--;
      var jb = mj; while (jb < m2-1 && isj[jb]) jb++;
      var pA = out[Math.max(0, ja-1)], pB = out[Math.min(m2-1, jb)];
      var Dtot = Math.hypot(pB[0]-pA[0], pB[2]-pA[2]) || 1;
      var sl0 = ja >= 2 ? (out[ja-1][1]-out[ja-2][1])/Math.max(1e-6, Math.hypot(out[ja-1][0]-out[ja-2][0], out[ja-1][2]-out[ja-2][2])) : 0;
      var endBal = pA[1] + sl0*Dtot - GRAV*Dtot*Dtot/(2*VH*VH);
      for (var jj2 = ja; jj2 < jb; jj2++) {
        var dd2 = Math.hypot(out[jj2][0]-pA[0], out[jj2][2]-pA[2]);
        var bal = pA[1] + sl0*dd2 - GRAV*dd2*dd2/(2*VH*VH);
        out[jj2][1] = bal + (pB[1]-endBal)*(dd2/Dtot);
      }
      mj = jb;
    }
    mj++;
  }
  var route = [];
  for (var ri = 0; ri < m2; ri++) route.push([Math.round(out[ri][0]*100)/100, Math.round(out[ri][1]*100)/100, Math.round(out[ri][2]*100)/100, ri === 0 ? 5 : VMAX]);
  return { ok: true, partial: partialWhy, reachedGates: reached, route: route, jumpPoints: isj.filter(Boolean).length, jumps: jumps, nodes: n, ms: Date.now()-t0, lengthM: Math.round(total), waypoints: wps.map(function (w) { return { name: w.name, x: w.x, y: w.y, z: w.z }; }) };
}

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptTutorialBot) return;
  const PRIVATE = (typeof self !== "undefined" && self.name === "ptbot-private");
  const ROUTE_REC = ${JSON.stringify(ROUTE)};
  const ROUTE_SOURCE = ${JSON.stringify(ROUTE_SOURCE)};
  let ROUTE = ROUTE_REC;
  let N = ROUTE.length;
  let TRACK_ID = null;
  const SPEED_FACTOR = ${SPEED_FACTOR};
  const STEER_GAIN = ${STEER_GAIN};
  const LAT_ACCEL = ${LAT_ACCEL};
  const CURV_DEAD = ${CURV_DEAD};
  const IGNORE_RECORDED_SPEED_CAP = ${IGNORE_RECORDED_SPEED_CAP};
  const NO_BEND_CAP = ${NO_BEND_CAP};
  const BEHIND_MS = ${BEHIND_MS};
  const NOTRIAL_NY = ${NOTRIAL_NY};
  const TAP_MS = ${TAP_MS}, TAP_HOLD = ${TAP_HOLD}, TIGHT_ON = ${TIGHT_ON}, TIGHT_OFF = ${TIGHT_OFF};
  let EXACT_OPT = ${EXACT_OPT};
  const EXACT_REPLAY = ${EXACT_REPLAY}, EXACT_TOL = ${EXACT_TOL}, EXACT_OPT_TOL = ${EXACT_OPT_TOL}, EXACT_TAP = ${EXACT_TAP}, EXACT_TAP_RUN = ${EXACT_TAP_RUN}, EXACT_TAP_TOL = ${EXACT_TAP_TOL};
  const EX_VARIANTS=[{on:0,off:0,name:"the replay as it was"},{on:8,off:2,name:"taps 8 on / 2 off"},{on:5,off:5,name:"taps 5 on / 5 off"},{on:12,off:3,name:"taps 12 on / 3 off"},{on:3,off:3,name:"taps 3 on / 3 off"},{on:6,off:2,name:"taps 6 on / 2 off"}];
  const REPLAY = ${REPLAY}, REPLAY_FF = ${REPLAY_FF};
  const LINE_PULL = ${LINE_PULL};
  const LOW_SPEED_BOOST = ${LOW_SPEED_BOOST};
  const SLOW_ZONES_REC = ${JSON.stringify(SLOW_ZONES)};
  let SLOW_ZONES = SLOW_ZONES_REC.slice();
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
    fastSim: ${FAST_SIM},
    priv: PRIVATE,
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
    keepSpeed: Object.create(null),
    keepUntil: Object.create(null),
    lastLand: Object.create(null),
    lastBrakeLog: Object.create(null),
    landSteerUntil: Object.create(null),
    lastPitch: Object.create(null),
    airMatched: Object.create(null),
    finLogged: Object.create(null),
    tapUntil: Object.create(null), tapDir: Object.create(null), tapEnd: Object.create(null),
    over: Object.create(null), overF: Object.create(null),
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

    if(!forceGlobal && bestD>45*45) {
      for(let i=0;i<N;i++) {
        const d=dist2(p,ROUTE[i]);
        if(d<bestD) { bestD=d; best=i; }
      }
    }

    bot.idx[id]=best;
    return best;
  }

  // a route point is "flat" when it has no surface direction recorded (your lap) or the road there is close to level
  function flatSeg(k) {
    const a=ROUTE[Math.max(0,Math.min(N-1,k))], b=ROUTE[Math.max(0,Math.min(N-1,k+1))];
    return a[5]===undefined || (a[5]>=0.8 && (b[5]===undefined || b[5]>=0.8));
  }

  function lookAhead(p,ld,i) {
    let j=i;
    if(j<N-1) {
      const dx=ROUTE[j+1][0]-ROUTE[j][0];
      const dy=flatSeg(j)?0:ROUTE[j+1][1]-ROUTE[j][1];
      const dz=ROUTE[j+1][2]-ROUTE[j][2];
      if((p.x-ROUTE[j][0])*dx+(p.y-ROUTE[j][1])*dy+(p.z-ROUTE[j][2])*dz>0) j++;
    }

    let ax=p.x, ay=p.y, az=p.z;
    let remaining=ld;

    for(let k=j;k<N;k++) {
      const bx=ROUTE[k][0], by=ROUTE[k][1], bz=ROUTE[k][2];
      const len=flatSeg(k-1)?Math.hypot(bx-ax,bz-az):Math.hypot(bx-ax,by-ay,bz-az);
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
      let d;
      if(flatSeg(k)) {
        const l2=dx*dx+dz*dz || 1e-9;
        let t=((p.x-ax)*dx+(p.z-az)*dz)/l2;
        t=Math.max(0,Math.min(1,t));
        d=Math.hypot(p.x-(ax+dx*t),p.z-(az+dz*t));
      } else {
        const ay=ROUTE[k][1], dy=ROUTE[k+1][1]-ay;
        const l2=dx*dx+dy*dy+dz*dz || 1e-9;
        let t=((p.x-ax)*dx+(p.y-ay)*dy+(p.z-az)*dz)/l2;
        t=Math.max(0,Math.min(1,t));
        d=Math.hypot(p.x-(ax+dx*t),p.y-(ay+dy*t),p.z-(az+dz*t));
      }
      if(d<best) best=d;
    }
    return best===Infinity ? 0 : best;
  }

  let CAP=[];
  let KAP=[];
  let SKAP=[];
  let HARD=[];
  let SPD=[];
  function computeDerived() {
  CAP=[]; KAP=[]; SKAP=[]; HARD=[];
  for(let k=0;k<N;k++) {
    let kmax=0;
    for(let m=Math.max(1,k-2);m<=Math.min(N-2,k+2);m++) {
      const ax=ROUTE[m][0]-ROUTE[m-1][0], az=ROUTE[m][2]-ROUTE[m-1][2];
      const bx=ROUTE[m+1][0]-ROUTE[m][0], bz=ROUTE[m+1][2]-ROUTE[m][2];
      let la=Math.hypot(ax,az), lb=Math.hypot(bx,bz);
      let dh=Math.abs(Math.atan2(ax*bz-az*bx,ax*bx+az*bz));
      if(ROUTE[m][5]!==undefined) {
        // road with a surface direction: only turning along the surface slows the car (going up a loop or a bank does not)
        const ay=ROUTE[m][1]-ROUTE[m-1][1], by=ROUTE[m+1][1]-ROUTE[m][1];
        la=Math.hypot(ax,ay,az); lb=Math.hypot(bx,by,bz);
        const ux=ax/(la||1),uy=ay/(la||1),uz=az/(la||1),vx=bx/(lb||1),vy=by/(lb||1),vz=bz/(lb||1);
        const cx=uy*vz-uz*vy, cy=uz*vx-ux*vz, cz=ux*vy-uy*vx;
        const turn=Math.abs(cx*ROUTE[m][4]+cy*ROUTE[m][5]+cz*ROUTE[m][6]);
        dh=Math.atan2(turn,ux*vx+uy*vy+uz*vz);
      }
      if(dh<3*CURV_DEAD) dh = dh<CURV_DEAD ? 0 : dh*(dh-CURV_DEAD)/(2*CURV_DEAD);
      const curv=dh/Math.max((la+lb)/2,1e-6);
      if(curv>kmax) kmax=curv;
    }
    KAP.push(kmax);
    { let h=false; for(let j=Math.max(0,k-1);j<=Math.min(N-2,k+3);j++) { if(ROUTE[j][8]!==undefined && (ROUTE[j][5]<0.93 || Math.abs(ROUTE[j+1][1]-ROUTE[j][1])>1.0)) h=true; } HARD.push(h); }
    {
      // signed bend at this point (positive = bending toward the side where angle is positive)
      const m=Math.max(1,Math.min(N-2,k));
      const ax=ROUTE[m][0]-ROUTE[m-1][0], ay=ROUTE[m][1]-ROUTE[m-1][1], az=ROUTE[m][2]-ROUTE[m-1][2];
      const bx=ROUTE[m+1][0]-ROUTE[m][0], by=ROUTE[m+1][1]-ROUTE[m][1], bz=ROUTE[m+1][2]-ROUTE[m][2];
      const nx=ROUTE[m][4]===undefined?0:ROUTE[m][4], ny=ROUTE[m][5]===undefined?1:ROUTE[m][5], nz=ROUTE[m][6]===undefined?0:ROUTE[m][6];
      const la=Math.hypot(ax,ay,az)||1, lb=Math.hypot(bx,by,bz)||1;
      const cx=(ay*bz-az*by), cy=(az*bx-ax*bz), cz=(ax*by-ay*bx);
      const sn=(cx*nx+cy*ny+cz*nz)/(la*lb);
      const dotp=(ax*bx+ay*by+az*bz)/(la*lb);
      SKAP.push(Math.atan2(sn,dotp)/((la+lb)/2));
    }
    CAP.push(kmax>1e-6 ? Math.sqrt(LAT_ACCEL/kmax)*3.6 : 1000);
  }

  // The recorded lap lost speed on every landing. A smoother landing keeps that speed, and the bot
  // used to brake to match the slower recorded number. So after each sudden drop we keep the
  // speed from just before it for a few points (corners are still limited by CAP below).
  SPD=ROUTE.map(p=>p[3]);
  for(let k=1;k<N;k++) {
    if(ROUTE[k-1][3]-ROUTE[k][3]>12) {
      const keep=ROUTE[k-1][3];
      for(let m=k;m<Math.min(N,k+10);m++) SPD[m]=Math.max(SPD[m],keep);
    }
  }
  }
  computeDerived();

  function lateral(p,i,u) {
    const k=Math.max(0,Math.min(N-2,i));
    if(u && !flatSeg(k)) {
      const ax=ROUTE[k][0], ay=ROUTE[k][1], az=ROUTE[k][2];
      let dx=ROUTE[k+1][0]-ax, dy=ROUTE[k+1][1]-ay, dz=ROUTE[k+1][2]-az;
      const l=Math.hypot(dx,dy,dz)||1e-9;
      let t=((p.x-ax)*dx+(p.y-ay)*dy+(p.z-az)*dz)/(l*l);
      t=Math.max(0,Math.min(1,t));
      const ox=p.x-(ax+dx*t), oy=p.y-(ay+dy*t), oz=p.z-(az+dz*t);
      dx/=l; dy/=l; dz/=l;
      return -((dy*oz-dz*oy)*u.x+(dz*ox-dx*oz)*u.y+(dx*oy-dy*ox)*u.z);
    }
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
  const L = bot.learn = {best:null,cur:null,run:null,runNo:0,pending:false,pendingFrame:0};
  function freshLearner() {
    L.best={cp:[],seg:[],dur:[],vexit:[],gt:[],gv:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)};
    L.cur={seg:[],offs:new Array(N).fill(0),spd:new Array(N).fill(0)};
    L.run=null; L.runNo=0; L.pending=false; L.pendingFrame=0;
  }
  freshLearner();
  const DEF = {sp:1, off:0, br:6, ab:0};
  function clampv(v,a,b) { return Math.max(a,Math.min(b,v)); }
  function rnd(a) { return (Math.random()*2-1)*a; }
  function post(m) { if(ch) { try { if(PRIVATE) m=Object.assign({priv:true},m); ch.postMessage(m); } catch(_) {} } }
  function saveBest() { post({type:"save", track:TRACK_ID, data:{n:N, best:L.best}}); }

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

  // the learner tries small random line/speed changes to find a faster way; never on walls and steep slopes
  function noTrial(k) {
    k=Math.max(0,Math.min(N-1,k));
    for(let j=Math.max(0,k-2);j<=Math.min(N-1,k+2);j++) {
      const p=ROUTE[j];
      if(p[5]!==undefined && p[5]<NOTRIAL_NY) return true;
    }
    return false;
  }
  function offAt(k) {
    if(!LEARN || noTrial(k)) return 0;
    return L.cur.offs[Math.max(0,Math.min(N-1,k))] || 0;
  }

  function spdAt(k) {
    if(!LEARN || noTrial(k)) return 0;
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
    post({type:"restart", delay:delay, why:why});
  }

  function failRun(why,state) {
    if(PRIVATE && !bot.lapFailSent) { bot.lapFailSent=true; post({type:"lapfail",why:why,frames:state.frames}); }
    if(!LEARN || L.pending) return;
    if(L.run) L.run.failed=true;
    console.log("PTBOT_FAIL "+why+" | last 2s (time speed wanted offset steer keys): "+(bot.ring||[]).slice(-40).join(" | "));
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

    if(LEARN && maxS>0 && !bot.noExplore) {
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

  let pendingBuild=null;
  if(ch) {
    ch.onmessage=(ev) => {
      const m=ev.data || {};
      if(m.to==="priv" && !PRIVATE) return;
      if(PRIVATE && m.to!=="priv" && (m.type==="patches" || m.type==="exact" || m.type==="exact_tabu" || m.type==="load" || m.type==="routea")) return;
      if(m.type==="routea") {
        if(pendingBuild && pendingBuild.key===m.key) {
          clearTimeout(pendingBuild.timer);
          const pb=pendingBuild; pendingBuild=null;
          try {
            if(Array.isArray(m.route) && m.route.length>5) {
              console.log("PTBOT_ROUTE loaded the saved line for this track ("+m.route.length+" points) - no building needed");
              applyRoute(m.route,pb.tid,"generated");
              bot.gapOpen=!!m.gap; bot.gapWhy=m.gap||null;
              if(m.gap) console.log("PTBOT_ROUTE line incomplete: "+m.gap+". The bot will drive the part it has, then hand over to you to record the rest.");
            } else pb.go();
          } catch(err) { console.log("PTBOT_ROUTE saved line failed ("+String(err)+"), building a new one"); pb.go(); }
        }
        return;
      }
      if(m.type==="rec") { try { setRec(!!m.on); } catch(_) {} return; }
      if(m.type==="exact_tabu" && (m.lesson||null)===(LESSON_KEY||null)) { try { if(bot.exTabu && Array.isArray(m.list)) for(const t of m.list) bot.exTabu.add(t); } catch(_) {} return; }
      if(m.type==="opt") { EXACT_OPT=!!m.on; bot.exVerify=null; console.log("PTBOT_OPT trying small changes is now "+(EXACT_OPT?"ON":"OFF")); return; }
      if(m.type==="patches" && (m.lesson||null)===(LESSON_KEY||null)) { try { loadLessons(m.list); } catch(err) { console.log("PTBOT_LESSON load failed: "+String(err)); } return; }
      if(m.type==="exact" && (m.lesson||null)===(LESSON_KEY||null)) { try { setExact(m); } catch(err) { console.log("PTBOT_EXACT load failed: "+String(err)); } return; }
      if(m.type==="clearPatches") { try { clearLessons(); bot.exact=null; post({type:"exact_save",lesson:LESSON_KEY,rle:[],pos:[]}); post({type:"exact_tabu",lesson:LESSON_KEY,list:[]}); } catch(_) {} return; }
      if(m.type==="load" && (m.track||null)===(TRACK_ID||null) && m.data && m.data.n===N && m.data.best &&
         Array.isArray(m.data.best.gt) && Array.isArray(m.data.best.spd) &&
         Array.isArray(m.data.best.offs) && m.data.best.offs.length===N &&
         m.data.best.spd.length===N && L.best.cp.length===0 && L.runNo<=1) {
        L.best=m.data.best;
        console.log("PTBOT_LEARN loaded saved progress: "+L.best.gt.length+" checkpoints in the ghost");
        L.runNo=0;
        startRun();
      }
    };
    post({type:"hello",track:TRACK_ID});
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

  function targetSpeed(i,Aest) {
    let best=Infinity, limW="", limK=0, limM=0;
    const hi=Math.min(N-1,i+25);
    const Pi=paramsAt(i);

    for(let j=i;j<=hi;j++) {
      const Pj=paramsAt(j);
      let zc=1000;
      for(const z of SLOW_ZONES) { if(j>=z[0] && j<=z[1] && z[2]<zc) zc=z[2]; }
      const capG=(Aest>0 && KAP[j]>1e-4) ? 3.6*Math.sqrt(C2_GRIP_FRAC*Aest/KAP[j]) : 1000;
      const routeCap=IGNORE_RECORDED_SPEED_CAP ? 1000 : SPD[j]*SPEED_FACTOR*Pj.sp*(1+spdAt(j));
      // points you taught: you already drove them at that speed, so the bot's own bend/grip guesses must not hold it below it
      // (they held it near 305 km/h where you did 400)
      const taught = ROUTE[j][8]!==undefined;
      // on ramps/walls the copied steering only fits YOUR speed, so there the bot does exactly your speed (no bonus)
      const m = taught ? Math.min(((HARD[j] || KAP[j]>0.003) ? SPD[j]/LESSON_SPEED : SPD[j])*SPEED_FACTOR,zc) : Math.min(routeCap,NO_BEND_CAP?1000:CAP[j],zc,capG);
      const v=m+Pi.br*(j-i);
      if(v<best) { best=v; limW = m===zc ? "slow zone" : (m===capG ? "grip" : (taught ? "your lesson speed" : (m===CAP[j] ? "bend" : "line speed"))); limK=j-i; limM=m; }
    }
    bot.lim={w:limW,k:limK,m:Math.round(limM)};
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
    if(bot.noRoute) return {up:true,right:false,down:false,left:false,reset:false};

    if(EXACT_REPLAY && bot.exact && !bot.recOn) {
      const X=bot.exact;
      const exAbort=(why)=>{ if(!bot.exAbort) { bot.exAbort=true; console.log("PTBOT_OPT run "+bot.exRun+" stopped: "+why+(bot.exMut&&!bot.exControl?" - will not try that change again":"")); if(bot.exMut && !bot.exControl) exMark();
          if(bot.exVerify && bot.exCand===bot.exVerify.bits) { console.log("PTBOT_OPT the faster run did not repeat, dropped"); bot.exVerify=null; }
          else if(bot.exControl) { bot.exCtlFail++; console.log("PTBOT_OPT CONTROL run failed: the same presses gave a different result ("+bot.exCtlFail+" in a row)"); if(bot.exCtlFail>=2) exRevert("the saved presses do not repeat"); } } if(!bot.exRs) { bot.exRs=true; post({type:"restart",delay:300}); } };
      if(bot.exStart===undefined || (bot.curE||0)<(bot.exLastE||0)) {
        bot.exStart=true; bot.exStep=0; bot.exMis=0; bot.exactOff=false; bot.exFin=false; bot.exAbort=false; bot.exRs=false;
        bot.exTraj=[]; bot.exCps=[]; bot.exLastCp=state.nextCheckpointIndex||0; bot.exactN=0; bot.exactLogs=0;
        bot.exRun=(bot.exRun||0)+1; bot.exCand=null; bot.exMut=null;
        bot.exControl=false; bot.exStrict=EXACT_OPT && bot.exBestT<Infinity;
        if(bot.exStrict && bot.exVerify) { bot.exCand=bot.exVerify.bits; bot.exMut=bot.exVerify.mut; }
        else if(bot.exStrict && bot.exRun%4===0) { bot.exControl=true; }
        else if(EXACT_OPT && bot.exBestT<Infinity) {
          const cand=X.bits.slice(), lim=Math.min(X.n,bot.exBestT+5);
          let f=-1, k=0;
          for(let tries=0;tries<400 && lim>10;tries++) {
            const g=1+Math.floor(Math.random()*(lim-2));
            if(cand[g]!==cand[g-1] && ((cand[g]^cand[g-1])&~1)) {
              const kk=(1+Math.floor(Math.random()*4))*(Math.random()<0.5?-1:1);
              if(!bot.exTabu.has(g+":"+kk)) { f=g; k=kk; break; }
            }
          }
          if(f>0) {
            if(k>0) { for(let h=f;h<Math.min(X.n,f+k);h++) cand[h]=X.bits[f-1]; }
            else { for(let h=Math.max(0,f+k);h<f;h++) cand[h]=X.bits[f]; }
            bot.exCand=cand; bot.exMut={f:f,k:k};
          }
        }
        console.log("PTBOT_OPT run "+bot.exRun+": "+(bot.exControl ? "CONTROL run: the best presses unchanged, should repeat the best time exactly" : bot.exVerify ? "checking that the faster run repeats" : bot.exMut ? "trying a press moved "+(bot.exMut.k>0?"later":"earlier")+" by "+Math.abs(bot.exMut.k)+" ms at "+(bot.exMut.f/1000).toFixed(2)+" s" : "the replay as it is")+(bot.exBestT<Infinity ? " (best so far "+(bot.exBestT/1000).toFixed(3)+" s)" : ""));
      }
      bot.exLastE=bot.curE||0;
      const stepNo=bot.exStep++;
      if(stepNo>2 && stepNo!==state.frames && (bot.exMis=(bot.exMis||0)+1)<=6) console.log("PTBOT_EXACT clock mismatch: game frame "+state.frames+" but this is step "+stepNo+" of the run");
      const bits=bot.exCand||X.bits;
      const mutating=!!bot.exCand;
      if(!bot.exFin && stepNo>200 && state.finishFrames!==null) {
        bot.exFin=true;
        const T=state.finishFrames;
        if(!bot.exactOff && !bot.exAbort) {
          if(!mutating && !bot.exControl) {
            if(T<bot.exBestT) { bot.exBestT=T; bot.exBestCps=bot.exCps.slice(); }
            console.log("PTBOT_OPT run "+bot.exRun+" finished in "+(T/1000).toFixed(3)+" s (the replay to beat)");
          } else if(bot.exControl) {
            if(T===bot.exBestT) { bot.exCtlFail=0; console.log("PTBOT_OPT CONTROL run finished in "+(T/1000).toFixed(3)+" s - exactly the same as the best, so the presses repeat"); }
            else { bot.exCtlFail++; console.log("PTBOT_OPT CONTROL run finished in "+(T/1000).toFixed(3)+" s but the best is "+(bot.exBestT/1000).toFixed(3)+" s - the same presses did NOT repeat ("+bot.exCtlFail+" in a row)"); if(bot.exCtlFail>=2) exRevert("the saved presses do not repeat"); }
          } else if(bot.exVerify && bot.exCand===bot.exVerify.bits) {
            if(T<=bot.exVerify.T && T<bot.exBestT) {
              console.log("PTBOT_OPT run "+bot.exRun+" finished in "+(T/1000).toFixed(3)+" s again - FASTER than "+(bot.exBestT/1000).toFixed(3)+" s and it repeats, keeping it");
              X.bits=bot.exCand; bot.exBestT=T; bot.exBestCps=bot.exCps.slice();
              X.ps=bot.exTraj.slice(); X.pm=new Map(); for(const p of X.ps) X.pm.set(p[0],p);
              bot.exTabu.clear(); post({type:"exact_tabu",lesson:LESSON_KEY,list:[]});
              post({type:"exact_save",lesson:LESSON_KEY,rle:exRle(X.bits,Math.min(X.n,T+100)),pos:X.ps,t:T,orle:X.origRle,opos:X.origPos});
            } else { exMark(); console.log("PTBOT_OPT run "+bot.exRun+" finished in "+(T/1000).toFixed(3)+" s - not the same as before ("+(bot.exVerify.T/1000).toFixed(3)+" s), dropped"); }
            bot.exVerify=null;
          } else if(T<bot.exBestT) {
            console.log("PTBOT_OPT run "+bot.exRun+" finished in "+(T/1000).toFixed(3)+" s - faster than "+(bot.exBestT/1000).toFixed(3)+" s, running it once more to check it repeats");
            bot.exVerify={bits:bot.exCand,mut:bot.exMut,T:T};
          } else { exMark(); console.log("PTBOT_OPT run "+bot.exRun+" finished in "+(T/1000).toFixed(3)+" s - not faster, dropped and will not be tried again"); }
        }
        if(!bot.exRs) { bot.exRs=true; post({type:"restart",delay:1500}); }
      }
      if(!bot.exactOff && !bot.exAbort && stepNo<X.n) {
        const tol=(mutating && !bot.exControl) ? EXACT_OPT_TOL : EXACT_TOL;
        if(stepNo%20===0 && stepNo>=2) {
          bot.exTraj.push([stepNo,+state.position.x.toFixed(2),+state.position.y.toFixed(2),+state.position.z.toFixed(2),Math.round(state.speedKmh*10)/10]);
          const p=X.pm.get(stepNo);
          if(p) {
            const ps=X.ps, px=state.position.x, py=state.position.y, pz=state.position.z;
            const c=Math.round(stepNo/20);
            let d=1e9;
            for(let i=Math.max(0,c-200);i<Math.min(ps.length-1,c+250);i++) {
              const A=ps[i], B=ps[i+1];
              const vx=B[1]-A[1], vy=B[2]-A[2], vz=B[3]-A[3];
              const L2=vx*vx+vy*vy+vz*vz;
              let t=L2>1e-9 ? ((px-A[1])*vx+(py-A[2])*vy+(pz-A[3])*vz)/L2 : 0;
              t=Math.max(0,Math.min(1,t));
              const dd=Math.hypot(px-(A[1]+vx*t),py-(A[2]+vy*t),pz-(A[3]+vz*t));
              if(dd<d) d=dd;
            }
            bot.exactN=(bot.exactN||0)+1;
            if(bot.exactN%50===1 && (bot.exactLogs=(bot.exactLogs||0)+1)<=12) console.log("PTBOT_EXACT f"+stepNo+" off-path="+d.toFixed(2)+"m speed="+Math.round(state.speedKmh));
            if(d>tol) {
              if(mutating || bot.exControl) exAbort("the car left the replay's path ("+d.toFixed(1)+" m)");
              else { bot.exactOff=true; console.log("PTBOT_EXACT left the replay's path at frame "+stepNo+" ("+d.toFixed(1)+" m off the path), the bot takes over"); }
            }
          }
        }
        if((mutating || bot.exControl) && !bot.exAbort) {
          const cpi=state.nextCheckpointIndex||0;
          if(cpi!==bot.exLastCp) {
            bot.exLastCp=cpi; bot.exCps[cpi]=stepNo;
            const bc=bot.exBestCps[cpi];
            if(bc!==undefined && (bot.exCpLogs=(bot.exCpLogs||0)+1)<=400) console.log("PTBOT_OPT checkpoint "+cpi+": "+(stepNo<bc?(bc-stepNo)+" ms AHEAD of":(stepNo-bc)+" ms behind")+" the best run");
            if(bc!==undefined && stepNo>bc+150) exAbort("behind the best run at checkpoint "+cpi+" by "+(stepNo-bc)+" ms");
          }
          if(state.finishFrames===null && stepNo>bot.exBestT+10) exAbort("not going to beat "+(bot.exBestT/1000).toFixed(3)+" s");
        } else if(!mutating && !bot.exControl) {
          const cpi=state.nextCheckpointIndex||0;
          if(cpi!==bot.exLastCp) { bot.exLastCp=cpi; bot.exCps[cpi]=stepNo; }
        }
        if(!bot.exactOff) {
          const fi=Math.min(X.n-1,stepNo);
          const b=bits[fi];
          return {up:!!(b&1),right:!!(b&2),down:!!(b&4),left:!!(b&8),reset:!!(b&16)};
        }
      } else if(!bot.exactOff && bot.exAbort) {
        const b=bits[Math.min(X.n-1,stepNo)];
        return {up:!!(b&1),right:!!(b&2),down:!!(b&4),left:!!(b&8),reset:false};
      }
    }
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
      bot.lapFailSent=false;
      bot.offDump=false;
      bot.lastCp[id]=undefined;
      bot.lastAirborne[id]=false;
      bot.keepSpeed[id]=0;
      bot.keepUntil[id]=0;
      bot.lastLand[id]=-100000;
      bot.landSteerUntil[id]=0;
      bot.airSince[id]=undefined;
      bot.airV0[id]=undefined;
      bot.lastPitch[id]=undefined;
      bot.airMatched[id]=false;
      bot.c2[id]=undefined;
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

    // the line has a gap and the bot has driven all of it: hand the wheel to you for the rest
    if(bot.gapOpen && !bot.recOn && state.finishFrames===null && (bot.idx[id]||0)>=N-3 && state.frames-(bot.gapLast??-1e9)>3000) {
      bot.gapLast=state.frames;
      const why=bot.gapWhy||"the line builder could not find a way on";
      console.log("PTBOT_GAP line incomplete ("+why+") - recording started, drive from here to the finish (or the next part the bot can do), then press O again");
      post({type:"lesson",text:"Line incomplete ("+why+"). Recording started: drive on from here, then press O when you are done."});
      setRec(true);
      post({type:"recstate",on:true});
      return {up:false,right:false,down:false,left:false,reset:false};
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

    const tight=ROUTE[i][7]===1 || ROUTE[Math.min(N-1,i+2)][7]===1;
    let ld=Math.max(LOOK_BASE,Math.min(LOOK_MAX,LOOK_BASE+speed*LOOK_SPEED));
    if(tight) ld*=0.75;
    let target=lookAhead(state.position,ld,i);
    if(LEARN) {
      const toff=offAt(target.index);
      if(toff) {
        const k=Math.max(1,Math.min(N-1,target.index));
        const ddx=ROUTE[k][0]-ROUTE[k-1][0],ddz=ROUTE[k][2]-ROUTE[k-1][2];
        if(flatSeg(k-1)) {
          const ll=Math.hypot(ddx,ddz)||1;
          target={x:target.x+toff*(-ddz/ll),y:target.y,z:target.z+toff*(ddx/ll),index:target.index};
        } else {
          const ddy=ROUTE[k][1]-ROUTE[k-1][1], ll=Math.hypot(ddx,ddy,ddz)||1;
          const dx1=ddx/ll,dy1=ddy/ll,dz1=ddz/ll,nx=ROUTE[k][4],ny=ROUTE[k][5],nz=ROUTE[k][6];
          target={x:target.x+toff*(dy1*nz-dz1*ny),y:target.y+toff*(dz1*nx-dx1*nz),z:target.z+toff*(dx1*ny-dy1*nx),index:target.index};
        }
      }
    }

    const f=rotateVec(state.quaternion,{x:0,y:0,z:FORWARD_SIGN});
    // "up" for steering: the car's own up when it is on a steep bank, wall or loop, otherwise the world up (as before)
    let upv={x:0,y:1,z:0};
    if(state.wheels!==0) {
      const cu=rotateVec(state.quaternion,{x:0,y:1,z:0});
      if(cu.y<0.8) upv=cu;
    }
    const dx=target.x-state.position.x;
    const dy=target.y-state.position.y;
    const dz=target.z-state.position.z;
    const fu=f.x*upv.x+f.y*upv.y+f.z*upv.z, tu=dx*upv.x+dy*upv.y+dz*upv.z;
    let fx=f.x-fu*upv.x, fy=f.y-fu*upv.y, fz=f.z-fu*upv.z;
    let tx=dx-tu*upv.x, ty=dy-tu*upv.y, tz=dz-tu*upv.z;
    const fl=Math.hypot(fx,fy,fz)||1, tl=Math.hypot(tx,ty,tz)||1;
    fx/=fl; fy/=fl; fz/=fl; tx/=tl; ty/=tl; tz/=tl;
    const cross=(fy*tz-fz*ty)*upv.x+(fz*tx-fx*tz)*upv.y+(fx*ty-fy*tx)*upv.z;
    const dot=Math.max(-1,Math.min(1,fx*tx+fy*ty+fz*tz));
    const angle=Math.atan2(cross,dot);
    const abs=Math.abs(angle);

    const useC2=CTRL2 && bot.routeKind!=="recorded";
    let tSpeed=targetSpeed(i,(useC2 && bot.c2[id] && !bot.c2[id].curved) ? Math.max(0.6*LAT_ACCEL,bot.c2[id].A) : 0);
    if(state.frames<(bot.keepUntil[id]||0) && bot.keepSpeed[id]>tSpeed) tSpeed=bot.keepSpeed[id];
    let up=true,down=false;
    // short blips of "too fast" are ignored (no random gas lifts or taps of the brake); real overspeed acts at once
    {
      const ex=speed-tSpeed;
      let ov=bot.over[id]||0;
      const stepF=Math.max(1,Math.min(20,state.frames-(bot.overF[id]??state.frames)));
      bot.overF[id]=state.frames;
      ov = ex>THR_LIFT ? ov+stepF : 0;
      bot.over[id]=ov;
      const big=ex>THR_BIG;
      if(speed>40 && ex>THR_BRAKE && (big || ov>=BRAKE_MS)) { up=false;down=true; }
      else if(ex>THR_LIFT && (big || ov>=LIFT_MS)) up=false;
    }
    // standing start: full throttle (the slow first route points used to hold the car back to about 25 km/h)
    if(i<8 && speed<60 && state.wheels!==0) { up=true; down=false; }
    if(abs>1.0 && speed>60) up=false;

    const lat=lateral(state.position,i,upv)-(LEARN ? offAt(i) : 0);

    // Detect landing, then briefly soften heading correction to reduce sharp swerves.
    const airborneNow=state.wheels===0;
    const wasAirborne=bot.lastAirborne[id]===true;
    if(wasAirborne && !airborneNow) {
      bot.landSteerUntil[id]=state.frames+18;
      if(bot.airSince[id]!==undefined && state.frames-bot.airSince[id]>60) {
        bot.lastLand[id]=state.frames;
        bot.keepSpeed[id]=bot.airV0[id]||0;
        bot.keepUntil[id]=state.frames+450;
      }
    }
    bot.lastAirborne[id]=airborneNow;

    const landing=state.frames<(bot.landSteerUntil[id]||0);
    const headingScale=landing ? 0.65 : 1;
    let farTerm=0;
    if(FAR_W>0 && CTRL2 && bot.routeKind!=="recorded" && !landing && Math.abs(lat)<1.3 && speed>60) {
      const ldF=Math.max(14,Math.min(60,speed/3.6*FAR_SEC));
      const tf=lookAhead(state.position,ldF,i);
      const ex=tf.x-state.position.x, ey=tf.y-state.position.y, ez=tf.z-state.position.z;
      const eu=ex*upv.x+ey*upv.y+ez*upv.z;
      let gx=ex-eu*upv.x, gy=ey-eu*upv.y, gz=ez-eu*upv.z;
      const gl=Math.hypot(gx,gy,gz)||1; gx/=gl; gy/=gl; gz/=gl;
      const cr=(fy*gz-fz*gy)*upv.x+(fz*gx-fx*gz)*upv.y+(fx*gy-fy*gx)*upv.z;
      const dt2=Math.max(-1,Math.min(1,fx*gx+fy*gy+fz*gz));
      const fa=Math.atan2(cr,dt2);
      farTerm=Math.max(-0.5,Math.min(0.5,FAR_W*(fa-angle)));
    }
    const steerAngle=angle*headingScale+farTerm+
      (tight?2:1)*LINE_PULL*Math.max(-8,Math.min(8,lat));

    let s;
    if(useC2) {
      // measure the turn rate (positive = turning toward the side where angle is positive)
      let c2=bot.c2[id];
      if(!c2) c2=bot.c2[id]={pf:null,pfr:state.frames,om:0,cf:0,cp:0,Sw:20*C2_G0,Su:20,G:C2_G0,A:LAT_ACCEL};
      const dtf=Math.max(1,state.frames-c2.pfr), dts=dtf/1000;
      const fresh=state.frames>c2.pfr;
      // walls, banks, loops and ramp changes: the surface direction jumps, which would fake a turn rate and ruin the grip/turn-rate estimates
      if(c2.pu && (c2.pu.x*upv.x+c2.pu.y*upv.y+c2.pu.z*upv.z)<0.995) c2.sk=state.frames+150;
      c2.pu={x:upv.x,y:upv.y,z:upv.z};
      c2.curved = upv.y<0.92 || state.wheels===0 || state.frames<(c2.sk||0);
      if(fresh && c2.pf && !c2.curved) {
        const px=c2.pf.x,py=c2.pf.y,pz=c2.pf.z;
        const cx=(py*fz-pz*fy)*upv.x+(pz*fx-px*fz)*upv.y+(px*fy-py*fx)*upv.z;
        const dd=px*fx+py*fy+pz*fz;
        const omRaw=Math.atan2(cx,dd)/dts;
        c2.om+=(omRaw-c2.om)*Math.min(1,dts/0.02);
      }
      if(fresh || !c2.pf) { c2.pf={x:fx,y:fy,z:fz}; c2.pfr=state.frames; }
      // where the steering has got to, given the car's steering lag, then learn the real turn rate from it
      if(fresh) c2.cf+=(c2.cp-c2.cf)*Math.min(1,dts/0.107);
      if(fresh && !c2.curved && speed>40 && state.wheels!==0 && Math.abs(c2.cf)>0.15) {
        const lam=Math.pow(0.9995,dtf);
        c2.Sw=lam*c2.Sw+c2.om*c2.cf; c2.Su=lam*c2.Su+c2.cf*c2.cf;
        c2.G=Math.max(0.3,Math.min(3,c2.Sw/c2.Su));
        if(speed>110) c2.A+=(Math.max(20,Math.min(90,c2.G*speed/3.6))-c2.A)*Math.min(1,dts/3);
      }
      const vms=Math.max(2,speed/3.6);
      let omDes=2*vms/Math.max(ld,4)*Math.sin(Math.max(-1.4,Math.min(1.4,steerAngle)));
      if(C2_FF>0) {
        // preview: the bend about a quarter of a second ahead
        const jf=Math.min(N-2,i+Math.max(1,Math.round(vms*0.25/5.5)));
        omDes+=C2_FF*vms*SKAP[jf];
      }
      const c = c2.curved ? omDes/Math.max(0.6,Math.min(1.2,c2.G)) : (omDes+C2_KW*(omDes-c2.om))/c2.G;
      const cc=Math.max(-1,Math.min(1,c));
      c2.cp=cc;
      s=-cc;
    } else {
      s=Math.max(-1,Math.min(1,
        steerAngle*STEER_GAIN*
        (1+LOW_SPEED_BOOST*Math.max(0,1-speed/150))*STEER_SIGN
      ));
    }

    if(down && state.frames-(bot.lastBrakeDiag||-1e9)>400) {
      bot.lastBrakeDiag=state.frames;
      const lm=bot.lim||{};
      console.log("PTBOT_BRAKE speed="+Math.round(speed)+" wanted="+Math.round(tSpeed)+" (limit: "+lm.w+" "+lm.m+" km/h, "+lm.k+" points ahead) point "+i+"/"+N+(bot.replaying?" replay":""));
    }
    if(REPLAY && HARD[i] && ROUTE[i][8]!==undefined && Math.abs(lat)<3.5 && abs<0.7) {
      // your steering is added to the bot's own steering: on the line it supplies the shape of the manoeuvre,
      // off the line the bot's own steering wins
      s=Math.max(-1,Math.min(1,s+REPLAY_FF*ROUTE[i][8]));
      if(Math.abs(lat)<2) { up=ROUTE[i][9]===1; down=ROUTE[i][9]===2; }
      bot.replaying=true;
    } else bot.replaying=false;
    if(state.frames-(bot.ringF??-1e9)>=50) {
      bot.ringF=state.frames;
      if(!bot.ring) bot.ring=[];
      bot.ring.push((state.frames/1000).toFixed(2)+"s v"+Math.round(speed)+" w"+Math.round(tSpeed)+" off"+lat.toFixed(1)+" st"+s.toFixed(2)+(up?" U":"")+(down?" D":"")+(state.wheels===0?" air":"")+(bot.replaying?" rp":"")+" i"+i);
      if(bot.ring.length>40) bot.ring.shift();
    }

    let right=false,left=false;
    if(TAP_MS>0 && useC2 && !bot.replaying) {
      // tapping: a tap of TAP_MS, then a gap sized so the average steering matches what is wanted
      const a=Math.abs(s), dir=s>0?1:-1;
      const nowF=state.frames;
      let until=bot.tapUntil[id]??-1, dirOld=bot.tapDir[id]??0, endF=bot.tapEnd[id]??-1e9;
      if(nowF<until) {
        if(dirOld>0) right=true; else left=true;
        if(a<0.04) { bot.tapUntil[id]=nowF; bot.tapEnd[id]=nowF; }
      } else if(a>=TAP_HOLD) {
        if(TIGHT_OFF<=0 || state.wheels===0 || (nowF%(TIGHT_ON+TIGHT_OFF))<TIGHT_ON) { if(dir>0) right=true; else left=true; }
        bot.tapDir[id]=dir; bot.tapEnd[id]=nowF;
      } else if(a>=0.06) {
        const gap=TAP_MS*(1/a-1);
        if(dir!==dirOld || nowF-endF>=gap) {
          bot.tapUntil[id]=nowF+TAP_MS; bot.tapDir[id]=dir; bot.tapEnd[id]=nowF+TAP_MS;
          if(dir>0) right=true; else left=true;
        }
      }
      bot.acc[id]=0;
    } else {
      let e=(bot.acc[id]??0)+s;
      if(e>=1) { right=true;e-=1; }
      else if(e<=-1) { left=true;e+=1; }
      bot.acc[id]=e;
    }

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
      if(vmax-speed>80) {
        if(state.frames-(bot.lastLand[id]??-100000)<400) console.log("PTBOT_CRASH ignored: the speed drop was right after a landing");
        else failRun("crash (big speed drop)",state);
      }
      console.log("PTBOT_CRASH","frame="+state.frames,"idx="+i+"/"+(N-1),
        "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0),
        "speed="+Math.round(vmax)+"->"+Math.round(speed),
        "offLine="+err.toFixed(1)+"m","want="+Math.round(tSpeed),"ang="+angle.toFixed(2));
    }

    if(LEARN) {
      var OFFLINE_BASE = MAX_LINE_SHIFT + 8;
      var OFFLINE_AIR = MAX_LINE_SHIFT + 20;
      var OFFLINE_SPEED_FACTOR = speed > 140 ? 8 : 0;
      var offlineThreshold = (state.wheels === 0) ? OFFLINE_AIR : (OFFLINE_BASE + OFFLINE_SPEED_FACTOR);
      if (err > offlineThreshold) failRun("far off the line ("+err.toFixed(0)+" m)",state);
      // clearly behind the ghost part-way to a checkpoint: don't wait for the checkpoint, start again
      if(L.run && !L.run.failed && !L.pending && state.frames>3000) {
        const B=L.best, kk=L.run.cps.length;
        if(kk<B.gt.length && B.cp[kk] && (kk===0 || B.cp[kk-1])) {
          const i1=B.cp[kk].idx, i0=kk>0 ? B.cp[kk-1].idx : 0;
          const t1=B.gt[kk], t0=kk>0 ? B.gt[kk-1] : 0;
          if(i1>i0 && i>=i0) {
            const ghostT=t0+(t1-t0)*Math.min(1,(i-i0)/(i1-i0));
            const behind=state.frames-ghostT;
            if(behind>BEHIND_MS+0.15*(t1-t0)) failRun("behind the ghost by "+(behind/1000).toFixed(1)+" s on the way to checkpoint "+(kk+1),state);
          }
        }
      }
    }
    if(err>5 && !bot.offDump) {
      bot.offDump=true;
      console.log("PTBOT_OFFDUMP first time off the line this run | last 2s (time speed wanted offset steer keys): "+(bot.ring||[]).slice(-40).join(" | "));
    }
    if(err>5 && state.frames-(bot.lastOff[id]??-100000)>150) {
      bot.lastOff[id]=state.frames;
      console.log("PTBOT_OFF","frame="+state.frames,"idx="+i+"/"+(N-1),
        "side="+(lat>0?"right":"left"),"off="+err.toFixed(1)+"m",
        "speed="+Math.round(speed),"pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0));
    }

    if(reset) console.log("PTBOT_RESETDUMP last 2s: "+(bot.ring||[]).slice(-40).join(" | "));
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

    if(down && !airborne && state.frames-(bot.lastLand[id]??-100000)<700 &&
       state.frames-(bot.lastBrakeLog[id]??-100000)>100) {
      bot.lastBrakeLog[id]=state.frames;
      console.log("PTBOT_BRAKE","after landing: frame="+state.frames,"idx="+i+"/"+(N-1),
        "speed="+Math.round(speed),"want="+Math.round(tSpeed),"ang="+angle.toFixed(2),"wheels="+state.wheels);
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

  // ---- DRIVE RECORDER: records what the human does, bot steps aside ----
  bot.recOn=false; bot.recS=[]; bot.recLast=-1;
  function sample(state,ctl,id) {
    if(!state || !state.hasStarted) return;
    if(state.frames<bot.recLast) { bot.recS.push([-1]); bot.recCtl=[]; }
    bot.recLast=state.frames;
    if(!bot.recCtl) bot.recCtl=[];
    if(bot.recCtl.length<60000) bot.recCtl[state.frames]=(ctl&&ctl.up?1:0)|(ctl&&ctl.right?2:0)|(ctl&&ctl.down?4:0)|(ctl&&ctl.left?8:0)|(ctl&&ctl.reset?16:0);
    if(state.frames%20!==0) return;
    if(bot.recS.length>40000) return;
    const q=state.quaternion, p=state.position;
    bot.recS.push([state.frames,+p.x.toFixed(2),+p.y.toFixed(2),+p.z.toFixed(2),
      +q.x.toFixed(4),+q.y.toFixed(4),+q.z.toFixed(4),+q.w.toFixed(4),
      Math.round(state.speedKmh*10)/10,state.wheels,
      (ctl&&ctl.up?1:0)|(ctl&&ctl.right?2:0)|(ctl&&ctl.down?4:0)|(ctl&&ctl.left?8:0),state.nextCheckpointIndex]);
  }
  // ---- EXACT REPLAY: the replay's own buttons, frame by frame ----
  bot.exact=null; bot.exactOff=false; bot.exactLastF=-1;
  function buildExact(samples,ctl) {
    let cut=-1;
    for(let i=0;i<samples.length;i++) if(samples[i].length===1) cut=i;
    const s=samples.slice(cut+1);
    if(s.length<8 || s[0][0]>40) return null;
    let end=ctl.length; while(end>0 && ctl[end-1]===undefined) end--;
    const rle=[]; let prev=-1,cnt=0;
    for(let f=0;f<end;f++) { const b=ctl[f]===undefined?(prev<0?1:prev):ctl[f]; if(b===prev) cnt++; else { if(cnt) rle.push([prev,cnt]); prev=b; cnt=1; } }
    if(cnt) rle.push([prev,cnt]);
    return {rle:rle,pos:s.map(a=>[a[0],a[1],a[2],a[3],a[8]])};
  }
  function exRle(bits,n) {
    const rle=[]; let prev=-1,cnt=0;
    for(let f=0;f<n;f++) { const b=bits[f]; if(b===prev) cnt++; else { if(cnt) rle.push([prev,cnt]); prev=b; cnt=1; } }
    if(cnt) rle.push([prev,cnt]);
    return rle;
  }
  function exMark(why) {
    if(!bot.exMut || !bot.exTabu) return;
    bot.exTabu.add(bot.exMut.f+":"+bot.exMut.k);
    bot.exTabuN=(bot.exTabuN||0)+1;
    if(bot.exTabuN%5===0) post({type:"exact_tabu",lesson:LESSON_KEY,list:Array.from(bot.exTabu).slice(-4000)});
  }
  function setExact(d) {
    if(!d || !Array.isArray(d.rle) || !Array.isArray(d.pos) || !d.rle.length) { bot.exact=null; return; }
    let n=0; for(const r of d.rle) n+=r[1];
    const bits=new Uint8Array(n); let k=0;
    for(const r of d.rle) for(let j=0;j<r[1];j++) bits[k++]=r[0];
    const pm=new Map(); for(const p of d.pos) pm.set(p[0],p);
    const rs=new Int32Array(n).fill(-1), rl=new Int32Array(n);
    for(let f=0;f<n;) {
      const st=bits[f]&10;
      if(!st) { f++; continue; }
      let g=f; while(g<n && (bits[g]&10)===st) g++;
      for(let h=f;h<g;h++) { rs[h]=f; rl[h]=g-f; }
      f=g;
    }
    const ps=d.pos.slice().sort((a,b)=>a[0]-b[0]);
    bot.exact={bits:bits,pm:pm,ps:ps,n:n,rs:rs,rl:rl,origRle:(Array.isArray(d.orle)&&d.orle.length)?d.orle:d.rle,origPos:(Array.isArray(d.opos)&&d.opos.length)?d.opos:d.pos}; bot.exactOff=false; bot.exCur=undefined; bot.exTried=0; bot.exBestV=0; bot.exStart=undefined; bot.exRun=0; bot.exBestCps=[]; bot.exVerify=null; bot.exCtlFail=0; bot.exTabu=new Set(); bot.exBestT=(typeof d.t==="number" && d.t>0) ? d.t : Infinity;
    console.log("PTBOT_EXACT ready: "+n+" frames ("+(n/1000).toFixed(2)+" s) of exact replay buttons for this track");
  }
  function saveExact(samples) {
    if(!EXACT_REPLAY || !bot.recReplay) return;
    const d=buildExact(samples,bot.recCtl||[]);
    if(!d) { console.log("PTBOT_EXACT not saved (the replay has to be recorded from its very start)"); return; }
    setExact(d); post({type:"exact_tabu",lesson:LESSON_KEY,list:[]});
    post({type:"exact_save",lesson:LESSON_KEY,rle:d.rle,pos:d.pos,orle:d.rle,opos:d.pos});
  }
  function exRevert(why) {
    const X=bot.exact; if(!X) return;
    let n=0; for(const r of X.origRle) n+=r[1];
    const bits=new Uint8Array(n); let k=0; for(const r of X.origRle) for(let j=0;j<r[1];j++) bits[k++]=r[0];
    X.bits=bits; X.n=n; X.ps=X.origPos.slice().sort((a,b)=>a[0]-b[0]); X.pm=new Map(); for(const p of X.ps) X.pm.set(p[0],p);
    bot.exBestT=Infinity; bot.exBestCps=[]; bot.exVerify=null; bot.exCtlFail=0; bot.exTabu=new Set(); post({type:"exact_tabu",lesson:LESSON_KEY,list:[]});
    console.log("PTBOT_OPT going back to the original replay ("+why+")");
    post({type:"exact_save",lesson:LESSON_KEY,rle:X.origRle,pos:X.origPos,t:0,orle:X.origRle,opos:X.origPos});
  }
  function setRec(on) {
    if(on===bot.recOn) return;
    bot.recOn=on;
    if(on) { bot.recS=[]; bot.recLast=-1; bot.enabled=false; bot.repId=null; bot.repLog=0; bot.recCtl=[]; bot.recReplay=false; console.log("PTBOT_REC started - you drive now"); }
    else {
      bot.enabled=true;
      console.log("PTBOT_REC stopped, "+bot.recS.length+" samples");
      const samples=bot.recS; bot.recS=[];
      try { saveExact(samples); } catch(err) { console.log("PTBOT_EXACT save failed: "+String(err)); }
      post({type:"drive",track:TRACK_ID,samples:samples});
      try { learnLesson(samples); } catch(err) { console.log("PTBOT_LESSON failed: "+String(err)); }
    }
  }

  // ---- LESSONS: your driving replaces that part of the bot's line (and is remembered for this track) ----
  bot.patches=[]; bot.baseRoute=ROUTE_REC; bot.baseKind="recorded";
  function buildPatch(samples) {
    let cut=-1;
    for(let i=0;i<samples.length;i++) if(samples[i].length===1) cut=i;
    const s=samples.slice(cut+1);
    if(s.length<8) return null;
    const pts=[];
    for(const a of s) {
      const air=(a[9]===0);
      const u=air ? {x:0,y:1,z:0} : rotateVec({x:a[4],y:a[5],z:a[6],w:a[7]},{x:0,y:1,z:0});
      pts.push([a[1],a[2],a[3],Math.max(20,Math.min(420,a[8]*LESSON_SPEED)),u.x,u.y,u.z,a[10]|0]);
    }
    const out=[pts[0]]; const oi=[0]; let acc=0;
    for(let i=1;i<pts.length;i++) {
      acc+=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1],pts[i][2]-pts[i-1][2]);
      if(acc>=5 || i===pts.length-1) { out.push(pts[i]); oi.push(i); acc=0; }
    }
    // what you pressed between this point and the next: steering (-1 left .. +1 right) and gas/brake (1 gas, 2 brake, 0 coast)
    return out.map((p,k)=>{
      const lo=oi[k], hi=k+1<oi.length ? oi[k+1] : lo+1;
      let R=0,Lf=0,U=0,D=0,n=0;
      for(let m=lo;m<Math.max(hi,lo+1) && m<pts.length;m++) { const c=pts[m][7]; n++; if(c&2)R++; if(c&8)Lf++; if(c&1)U++; if(c&4)D++; }
      n=n||1;
      const ud = D/n>0.3 ? 2 : (U/n>0.5 ? 1 : 0);
      return [+p[0].toFixed(2),+p[1].toFixed(2),+p[2].toFixed(2),Math.round(p[3]),+p[4].toFixed(2),+p[5].toFixed(2),+p[6].toFixed(2),1,+((R-Lf)/n).toFixed(2),ud];
    });
  }
  // Finds where the patch joins the bot's line. Only the part of your drive that is near the line is used,
  // so it does not matter if you started or stopped away from it.
  function spliceRoute(base,patch,tolerant) {
    const P=patch.length, last=base.length-1;
    const bi=new Array(P), bd=new Array(P);
    let closest=1e9;
    for(let k=0;k<P;k++) {
      let b=0,d=1e18;
      for(let i=0;i<=last;i++) {
        const dx=base[i][0]-patch[k][0], dy=base[i][1]-patch[k][1], dz=base[i][2]-patch[k][2];
        const q=dx*dx+dy*dy+dz*dz;
        if(q<d) { d=q; b=i; }
      }
      bi[k]=b; bd[k]=Math.sqrt(d);
      if(bd[k]<closest) closest=bd[k];
    }
    for(const thr of (tolerant ? [15,30,50,80,150] : [15,30,50,80])) {
      let e=-1;
      for(let k=0;k<P;k++) if(bd[k]<=thr) { e=k; break; }
      if(e<0) continue;
      let x=-1;
      for(let k=P-1;k>e;k--) if(bd[k]<=thr && bi[k]>bi[e]) { x=k; break; }
      if(x<0 || x-e<3) continue;
      const sub=patch.slice(e,x+1);
      let pl=0, rl=0;
      for(let k=1;k<sub.length;k++) pl+=Math.hypot(sub[k][0]-sub[k-1][0],sub[k][1]-sub[k-1][1],sub[k][2]-sub[k-1][2]);
      for(let i=bi[e]+1;i<=bi[x];i++) rl+=Math.hypot(base[i][0]-base[i-1][0],base[i][1]-base[i-1][1],base[i][2]-base[i-1][2]);
      if(rl>2.2*pl+40 || pl>2.2*rl+40) continue; // your drive and the line cover very different distances: probably a different part of the track
      return {route:base.slice(0,bi[e]).concat(sub,base.slice(bi[x]+1)),sub:sub,from:bi[e],to:bi[x],thr:thr};
    }
    return {route:null,closest:closest};
  }
  // the line stops at a gap the builder could not cross: your drive continues it from the end of the line
  function spliceExtend(base,patch) {
    const e=base[base.length-1];
    let k0=-1,d0=1e18;
    for(let k=0;k<patch.length;k++) {
      const dx=patch[k][0]-e[0],dy=patch[k][1]-e[1],dz=patch[k][2]-e[2],q=dx*dx+dy*dy+dz*dz;
      if(q<d0) { d0=q; k0=k; }
    }
    if(k0<0 || Math.sqrt(d0)>80 || patch.length-k0<3) return null;
    const sub=patch.slice(k0);
    let i0=base.length-1,bd=1e18;
    for(let i=Math.max(0,base.length-40);i<base.length;i++) {
      const dx=base[i][0]-sub[0][0],dy=base[i][1]-sub[0][1],dz=base[i][2]-sub[0][2],q=dx*dx+dy*dy+dz*dz;
      if(q<bd) { bd=q; i0=i; }
    }
    while(sub[0].length<10) sub[0].push(0);
    sub[0][10]=1; // marks this lesson as a continuation of the line
    return {route:base.slice(0,i0).concat(sub),sub:sub,from:i0,to:base.length-1,thr:Math.round(Math.sqrt(d0))};
  }
  function learnLesson(samples) {
    const patch=buildPatch(samples);
    if(!patch) { post({type:"lesson",text:"Lesson too short - drive a bit further"}); console.log("PTBOT_LESSON too short, nothing saved"); return; }
    let res=bot.gapOpen ? spliceExtend(ROUTE,patch) : null;
    if(!res) res=spliceRoute(ROUTE,patch);
    if(!res.route) {
      post({type:"lesson",text:"Nothing saved: your driving got no closer than "+Math.round(res.closest)+" m to the bot's line"});
      console.log("PTBOT_LESSON nothing saved: the closest your drive got to the bot's line was "+Math.round(res.closest)+" m (needs under 80 m, and your drive has to go forward along the line). Your drive started at "+Math.round(patch[0][0])+","+Math.round(patch[0][1])+","+Math.round(patch[0][2])+" and ended at "+Math.round(patch[patch.length-1][0])+","+Math.round(patch[patch.length-1][1])+","+Math.round(patch[patch.length-1][2]));
      return;
    }
    const sub=res.sub;
    bot.patches.push(sub);
    applyRoute(res.route,TRACK_ID,"patched",true);
    post({type:"patches_save",track:TRACK_ID,lesson:LESSON_KEY,list:bot.patches});
    post({type:"lesson",text:"Lesson learned: "+sub.length+" points of your driving now guide the bot here"});
    console.log("PTBOT_LESSON learned "+sub.length+" points, replacing line points "+res.from+" to "+res.to+" (joined within "+res.thr+" m); route is now "+N+" points");
  }
  function loadLessons(list) {
    if(!Array.isArray(list) || !list.length || !bot.baseRoute) return;
    let route=bot.baseRoute, used=[];
    for(const p of list) { const r=Array.isArray(p) && p.length>=2 ? ((p[0] && p[0][10]===1) ? (spliceExtend(route,p) || spliceRoute(route,p,true)) : spliceRoute(route,p,true)) : null; if(r && r.route) { route=r.route; used.push(r.sub); } }
    if(!used.length) { post({type:"lesson",text:"Found "+list.length+" saved lesson(s) but they no longer fit this track's line"}); console.log("PTBOT_LESSON found saved lessons but they do not fit this line any more"); return; }
    post({type:"lesson",text:"Loaded "+used.length+" saved lesson(s) for this track"});
    bot.patches=used;
    applyRoute(route,TRACK_ID,"patched",true);
    console.log("PTBOT_LESSON loaded "+used.length+" saved lesson(s) for this track");
  }
  function clearLessons() {
    bot.patches=[];
    if(bot.baseRoute) applyRoute(bot.baseRoute,TRACK_ID,bot.baseKind,true);
    post({type:"patches_save",track:TRACK_ID,lesson:LESSON_KEY,list:[]});
    console.log("PTBOT_LESSON all lessons cleared for this track");
  }

  ${generateRoute.toString()}
  ${generateRoute3D.toString()}
  const USE_3D = ${USE_3D};
  const LESSON_SPEED = ${LESSON_SPEED};
  const THR_LIFT = ${THR_LIFT}, THR_BRAKE = ${THR_BRAKE}, THR_BIG = ${THR_BIG}, LIFT_MS = ${LIFT_MS}, BRAKE_MS = ${BRAKE_MS};
  const FAR_W = ${FAR_W}, FAR_SEC = ${FAR_SEC}, SMOOTH_SHIFT = ${SMOOTH_SHIFT};
  const CTRL2 = ${CTRL2}, C2_KW = ${C2_KW}, C2_G0 = ${C2_G0}, C2_GRIP_FRAC = ${C2_GRIP_FRAC}, C2_FF = ${C2_FF};

  // ---- ROUTE SWITCHING ----
  const PER_CAR=["idx","acc","stuck","lastPos","lastFrames","hist","lastCrash","lastOff","lastCp","airSince","airV0",
    "lastAirborne","keepSpeed","keepUntil","lastLand","lastBrakeLog","landSteerUntil","lastPitch","airMatched","finLogged","c2","over","overF","tapUntil","tapDir","tapEnd"];
  function smoothRoute(route) {
    const n=route.length;
    if(!(SMOOTH_SHIFT>0) || n<5) return route;
    const P=route.map(p=>p.slice());
    const ok=new Array(n).fill(false);
    for(let i=1;i<n-1;i++) {
      const a=route[i-1],b=route[i],c=route[i+1];
      const flat=Math.abs(c[1]-a[1])<1.2 && Math.abs(b[1]-a[1])<0.8 && Math.abs(c[1]-b[1])<0.8;
      const nyOk=b.length<7 || b[5]>0.9;
      ok[i]=flat && nyOk;
    }
    for(let it=0;it<60;it++) {
      for(let i=1;i<n-1;i++) {
        if(!ok[i]) continue;
        const o=route[i];
        let nx=P[i][0]+0.4*((P[i-1][0]+P[i+1][0])/2-P[i][0]);
        let nz=P[i][2]+0.4*((P[i-1][2]+P[i+1][2])/2-P[i][2]);
        const dx=nx-o[0], dz=nz-o[2], d=Math.hypot(dx,dz);
        if(d>SMOOTH_SHIFT) { nx=o[0]+dx/d*SMOOTH_SHIFT; nz=o[2]+dz/d*SMOOTH_SHIFT; }
        P[i][0]=nx; P[i][2]=nz;
      }
    }
    return P;
  }
  function applyRoute(route,trackId,kind,quiet) {
    if(!quiet && kind==="generated") route=smoothRoute(route);
    if(!quiet) { bot.baseRoute=route; bot.baseKind=kind; bot.patches=[]; }
    ROUTE=route; N=route.length; TRACK_ID=trackId;
    SLOW_ZONES = kind==="recorded" ? SLOW_ZONES_REC.slice() : [];
    computeDerived();
    for(const k of PER_CAR) bot[k]=Object.create(null);
    bot.route=ROUTE; bot.noRoute=false; bot.routeKind=kind;
    if(LEARN) { freshLearner(); startRun(); }
    if(!quiet) post({type:"hello",track:TRACK_ID,lesson:LESSON_KEY});
    if(!quiet) post({type:"routeready"});
  }
  function hashStr(t) { let h=5381; for(let i=0;i<t.length;i++) h=((h*33)^t.charCodeAt(i))>>>0; return h.toString(16); }
  let lastTrackData=null;
  let LESSON_KEY=null;

  // ---- TRACK CAPTURE: reads the track the game gives the physics worker ----
  const TRACK_LIB = Object.create(null);
  function r3(v) { return Math.round(v*1000)/1000; }
  function captureTrack(m) {
    if(!m || typeof m!=="object") return;
    if(m.messageType===0 && Array.isArray(m.trackParts)) {
      for(const p of m.trackParts) TRACK_LIB[p.id]={v:p.vertices,detector:p.detector||null,startOffset:p.startOffset||null};
      return;
    }
    if(m.messageType===3 && typeof m.trackData==="string") {
      console.log("PTBOT_TRACK worker saw the track ("+m.trackData.length+" characters), reading it");
      const track=Ko.fromSaveString(m.trackData);
      if(!track) { console.log("PTBOT_TRACK could not read the track"); return; }
      const parts=[], used=Object.create(null);
      track.forEachPart((x,y,z,id,rot,axis,color,cpo,so)=>{
        const q=eo[axis][rot];
        parts.push([x,y,z,id,rot,axis,cpo==null?-1:cpo,so==null?-1:so,r3(q.x),r3(q.y),r3(q.z),r3(q.w)]);
        used[id]=true;
      });
      const lib={};
      for(const id of Object.keys(used)) {
        const e=TRACK_LIB[id];
        if(!e) continue;
        lib[id]={v:Array.from(e.v,r3),detector:e.detector,startOffset:e.startOffset};
      }
      let start=null, cps=null, fins=null;
      try { const st=track.getStartTransform(); start={p:[st.position.x,st.position.y,st.position.z],q:[st.quaternion.x,st.quaternion.y,st.quaternion.z,st.quaternion.w]}; } catch(_) {}
      try { cps=track.getCheckpoints(); } catch(_) {}
      try { fins=track.getFinishes(); } catch(_) {}
      const data={partSize:Lo.partSize,parts:parts,lib:lib,start:start,checkpoints:cps,finishes:fins,
        mountainOffset:m.mountainOffset||null};
      // choose the driving line for this track
      LESSON_KEY=hashStr(parts.map(p=>p.slice(0,8).join(",")).join(";"));
      if(m.trackData!==lastTrackData) {
        lastTrackData=m.trackData;
        const tid=hashStr(m.trackData);
        const startP=start ? start.p : null;
        const recMatches=!!startP && Math.hypot(ROUTE_REC[0][0]-startP[0],ROUTE_REC[0][2]-startP[2])<15;
        let gen=null;
        if(ROUTE_SOURCE==="recorded" || (ROUTE_SOURCE==="auto" && recMatches)) {
          console.log("PTBOT_ROUTE using your recorded lap for this track");
          applyRoute(ROUTE_REC,null,"recorded");
        } else {
          const ckey=tid+"_"+"r1"+(USE_3D?"3":"2");
          const finishBuild=()=>{
          const decIn={parts:parts,lib:TRACK_LIB,start:start};
          let gen3=null;
          if(USE_3D) {
            // long tracks: if the track is too big for the fine grid, try coarser grids until it fits
            for(const st of [0,1.8,2.5,3.5,5]) {
              try { gen3=generateRoute3D(decIn, st ? {step:st} : undefined); } catch(err) { gen3={ok:false,why:"error: "+String(err)}; }
              if(gen3 && gen3.ok) { if(st) console.log("PTBOT_ROUTE long track: used a coarser grid ("+st+" m)"); break; }
              if(!gen3 || !/too large/.test(gen3.why||"")) break;
            }
            if(gen3 && gen3.ok) console.log("PTBOT_ROUTE 3D builder: "+gen3.route.length+" points, "+gen3.lengthM+" m, "+gen3.ms+" ms"+(gen3.partial?" (partial: "+gen3.partial+")":""));
            else console.log("PTBOT_ROUTE 3D builder failed: "+(gen3?gen3.why:"?"));
          }
          if(gen3 && gen3.ok && !gen3.partial) gen=gen3;
          else {
            let gen2=null;
            for(const cl of [0,1.6,2.4,3.5]) {
              try { gen2=generateRoute(decIn, cl ? {cell:cl} : undefined); } catch(err) { gen2={ok:false,why:"error: "+String(err)}; }
              if(gen2 && gen2.ok) break;
              if(!gen2 || !/too large/.test(gen2.why||"")) break;
            }
            if(gen3 && gen3.ok && (!gen2 || !gen2.ok || (gen2.reachedGates||0)<=(gen3.reachedGates||0))) gen=gen3; else gen=gen2;
          }
          if(gen && gen.ok) {
            console.log("PTBOT_ROUTE built a line from the track: "+gen.route.length+" points, "+gen.lengthM+" m, "+gen.jumps+" jump(s), "+gen.ms+" ms");
            applyRoute(gen.route,tid,"generated");
            bot.gapOpen=!!gen.partial; bot.gapWhy=gen.partial||null;
            if(gen.partial) console.log("PTBOT_ROUTE line incomplete: "+gen.partial+". The bot will drive the part it has, then hand over to you to record the rest.");
            try { if(ch) ch.postMessage({type:"route",info:{track:tid,points:gen.route.length,lengthM:gen.lengthM,jumps:gen.jumps,ms:gen.ms,waypoints:gen.waypoints},route:gen.route,key:ckey,gap:gen.partial||null}); } catch(_) {}
          } else if(ROUTE_SOURCE==="generated" && recMatches) {
            console.log("PTBOT_ROUTE could not build a line ("+(gen?gen.why:"?")+"), using your recorded lap instead");
            applyRoute(ROUTE_REC,null,"recorded");
          } else {
            console.log("PTBOT_ROUTE could not build a line: "+(gen?gen.why:"?")+". The bot will only drive forward on this track.");
            bot.noRoute=true;
          }
          };
          if(ch) {
            pendingBuild={key:ckey,tid:tid,go:finishBuild,timer:setTimeout(()=>{ if(pendingBuild && pendingBuild.key===ckey) { const pb=pendingBuild; pendingBuild=null; pb.go(); } },1500)};
            post({type:"routeq",key:ckey});
          } else finishBuild();
        }
      }
      let clean=null;
      try { clean=JSON.parse(JSON.stringify(data)); } catch(err) { console.log("PTBOT_TRACK could not copy: "+String(err)); }
      if(clean) {
        try { if(ch) ch.postMessage({type:"track",data:clean}); else console.log("PTBOT_TRACK no channel"); }
        catch(err) { console.log("PTBOT_TRACK send failed: "+String(err)); }
      }
      console.log("PTBOT_TRACK sent: "+parts.length+" placed parts, "+Object.keys(lib).length+" part shapes");
    }
  }
  try {
    const origOnMessage=onmessage;
    onmessage=function(ev) {
      const cm=ev.data;
      if(cm && cm.ptCfg) {
        try {
          if(cm.ptCfg==="explore") bot.noExplore=!cm.on;
          else if(cm.ptCfg==="info") post({type:"lapinfo",info:{line:bot.routeKind||null,points:N,lessons:(bot.patches||[]).length,exactReplay:bot.exact?bot.exact.n:0,ghostCheckpoints:L.best&&L.best.gt?L.best.gt.length:0,runNo:L.runNo,exploring:!bot.noExplore}});
        } catch(err) { console.log("PTBOT_FASTLAP config failed: "+String(err)); }
        return;
      }
      try { captureTrack(ev.data); } catch(err) { console.log("PTBOT_TRACK capture failed: "+String(err)); }
      return origOnMessage.call(this,ev);
    };
  } catch(err) { console.log("PTBOT_TRACK hook failed: "+String(err)); }

  bot.record=record;
  bot.sample=sample;
  bot.decode=decode;
  bot.choose=choose;
  bot.route=ROUTE;
  bot.applyRoute=applyRoute;
  globalThis.__ptTutorialBot=bot;
})();
`;

const BOT_BODY = `
  {
    const __g = globalThis;
    __g.__ptSR = __g.__ptSR || {n:0,t0:Date.now(),logs:0};
    __g.__ptSR.n++;
    if (__g.__ptSR.n % 5000 === 0 && __g.__ptSR.logs < 60) {
      __g.__ptSR.logs++;
      console.log("PTBOT_STEPRATE hook calls=" + __g.__ptSR.n + " real ms=" + (Date.now() - __g.__ptSR.t0) + " car id=" + e.id + " player=" + (e.userControls ? "yes" : "no") + " frame=" + e.frames);
    }
  }
  if (!e.userControls && globalThis.__ptTutorialBot && (globalThis.__ptTutorialBot.fastSim || globalThis.__ptTutorialBot.priv) && !globalThis.__ptTutorialBot.recOn) {
    const __fb = globalThis.__ptTutorialBot;
    __fb.curE = e.frames;
    try {
      const __fbuf = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      const __fst = __fb.decode(__fbuf.buffer);
      if (__fst) {
        if (e.frames === 0 || !__fb.fastT0) {
          __fb.fastT0 = Date.now(); __fb.fastLastLog = 0; __fb.fastLogs = 0; __fb.fastDone = false;
          console.log("PTBOT_FAST bot is steering a replay car, id=" + e.id + " frame=" + e.frames);
        }
        r = __fb.choose(__fst, e.id);
        if (e.frames - __fb.fastLastLog >= 2000 && __fb.fastLogs < 40) {
          __fb.fastLastLog = e.frames; __fb.fastLogs++;
          console.log("PTBOT_FAST frame=" + e.frames + " speed=" + Math.round(__fst.speedKmh) + " real ms=" + (Date.now() - __fb.fastT0));
        }
        if (!__fb.fastDone && __fst.finishFrames !== null) {
          __fb.fastDone = true;
          console.log("PTBOT_FAST finished at frame " + __fst.finishFrames + " after " + (Date.now() - __fb.fastT0) + " real ms");
        }
      }
    } catch (_) {}
  }
  if (globalThis.__ptTutorialBot && globalThis.__ptTutorialBot.recOn) {
    const __pd = globalThis.__ptTutorialBot;
    __pd.dbgN=(__pd.dbgN||0)+1;
    if(__pd.dbgN%400===1 && (__pd.dbgLogs=(__pd.dbgLogs||0)+1)<=12) console.log("PTBOT_RECDBG car id="+e.id+" player="+(e.userControls?"yes":"no")+" started="+e.hasStarted+" frames="+e.frames+" samples="+__pd.recS.length);
  }
  if (!e.userControls && globalThis.__ptTutorialBot && globalThis.__ptTutorialBot.recOn) {
    const __pb = globalThis.__ptTutorialBot;
    try {
      if(!__pb.repLog) { __pb.repLog=1; console.log("PTBOT_REPLAYCAR first non-player car seen while recording: id="+e.id+" fields="+Object.keys(e).join(",")); }
      const __buf = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      const __st = __pb.decode(__buf.buffer);
      if(__pb.repId===undefined || __pb.repId===null) __pb.repId=e.id;
      if(e.id===__pb.repId) { __pb.recReplay=true; __pb.sample(__st,r,e.id); }
    } catch (_) {}
  }
  if (e.userControls && globalThis.__ptTutorialBot) {
    const __ptBot = globalThis.__ptTutorialBot;
    __ptBot.curE = e.frames;
    let previous = null;
    try {
      const previousBuffer = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      previous = __ptBot.decode(previousBuffer.buffer);
    } catch (_) {}

    if (__ptBot.mode === "record") {
      try { __ptBot.record(previous,e.id); } catch (_) {}
    } else if (__ptBot.recOn) {
      try { __ptBot.sample(previous,r,e.id); } catch (_) {}
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
window.ptMark=(label)=>rlog("PTBOT_MARK t="+Math.round(performance.now())+"ms "+String(label||""));
window.ptReconDump=()=>ptDownload("ptbot_recon.txt",(window.__ptReconLines||[]).join("\n"));
window.ptWorkerSource=(id)=>{
  const e=(window.__ptWorkers||[])[id||0];
  if(e && e.src) ptDownload("ptbot_worker_"+(id||0)+".js",e.src); else console.log("no source saved for that worker yet");
};

function reconSummary(v,d) {
  if(v===null || v===undefined) return String(v);
  const t=typeof v;
  if(t==="string") return JSON.stringify(v.length>300?v.slice(0,300)+"...("+v.length+" chars)":v);
  if(t==="number" || t==="boolean") return String(v);
  if(t==="function") return "fn";
  if(v instanceof ArrayBuffer) return "ArrayBuffer("+v.byteLength+")";
  if(ArrayBuffer.isView(v)) {
    let head="";
    try { head=Array.from(v.subarray?v.subarray(0,12):[]).join(","); } catch (_) {}
    return v.constructor.name+"("+v.length+")["+head+(v.length>12?",...":"")+"]";
  }
  if(Array.isArray(v)) {
    if(d>=5) return "Array("+v.length+")";
    return "Array("+v.length+")["+v.slice(0,3).map(x=>reconSummary(x,d+1)).join(", ")+(v.length>3?", ...":"")+"]";
  }
  if(t==="object") {
    if(d>=5) return "{...}";
    const ks=Object.keys(v);
    return "{"+ks.slice(0,30).map(k=>k+": "+reconSummary(v[k],d+1)).join(", ")+(ks.length>30?", ...("+ks.length+" keys)":"")+"}";
  }
  return t;
}

function installRecon() {
  const OrigWorker=window.Worker;
  if(!OrigWorker || window.__ptReconInstalled) return;
  window.__ptReconInstalled=true;
  window.__ptWorkers=[];
  window.__ptOrigWorker=OrigWorker;
  window.Worker=function(url,opts) {
    const w=new OrigWorker(url,opts);
    const id=window.__ptWorkers.length;
    const entry={w,url:String(url),opts};
    window.__ptWorkers.push(entry);
    rlog("PTBOT_RECON worker #"+id+" created: "+String(url).slice(0,140)+" options="+JSON.stringify(opts||{}));
    try {
      if(String(url).indexOf("blob:")===0) {
        fetch(url).then(r=>r.text()).then(txt=>{
          entry.src=txt;
          rlog("PTBOT_RECON worker #"+id+" source is "+txt.length+" characters long");
        }).catch(()=>{});
      }
    } catch (_) {}
    const origPost=w.postMessage.bind(w);
    const rawPost=function(m) {
      try {
        if(m && m.messageType===0 && Array.isArray(m.trackParts)) { try { window.__ptM0=structuredClone(m); } catch (_) {} }
        if(m && m.messageType===3 && typeof m.trackData==="string") { try { window.__ptM3=structuredClone(m); } catch (_) {} }
        if(m && m.messageType===0 && Array.isArray(m.trackParts) && !(window.__ptRaw && window.__ptRaw.parts)) {
          window.__ptRaw=window.__ptRaw||{};
          window.__ptRaw.version=m.version;
          window.__ptRaw.parts=m.trackParts.map(p=>({id:p.id,v:Array.from(p.vertices,x=>Math.round(x*1000)/1000),
            detector:p.detector||null,startOffset:p.startOffset||null}));
          rlog("PTBOT_RECON saved the "+m.trackParts.length+" road piece shapes");
        } else if(m && m.messageType===3 && typeof m.trackData==="string" && m.carRecording==null) {
          window.__ptRaw=window.__ptRaw||{};
          window.__ptRaw.trackData=m.trackData;
          window.__ptRaw.mountainOffset=m.mountainOffset||null;
          rlog("PTBOT_RECON saved the track code ("+m.trackData.length+" characters)");
        }
      } catch(err) { rlog("PTBOT_RECON raw save failed: "+String(err)); }
    };
    let nOut=0,nIn=0;
    const sigOut=Object.create(null), sigIn=Object.create(null);
    const sigOf=(v)=>{
      try {
        if(v===null || v===undefined) return String(v);
        if(v instanceof ArrayBuffer) return "ArrayBuffer";
        if(ArrayBuffer.isView(v)) return v.constructor.name;
        if(typeof v==="object") return Object.keys(v).slice(0,12).join(",")+(v.messageType!==undefined?"|mt"+v.messageType:"");
        return typeof v;
      } catch (_) { return "?"; }
    };
    w.postMessage=function(m,t) {
      rawPost(m);
      nOut++;
      const sg=sigOf(m); sigOut[sg]=(sigOut[sg]||0)+1;
      if(sigOut[sg]<=12 || sigOut[sg]%2000===0) rlog("PTBOT_RECON #"+id+" t="+Math.round(performance.now())+"ms game -> worker, message "+nOut+" (kind count "+sigOut[sg]+"): "+reconSummary(m,0));
      return origPost(m,t);
    };
    w.addEventListener("message",ev=>{
      nIn++;
      const sg=sigOf(ev.data); sigIn[sg]=(sigIn[sg]||0)+1;
      if(sigIn[sg]<=12 || sigIn[sg]%2000===0) rlog("PTBOT_RECON #"+id+" t="+Math.round(performance.now())+"ms worker -> game, message "+nIn+" (kind count "+sigIn[sg]+"): "+reconSummary(ev.data,0));
    });
    return w;
  };
  window.Worker.prototype=OrigWorker.prototype;
  rlog("PTBOT_RECON installed (watching for physics workers)");
}

function setupMainThread() {
  if(RECON) { try { installRecon(); } catch(err) { console.log("PTBOT_RECON failed",err); } }
  if(typeof BroadcastChannel==="undefined") return;
  const ch=new BroadcastChannel("ptbot");
  const STORE_BASE="ptbot_learn_v5";
  const PATCH_BASE="ptbot_patch_v1";
  let lastTrackKey=null;
  const patchKey=(t)=>PATCH_BASE+"_"+(t||"default");
  const exactKey=(t)=>"ptbot_exact_v1_"+(t||"default");
  const tabuKey=(t)=>"ptbot_exacttabu_v1_"+(t||"default");
  let lastLessonKey=null;
  const storeKey=(t)=>t?STORE_BASE+"_"+t:STORE_BASE;

  window.ptTrackDump=()=>{
    if(!window.__ptTrack && !(window.__ptRaw && window.__ptRaw.trackData)) {
      console.log("no track captured yet - start a race first (load the track, press start)");
      return;
    }
    ptDownload("ptbot_track.json",JSON.stringify({decoded:window.__ptTrack||null,raw:window.__ptRaw||null}));
    console.log("saved ptbot_track.json (decoded track: "+(window.__ptTrack?"yes":"no")+", raw track code: "+(window.__ptRaw&&window.__ptRaw.trackData?"yes":"no")+")");
  };

  window.ptRouteDump=()=>{
    if(!window.__ptRoute) { console.log("no generated line yet (it is only built when your recorded lap does not belong to the track, or ROUTE_SOURCE is generated)"); return; }
    ptDownload("ptbot_route.json",JSON.stringify(window.__ptRoute));
    console.log("saved ptbot_route.json");
  };

  function ptDecodeState(buf) {
    const e=new Uint8Array(buf), d=new DataView(buf);
    let o=4;
    const frames=e[o]|(e[o+1]<<8)|(e[o+2]<<16); o+=3;
    const speed=d.getFloat32(o,true); o+=4;
    const flags=e[o++];
    let finish=null;
    if(flags&2) finish=e[o]|(e[o+1]<<8)|(e[o+2]<<16);
    return {frames:frames,speed:speed,finished:!!(flags&2),finish:finish};
  }
  // ptFastLap(frames, explore, laps): the bot drives laps in its own hidden fast physics worker, restarting after each one
  //   ptFastLap()              one lap on the best known line, no experiments
  //   ptFastLap(40000,true,30) 30 laps in a row, the bot tries small changes (learns) between laps
  // ptFastLoop(30) is a shortcut for the second one, ptFastStop() ends a run early.
  window.ptFastStop=()=>{ if(window.__ptFastEnd) window.__ptFastEnd("__stop__",0); else console.log("PTBOT_FASTLAP nothing is running"); };
  window.ptFastLoop=(laps,explore)=>window.ptFastLap(40000,explore!==false,laps||20);
  window.ptFastLap=(frames,explore,laps)=>{
    frames=frames||40000; laps=laps||1;
    const OW=window.__ptOrigWorker;
    const src=(window.__ptWorkers||[]).filter(e=>e.src && e.src.length>500000).pop();
    if(!OW || !src) { console.log("PTBOT_FASTLAP no physics worker code saved yet. Start any race first (RECON must be true), then try again."); return; }
    if(!window.__ptM0 || !window.__ptM3) { console.log("PTBOT_FASTLAP the game has not sent a track yet. Start any race first, then try again."); return; }
    if(window.__ptFastW) { try { window.__ptFastW.terminate(); } catch (_) {} window.__ptFastW=null; }
    const fw=new OW(URL.createObjectURL(new Blob([src.src],{type:"text/javascript"})),{name:"ptbot-private"});
    window.__ptFastW=fw;
    let tGo=null, lastLog=0, lastSt=null, lapNo=0, lapDone=true, awaitFresh=false, allDone=false, loaded=false;
    const results=[], t0=performance.now();
    const stop=()=>{ try { fw.terminate(); } catch (_) {} if(window.__ptFastW===fw) window.__ptFastW=null; window.__ptFastEnd=null; window.__ptFastWait=null; };
    const summary=()=>{
      const ok=results.filter(r=>r.fin), secs=(performance.now()-t0)/1000;
      const best=ok.length ? Math.min.apply(null,ok.map(r=>r.frames)) : null;
      console.log("PTBOT_FASTLAP summary: "+results.length+" lap(s) in "+secs.toFixed(1)+" s ("+(results.length/Math.max(0.001,secs)).toFixed(2)+" laps per second), "+ok.length+" finished"+(best!==null ? ", best "+(best/1000).toFixed(3)+" s" : ""));
    };
    const endLap=(fin,text,fr)=>{
      if(lapDone || allDone) return;
      lapDone=true;
      const ms=Math.round(performance.now()-tGo);
      results.push({fin:fin,frames:fr,ms:ms});
      console.log("PTBOT_FASTLAP lap "+lapNo+" "+text+" ("+ms+" real ms)");
      if(lapNo>=laps) { allDone=true; summary(); stop(); }
      else setTimeout(startLap,0);
    };
    window.__ptFastEnd=(why,fr)=>{
      if(why==="__stop__") { if(!allDone) { allDone=true; lapDone=true; summary(); stop(); } return; }
      if(String(why)==="finished the track") return;
      const f=fr || (lastSt?lastSt.frames:0);
      endLap(false,"failed: "+why+" (sim frame "+f+", "+(lastSt?Math.round(lastSt.speed):"?")+" km/h)",f);
    };
    fw.onerror=(e)=>console.log("PTBOT_FASTLAP worker error: "+(e&&e.message));
    const startLap=()=>{
      lapNo++; lapDone=false; lastLog=0; lastSt=null;
      if(lapNo>1) {
        // restart: remove the car and make a new one on the same track (the same thing the game does when you press T)
        fw.postMessage({messageType:4,carId:0});
        fw.postMessage(Object.assign({},structuredClone(window.__ptM3),{carId:0,carRecording:null}));
        awaitFresh=true;
      } else fw.postMessage({ptCfg:"info"});
      tGo=performance.now();
      fw.postMessage({messageType:5,carId:0,targetSimulationTimeFrames:frames});
    };
    const go=()=>{
      console.log("PTBOT_FASTLAP the route is ready, running "+laps+" lap(s) of up to "+frames+" frames flat out");
      startLap();
    };
    const load=()=>{
      if(loaded) return;
      loaded=true;
      console.log("PTBOT_FASTLAP the worker has started, loading the track (the bot "+(explore?"will try small changes":"drives its best known line, no experiments")+")");
      fw.postMessage({ptCfg:"explore",on:!!explore});
      fw.postMessage(Object.assign({},structuredClone(window.__ptM0),{isRealtime:false}));
      fw.postMessage(Object.assign({},structuredClone(window.__ptM3),{carId:0,carRecording:null}));
      window.__ptFastWait=go;
      setTimeout(()=>{ if(window.__ptFastWait===go) { window.__ptFastWait=null; console.log("PTBOT_FASTLAP no route-ready signal after 20 s, starting anyway"); go(); } },20000);
    };
    fw.onmessage=(ev)=>{
      const d=ev.data;
      if(d && d.messageType===9) { console.log("PTBOT_FASTLAP worker start-up test finished (deterministic: "+d.isDeterminstic+")"); load(); return; }
      if(lapDone || allDone || !tGo || !d || d.messageType!==10 || !d.carStateBuffers || !d.carStateBuffers.length) return;
      const st=ptDecodeState(d.carStateBuffers[d.carStateBuffers.length-1]);
      if(awaitFresh) { if(st.frames>1500) return; awaitFresh=false; }   // still messages from the old car
      lastSt=st;
      const ms=Math.round(performance.now()-tGo);
      if(laps===1 && st.frames-lastLog>=5000) { lastLog=st.frames; console.log("PTBOT_FASTLAP sim frame "+st.frames+", "+Math.round(st.speed)+" km/h, after "+ms+" real ms"); }
      if(st.finished) { const T=(st.finish!==null?st.finish:st.frames); endLap(true,"FINISHED: "+(T/1000).toFixed(3)+" s of game time, "+(T/Math.max(1,ms)).toFixed(1)+"x real time",T); }
      else if(st.frames>=frames-2) endLap(false,"reached the frame limit ("+frames+") without finishing",st.frames);
    };
    setTimeout(()=>{ if(!loaded) { console.log("PTBOT_FASTLAP no start-up answer after 15 s, loading the track anyway"); load(); } },15000);
    console.log("PTBOT_FASTLAP private worker created, waiting for it to start up");
    fw.postMessage({messageType:2});
  };

  let recOn=false, recToast=null;
  function toast(t) {
    try {
      if(!recToast) {
        recToast=document.createElement("div");
        recToast.style.cssText="position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:99999;padding:6px 14px;border-radius:8px;background:#c0262d;color:#fff;font:600 14px sans-serif;pointer-events:none";
        document.body.appendChild(recToast);
      }
      recToast.textContent=t; recToast.style.display=t?"block":"none";
    } catch (_) {}
  }
  window.ptRecord=(on)=>{
    recOn=(on===undefined)?!recOn:!!on;
    ch.postMessage({type:"rec",on:recOn});
    toast(recOn?"TEACHING: drive the hard spot yourself, then press O again":"");
    console.log(recOn?"PTBOT_REC on: drive the track yourself, press O again when done":"PTBOT_REC off: saving...");
  };
  window.ptOpt=(on)=>{ ch.postMessage({type:"opt",on:on!==false}); console.log("ptOpt: small-change trials "+(on!==false?"ON":"OFF")+" (takes effect on the next run)"); };
  window.ptClearLessons=()=>{ ch.postMessage({type:"clearPatches"}); try { localStorage.removeItem(patchKey(lastLessonKey)); localStorage.removeItem(exactKey(lastLessonKey)); } catch (_) {} console.log("lessons and the exact replay cleared for this track"); };
  window.ptLessonsDump=()=>{
    const all={};
    try { for(let i=0;i<localStorage.length;i++) { const k=localStorage.key(i); if(k&&k.indexOf(PATCH_BASE)===0) all[k]=JSON.parse(localStorage.getItem(k)); } } catch (_) {}
    ptDownload("ptbot_lessons.json",JSON.stringify(all));
    console.log("saved ptbot_lessons.json with "+Object.keys(all).length+" track(s)");
  };
  window.ptDriveDump=(withTrack)=>{
    if(!window.__ptDrive) { console.log("no driving recorded yet - press O, drive, press O again"); return; }
    ptDownload("ptbot_drive.json",JSON.stringify({drive:window.__ptDrive,track:(withTrack===false)?null:(window.__ptTrack||null)}));
    console.log("saved ptbot_drive.json ("+window.__ptDrive.samples.length+" samples, with track: "+(withTrack!==false&&!!window.__ptTrack)+")");
  };
  try {
    window.addEventListener("keydown",(e)=>{ const tg=e.target, tn=tg&&tg.tagName; if(tn==="INPUT"||tn==="TEXTAREA"||(tg&&tg.isContentEditable)) return; if(e.key&&e.key.toLowerCase()===REC_KEY&&!e.repeat&&!e.ctrlKey&&!e.metaKey&&!e.altKey) { e.preventDefault(); window.ptRecord(); } },true);
  } catch (_) {}

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
    if(m.priv) {
      if(m.type==="lapinfo") { console.log("PTBOT_FASTLAP what the hidden bot is using: "+JSON.stringify(m.info)); return; }
      if(m.type==="lapfail") { if(window.__ptFastEnd) window.__ptFastEnd(m.why,m.frames); return; }
      if(m.type==="restart") { if(window.__ptFastEnd) window.__ptFastEnd(m.why||"the bot asked for a restart",m.frames||0); return; }
      if(m.type!=="hello" && m.type!=="routeq" && m.type!=="routeready") return;
    }
    const rp=(o)=>ch.postMessage(m.priv ? Object.assign({to:"priv"},o) : o);
    if(m.type==="hello") {
      lastTrackKey=m.track||null;
      lastLessonKey=m.lesson||null;
      try {
        const pl=localStorage.getItem(patchKey(m.lesson));
        if(pl) { const list=JSON.parse(pl); console.log("PTBOT_LESSON the page found "+list.length+" saved lesson(s) for this track"); rp({type:"patches",lesson:m.lesson||null,list:list}); }
      } catch (_) {}
      try {
        const tb=localStorage.getItem(tabuKey(m.lesson));
        if(tb) rp({type:"exact_tabu",lesson:m.lesson||null,list:JSON.parse(tb)});
      } catch (_) {}
      try {
        const ex=localStorage.getItem(exactKey(m.lesson));
        if(ex) { const d=JSON.parse(ex); rp({type:"exact",lesson:m.lesson||null,rle:d.rle,pos:d.pos,t:d.t,orle:d.orle,opos:d.opos}); }
      } catch (_) {}
      try {
        const d=localStorage.getItem(storeKey(m.track));
        rp({type:"load",track:m.track||null,data:d?JSON.parse(d):null});
      } catch (_) {}
    } else if(m.type==="exact_tabu") {
      try { if(m.list&&m.list.length) localStorage.setItem(tabuKey(m.lesson),JSON.stringify(m.list)); else localStorage.removeItem(tabuKey(m.lesson)); } catch (_) {}
    } else if(m.type==="exact_save") {
      try {
        if(m.rle&&m.rle.length) { localStorage.setItem(exactKey(m.lesson),JSON.stringify({rle:m.rle,pos:m.pos,t:m.t,orle:m.orle,opos:m.opos})); console.log("PTBOT_EXACT the page saved the exact replay for this track"); } else localStorage.removeItem(exactKey(m.lesson));
      } catch (_) {}
    } else if(m.type==="patches_save") {
      try {
        if(m.list&&m.list.length) { localStorage.setItem(patchKey(m.lesson),JSON.stringify(m.list)); console.log("PTBOT_LESSON the page saved "+m.list.length+" lesson(s) for this track"); } else localStorage.removeItem(patchKey(m.lesson));
      } catch (_) {}
    } else if(m.type==="recstate") {
      recOn=!!m.on; if(recOn) toast("RECORDING: drive on from here, then press O when you are done");
    } else if(m.type==="lesson") {
      toast(m.text); console.log("PTBOT_LESSON "+m.text);
      setTimeout(()=>{ if(!recOn) toast(""); },5000);
    } else if(m.type==="track") {
      window.__ptTrack=m.data;
      console.log("PTBOT_TRACK received on the page: "+m.data.parts.length+" parts, "+(m.data.checkpoints?m.data.checkpoints.length:0)+" checkpoints. Type ptTrackDump() to save it as a file.");
    } else if(m.type==="drive") {
      window.__ptDrive=m;
      console.log("PTBOT_REC saved on the page: "+m.samples.length+" samples (type ptDriveDump() to save them as a file).");
      if(DOWNLOAD_DRIVE) window.ptDriveDump();
    } else if(m.type==="routeq") {
      let out={type:"routea",key:m.key,route:null,gap:null};
      try { const t=localStorage.getItem("ptbot_route_v1_"+m.key); if(t) { const o=JSON.parse(t); out.route=o.route; out.gap=o.gap||null; } } catch (_) {}
      try { rp(out); } catch (_) {}
    } else if(m.type==="route") {
      try {
        if(m.key && m.route) {
          localStorage.setItem("ptbot_route_v1_"+m.key,JSON.stringify({route:m.route,gap:m.gap||null}));
          let idx=[]; try { idx=JSON.parse(localStorage.getItem("ptbot_route_v1_idx")||"[]"); } catch (_) {}
          idx=idx.filter(k=>k!==m.key); idx.push(m.key);
          while(idx.length>10) { try { localStorage.removeItem("ptbot_route_v1_"+idx.shift()); } catch (_) {} }
          localStorage.setItem("ptbot_route_v1_idx",JSON.stringify(idx));
        }
      } catch (_) {}
      window.__ptRoute=m;
      console.log("PTBOT_ROUTE (page) line built: "+m.info.points+" points, "+m.info.lengthM+" m, "+m.info.jumps+" jump(s). Type ptRouteDump() to save it as a file.");
    } else if(m.type==="save") {
      try { localStorage.setItem(storeKey(m.track),JSON.stringify(m.data)); } catch (_) {}
    } else if(m.type==="routeready") {
      if(m.priv && window.__ptFastWait) { const f=window.__ptFastWait; window.__ptFastWait=null; setTimeout(f,800); }
    } else if(m.type==="restart" && AUTO_RESTART && !m.priv) {
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
    this.modVersion="1.2.5";
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
