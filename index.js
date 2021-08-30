const { Plugin } = require('powercord/entities');
const Settings = require('./component/Settings');
const { React } = require('powercord/webpack');
var typingAudio = {};
var currentAudio;
module.exports = class OsuTyping extends Plugin {
    startPlugin() {
        // Reset main array of audio elements
        typingAudio = {};

        // Create all audio elements
        typingAudio[0] = document.createElement("audio");
        typingAudio[0].src = "https://github.com/ppy/osu-resources/raw/master/osu.Game.Resources/Samples/Keyboard/key-press-1.mp3";
        typingAudio[0].id = "normalType";

        typingAudio[1] = document.createElement("audio");
        typingAudio[1].src = "https://github.com/ppy/osu-resources/raw/master/osu.Game.Resources/Samples/Keyboard/key-delete.mp3";
        typingAudio[1].id = "bkSp";

        typingAudio[2] = document.createElement("audio");
        typingAudio[2].src = "https://github.com/ppy/osu-resources/raw/master/osu.Game.Resources/Samples/Keyboard/key-confirm.mp3";
        typingAudio[2].id = "ret";

        typingAudio[3] = document.createElement("audio");
        typingAudio[3].src = "https://github.com/ppy/osu-resources/raw/master/osu.Game.Resources/Samples/Keyboard/key-movement.mp3";
        typingAudio[3].id = "ret";

        typingAudio[4] = document.createElement("audio");
        typingAudio[4].src = "https://github.com/ppy/osu-resources/raw/master/osu.Game.Resources/Samples/Keyboard/key-caps.mp3";
        typingAudio[4].id = "ret";


        // Append audio elements to document
        for (var i = typingAudio.length - 1; i >= 0; i--) {
            typingAudio[i].setAttribute("style", "display: none;");
            typingAudio[i] = this.settings.get("volume", 100)/100;
            document.body.appendChild(typingAudio[i]);
        }
        
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
        //remove all audio elements from the page root
        for (var i = typingAudio.length - 1; i >= 0; i--) {
            document.body.removeChild(typingAudio[i].id);
        }
        typingAudio = null;
        currentAudio = null;
        
        document.removeEventListener("keydown", this.keyDown);
        powercord.api.settings.unregisterSettings(this.entityID);

    }
    keyDown(e) {
        //seek the audio element to 0 seconds and play it
        if (validKeycodes.includes(e.keyCode)) {
            switch (e.keyCode){
                case 37: // Left 
                case 38: // Up
                case 39: // Right
                case 40: // Down
                    currentAudio = typingAudio[3];
                    break;
                case 20: // Caps
                    currentAudio = typingAudio[4];
                    break;
                case 13: // Return
                    currentAudio = typingAudio[2];
                    break;
                case 8: // Backspace
                    currentAudio = typingAudio[1];
                    break;
                default:
                    currentAudio = typingAudio[0];
                    break;
            }
            // console.log(e.keyCode)
            currentAudio.currentTime = 0;
            currentAudio.play();
        }
    }
};
const validKeycodes = [
    8,
    9,
    13,
    16,
    17,
    18,
    19,
    20,
    27,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    45,
    46,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    144,
    145,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
]
