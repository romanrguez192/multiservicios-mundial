import React, { useState } from "react";
import {
  LockOutlined,
  PersonOutlined,
  PhoneOutlined,
  FingerprintOutlined,
  RoomOutlined,
  StoreOutlined,
} from "@material-ui/icons";
import { TextField, InputAdornment, makeStyles } from "@material-ui/core";

// ESTILOS
const useStyles = makeStyles({
  icono: {
    color: "#787878",
  },
  iconoColorido: {
    color: "#199479",
    transition: "color .5s",
  },
});

// Componente de input
const Input = (props) => {
  const classes = useStyles();
  const [changeColor, setChangeColor] = useState(false);

  // Función para el color del icono de usuario
  const handleClickChangeColor = () => {
    setChangeColor(!changeColor);
  };

  // Clase del icono a mostrar
  const iconClass = changeColor ? "iconoColorido" : "icono";

  // Iconos al inicio del input
  const iconsObject = {
    person: <PersonOutlined className={classes[iconClass]} />,
    identification: <FingerprintOutlined className={classes[iconClass]} />,
    phone: <PhoneOutlined className={classes[iconClass]} />,
    ubication: <RoomOutlined className={classes[iconClass]} />,
    store: <StoreOutlined className={classes[iconClass]} />,
    password: <LockOutlined className={classes[iconClass]} />,
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      onFocus={handleClickChangeColor}
      onBlur={handleClickChangeColor}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {iconsObject[props.icon]}
          </InputAdornment>
        ),
        endAdornment: props.endAdornment,
      }}
      {...props}
    ></TextField>
  );
};

export default Input;
