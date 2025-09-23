import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

import { useDispatch, useSelector } from "react-redux";
import { checkingCredentials } from "../../store/auth/authSlice";
import {
  checkingAuthentication,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
} from "../../store/auth/thunks";
import { useMemo } from "react";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const dispatch = useDispatch();
  const { email, password, onInputChange, formState } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailAndPassword(formState));
    // dispatch(checkingAuthentication());
    // console.log({ email, password });
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
    // console.log("On Google Sign In");
  };

  return (
    <AuthLayout title="Login">
      <form
        aria-label="submit-form"
        className="animate__animated animate__fadeIn animate__slow"
        // component="form"
        onSubmit={onSubmit}
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
        }}
      >
        {" "}
        <TextField
          id="email"
          name="email"
          label="Email"
          type="email"
          placeholder="email@google.com"
          size="small"
          fullWidth
          required
          onChange={onInputChange}
          value={email}
          sx={{ mb: 2 }}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="password"
          size="small"
          fullWidth
          required
          onChange={onInputChange}
          value={password}
          inputProps={{
            "data-testid": "Password",
          }}
        />{" "}
        <Box display="flex" flexDirection="column" mt={2}>
          <Box display={!!errorMessage ? "" : "none"}>
            <Alert severity="error">{errorMessage}</Alert>{" "}
          </Box>
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: "column", sm: "row" }}
            gap={2}
            mt={2}
          >
            {" "}
            <Button
              disabled={isAuthenticating}
              type="submit"
              variant="contained"
              fullWidth
            >
              {" "}
              Login{" "}
            </Button>
            <Button
              disabled={isAuthenticating}
              variant="contained"
              fullWidth
              aria-label="google-btn"
              onClick={onGoogleSignIn}
            >
              {" "}
              <Box
                component="div"
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={1}
              >
                {" "}
                <Google /> <Typography>Google</Typography>{" "}
              </Box>{" "}
            </Button>
          </Box>
        </Box>
      </form>
      <Box component="section" display="flex" justifyContent="end">
        {" "}
        <Link component={RouterLink} color="inherit" to="/auth/register">
          {" "}
          Crear una cuenta{" "}
        </Link>{" "}
      </Box>{" "}
    </AuthLayout>
  );
};
