const { Plugin } = require('powercord/entities');
const Settings = require('./components/Settings');
const { React } = require('powercord/webpack');
module.exports = class OsuTyping extends Plugin {
    startPlugin() {
        //add an audio element to the page root
        const audio = document.createElement("audio");
        audio.src = "https://github.com/happyori/OsuTyping/raw/master/menuclick.wav";
        audio.id = "osutype";
        audio.setAttribute("style", "display: none;");
        audio.volume = this.settings.getElementById("volume", 100)/100;
        document.body.appendChild(audio);
        document.addEventListener("keydown", this.keyDown)
        powercord.api.settings.registerSettings(
            this.entityID,
            {
                category: this.entityID,
                label: "OsuTyping",
                render: (props) => React.createElement(Settings, {main: this, ...props})
                
            }
        )
    }
    pluginWillUnload() {
        //remove the audio element from the page root
        document.body.removeChild(document.getElementById("osutype"));
        document.removeEventListener("keydown", this.keyDown);
        powercord.api.settings.unregisterSettings(this.entityID);

    }
    keyDown(e) {
        //seek the audio element to 0 seconds and play it
        document.getElementById("osutype").currentTime = 0;
        document.getElementById("osutype").play();

    }

};