export default class Notes{
    
    pinnedContainer: HTMLDivElement;
    notesContainer: HTMLDivElement;

    constructor(){
        this.getNotesContainers()
    }

    renderNote(note: HTMLDivElement, isPinned: boolean){
        if(isPinned) this.pinnedContainer.appendChild(note);
        else this.notesContainer.appendChild(note);

    }

    getNotesContainers(){
        const pinnedContainer = document.querySelector('.notekeep__notesPinned') as HTMLDivElement;
        this.pinnedContainer = pinnedContainer;
      
        const notesContainer = document.querySelector('.notekeep__notesWrapper') as HTMLDivElement;
        this.notesContainer = notesContainer;
    }

    pinNote(note: HTMLDivElement){
        const parentContainer = note.parentElement;

        if(parentContainer == this.pinnedContainer){
            this.pinnedContainer.removeChild(note);
            this.notesContainer.appendChild(note);
        } 
        else{
            this.notesContainer.removeChild(note);
            this.pinnedContainer.appendChild(note);
        }
    }

    emptyContainer() {
        this.pinnedContainer.innerHTML = '';
        this.notesContainer.innerHTML = '';
      }
}