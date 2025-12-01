import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../src/firebase";

// IMPORTS PARA STORAGE
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export function Registro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    pass: "",
    telefono: "",
    direccion: "",
  });

  const [foto, setFoto] = useState(null); // archivo real
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e) => {
    setFoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1. Crear usuario en Authentication
      const res = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.pass
      );

      const uid = res.user.uid;

      // 2. Subir foto (si existe)
      const storage = getStorage();
      let fotoURL = "";

      if (foto) {
        const fotoRef = ref(storage, `usuarios/${uid}/perfil.jpg`);
        await uploadBytes(fotoRef, foto);
        fotoURL = await getDownloadURL(fotoRef);
      }

      // 3. Crear documento en Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        direccion: form.direccion,
        fotoPerfil: fotoURL, // URL real de Firebase Storage
        rol: "user",
      });

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar. Revisa los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 10, display: "flex", justifyContent: "center" }}>
      <Card sx={{ width: 400, p: 3 }}>
        <CardContent>
          <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
            Crear cuenta
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Nombre"
              name="nombre"
              fullWidth
              margin="normal"
              value={form.nombre}
              onChange={handleChange}
            />

            <TextField
              label="Correo"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              label="Contraseña"
              name="pass"
              type="password"
              fullWidth
              margin="normal"
              value={form.pass}
              onChange={handleChange}
            />

            <TextField
              label="Teléfono"
              name="telefono"
              fullWidth
              margin="normal"
              value={form.telefono}
              onChange={handleChange}
            />

            <TextField
              label="Dirección"
              name="direccion"
              fullWidth
              margin="normal"
              value={form.direccion}
              onChange={handleChange}
            />

            {/* INPUT DE FOTO REAL */}
            <Button
              variant="outlined"
              component="label"
              fullWidth
              sx={{ mt: 2 }}
            >
              Subir foto de perfil
              <input type="file" hidden accept="image/*" onChange={handleFile} />
            </Button>

            {foto && (
              <Typography sx={{ mt: 1 }} variant="body2">
                Archivo seleccionado: {foto.name}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              type="submit"
              disabled={loading}
            >
              {loading ? "Creando cuenta..." : "Registrarse"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}
