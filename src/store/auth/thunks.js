import {
  loginWithEmailAndPassword,
  logoutFirebase,
  registerUserWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    //Para mostrar errores en pantalla  REVISAR si debería llamar
    //logout(result) solamente
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));

    // console.log({ result });
  };
};

export const startCreatingUserWithEmailAndPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailAndPassword({
      email,
      password,
      displayName,
    });

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));

    // if (!result.ok)
    // console.log(result);
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPassword({ email, password });

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));

    // if (!result.ok)
    // console.log(result);
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();

    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
