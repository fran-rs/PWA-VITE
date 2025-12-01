import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SidebarMenu({ open, onClose }) {
  const { user } = useAuth();

  const menuItems = user
    ? [
        { text: "Inicio", path: "/" },
        { text: "Buscar Ofertas", path: "/buscar" },
        { text: "Crear Oferta", path: "/crear" },
        { text: "Chat", path: "/chat" },
        { text: "Perfil", path: "/perfil" },
      ]
    : [];

  const authItems = user
    ? [] // si está logueado NO mostramos login/registro
    : [
        { text: "Login", path: "/login" },
        { text: "Registro", path: "/registro" },
      ];

  return (
    <Drawer open={open} onClose={onClose}>
      <List sx={{ width: 240 }}>
        {menuItems.map(({ text, path }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={path}
            onClick={onClose}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        ))}

        {authItems.length > 0 && <Divider sx={{ my: 1 }} />}

        {authItems.map(({ text, path }) => (
          <ListItemButton
            key={text}
            component={Link}
            to={path}
            onClick={onClose}
          >
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}
