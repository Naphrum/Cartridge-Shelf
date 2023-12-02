import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import { AppBar, Box, OutlinedInput, Toolbar, Typography, Button } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      className="navbar"
      xs={{
        display: "flex",
      }}
    >
      <AppBar >
        <Toolbar>
          <Typography>Cartidge Shelf</Typography>
          <OutlinedInput placeholder="Search Games..."></OutlinedInput>
          <Link to="/collection">
            <Button color="#FFFFF" variant="outline">Collection</Button>
          </Link>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
