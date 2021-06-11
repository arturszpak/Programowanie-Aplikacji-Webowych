import './Notes.scss';

export default class Notes{
    notesContainer: HTMLDivElement;

    constructor(){

    }

    renderNote(note: HTMLDivElement){
        const notesContainer = document.querySelector(".notekeep__notesWrapper") as HTMLDivElement;
        this.notesContainer = notesContainer;
        this.notesContainer.appendChild(note);
    }
}