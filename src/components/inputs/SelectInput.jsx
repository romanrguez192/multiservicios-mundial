import React, { useState } from "react";
import Input from "./Input";
import MenuItem from "@material-ui/core/MenuItem";

// Componente para inputs de contraseña
const SelectInput = ({ options, ...props }) => {
  return (
    <Input select {...props}>
      {options.map((o) => (
        <MenuItem key={o.value} value={o.value}>
          {o.label}
        </MenuItem>
      ))}
    </Input>
  );
};

export default SelectInput;
