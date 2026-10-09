import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

class TutorialBotTest extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Tutorial Bot TEST";
    this.modAuthor = "Kn1ght-09";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.1.9";
    this.touchingPhysics = false;
  }
}

export let polyMod = new TutorialBotTest();
