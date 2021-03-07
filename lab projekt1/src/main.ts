class DataManager {
    sum: HTMLInputElement;
    average: HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;

    inputArray: HTMLInputElement[];

    constructor(){
        this.inputArray = [];
        this.runApp();
    }

    runApp():void{
        const inputCountBtn: HTMLButtonElement = document.querySelector("#generateInputsBtn");
        inputCountBtn.addEventListener("click", () => {
            const inputCount: HTMLInputElement = document.querySelector("#inputCount");
            if(+inputCount.value>0 && +inputCount.value <=50){
                const generateDiv: HTMLDivElement = document.querySelector(".generateData");
                generateDiv.style.display = "none";
        
                const dataDiv: HTMLDivElement = document.querySelector(".data");
                const resultsDiv: HTMLDivElement = document.querySelector(".results");
        
                dataDiv.style.display = "flex";
                resultsDiv.style.display = "flex";
        
                this.generateInputs(+inputCount.value);
                this.runManager();
                 
            }else{
                const p: HTMLParagraphElement = document.createElement('p');
                p.textContent = "Input value must be between 1 and 50!";
                p.style.color = "red";
                p.style.fontSize = "1.2rem";
                document.querySelector(".generateData").appendChild(p);
            }
        });
    }

    generateInputs(amount: number): void{
        const dataDiv: HTMLDivElement = document.querySelector(".dataInputs");
        for(let i=0; i<amount; i++){
            const input: HTMLInputElement = document.createElement('input');
            input.type = "number";
            input.classList.add("dataInput");
            input.placeholder = "Enter numeric value...";
            dataDiv.appendChild(input);
        }
    }

    runManager(): void{
        this.getInputs();
        this.watchInputValues();
    }

    getInputs(): void{
        const dataInputs = document.querySelectorAll(".dataInput");
        dataInputs.forEach(input => this.inputArray.push(input as HTMLInputElement));

        this.sum = document.querySelector("#sumInput");
        this.average = document.querySelector("#averageInput");
        this.min = document.querySelector("#minInput");
        this.max = document.querySelector("#maxInput");
     }
     
    watchInputValues(): void{
        this.inputArray.forEach(input => {
            input.addEventListener("input", () => this.computeResults())
        })
    }

    computeResults(): void{
        const inputsLength = this.inputArray.length;
        let sum = 0;
        this.inputArray.forEach(input => sum += +input.value);
        
        const avg: number = sum / inputsLength;
        const inputValues: number[] = this.inputArray.map((el) => Number(el.value)); 
        const min: number = Math.min(...inputValues);
        const max: number = Math.max(...inputValues);

        this.showData(sum, avg, min, max)
    }

    showData(sum: number, avg: number, min: number, max: number){
        this.sum.value = sum.toString();
        this.average.value = avg.toString();
        this.min.value = min.toString();
        this.max.value = max.toString();
    }
}

const manager = new DataManager();

