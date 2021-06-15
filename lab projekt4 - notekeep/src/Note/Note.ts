import appStorage, {userNotes } from '../AppStorage/AppStorage';
import Notes from '../Notes/Notes';
import './Note.scss';

const notes = new Notes();
const storage = new appStorage();

let today;

export default class Note{


    createNote(title: string, content: string, color: string): void{

        if(notes.isUpdated){
            if(notes.updatingNote !== null){
                const note: HTMLDivElement = notes.updatingNote as HTMLDivElement;

                const prevTitle = note.querySelector(".note__heading") as HTMLInputElement;
                const prevContent = note.querySelector(".note__content") as HTMLInputElement;

                const prevNote = {
                    title: prevTitle.textContent,
                    content: prevContent.textContent,
                    color:  this.getHexColor()
                }

                const index = notes.findNoteIndex(prevNote)
            


                note.querySelector(".note__heading").textContent = title;
                note.querySelector(".note__content").textContent = content;
                note.style.background = `#${color}`;

                if(index > -1){
                    userNotes[index] = {title, content, color};
                    localStorage.setItem("userNotes", JSON.stringify(userNotes));
                }

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
                <h2 class="note__heading">${title}</h2>
                <p class="note__content">${content}</p>
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
            notes.addListenersToNoteControls(note, title, content, color);

            storage.saveData(title, content, color)

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

    componentToHex(c:number) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
    rgbToHex(r:number, g:number, b:number) {
        return this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
      }

    getHexColor(): string{
        //Returns rgb but need hex
        const prevColor = notes.updatingNote.style.background;
        var numberPattern = /\d+/g;
        let numbers: string[] = prevColor.match( numberPattern )
        const [r, g, b] = [...numbers] 
        return this.rgbToHex(parseInt(r), parseInt(g), parseInt(b));
    }
}