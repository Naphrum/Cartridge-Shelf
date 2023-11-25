import React from "react";
import Logout from "../Logout/Logout";
import { AppBar, Box, OutlinedInput, Toolbar, Typography } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      className="navbar"
      xs={{
        display: "flex",
      }}
    >
      <AppBar>
        <Toolbar>
          <Typography>Cartidge Shelf</Typography>
          <OutlinedInput placeholder="Search Games..."></OutlinedInput>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
