import { Box, Typography } from "@mui/material";

export const AuthLayout = ({ children, title = "" }) => {
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
      <Box
        component="section"
        className="box-shadow"
        sx={{
          width: {
            xs: "70%",
            sm: "60%",
            md: "40%",
            lg: "30%",
          },
          bgcolor: "white",
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{ mb: 2, textAlign: "center" }}
        >
          {" "}
          {title}{" "}
        </Typography>

        {children}
      </Box>
    </Box>
  );
};
