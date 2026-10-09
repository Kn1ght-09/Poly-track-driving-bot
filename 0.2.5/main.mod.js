import {
  PolyMod,
  MixinType
} from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

// Harmless test: these insertions should not change driving controls.
const BOT_BODY = `
  if (e.userControls) {
    r = r;
  }
`;

const WORKER_HELPERS = `
  // Harmless worker insertion test.
`;

class TutorialBotTest extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Bot Test";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.2.5";
    this.touchingPhysics = false;
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

export let polyMod = new TutorialBotTest();
