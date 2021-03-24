var audiosElements = [];
var audioKeys;
var isRecording = false;
var recordingTimeStamp = 0;
var channelsData = [[{}], [{}], [{}], [{}]];
var recordingChannel;
var recordBtns;
var playBtns;
var Drumkit = /** @class */ (function () {
    function Drumkit() {
        this.appRun();
    }
    Drumkit.prototype.appRun = function () {
        this.initializeSounds();
        this.attachEvents();
    };
    Drumkit.prototype.initializeSounds = function () {
        var audioNames = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        audioKeys = ["q", "w", "e", "r", "t", "a", "s", "d", "f"];
        var audiosContainer = document.querySelector("#audioContainer");
        audioNames.forEach(function (audio, i) {
            var builder = "<audio src='./../src/assets/audio/" + audio + ".wav' data-sound='" + audio + "' data-key='" + audioKeys[i] + "'></audio>";
            audiosContainer.innerHTML += builder;
        });
        var audiosArray = Array.prototype.slice.call(audiosContainer.querySelectorAll("audio"));
        audiosArray.forEach(function (el) { return audiosElements.push(el); });
    };
    Drumkit.prototype.attachEvents = function () {
        var _this = this;
        document.addEventListener("keypress", function (event) { return _this.validateKey(event); });
        recordBtns = Array.prototype.slice.call(document.querySelectorAll(".recordBtn"));
        recordBtns.forEach(function (btn) { return btn.addEventListener("click", function (e) { return _this.startRecording(e); }); });
        playBtns = Array.prototype.slice.call(document.querySelectorAll(".playBtn"));
        playBtns.forEach(function (btn) { return btn.addEventListener("click", function (e) { return _this.playRecording(e); }); });
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
        if (isRecording)
            channelsData[recordingChannel].push({ time: time, element: element, key: key, recordingTimeStamp: recordingTimeStamp });
    };
    Drumkit.prototype.playAnimation = function (key) {
        var animatedDiv = document.querySelector(".tile[data-value=\"" + key + "\"]");
        animatedDiv.classList.remove("run-animation");
        void animatedDiv.offsetWidth;
        animatedDiv.classList.add("run-animation");
    };
    Drumkit.prototype.startRecording = function (event) {
        var _this = this;
        recordingTimeStamp = event.timeStamp;
        var durationElement = document.getElementById("rectime");
        var duration = (parseInt(durationElement.value) * 1000);
        if (duration < 1000 || duration > 10000 || duration == null || duration == undefined)
            return;
        var targetElement = (event.target);
        var channelID = parseInt(targetElement.dataset.channel);
        channelsData[channelID - 1] = [];
        isRecording = true;
        this.disableButtons(true);
        recordingChannel = channelID - 1;
        setTimeout(function () {
            isRecording = false;
            _this.disableButtons(false);
        }, duration);
    };
    Drumkit.prototype.playRecording = function (event) {
        var target = event.target;
        var playChannelID = parseInt(target.dataset.channel) - 1;
        if (channelsData[playChannelID] == undefined)
            return;
        channelsData[playChannelID].forEach(function (sound) {
            var delayToPlaySound = sound.time - sound.recordingTimeStamp;
            setTimeout(function () {
                sound.element.currentTime = 0;
                sound.element.play();
            }, delayToPlaySound);
        });
    };
    Drumkit.prototype.disableButtons = function (state) {
        recordBtns.forEach(function (btn) {
            btn.disabled = state;
            btn.style.cursor = state ? "default" : "pointer";
            btn.style.backgroundColor = state ? "gray" : "#d9534f";
        });
        playBtns.forEach(function (btn) {
            btn.disabled = state;
            btn.style.cursor = state ? "default" : "pointer";
            btn.style.backgroundColor = state ? "gray" : "#5cb85c";
        });
    };
    return Drumkit;
}());
var drumkit = new Drumkit();
