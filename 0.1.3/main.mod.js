import { PolyMod } from "https://cdn.polymodloader.com/cb/PolyTrackMods/PolyModLoader/0.6.3/PolyTypes.js";

class TutorialBot extends PolyMod {
  constructor() {
    super();
    this.modName = "PolyTrack Tutorial Bot";
    this.modAuthor = "OpenAI";
    this.modID = "polytrack-tutorial-bot";
    this.modVersion = "0.1.3";
    this.touchingPhysics = false;
  }

  init(pml) {
    console.log("Tutorial bot init ran");
    alert("Tutorial bot init ran");
  }
}

export let polyMod = new TutorialBot();
