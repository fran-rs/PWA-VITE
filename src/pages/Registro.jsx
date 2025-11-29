import { useState } from "react";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../src/firebase"; // deja la importación tal como la tienes

export function Registro() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Cuenta creada exitosamente 🎉");
      setEmail("");
      setPassword("");
      setTouched(false);

      // Redirigir al home una vez creado el usuario
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const isEmailValid = email.trim() !== "";
  const isPasswordValid = password.trim() !== "";
  const isFormValid = isEmailValid && isPasswordValid;

  return (
    <Box
      sx={{
        maxWidth: 400,
        mx: "auto",
        mt: 10,
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        bgcolor: "white",
      }}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        Crear Cuenta
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <form onSubmit={handleRegister}>
        <TextField
          label="Correo"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setTouched(true);
          }}
          error={touched && !isEmailValid}
          helperText={
            touched && !isEmailValid ? "El correo es obligatorio" : ""
          }
        />

        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setTouched(true);
          }}
          error={touched && !isPasswordValid}
          helperText={
            touched && !isPasswordValid ? "La contraseña es obligatoria" : ""
          }
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!isFormValid}
        >
          Registrarme
        </Button>
      </form>
    </Box>
  );
}
