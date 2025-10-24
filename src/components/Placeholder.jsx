import { Box, Typography } from "@mui/material";

export default function Placeholder({ title }) {
  return (
    <Box sx={{ p: 4, textAlign: "center" }}>
      <Typography
        variant="h3"
        sx={{ fontWeight: "bold", color: "primary.main", mb: 1 }}
      >
        {title}
      </Typography>
      <Typography variant="body1" sx={{ opacity: 0.7 }}>
        Próximamente: esta sección estará disponible 😄
      </Typography>
    </Box>
  );
}
