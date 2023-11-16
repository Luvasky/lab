import React from "react";
import { TextField, Box } from "@mui/material";

function Input({ mensaje, identificador }) {
  return (
    <TextField label={mensaje} sx={{ width: "40%" }} name={identificador} />
  );
}

export default Input;
