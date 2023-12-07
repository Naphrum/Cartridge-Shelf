import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import {
  AppBar,
  Box,
  Toolbar,
  Button,
} from "@mui/material";

const NavBar = () => {
  return (
    <Box
      className="navbar"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "70px"

      }}
    >
      <AppBar>
        <Toolbar>
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            CARTRIDGE SHELF
          </Link>
          <Box>
            <Link to="/collection">
              <Button color="#FFFFF" variant="outline">
                Collection
              </Button>
            </Link>
            <Logout />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
