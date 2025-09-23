import { collection, doc, setDoc } from "firebase/firestore/lite";
import { startNewNote } from "../../../src/store/journal/thunks";
import { addNewEmptyNote, setActiveNote, savingNewNote } from "../../../src/store/journal/journalSlice";

// Mock Firebase Firestore functions
jest.mock("firebase/firestore/lite");

// Mock Firebase config
jest.mock("../../../src/firebase/config", () => ({
  FirebaseDB: {},
}));

describe("Pruebas en Journal Thunks", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    const mockDocId = "ABC123";
    
    // Mock Firebase functions
    const mockDocRef = { id: mockDocId };
    const mockCollection = {};
    
    collection.mockReturnValue(mockCollection);
    doc.mockReturnValue(mockDocRef);
    setDoc.mockResolvedValue();

    //PARA SIMULAR EL VALOR DE RETORNO DE EL MOCK DE LA FUNCIÓN getState
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);
    
    // Verificar que se llamó savingNewNote primero
    expect(dispatch).toHaveBeenNthCalledWith(1, savingNewNote());
    
    // Verificar que se llamaron las funciones de Firebase
    expect(collection).toHaveBeenCalledWith({}, `${uid}/journal/notes`);
    expect(doc).toHaveBeenCalledWith(mockCollection);
    expect(setDoc).toHaveBeenCalledWith(mockDocRef, expect.objectContaining({
      title: "",
      body: "",
      date: expect.any(Number)
    }));
    
    // Verificar que dispatch fue llamado exactamente 3 veces
    expect(dispatch).toHaveBeenCalledTimes(3);
    
    // Verificar que se despachó addNewEmptyNote
    expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote(expect.objectContaining({
      title: "",
      body: "",
      date: expect.any(Number),
      id: mockDocId
    })));
    
    // Verificar que se despachó setActiveNote
    expect(dispatch).toHaveBeenCalledWith(setActiveNote(expect.objectContaining({
      title: "",
      body: "",
      date: expect.any(Number),
      id: mockDocId
    })));
  });
});
