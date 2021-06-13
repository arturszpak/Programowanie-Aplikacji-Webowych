import Notes from '../Notes/Notes';
import './Note.scss';

const notes = new Notes();
let today;

export default class Note{
    constructor(){

    }

    createNote(inputText: string, inputTitle: string, color: string): void{

        if(notes.isUpdated){
            if(notes.updatingNote !== null){
                const note: HTMLDivElement = notes.updatingNote as HTMLDivElement;
                note.querySelector(".note__heading").textContent = inputTitle;
                note.querySelector(".note__content").textContent = inputText;
                note.style.background = `#${color}`;
                notes.isUpdated = false;
                notes.updatingNote = null;
            }

        }else{
            const note: HTMLDivElement = document.createElement("div");
            note.classList.add("note");
            note.style.background = `#${color}`;
    
            // Get note's date when created
            today = new Date(Date.now());
            const date = this.formatDate(today, 'dd/mm/yy hh:MM:ss');
    
           
    
            note.innerHTML = `
                <h2 class="note__heading">${inputTitle}</h2>
                <p class="note__content">${inputText}</p>
                <p class="note__createTime">${date}</p>
                <div class="note__controls">
                    <button class="note__controls__pin">
                        <i class="fas fa-thumbtack"></i>
                    </button>
                    <button class="note__controls__edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="note__controls__remove">X</button>
                </div>
            `;
            const notesContainer = document.querySelector(".notekeep__notesWrapper") as HTMLDivElement;
            notes.renderNote(note, notesContainer);
            notes.addListenersToNoteControls(note);
        }
        
    }
   

    formatDate(date:any, format:any) {
        const map: any = {
            mm: date.getMonth() + 1,
            dd: date.getDate(),
            yy: date.getFullYear().toString().slice(-2),
            hh: date.getHours(),
            MM: date.getMinutes(),
            ss: date.getSeconds()
        }
        return format.replace(/mm|dd|yy|yyy|hh|MM|ss/gi, (matched: string) => map[matched])
    }


}