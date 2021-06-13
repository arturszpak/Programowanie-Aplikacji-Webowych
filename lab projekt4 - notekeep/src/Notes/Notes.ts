import './Notes.scss';

export default class Notes{
    notesContainer: HTMLDivElement;
    isUpdated: boolean = false;
    updatingNote: HTMLDivElement = null;

    constructor(){

    }

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
        if(parentContainer == pinnedContainer) this.renderNote(noteCopy, regularContainer)
        else this.renderNote(noteCopy, pinnedContainer)

    }

    addListenersToNoteControls(note: HTMLDivElement){
        const editBtn = note.querySelector(".note__controls__edit");
        const pinBtn = note.querySelector(".note__controls__pin");
        const removeBtn = note.querySelector(".note__controls__remove");

        editBtn.addEventListener("click", () => this.editNote(note));
        pinBtn.addEventListener("click", () => this.pinNote(note));
        removeBtn.addEventListener("click", () => note.remove());
    }
}