import firebase from 'firebase';
import { firebaseConfig }  from '../../config';
import INote from '../Interfaces/INote';



const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default class FirebaseDBManager{
    async saveData(data: any): Promise<void> {
        await db.collection('notes').doc(data.id.toString()).set(data);
    }
    
    async deleteData(id: number) {
        const res = await db.collection('notes').doc(id.toString()).delete();
    }

    async getData(): Promise<INote[]> {
        return await db.collection('notes').get().then((querySnapshot) => {
            const notes: INote[] = [];
            querySnapshot.forEach((doc) => {
              notes.push(doc.data() as INote);
            });
            return notes;
          });
      }
}