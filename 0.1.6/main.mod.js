import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptTutorialBot) return;
  try {
    console.log("PTBOT_N_SOURCE", typeof n === "function" ? String(n) : "n not in scope");
    console.log("PTBOT_ONMESSAGE", typeof onmessage === "function" ? String(onmessage) : "no onmessage");
  } catch (err) {
    console.log("PTBOT_ERR", String(err));
  }
  const ROUTE = [{"x":320,"y":55,"z":20,"type":"Start","checkpointOrder":null},{"x":260,"y":55,"z":0,"type":"TurnSRight","checkpointOrder":null},{"x":180,"y":55,"z":0,"type":"Checkpoint","checkpointOrder":0},{"x":140,"y":45,"z":0,"type":"SlopeDownLong","checkpointOrder":null},{"x":120,"y":35,"z":0,"type":"Slope","checkpointOrder":null},{"x":100,"y":25,"z":0,"type":"Slope","checkpointOrder":null},{"x":80,"y":15,"z":0,"type":"Slope","checkpointOrder":null},{"x":60,"y":5,"z":0,"type":"Slope","checkpointOrder":null},{"x":-20,"y":0,"z":0,"type":"StraightWide","checkpointOrder":null},{"x":-80,"y":0,"z":0,"type":"OuterCornerWide","checkpointOrder":null},{"x":-180,"y":0,"z":0,"type":"CheckpointWide","checkpointOrder":1},{"x":-160,"y":0,"z":-20,"type":"OuterCornerWide","checkpointOrder":null},{"x":-100,"y":10,"z":-80,"type":"Checkpoint","checkpointOrder":2},{"x":-100,"y":10,"z":-40,"type":"SlopeUp","checkpointOrder":null},{"x":-120,"y":20,"z":40,"type":"StraightWide","checkpointOrder":null},{"x":-120,"y":20,"z":60,"type":"Plane","checkpointOrder":null},{"x":-140,"y":20,"z":140,"type":"StraightWide","checkpointOrder":null},{"x":-200,"y":20,"z":220,"type":"StraightWide","checkpointOrder":null},{"x":-260,"y":20,"z":260,"type":"TurnShortLeftWide","checkpointOrder":null},{"x":-300,"y":20,"z":280,"type":"Finish","checkpointOrder":null}];

  const bot = {
    enabled: true,
    states: Object.create(null),
    routeIndex: Object.create(null),
    stuck: Object.create(null),
    lastProgress: Object.create(null),
    lastPosition: Object.create(null)
  };

  function dist2(a,b) {
    const dx=a.x-b.x, dy=a.y-b.y, dz=a.z-b.z;
    return dx*dx+dy*dy+dz*dz;
  }

  function nearestIndex(p,start) {
    let best=start, bestD=Infinity;
    const lo=Math.max(0,start-3);
    const hi=Math.min(ROUTE.length-1,start+20);
    for(let i=lo;i<=hi;i++) {
      const d=dist2(p,ROUTE[i]);
      if(d<bestD) {
        bestD=d;
        best=i;
      }
    }
    return best;
  }

  function advanceIndex(p,id) {
    let i=bot.routeIndex[id] ?? 0;
    i=nearestIndex(p,i);
    while(i<ROUTE.length-1 && dist2(p,ROUTE[i+1]) < 24*24) i++;
    bot.routeIndex[id]=i;
    return i;
  }

  function lookAhead(p,speed,id) {
    let i=advanceIndex(p,id);
    let remaining=Math.max(18,Math.min(85,Math.abs(speed||0)*0.38));
    let a=ROUTE[i];

    while(i<ROUTE.length-1) {
      const b=ROUTE[i+1];
      const dx=b.x-a.x,dy=b.y-a.y,dz=b.z-a.z;
      const len=Math.hypot(dx,dy,dz);

      if(len>=remaining) {
        const f=remaining/Math.max(len,1e-9);
        return {
          x:a.x+dx*f,
          y:a.y+dy*f,
          z:a.z+dz*f,
          index:i
        };
      }

      remaining-=len;
      a=b;
      i++;
    }

    return {
      x:ROUTE[ROUTE.length-1].x,
      y:ROUTE[ROUTE.length-1].y,
      z:ROUTE[ROUTE.length-1].z,
      index:ROUTE.length-1
    };
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

    const frames=e[0]|(e[1]<<8)|(e[2]<<16);
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
    if(!state || !state.hasStarted || state.finishFrames!==null) {
      return {
        up:true,
        right:false,
        down:false,
        left:false,
        reset:false
      };
    }

    const target=lookAhead(state.position,state.speedKmh,id);

    const f=rotateVec(state.quaternion,{x:0,y:0,z:-1});

    const dx=target.x-state.position.x;
    const dz=target.z-state.position.z;

    const fl=Math.hypot(f.x,f.z)||1;
    const tl=Math.hypot(dx,dz)||1;

    const fx=f.x/fl;
    const fz=f.z/fl;
    const tx=dx/tl;
    const tz=dz/tl;

    const cross=fx*tz-fz*tx;
    const dot=Math.max(-1,Math.min(1,fx*tx+fz*tz));

    const angle=Math.atan2(cross,dot);
    const abs=Math.abs(angle);

    let up=true;
    let down=false;

    if(abs>1.05 && Math.abs(state.speedKmh)>105) {
      up=false;
      down=true;
    }
    else if(abs>0.78 && Math.abs(state.speedKmh)>145) {
      up=false;
      down=true;
    }
    else if(abs>0.55 && Math.abs(state.speedKmh)>175) {
      up=false;
    }

    let steer=angle*1.7;
    steer=Math.max(-1,Math.min(1,steer));

    let reset=false;

    const lp=bot.lastPosition[id];
    const rp=bot.lastProgress[id]??0;
    const ri=bot.routeIndex[id]??0;

    if(lp) {
      const moved=Math.sqrt(dist2(state.position,lp));
      const progress=ri-rp;

      if(moved<0.18 && Math.abs(state.speedKmh)<5) {
        bot.stuck[id]=(bot.stuck[id]??0)+1;
      }
      else {
        bot.stuck[id]=0;
      }

      if(progress>0) {
        bot.lastProgress[id]=ri;
      }
    }
    else {
      bot.lastProgress[id]=ri;
    }

    if((bot.stuck[id]??0)>220 && state.hasCheckpointToRespawnAt) {
      reset=true;
      bot.stuck[id]=0;
    }

    bot.lastPosition[id]={...state.position};

    return {
      up,
      right:steer>0.08,
      down,
      left:steer<-0.08,
      reset
    };
  }

  bot.decode=decode;
  bot.choose=choose;
  bot.route=ROUTE;
  globalThis.__ptTutorialBot=bot;
})();
`;

const BOT_BODY = `
  if (e.userControls && globalThis.__ptTutorialBot?.enabled) {
    let previous = null;

    try {
      const previousBuffer = new Uint8Array(t.HEAPU8.buffer, i, 227).slice();
      previous = globalThis.__ptTutorialBot.decode(previousBuffer.buffer);
    }
    catch (_) {}

    if (previous) {
      r = globalThis.__ptTutorialBot.choose(previous, e.id);
    }
    else {
      r = {
        up: true,
        right: false,
        down: false,
        left: false,
        reset: false
      };
    }
  }
`;

class TutorialBot extends PolyMod {
  constructor() {
    super();

    this.modName = "PolyTrack Tutorial Bot";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.1.6";
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
