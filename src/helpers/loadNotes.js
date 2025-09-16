import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async (uid = "") => {
  if (!uid) throw new Error("El UID del usuario no existe");

  //apunto al path en Firebase de la colección que quiero cargar
  const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

  //traigo los documentos de esa colección
  const docs = await getDocs(collectionRef);

  //guardo todas las notas de esa colección en un array
  const notes = [];
  docs.forEach((doc) => {
    notes.push({ id: doc.id, ...doc.data() });
  });
  // console.log(notes);
  return notes;
};
