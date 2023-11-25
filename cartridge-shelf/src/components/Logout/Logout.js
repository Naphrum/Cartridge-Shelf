import { useState, useContext } from "react";
import AppContext from "../../context/AppContext";
import Button from "@mui/material/Button";

const Logout = () => {
  const { logout } = useContext(AppContext);
  return <Button variant="contained" onClick={logout}>Log Out</Button>;
};

export default Logout;
