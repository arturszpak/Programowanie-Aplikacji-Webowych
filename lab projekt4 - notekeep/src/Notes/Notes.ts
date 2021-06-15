import './Notes.scss';
import {userNotes } from '../AppStorage/AppStorage';

export default class Notes{
    notesContainer: HTMLDivElement;
    isUpdated: boolean = false;
    updatingNote: HTMLDivElement = null;


    renderNote(note: HTMLDivElement, container: HTMLDivElement){
        this.notesContainer = container;
        this.notesContainer.appendChild(note);
    }

    editNote(note: HTMLDivElement){
        const noteTitle = note.querySelector(".note__heading") as HTMLInputElement;
        const noteTextContent = note.querySelector(".note__content") as HTMLInputElement;

        const titleInput = document.getElementById("note-inputTitle") as HTMLInputElement;
        const textContentInput = document.getElementById("note-input") as HTMLInputElement;

        titleInput.value = noteTitle.textContent;
        textContentInput.value = noteTextContent.textContent;

        this.updatingNote = note;
        this.isUpdated = true;
    }

    pinNote(note: HTMLDivElement){
        // Make copy of the note and then append it to the other container
        const noteCopy: HTMLDivElement = note;
        
        const pinnedContainer = document.querySelector(".notekeep__notesPinned") as HTMLDivElement;
        const regularContainer = document.querySelector(".notekeep__notesWrapper") as HTMLDivElement;

        const parentContainer = note.parentElement;
        note.remove();
        if(parentContainer == pinnedContainer){
            this.renderNote(noteCopy, regularContainer)
        } 
        else{
            this.renderNote(noteCopy, pinnedContainer)
        } 
        

        

    }
    removeNote(note: HTMLDivElement, title: string, content: string, color:string){
        const element: object = {title, content, color};
        const index: number = this.findNoteIndex(element)
        const notes = userNotes;
        if(index > -1){
            notes.splice(index, 1);
            localStorage.setItem("userNotes", JSON.stringify(notes));
            note.remove();
        }
    }

    findNoteIndex(element: object): number{
        let index: number
        const notes = userNotes;
        notes.forEach((noteCompare: object, i) =>{
            if(JSON.stringify(noteCompare) === JSON.stringify(element))
            index = i;
        });
        return index;
    }

    

    addListenersToNoteControls(note: HTMLDivElement, title: string, content: string, color:string){
        const editBtn = note.querySelector(".note__controls__edit");
        const pinBtn = note.querySelector(".note__controls__pin");
        const removeBtn = note.querySelector(".note__controls__remove");

        editBtn.addEventListener("click", () => this.editNote(note));
        pinBtn.addEventListener("click", () => this.pinNote(note));
        removeBtn.addEventListener("click", () => this.removeNote(note, title, content, color));
    }
}