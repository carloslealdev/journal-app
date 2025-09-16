import { Box, CircularProgress } from "@mui/material";

export const CheckingAuth = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "primary.main",
      }}
    >
      <Box component="section">
        <CircularProgress color="warning" />
      </Box>
    </Box>
  );
};
