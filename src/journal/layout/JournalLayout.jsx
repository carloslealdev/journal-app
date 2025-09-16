import { Box, Grid, Toolbar } from "@mui/material";
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box
      className="animate__animated animate__fadeIn animate__slow"
      display="flex"
    >
      {/* navbar */}
      <NavBar drawerWidth={drawerWidth} />

      {/* sidebar */}
      <SideBar drawerWidth={drawerWidth} />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* toolbar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
