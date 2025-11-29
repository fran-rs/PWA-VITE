import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
  Box,
  Link,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../src/firebase";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({
    email: false,
    pass: false,
  });

  const [isValid, setIsValid] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");

  // Validación en tiempo real
  useEffect(() => {
    let emailError = "";

    if (touched.email) {
      if (!email.trim()) {
        emailError = "Ingresa un correo";
      } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        emailError = "Correo inválido";
      }
    }

    setErrors({ email: emailError });

    setIsValid(emailError === "" && email.trim() !== "" && pass.trim() !== "");
  }, [email, pass, touched.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) return;

    setFirebaseError("");

    try {
      await signInWithEmailAndPassword(auth, email, pass);

      login({ email });
      navigate("/");
    } catch (err) {
      setFirebaseError("Correo o contraseña incorrectos");
    }
  };

  return (
    <Box
      sx={{
        mt: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card sx={{ width: 350, p: 2, boxShadow: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 2, fontWeight: "bold" }}
          >
            Iniciar Sesión
          </Typography>

          {firebaseError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {firebaseError}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Correo electrónico"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
              error={touched.email && !!errors.email}
              helperText={touched.email ? errors.email : ""}
            />

            <TextField
              label="Contraseña"
              type="password"
              fullWidth
              margin="normal"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, pass: true }))}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={!isValid}
              sx={{
                mt: 3,
                py: 1.3,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                bgcolor: isValid ? "#4F46E5" : "#9CA3AF",
                "&:hover": {
                  bgcolor: isValid ? "#4338CA" : "#9CA3AF",
                },
              }}
            >
              Entrar
            </Button>
          </form>

          {/* Enlaces debajo */}
          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Typography variant="body2">
              ¿No tienes cuenta?{" "}
              <Link
                component="button"
                underline="hover"
                onClick={() => navigate("/registro")}
                sx={{ fontWeight: "bold" }}
              >
                Registrarte
              </Link>
            </Typography>

            <Typography variant="body2" sx={{ mt: 1 }}>
              <Link
                component="button"
                underline="hover"
                onClick={() => console.log("Recuperar contraseña (luego)")}
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
