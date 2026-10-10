import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// "drive"  = the bot drives the lap you recorded.
// "record" = you drive by hand and the mod prints your lap to the Console.
const MODE = "drive";

// Tuning knobs for the bot:
const SPEED_FACTOR = 0.8;
const STEER_GAIN = 2;

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
      if(d<bestD) {
        bestD=d;
        best=i;
      }
    }

    if(!forceGlobal && bestD>30*30) {
      for(let i=0;i<N;i++) {
        const d=dist2(p,ROUTE[i]);
        if(d<bestD) {
          bestD=d;
          best=i;
        }
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

  function targetSpeed(i) {
    let best=Infinity;
    const hi=Math.min(N-1,i+25);

    for(let j=i;j<=hi;j++) {
      const v=ROUTE[j][3]*SPEED_FACTOR+6*(j-i);
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

    let o=0;
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

    const position={
      x:d.getFloat32(o,true),
      y:d.getFloat32(o+4,true),
      z:d.getFloat32(o+8,true)
    };
    o+=12;

    const quaternion={
      x:d.getFloat32(o,true),
      y:d.getFloat32(o+4,true),
      z:d.getFloat32(o+8,true),
      w:d.getFloat32(o+12,true)
    };

    if(![
      speed,position.x,position.y,position.z,
      quaternion.x,quaternion.y,quaternion.z,quaternion.w
    ].every(Number.isFinite) ||
       Math.abs(speed)>1000 ||
       Math.abs(position.x)>100000 ||
       Math.abs(position.y)>100000 ||
       Math.abs(position.z)>100000) return null;

    return {
      frames,
      speedKmh:speed,
      hasStarted:!!(flags&1),
      finishFrames:finish,
      nextCheckpointIndex:checkpoint,
      hasCheckpointToRespawnAt:!!(flags&4),
      position,
      quaternion
    };
  }

  function choose(state,id) {
    if(!state) {
      return {up:true,right:false,down:false,left:false,reset:false};
    }

    const lf=bot.lastFrames[id];
    if(lf===undefined || state.frames<lf) {
      bot.idx[id]=0;
      bot.acc[id]=0;
      bot.stuck[id]=0;
      bot.lastPos[id]=undefined;
      bot.hist[id]=[];
      bot.lastCrash[id]=-100000;
      bot.finLogged[id]=false;
    }
    bot.lastFrames[id]=state.frames;

    if(!state.hasStarted) {
      return {up:true,right:false,down:false,left:false,reset:false};
    }

    if(state.finishFrames!==null) {
      if(!bot.finLogged[id]) {
        bot.finLogged[id]=true;
        console.log("PTBOT_FINISH","frames="+state.finishFrames);
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
        bot.idx[id]=0;
        bot.acc[id]=0;
        bot.stuck[id]=0;
        bot.hist[id]=[];
      }
    }

    const speed=Math.abs(state.speedKmh);
    const i=nearestIndex(state.position,id,respawned);
    const ld=Math.max(18,Math.min(85,18+speed*0.25));
    const target=lookAhead(state.position,ld,i);

    // The car's local forward axis is +Z.
    const f=rotateVec(state.quaternion,{x:0,y:0,z:-1});
    const dx=target.x-state.position.x;
    const dz=target.z-state.position.z;
    const fl=Math.hypot(f.x,f.z)||1;
    const tl=Math.hypot(dx,dz)||1;
    const fx=f.x/fl, fz=f.z/fl;
    const tx=dx/tl, tz=dz/tl;

    const cross=fz*tx-fx*tz;
    const dot=Math.max(-1,Math.min(1,fx*tx+fz*tz));
    const angle=Math.atan2(cross,dot);
    const abs=Math.abs(angle);

    const tSpeed=targetSpeed(i);
    let up=true;
    let down=false;

    if(speed>tSpeed+8 && speed>40) {
      up=false;
      down=true;
    } else if(speed>tSpeed) {
      up=false;
    }

    if(abs>1.0 && speed>60) up=false;

    const s=Math.max(-1,Math.min(1,angle*STEER_GAIN));
    let e=(bot.acc[id] ?? 0)+s;
    let right=false;
    let left=false;

    if(e>=1) {
      right=true;
      e-=1;
    } else if(e<=-1) {
      left=true;
      e+=1;
    }
    bot.acc[id]=e;

    let reset=false;
    const lp=bot.lastPos[id];

    if(lp) {
      const mdx=state.position.x-lp.x;
      const mdy=state.position.y-lp.y;
      const mdz=state.position.z-lp.z;
      const moved=Math.sqrt(mdx*mdx+mdy*mdy+mdz*mdz);

      if(moved<0.18 && speed<5) {
        bot.stuck[id]=(bot.stuck[id] ?? 0)+1;
      } else {
        bot.stuck[id]=0;
      }
    }

    if((bot.stuck[id] ?? 0)>1500) {
      reset=true;
      bot.stuck[id]=0;
    }

    bot.lastPos[id]={
      x:state.position.x,
      y:state.position.y,
      z:state.position.z
    };

    const err=crossTrack(state.position,i);
    let hist=bot.hist[id];

    if(!hist) {
      hist=[];
      bot.hist[id]=hist;
    }

    if(state.frames%10===0 &&
       (hist.length===0 || hist[hist.length-1][0]!==state.frames)) {
      hist.push([state.frames,speed]);
      if(hist.length>14) hist.shift();
    }

    let vmax=0;
    for(const h of hist) {
      if(h[0]>=state.frames-120 && h[1]>vmax) vmax=h[1];
    }

    if(vmax-speed>45 &&
       state.frames-(bot.lastCrash[id] ?? -100000)>2000) {
      bot.lastCrash[id]=state.frames;
      console.log(
        "PTBOT_CRASH",
        "frame="+state.frames,
        "idx="+i+"/"+(N-1),
        "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0),
        "speed="+Math.round(vmax)+"->"+Math.round(speed),
        "offLine="+err.toFixed(1)+"m",
        "want="+Math.round(tSpeed),
        "ang="+angle.toFixed(2)
      );
    }

    if(reset) {
      console.log(
        "PTBOT_RESET",
        "frame="+state.frames,
        "idx="+i+"/"+(N-1),
        "pos="+state.position.x.toFixed(0)+","+state.position.z.toFixed(0)
      );
    }

    bot.dbg={
      i,
      v:Math.round(speed),
      want:Math.round(tSpeed),
      ang:+angle.toFixed(2),
      steer:+s.toFixed(2),
      off:+err.toFixed(1)
    };

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
      if(bot.recChunk.length>0) {
        console.log(
          "PTBOT_LAP",
          "run="+bot.recRun,
          "chunk="+bot.recChunkIndex,
          JSON.stringify(bot.recChunk)
        );
      }

      console.log(
        "PTBOT_LAP_DONE",
        "run="+bot.recRun,
        "finishFrames="+state.finishFrames
      );

      bot.recChunk=[];
      bot.recDone=true;
      return;
    }

    if(!state.hasStarted) return;
    if(state.frames%100!==0 || state.frames===bot.recLastSample) return;
    bot.recLastSample=state.frames;

    bot.recChunk.push([
      +state.position.x.toFixed(1),
      +state.position.y.toFixed(1),
      +state.position.z.toFixed(1),
      Math.round(state.speedKmh)
    ]);

    if(bot.recChunk.length>=100) {
      console.log(
        "PTBOT_LAP",
        "run="+bot.recRun,
        "chunk="+bot.recChunkIndex,
        JSON.stringify(bot.recChunk)
      );
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
      if(previous) {
        r=__ptBot.choose(previous,e.id);
      } else {
        r={up:true,right:false,down:false,left:false,reset:false};
      }

      try {
        globalThis.__ptDbgCount=(globalThis.__ptDbgCount||0)+1;
        if(globalThis.__ptDbgCount%2000===1 &&
           globalThis.__ptDbgCount<400000) {
          console.log(
            "PTBOT_STATE",
            globalThis.__ptDbgCount,
            previous
              ? JSON.stringify({speed:previous.speedKmh,pos:previous.position})
              : "decode returned null",
            "controls:",
            JSON.stringify(r),
            "dbg:",
            JSON.stringify(__ptBot.dbg)
          );
        }
      } catch (_) {}
    }
  }
`;

class TutorialBot extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Tutorial Bot";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.3.0";
    this.touchingPhysics = true;
  }

  init = (pml) => {
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

export let polyMod = new TutorialBot();
