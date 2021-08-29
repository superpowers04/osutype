const { Plugin } = require('powercord/entities');

module.exports = class OsuTyping extends Plugin {
    startPlugin() {
        //add an audio element to the page root
        const audio = document.createElement("audio");
        audio.src = "https://github.com/happyori/OsuTyping/raw/master/menuclick.wav";
        audio.id = "osutype";
        audio.setAttribute("style", "display: none;");
        document.body.appendChild(audio);
        document.addEventListener("keydown", this.keyDown)
    }
    pluginWillUnload() {
        //remove the audio element from the page root
        document.body.removeChild(document.getElementById("osutype"));
        document.removeEventListener("keydown", this.keyDown)
    }
    keyDown(e) {
        //seek the audio element to 0 seconds and play it
        document.getElementById("osutype").currentTime = 0;
        document.getElementById("osutype").play();

    }

};