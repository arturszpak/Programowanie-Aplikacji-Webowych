class DataManager {
    sum: HTMLInputElement;
    average: HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;

    inputArray: HTMLInputElement[];
    deleteImageArray: HTMLImageElement[];

    constructor(){
        this.inputArray = [];
        this.deleteImageArray = [];
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
                this.watchDeleteInput();
                this.runManager();
                 
            }else{
                const output: string = `<p style="color:red">Input value must be between 1 and 50!</p>`;
                document.querySelector("#err").innerHTML = output;
                this.runApp();
            }
        });
    }

    generateInputs(amount: number): void{
        const dataDiv: HTMLDivElement = document.querySelector(".dataInputs");
        for(let i=0; i<amount; i++){
            const output: string  = 
            `<div class="inputContainer">
                <input type="number" class="dataInput" id="data${i+1}" placeholder="Enter numeric value" >
                <img src="../src/assets/icon/close.png" alt="close" class="deleteInput" />
            </div>`;
            dataDiv.innerHTML += output;
        }
    }

    watchDeleteInput(): void{
        const deleteBtns = document.querySelectorAll(".deleteInput");
        deleteBtns.forEach(btn => btn.addEventListener("click", (event) => this.deleteInput(event)));
    }

    deleteInput(event): void{
        const element: HTMLDivElement = event.target.parentNode;
        element.remove();
        this.runManager();
        this.computeResults();
    }

    runManager(): void{
        this.getInputs();
        this.watchInputValues();
    }

    getInputs(): void{
        this.inputArray = [];
        const dataInputs= document.querySelectorAll(".dataInput");
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

