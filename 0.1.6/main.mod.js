import { PolyMod, MixinType } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// "record" = you drive by hand and the mod records your lap to the Console.
// "drive"  = the bot drives.
const MODE = "record";

const WORKER_HELPERS = `
(() => {
  if (globalThis.__ptTutorialBot) return;
  const ROUTE = [{"x":320,"y":55,"z":20,"type":"Start","checkpointOrder":null},{"x":260,"y":55,"z":0,"type":"TurnSRight","checkpointOrder":null},{"x":180,"y":55,"z":0,"type":"Checkpoint","checkpointOrder":0},{"x":140,"y":45,"z":0,"type":"SlopeDownLong","checkpointOrder":null},{"x":120,"y":35,"z":0,"type":"Slope","checkpointOrder":null},{"x":100,"y":25,"z":0,"type":"Slope","checkpointOrder":null},{"x":80,"y":15,"z":0,"type":"Slope","checkpointOrder":null},{"x":60,"y":5,"z":0,"type":"Slope","checkpointOrder":null},{"x":-20,"y":0,"z":0,"type":"StraightWide","checkpointOrder":null},{"x":-80,"y":0,"z":0,"type":"OuterCornerWide","checkpointOrder":null},{"x":-180,"y":0,"z":0,"type":"CheckpointWide","checkpointOrder":1},{"x":-160,"y":0,"z":-20,"type":"OuterCornerWide","checkpointOrder":null},{"x":-100,"y":10,"z":-80,"type":"Checkpoint","checkpointOrder":2},{"x":-100,"y":10,"z":-40,"type":"SlopeUp","checkpointOrder":null},{"x":-120,"y":20,"z":40,"type":"StraightWide","checkpointOrder":null},{"x":-120,"y":20,"z":60,"type":"Plane","checkpointOrder":null},{"x":-140,"y":20,"z":140,"type":"StraightWide","checkpointOrder":null},{"x":-200,"y":20,"z":220,"type":"StraightWide","checkpointOrder":null},{"x":-260,"y":20,"z":260,"type":"TurnShortLeftWide","checkpointOrder":null},{"x":-300,"y":20,"z":280,"type":"Finish","checkpointOrder":null}];

  const bot = {
    mode: "${MODE}",
    recRun: 0,
    recChunk: [],
    recChunkIndex: 0,
    recDone: false,
    recLastFrames: undefined,
    recLastSample: -1,
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

    // The game's state buffer starts with a 4-byte header, then the fields.
    let o=4;

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

    if(![speed,position.x,position.y,position.z,quaternion.x,quaternion.y,quaternion.z,quaternion.w].every(Number.isFinite)
      || Math.abs(speed)>1000
      || Math.abs(position.x)>100000 || Math.abs(position.y)>100000 || Math.abs(position.z)>100000) return null;

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

    // The car's local forward axis is +Z (confirmed from logged heading vs. movement).
    const f=rotateVec(state.quaternion,{x:0,y:0,z:1});

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

    bot.dbg={ri:ri,tx:+target.x.toFixed(1),tz:+target.z.toFixed(1),ang:+angle.toFixed(2),steer:+steer.toFixed(2)};
    bot.lastPosition[id]={...state.position};

    return {
      up,
      right:steer>0.08,
      down,
      left:steer<-0.08,
      reset
    };
  }

  function record(state,id) {
    if(!state) return;

    // A race restart makes the frame counter go back down: start a new run.
    if(bot.recLastFrames!==undefined && state.frames<bot.recLastFrames) {
      bot.recRun++;
      bot.recChunk=[];
      bot.recChunkIndex=0;
      bot.recDone=false;
      bot.recLastSample=-1;
      console.log("PTBOT_LAP_NEW_RUN", bot.recRun);
    }
    bot.recLastFrames=state.frames;

    if(bot.recDone) return;

    if(state.finishFrames!==null) {
      if(bot.recChunk.length>0) {
        console.log("PTBOT_LAP", "run="+bot.recRun, "chunk="+bot.recChunkIndex, JSON.stringify(bot.recChunk));
      }
      console.log("PTBOT_LAP_DONE", "run="+bot.recRun, "finishFrames="+state.finishFrames);
      bot.recChunk=[];
      bot.recDone=true;
      return;
    }

    if(!state.hasStarted) return;
    if(state.frames%100!==0 || state.frames===bot.recLastSample) return;
    bot.recLastSample=state.frames;

    // sample: [x, y, z, speed km/h]
    bot.recChunk.push([
      +state.position.x.toFixed(1),
      +state.position.y.toFixed(1),
      +state.position.z.toFixed(1),
      Math.round(state.speedKmh)
    ]);

    if(bot.recChunk.length>=100) {
      console.log("PTBOT_LAP", "run="+bot.recRun, "chunk="+bot.recChunkIndex, JSON.stringify(bot.recChunk));
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
    }
    catch (_) {}

    if (__ptBot.mode === "record") {
      try { __ptBot.record(previous, e.id); } catch (_) {}
    }
    else if (__ptBot.enabled) {
      if (previous) {
        r = __ptBot.choose(previous, e.id);
      }
      else {
        r = { up: true, right: false, down: false, left: false, reset: false };
      }

      try {
        globalThis.__ptDbgCount = (globalThis.__ptDbgCount || 0) + 1;
        if (globalThis.__ptDbgCount % 500 === 1 && globalThis.__ptDbgCount < 400000) {
          console.log(
            "PTBOT_STATE",
            globalThis.__ptDbgCount,
            previous
              ? JSON.stringify({ speed: previous.speedKmh, pos: previous.position })
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
