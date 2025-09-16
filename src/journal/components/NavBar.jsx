import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { startLogout } from "../../store/auth/thunks";

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(startLogout());
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          sx={{
            mr: 2,
            display: { sm: "none" },
          }}
        >
          <MenuOutlined />
        </IconButton>

        {/* <Box
          component="section"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        > */}
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          {" "}
          JournalApp{" "}
        </Typography>
        <IconButton onClick={onLogout} color="error">
          <LogoutOutlined />
        </IconButton>
        {/* </Box> */}
      </Toolbar>
    </AppBar>
  );
};
