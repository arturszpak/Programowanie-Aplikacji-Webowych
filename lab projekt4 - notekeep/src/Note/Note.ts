import Notes from '../Notes/Notes';
import './Note.scss';

const notes = new Notes();
let today;

export default class Note{
    constructor(){

    }

    createNote(inputText: string, inputTitle: string, color: string): void{
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
            <span class="note__remove">X</span>
        `;
        
        notes.renderNote(note);
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