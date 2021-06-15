import Note from "../Note/Note";

interface INote{
    title: string,
    content: string, 
    color: string
}

export const userNotes: INote[] = [];

export default class AppStorage {
    
    saveData(title: string, content: string, color:string) {
        userNotes.push({title, content, color});
        localStorage.setItem("userNotes", JSON.stringify(userNotes));
    }
}