import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Typography,
  Paper,
  TextField,
  Button,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfile, updatePassword } from "firebase/auth";
import { auth } from "../src/firebase";
import { useAuth } from "../context/AuthContext";
import { updateUserInDB } from "../services/users";

export default function Perfil() {
  const { user, profile, setUser, setProfile, loading } = useAuth();

  // 🟢 Estado inicial vacío hasta que carguen los datos reales
  const [data, setData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    fotoPerfil: "",
    email: "",
  });

  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState("");
  const [savingField, setSavingField] = useState(null);

  const [snack, setSnack] = useState({
    open: false,
    severity: "info",
    msg: "",
  });

  const fileRef = useRef(null);
  const [localPhotoUrl, setLocalPhotoUrl] = useState(null);
  const [localFile, setLocalFile] = useState(null);

  // contraseña
  const [newPass, setNewPass] = useState("");
  const [savingPass, setSavingPass] = useState(false);

  // 🟢 MUY IMPORTANTE
  // Cuando profile/user lleguen desde Firebase, sincroniza el estado local
  useEffect(() => {
    if (!user) return;

    setData({
      nombre: profile?.nombre || user.displayName || "",
      telefono: profile?.telefono || "",
      direccion: profile?.direccion || "",
      fotoPerfil: profile?.fotoPerfil || user.photoURL || "",
      email: profile?.email || user.email || "",
    });
  }, [profile, user]);

  // Si aún está cargando el contexto, evita render tempranos
  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const abrirEditar = (field) => {
    setEditingField(field);
    setFieldValue(data[field] ?? "");
  };

  const cancelarEditar = () => {
    setEditingField(null);
    setFieldValue("");
  };

  const guardarCampo = async (field) => {
    if (field === "email") {
      setSnack({
        open: true,
        severity: "warning",
        msg: "El email no se puede modificar.",
      });
      return;
    }

    setSavingField(field);
    try {
      const valueToSave = fieldValue;

      if (field === "nombre") {
        try {
          await updateProfile(auth.currentUser, { displayName: valueToSave });
          setUser({ ...user, displayName: valueToSave });
        } catch (err) {
          console.warn("updateProfile fallo:", err);
        }
      }

      if (field === "fotoPerfil" && localFile) {
        setSnack({
          open: true,
          severity: "info",
          msg: "La subida de fotos aún no está habilitada.",
        });
      } else {
        await updateUserInDB(user.uid, { [field]: valueToSave });

        const newData = { ...data, [field]: valueToSave };
        setData(newData);
        setProfile({ ...profile, [field]: valueToSave });

        if (field === "fotoPerfil" && !localFile) {
          try {
            await updateProfile(auth.currentUser, {
              photoURL: valueToSave || null,
            });
            setUser({ ...user, photoURL: valueToSave || null });
          } catch (err) {
            console.warn("updateProfile(photo) fallo:", err);
          }
        }
      }

      setSnack({ open: true, severity: "success", msg: "Campo actualizado" });
      setEditingField(null);
      setFieldValue("");
      setLocalFile(null);
      setLocalPhotoUrl(null);
    } catch (err) {
      console.error("Error guardarCampo:", err);
      setSnack({
        open: true,
        severity: "error",
        msg: "No se pudo actualizar.",
      });
    } finally {
      setSavingField(null);
    }
  };

  const manejarFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLocalFile(file);
    setLocalPhotoUrl(URL.createObjectURL(file));
  };

  const cambiarContrasena = async () => {
    if (!newPass || newPass.length < 6) {
      setSnack({
        open: true,
        severity: "warning",
        msg: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }
    setSavingPass(true);
    try {
      await updatePassword(auth.currentUser, newPass);
      setNewPass("");
      setSnack({
        open: true,
        severity: "success",
        msg: "Contraseña actualizada.",
      });
    } catch (err) {
      console.error("Error cambiar contraseña:", err);
      setSnack({
        open: true,
        severity: "error",
        msg: "No se pudo cambiar la contraseña.",
      });
    } finally {
      setSavingPass(false);
    }
  };

  const Row = ({ label, field, readOnly = false }) => {
    const value = data[field] ?? "";
    const isEditing = editingField === field;
    const loadingField = savingField === field;

    return (
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 0.5 }}>
          {isEditing ? (
            <>
              <TextField
                size="small"
                value={fieldValue}
                onChange={(e) => setFieldValue(e.target.value)}
                fullWidth
                autoFocus
              />

              <IconButton
                color="success"
                onClick={() => guardarCampo(field)}
                disabled={loadingField}
              >
                {loadingField ? (
                  <CircularProgress size={18} />
                ) : (
                  <SaveIcon fontSize="small" />
                )}
              </IconButton>

              <IconButton color="error" onClick={cancelarEditar}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <Typography variant="body1" sx={{ flex: 1 }}>
                {value || <span style={{ color: "#888" }}>—</span>}
              </Typography>

              {!readOnly && (
                <IconButton size="small" onClick={() => abrirEditar(field)}>
                  <EditIcon fontSize="small" />
                </IconButton>
              )}
            </>
          )}
        </Stack>
      </Box>
    );
  };

  return (
    <Box maxWidth="720px" mx="auto" p={3}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Stack spacing={3} alignItems="center">
          <Box sx={{ textAlign: "center" }}>
            <Avatar
              src={localPhotoUrl || data.fotoPerfil || undefined}
              sx={{
                width: 110,
                height: 110,
                bgcolor: data.fotoPerfil ? "transparent" : "primary.main",
                color: "white",
                fontSize: 36,
                border: "3px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
              }}
              onClick={() => fileRef.current?.click()}
            >
              {!data.fotoPerfil &&
                (data.nombre?.[0]?.toUpperCase() ||
                  (user?.email?.[0] || "U").toUpperCase())}
            </Avatar>

            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 1,
                color: "primary.main",
                cursor: "pointer",
              }}
              onClick={() => fileRef.current?.click()}
            >
              Cambiar foto de perfil
            </Typography>

            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={manejarFile}
            />
          </Box>

          <Box sx={{ width: "100%", mt: 1 }}>
            <Row label="Nombre" field="nombre" />
            <Row label="Correo (no editable)" field="email" readOnly />
            <Row label="Teléfono" field="telefono" />
            <Row label="Dirección" field="direccion" />
            <Row label="Foto de perfil (preview local)" field="fotoPerfil" />
          </Box>

          <Divider sx={{ width: "100%", my: 1 }} />

          <Box sx={{ width: "100%" }}>
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              Cambiar contraseña
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center">
              <TextField
                type="password"
                label="Nueva contraseña"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                fullWidth
                size="small"
              />
              <Button
                variant="contained"
                color="error"
                onClick={cambiarContrasena}
                disabled={savingPass}
              >
                {savingPass ? <CircularProgress size={20} /> : "Cambiar"}
              </Button>
            </Stack>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 1, display: "block" }}
            >
              Nota: es posible que debas volver a iniciar sesión para actualizar
              la contraseña.
            </Typography>
          </Box>
        </Stack>
      </Paper>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snack.severity} variant="filled">
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
