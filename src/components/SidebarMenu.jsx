import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const menuItems = [
  { text: "Inicio", path: "/" },
  { text: "Buscar Ofertas", path: "/buscar" },
  { text: "Crear Oferta", path: "/crear" },
  { text: "Chat", path: "/chat" },
  { text: "Perfil", path: "/perfil" },
];

const authItems = [
  { text: "Admin", path: "/admin" },
  { text: "Login", path: "/login" },
  { text: "Registro", path: "/registro" },
];

export default function SidebarMenu({ open, onClose }) {
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

        {/* Divider entre las secciones */}
        <Divider sx={{ my: 1 }} />

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
