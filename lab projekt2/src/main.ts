let audiosElements: HTMLAudioElement[] = [];
let audioKeys: string[];
let isRecording: boolean = false;

let recordingTimeStamp: number = 0;
let channel1Play: any[] = [];
let channel2Play: any[] = [];
let channel3Play: any[] = [];
let channel4Play: any[] = [];



class Drumkit{
    constructor(){
        this.appRun();
    }

    appRun(): void{
        this.initializeSounds();
        this.attachEvents();
    }

    initializeSounds(): void{
        const audioNames: string[] = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        audioKeys = ["q", "w", "e", "r", "t", "a", "s", "d", "f"];

        const audiosContainer: HTMLDivElement = document.querySelector("#audioContainer");
        audioNames.forEach((audio,i) => {
            const builder: string = `<audio src='./../src/assets/audio/${audio}.wav' data-sound='${audio}' data-key='${audioKeys[i]}'></audio>`;
            audiosContainer.innerHTML += builder;
        });
        const audiosArray: HTMLAudioElement[] = Array.prototype.slice.call(audiosContainer.querySelectorAll("audio"));
        audiosArray.forEach(el => audiosElements.push(el));
       
    }

    attachEvents(): void{
        document.addEventListener("keypress", event => this.validateKey(event));

        const recordBtns: HTMLButtonElement[] = Array.prototype.slice.call(document.querySelectorAll(".recordBtn"));
        recordBtns.forEach(btn => btn.addEventListener("click", (e) => this.startRecording(e)));

        const playBtns: HTMLButtonElement[] = Array.prototype.slice.call(document.querySelectorAll(".playBtn"));
        playBtns.forEach(btn => btn.addEventListener("click", () => this.playRecording()));

    }

    validateKey(e: KeyboardEvent){
        if(audioKeys.length>0){
            const inputKey: string = e.key;
            const time: number  = e.timeStamp;
            
            audioKeys.forEach(k => {
                if(inputKey === k){
                    this.onKeyPress(inputKey, time);
                    return;
                }  
            });
        }
        else{
            return console.log("an error occured!")
        }

    }


    onKeyPress(key: string, time: number): void{
        const element: HTMLAudioElement = audiosElements.filter((el) => el.dataset.key === key)[0];
        element.currentTime = 0;
        element.play();

        this.playAnimation(key)

        if(isRecording){
            channel1Play.push({ time, element});
        }
    }

    playAnimation(key: string): void{
        const animatedDiv: HTMLDivElement = document.querySelector(`.tile[data-value="${key}"]`);
        animatedDiv.classList.remove("run-animation");
        void animatedDiv.offsetWidth;
        animatedDiv.classList.add("run-animation");
    }     

    startRecording(event: Event){
        recordingTimeStamp = event.timeStamp;
        const durationElement: HTMLInputElement = document.getElementById("rectime") as HTMLInputElement;
        const duration: number = (parseInt(durationElement.value)*1000);

        if(duration<1000 || duration>10000 || duration==null || duration == undefined) return;
        channel1Play = [];
        isRecording = true;
        
        setTimeout(() => {
            isRecording = false;
        }, duration)
    }

    playRecording(): void{
        channel1Play.forEach(sound => {
            const delayToPlaySound: number = sound.time - recordingTimeStamp;
            setTimeout(() => {
                sound.element.currentTime = 0;
                sound.element.play();
            }, delayToPlaySound)
        })
    }


}

const drumkit = new Drumkit();