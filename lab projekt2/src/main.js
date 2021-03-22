var audiosElements = [];
var audioKeys;
var Drumkit = /** @class */ (function () {
    function Drumkit() {
        this.appRun();
    }
    Drumkit.prototype.appRun = function () {
        this.initializeSounds();
    };
    Drumkit.prototype.initializeSounds = function () {
        var _this = this;
        var audioNames = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        audioKeys = ["q", "w", "e", "r", "t", "a", "s", "d", "f"];
        var audiosContainer = document.querySelector("#audioContainer");
        audioNames.forEach(function (audio, i) {
            var builder = "<audio src='./../src/assets/audio/" + audio + ".wav' data-sound='" + audio + "' data-key='" + audioKeys[i] + "'></audio>";
            audiosContainer.innerHTML += builder;
        });
        var audiosArray = Array.prototype.slice.call(audiosContainer.querySelectorAll("audio"));
        audiosArray.forEach(function (el) { return audiosElements.push(el); });
        document.addEventListener("keypress", function (event) { return _this.validateKey(event); });
    };
    Drumkit.prototype.validateKey = function (e) {
        var _this = this;
        if (audioKeys.length > 0) {
            var inputKey_1 = e.key;
            var time_1 = e.timeStamp;
            audioKeys.forEach(function (k) {
                if (inputKey_1 === k) {
                    _this.onKeyPress(inputKey_1, time_1);
                    return;
                }
            });
        }
        else {
            return console.log("an error occured!");
        }
    };
    Drumkit.prototype.onKeyPress = function (key, time) {
        var element = audiosElements.filter(function (el) { return el.dataset.key === key; })[0];
        element.currentTime = 0;
        element.play();
        this.playAnimation(key);
    };
    Drumkit.prototype.playAnimation = function (key) {
        var animatedDiv = document.querySelector(".tile[data-value=\"" + key + "\"]");
        animatedDiv.classList.remove("run-animation");
        void animatedDiv.offsetWidth;
        animatedDiv.classList.add("run-animation");
    };
    return Drumkit;
}());
var drumkit = new Drumkit();
