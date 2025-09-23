import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../../src/firebase/providers";
import {
  checkingCredentials,
  login,
  logout,
} from "../../../src/store/auth/authSlice";
import {
  checkingAuthentication,
  startCreatingUserWithEmailAndPassword,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
} from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

//Esto mockea todos los providers que devuelvan este path
// es decir: Cuando llame a signInWithGoogle esta será ya directamente una función mockeada por ejemplo
jest.mock("../../../src/firebase/providers");

describe("Pruebas en AuthThunks", () => {
  const dispatch = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de invocar el checkingCredentials", async () => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test("startGoogleSignIn debe de llamar checkingCrednetials y login - Exito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    //mock de la funcion de Firebase
    await signInWithGoogle.mockResolvedValue(loginData);

    //el thunk que estamos testeando
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startGoogleSignIn debe de llamar checkingCrednetials y logout - Error", async () => {
    const loginData = {
      ok: false,
      errorMessage: "Un error en Google",
    };
    //mock de la funcion de Firebase
    await signInWithGoogle.mockResolvedValue(loginData);

    //el thunk que estamos testeando
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test("startCreatingUserWithEmailAndPassword debe de llamar checkingCredential y login - Exito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startCreatingUserWithEmailAndPassword debe de llamar checkingCredential y logout - Error", async () => {
    const loginData = {
      ok: false,
      ...demoUser,
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
      displayName: demoUser.displayName,
    };

    await registerUserWithEmailAndPassword.mockResolvedValue(loginData);

    await startCreatingUserWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startLoginWithEmailAndPassword debe de llamar ckeckingCredentials y login - Exito", async () => {
    const loginData = {
      ok: true,
      ...demoUser,
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
    };

    //mock de la función de firebase
    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    //el thunk que queremos probar
    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test("startLoginWithEmailAndPassword debe de llamar ckeckingCredentials y logout - Error", async () => {
    const loginData = {
      ok: false,
      ...demoUser,
    };

    const formData = {
      email: demoUser.email,
      password: "123456",
    };

    //mock de la función de firebase
    await loginWithEmailAndPassword.mockResolvedValue(loginData);

    //el thunk que queremos probar
    await startLoginWithEmailAndPassword(formData)(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData));
  });

  test("startLogout debe de llamar logoutFirebase, clearNotes y logout", async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
