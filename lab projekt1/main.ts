class DataManager {
    input1: HTMLInputElement;
    input2: HTMLInputElement;
    input3: HTMLInputElement;
    input4: HTMLInputElement;

    sum: HTMLInputElement;
    average: HTMLInputElement;
    min: HTMLInputElement;
    max: HTMLInputElement;


    constructor(){
        this.getInputs();
        this.watchInputValues();
    }

    getInputs(): void{
        this.input1 = document.querySelector("#dataInput1");
        this.input2 = document.querySelector("#dataInput2");
        this.input3 = document.querySelector("#dataInput3");
        this.input4 = document.querySelector("#dataInput4");

        this.sum = document.querySelector("#resultInput1");
        this.average = document.querySelector("#resultInput2");
        this.min = document.querySelector("#resultInput3");
        this.max = document.querySelector("#resultInput4");
     }

    watchInputValues(): void{
        this.input1.addEventListener("input", () => this.computeResults());
        this.input2.addEventListener("input", () => this.computeResults());
        this.input3.addEventListener("input", () => this.computeResults());
        this.input4.addEventListener("input", () => this.computeResults());
    }

    computeResults(): void{
       const data1 = +this.input1.value;
       const data2 = +this.input2.value;
       const data3 = +this.input3.value;
       const data4 = +this.input4.value;

       const sum = data1 + data2+ data3+ data4;
       const avg = sum / 4;
       const min = Math.min(data1, data2, data3, data4);
       const max = Math.max(data1, data2, data3, data4);

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