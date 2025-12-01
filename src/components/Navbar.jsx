import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuClick }) {
  const { profile, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => setAnchorEl(event.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  const initial = profile?.nombre?.charAt(0)?.toUpperCase() || "?";
  const foto = profile?.fotoPerfil || "";

  return (
    <AppBar
      position="fixed"
      elevation={6}
      sx={{
        background: "linear-gradient(90deg, #7C4DFF, #00E5FF)",
        color: "#fff",
        height: 70,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuClick}
          sx={{
            mr: 2,
            backgroundColor: "rgba(255,255,255,0.2)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.35)" },
            borderRadius: 2,
          }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", flexGrow: 1, textAlign: "center" }}
        >
          Truekeo.cl
        </Typography>

        {/* Avatar usuario */}
        <IconButton onClick={openMenu}>
          <Avatar
            src={foto || null}
            sx={{
              bgcolor: foto ? "transparent" : "rgba(255,255,255,0.2)",
              border: "2px solid rgba(255,255,255,0.7)",
              color: "#fff",
              width: 42,
              height: 42,
              fontSize: "1rem",
            }}
          >
            {!foto && initial}
          </Avatar>
        </IconButton>

        {/* Menú desplegable */}
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
          <MenuItem
            onClick={() => {
              closeMenu();
              navigate("/perfil");
            }}
          >
            Ver perfil
          </MenuItem>

          <MenuItem
            onClick={() => {
              closeMenu();
              logout();
              navigate("/login");
            }}
          >
            Cerrar sesión
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
