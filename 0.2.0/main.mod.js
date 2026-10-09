import {
  PolyMod,
  MixinType
} from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

class TutorialBotTest extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Bot Test";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.2.0";
    this.touchingPhysics = false;
  }

  init = (pml) => {
    pml.registerSimWorkerMixin({
      type: MixinType.INSERT,
      token: "function n(e, r) {",
      func: "\n  // PTBOT_MIXIN_TEST\n"
    });
  };
}

export let polyMod = new TutorialBotTest();
