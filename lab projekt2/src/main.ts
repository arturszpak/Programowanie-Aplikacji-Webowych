let audiosElements: HTMLAudioElement[] = [];
let audioKeys: string[];

class Drumkit{
    constructor(){
        this.appRun();
    }

    appRun(): void{
        this.initializeSounds()
    }

    initializeSounds(): void{
        const audioNames: string[] = ["boom", "clap", "hihat", "kick", "openhat", "ride", "snare", "tink", "tom"];
        audioKeys = ["q", "w", "e", "r", "t", "a", "s", "d", "f"];

        const audiosContainer = document.querySelector("#audioContainer");
        audioNames.forEach((audio,i) => {
            const builder: string = `<audio src='./../src/assets/audio/${audio}.wav' data-sound='${audio}' data-key='${audioKeys[i]}'></audio>`;
            audiosContainer.innerHTML += builder;
        });
        const audiosArray: HTMLAudioElement[] = Array.prototype.slice.call(audiosContainer.querySelectorAll("audio"));
        audiosArray.forEach(el => audiosElements.push(el));
        document.addEventListener("keypress", event => this.validateKey(event));
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
    }

    playAnimation(key: string): void{
        const animatedDiv: HTMLDivElement = document.querySelector(`.tile[data-value="${key}"]`);
        animatedDiv.classList.remove("run-animation");
        void animatedDiv.offsetWidth;
        animatedDiv.classList.add("run-animation");
    }


}

const drumkit = new Drumkit();