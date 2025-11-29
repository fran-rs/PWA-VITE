import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    login({ email });
    navigate("/");
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
        </CardContent>
      </Card>
    </Box>
  );
}
