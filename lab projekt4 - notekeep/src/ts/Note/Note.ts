import INote from "../Interfaces/INote";
import Notes from '../Notes/Notes';
import './Note.scss';
import AppStorage from "../AppStorage/AppStorage";
import AppFirebaseStorage from '../AppFirebaseStorage/AppFirebaseStorage';
import environment from '../../config';

const notes = new Notes();

let newAppStorage: AppFirebaseStorage | AppStorage;

if (environment === 'firebase') {
  newAppStorage = new AppFirebaseStorage();
} else {
  newAppStorage = new AppStorage();
}

export default class Note{

    titleInput: HTMLInputElement;
    contentInput: HTMLInputElement;
    colorInput: HTMLInputElement;
    pinCheckbox: HTMLInputElement;
    inputDiv: HTMLDivElement;

    title: string;
    content: string;
    color: string;
    pinned: boolean;
    date: string;
    id: number;

    isUpdated: boolean;
    updatingNote: HTMLDivElement;

    createNote(){
        const data = this.getNoteData()
        newAppStorage.saveData(data);

        if(this.isUpdated){
            if(this.updatingNote !== null){
                const note = this.updatingNote as HTMLDivElement;

                note.querySelector(".note__heading").textContent = data.title;
                note.querySelector(".note__content").textContent = data.content;
                note.style.background = `#${data.color}`;


                this.isUpdated = false;
                this.updatingNote = null;
                this.clearInputs();
            }
        }
        else{
            const note = this.noteBuilder(data)
            notes.renderNote(note, data.pinned);
            this.clearInputs();
        }
        
    }

    noteBuilder(data: INote): HTMLDivElement{
        const note = document.createElement('div');
        note.classList.add("note");
        note.style.background = `#${data.color}`;

        const noteHeading = document.createElement('h2');
        noteHeading.classList.add("note__heading")
        noteHeading.textContent = data.title;

        const noteContent = document.createElement('p');
        noteContent.classList.add('note__content');
        noteContent.textContent = data.content;

        const noteTime = document.createElement('p');
        noteTime.classList.add('note__createTime')
        noteTime.textContent = data.date

        const noteControls = document.createElement('div');
        noteControls.classList.add('note__controls')

        const notePinBtn = document.createElement('button')
        notePinBtn.classList.add('note__controls__pin')

        const notePinImg = document.createElement('i');
        notePinImg.classList.add('fas')
        notePinImg.classList.add('fa-thumbtack')

        const noteEditBtn = document.createElement('button')
        noteEditBtn.classList.add('note__controls__edit')

        const noteEditImg = document.createElement('i');
        noteEditImg.classList.add('fas')
        noteEditImg.classList.add('fa-edit')

        const noteRemoveBtn = document.createElement('button')
        noteRemoveBtn.classList.add('note__controls__remove')
        noteRemoveBtn.textContent = "X";

        note.appendChild(noteHeading)
        note.appendChild(noteContent)
        note.appendChild(noteTime)
        note.appendChild(noteControls)
        noteControls.appendChild(notePinBtn)
        noteControls.appendChild(noteEditBtn)
        noteControls.appendChild(noteRemoveBtn)
        notePinBtn.appendChild(notePinImg)
        noteEditBtn.appendChild(noteEditImg)

        noteRemoveBtn.addEventListener('click', () => this.deleteNote(note, data.id));
        notePinBtn.addEventListener('click', () => notes.pinNote(note))
        noteEditBtn.addEventListener('click', () => this.editNote(note));

        return note;
    }

    getNoteData(){
        const inputTitle = document.getElementById("note-inputTitle") as HTMLInputElement;

        const inputContent = document.getElementById("note-input") as HTMLInputElement;

        const color = document.querySelector('input[name="color"]:checked') as HTMLInputElement;

        this.pinCheckbox = document.querySelector(
            '.input__checkbox'
          ) as HTMLInputElement;

        this.titleInput = inputTitle;
        this.contentInput = inputContent; 
        this.colorInput = color;

        this.title = this.titleInput.value;
        this.content = this.contentInput.value;
        this.color = this.colorInput.value;
        this.pinned = this.pinCheckbox.checked;
        this.date = new Date().toLocaleDateString();
        this.id = Math.floor(Math.random() * 999999);

        const note: INote = {
            title: this.title,
            content: this.content,
            color: this.color,
            pinned: this.pinned,
            date: this.date,
            id: this.id,
        };
        return note;
    }

    
    async deleteNote(note: HTMLDivElement, id: number) {
        note.remove();
        await newAppStorage.deleteData(id);
    }

    async editNote(note: HTMLDivElement){
        const noteTitle = note.querySelector(".note__heading") as HTMLInputElement;
        const noteTextContent = note.querySelector(".note__content") as HTMLInputElement;

        const titleInput = document.getElementById("note-inputTitle") as HTMLInputElement;
        const textContentInput = document.getElementById("note-input") as HTMLInputElement;

        titleInput.value = noteTitle.textContent;
        textContentInput.value = noteTextContent.textContent;

        this.updatingNote = note;
        this.isUpdated = true;
    }

    createNoteFromLS(data: INote) {
        const note = this.noteBuilder(data);
        notes.renderNote(note, data.pinned);
    }
    


    clearInputs() {
        this.titleInput.value = '';
        this.contentInput.value = '';
        this.pinCheckbox.checked = false;
      }
}