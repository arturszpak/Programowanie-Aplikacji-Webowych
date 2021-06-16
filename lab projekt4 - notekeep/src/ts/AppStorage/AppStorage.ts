import INote from '../Interfaces/INote';


 interface IAppStorage {
    saveData: (data: INote) => Promise<void>;
    getData: () => Promise<INote[]>;
    deleteData: (id: number) => void;
  }

export default class AppStorage implements IAppStorage {
    async saveData(data: INote) {
        const savedNotes = await this.getData();
    
        const note = {
          id: data.id,
          title: data.title,
          content: data.content,
          date: data.date,
          color: data.color,
          pinned: data.pinned,
        };
    
        localStorage.setItem('savedNotes', JSON.stringify([note, ...savedNotes]));
      }
    
      async getData(): Promise<INote[]> {
        const data = localStorage.getItem('savedNotes');
        if (data) {
          return JSON.parse(data);
        } else {
          return [];
        }
      }
    
      async deleteData(id: number) {
        const savedNotes = await this.getData();
    
        const newSavedNotes = savedNotes.filter((note) => note.id !== id);
        localStorage.removeItem('savedNotes');
        localStorage.setItem('savedNotes', JSON.stringify(newSavedNotes));
      }
}