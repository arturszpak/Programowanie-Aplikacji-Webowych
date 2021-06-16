import Note from './Note/Note';
import Notes from './Notes/Notes';
import AppStorage from './AppStorage/AppStorage';
import AppFirebaseStorage from './AppFirebaseStorage/AppFirebaseStorage';
import environment from '../config';

let newAppStorage: AppFirebaseStorage | AppStorage;

if (environment === 'firebase') {
  newAppStorage = new AppFirebaseStorage();
} else {
  newAppStorage = new AppStorage();
}

const note = new Note();

export default class App {
    addNoteBtn: HTMLButtonElement;
    inputContainer: HTMLDivElement;
    colorInput: HTMLSelectElement;


    constructor(){
        this.appStart();
    }
    
    appStart(){
        this.addListenerToCreateNoteBtn();
        this.loadNotesLS()
    }

    async loadNotesLS(){
        const notes = new Notes();
        notes.emptyContainer();
    
        const savedNotes = await newAppStorage.getData();
    
        savedNotes.forEach((data) => {
          note.createNoteFromLS(data);
        });
    }

    addListenerToCreateNoteBtn(){
        const addBtn = document.querySelector('.notekeep__addNoteBtn') as HTMLButtonElement;
        this.addNoteBtn = addBtn;
    
        this.addNoteBtn.addEventListener('click', () => {
          note.createNote();
        });
    }

}
