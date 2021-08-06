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
import { useField } from "formik";

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
const Input = ({ datoPago, setDatoPago, endAdornment, icon, ...props }) => {
  const classes = useStyles();
  const [changeColor, setChangeColor] = useState(false);
  const [field] = useField(props);

  // Función para el color del icono de usuario
  const handleClickChangeColor = () => {
    setChangeColor(!changeColor);
  };

  // Función para el color del icono de usuario onBlur
  const handleBlur = (e) => {
    setChangeColor(!changeColor);
    field.onBlur(e);
  };

  // Clase del icono a mostrar
  const iconClass = changeColor ? "iconoColorido" : "icono";

  const handleOnChange = (e) => {
    setDatoPago(e.target.value)
  }

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
      {...field}
      value={datoPago}
      onFocus={handleClickChangeColor}
      onChange={handleOnChange}
      onBlur={(e) => handleBlur(e)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{iconsObject[icon]}</InputAdornment>
        ),
        endAdornment: endAdornment,
      }}
      {...props}
    ></TextField>
  );
};

export default Input;
