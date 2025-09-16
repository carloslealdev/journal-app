import { TurnedInNot } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { SideBarItem } from "./SideBarItem";

export const SideBar = ({ drawerWidth }) => {
  const { displayName } = useSelector((state) => state.auth);
  const { notes } = useSelector((state) => state.journal);
  return (
    <Box
      component="nav"
      sx={{
        width: { sm: 240, flexShrink: { sm: 0 } },
      }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "block" },
          //   width: drawerWidth,
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div">
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />

        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};
