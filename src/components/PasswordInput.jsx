import React, { useState } from "react";
import { VisibilityOutlined, VisibilityOffOutlined } from "@material-ui/icons";
import { InputAdornment, IconButton } from "@material-ui/core";
import Input from "./Input";

// Componente para inputs de contraseña
const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  // Función para cambiar visibilidad de la contraseña
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Función del icono de de visibilidad
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <Input
      type={showPassword ? "text" : "password"}
      icon="password"
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={handleClickShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
          >
            {showPassword ? <VisibilityOutlined /> : <VisibilityOffOutlined />}
          </IconButton>
        </InputAdornment>
      }
      {...props}
    />
  );
};

export default PasswordInput;
