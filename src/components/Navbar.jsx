import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export default function Navbar({ onMenuClick }) {
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
          component="div"
          sx={{
            fontWeight: "bold",
            letterSpacing: 1,
            flexGrow: 1,
            textAlign: "center",
          }}
        >
          TruequeApp
        </Typography>

        {/* Espacio para alinear el título centrado, sin botones a la derecha */}
        <div style={{ width: 48 }}></div>
      </Toolbar>
    </AppBar>
  );
}
