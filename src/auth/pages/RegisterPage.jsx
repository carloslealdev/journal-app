import { Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";

import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailAndPassword } from "../../store/auth/thunks";

const formData = {
  email: "",
  password: "",
  displayName: "",
};

const formValidations = {
  email: [(value) => value.includes("@"), "El correo debe de tener un @"],
  password: [
    (value) => value.length >= 6,
    "El password debe de tener más de 6 caracteres",
  ],
  displayName: [(value) => value.length >= 1, "El nombre es obligatorio"],
};

export const RegisterPage = () => {
  const [formSubmitted, setformSubmitted] = useState(false);

  const {
    formState,
    email,
    password,
    displayName,
    isFormValid,
    emailValid,
    passwordValid,
    displayNameValid,
    onInputChange,
  } = useForm(formData, formValidations);

  const { status, errorMessage } = useSelector((state) => state.auth);
  const isCheckingAuthentication = useMemo(
    () => status === "checking",
    [status]
  );

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    setformSubmitted(true);

    if (!isFormValid) return;

    dispatch(startCreatingUserWithEmailAndPassword(formState));
  };

  return (
    <AuthLayout title="Crear cuenta">
      <Box
        className="animate__animated animate__fadeIn animate__slow"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
          gap: 2,
        }}
      >
        <form
          onSubmit={onSubmit}
          component="form"
          noValidate
          autoComplete="off"
        >
          {" "}
          <TextField
            id="name"
            label="Nombre Completo"
            type="text"
            placeholder="Nombre Completo"
            fullWidth
            size="small"
            sx={{ mb: 1 }}
            required
            name="displayName"
            value={displayName}
            onChange={onInputChange}
            error={!!displayNameValid && formSubmitted}
            helperText={formSubmitted ? displayNameValid : null}
          />
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="email@google.com"
            size="small"
            fullWidth
            required
            sx={{ mb: 1 }}
            name="email"
            value={email}
            onChange={onInputChange}
            error={!!emailValid && formSubmitted}
            helperText={formSubmitted ? emailValid : null}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            placeholder="password"
            size="small"
            fullWidth
            required
            sx={{ mb: 1 }}
            name="password"
            value={password}
            onChange={onInputChange}
            error={!!passwordValid && formSubmitted}
            helperText={formSubmitted ? passwordValid : null}
          />{" "}
          <Box
            component="div"
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: "column" }}
            gap={2}
            mt={2}
          >
            <Box display={!!errorMessage ? "" : "none"}>
              <Alert severity="error">{errorMessage}</Alert>{" "}
            </Box>

            <Button
              disabled={isCheckingAuthentication}
              type="submit"
              variant="contained"
              fullWidth
            >
              {" "}
              Crear Cuenta{" "}
            </Button>
          </Box>
          <Box component="section" display="flex" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes una cuenta?</Typography>{" "}
            <Link component={RouterLink} color="inherit" to="/auth/login">
              {" "}
              Ingresar{" "}
            </Link>{" "}
          </Box>{" "}
        </form>
      </Box>
    </AuthLayout>
  );
};
