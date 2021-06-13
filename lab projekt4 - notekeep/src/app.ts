import Note from "./Note/Note";

const note = new Note();

export default class App {

    addNoteBtn: HTMLButtonElement;
    inputContainer: HTMLInputElement;
    inputTitle: HTMLInputElement;
    notesWrapper: HTMLDivElement;
    colorRadio: HTMLInputElement;


    constructor() {
        this.appStart();
    }

    appStart(): void{
        this.addListenerToCreateNoteBtn();
    }

    addListenerToCreateNoteBtn(){
        const inputTitle = document.getElementById("note-inputTitle") as HTMLInputElement;
        this.inputTitle = inputTitle;
        const inputCointainer =  document.getElementById("note-input") as HTMLInputElement;
        this.inputContainer = inputCointainer;


        const addBtn = document.querySelector('.notekeep__addNoteBtn') as HTMLButtonElement;
        this.addNoteBtn = addBtn;
        this.addNoteBtn.addEventListener("click", () => {
            const isInputValidated = this.validateUserInput(this.inputContainer.value);
            const isTitleValidated = this.validateUserInput(this.inputTitle.value);

            const colorValue = document.querySelector('input[name="color"]:checked') as HTMLInputElement;
            this.colorRadio = colorValue;
            
            if(!isInputValidated || !isTitleValidated){
                this.inputContainer.value = "";
                this.inputTitle.value = "";
                return;
            }
            note.createNote(this.inputContainer.value, this.inputTitle.value, this.colorRadio.value)
            this.inputContainer.value = "";
            this.inputTitle.value = "";
        });
    }

    validateUserInput(text: string): boolean{
        if(text == "") return false;
        if(text.length > 2000 || text.length === 0) return false;

        return true;
    }



}