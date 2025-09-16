import { StarOutline } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";

export const NothingSelectedView = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 110px)",
        bgcolor: "primary.main",
        borderRadius: 3,
      }}
    >
      <Box component="section">
        <StarOutline sx={{ fontSize: 100, color: "white" }} />
      </Box>
      <Box component="section">
        <Typography color="white" variant="h5">
          Selecciona o crea una entrada
        </Typography>
      </Box>
    </Box>
  );
};
