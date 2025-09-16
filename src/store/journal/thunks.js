// Los thunks son para despachar tareas ASÍNCRONAS

import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import {
  addNewEmptyNote,
  setActiveNote,
  savingNewNote,
  setNotes,
  setSaving,
  updateNote,
  setPhotosToActiveNote,
  deleteNoteById,
} from "./journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startNewNote = () => {
  //La finalidad de este thunk es crear una nueva nota vacía (newNote)
  // y setear la nota activa en la interfaz de usuario con esta newNote

  return async (dispatch, getState) => {
    dispatch(savingNewNote());
    // console.log("startNewNote");
    // console.log(getState());

    //El getState me devuelve un objeto con el estado directamente del store de la app
    //Accedo al estado del auth
    //De alli desestructuro el uid del usuario que está autenticado
    const { uid } = getState().auth;

    //Defino la estructura de las nuevas notas a crear
    const newNote = {
      title: "",
      body: "",
      date: new Date().getTime(),
    };

    //Creo una nueva instancia en mi base de datos estableciendo el path
    //según la estructura que deseo para mi colección
    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    //Seteo la instacia para generar una nueva nota vacía
    await setDoc(newDoc, newNote);

    //Creo la propiedad id para mi nota
    newNote.id = newDoc.id;

    // console.log({ newDoc, setDocResp });

    //Lo que paso como parametro a las funciones que despacho, son el payload
    // que reciben en los reducers (ver el archivo Slice correspondiente)
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const noteToFireStore = { ...note };
    delete noteToFireStore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, noteToFireStore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadingFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];

    //Este bucle almacena en el array todas las promesas pero NO LAS EJECUTA
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    //Promise.all recibe como parámetro un array de promesas y las ejecuta todas
    //simultáneamente
    const photosUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photosUrls));
    // console.log(photosUrls);
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    // console.log({ uid, note });

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
