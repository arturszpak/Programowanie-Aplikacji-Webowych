import AppStorage from './AppStorage/AppStorage';
import Note from "./Note/Note";

const noteClass = new Note();
const storage = new AppStorage();

export default class App {

    addNoteBtn: HTMLButtonElement;
    inputContainer: HTMLInputElement;
    inputTitle: HTMLInputElement;
    notesWrapper: HTMLDivElement;
    colorRadio: HTMLInputElement;

    constructor() {
        this.appStart();
        this.loadLS();
    }

    appStart(): void{
        this.addListenerToCreateNoteBtn();
    }

    loadLS(){
        // localStorage.removeItem("userNotes");
        if(localStorage.getItem("userNotes") !== null){
            const userNotes = [...JSON.parse(localStorage["userNotes"])];
            userNotes.forEach((note) => noteClass.createNote(note.title, note.content, note.color));
        }
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
            noteClass.createNote(this.inputTitle.value, this.inputContainer.value, this.colorRadio.value)
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