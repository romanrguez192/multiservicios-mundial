import React , { useState } from "react";
import { 
    VisibilityOutlined,
    VisibilityOffOutlined,
    LockOutlined,
    PersonOutlined,
  } from "@material-ui/icons";
import  { 
    TextField, 
    InputAdornment, 
    makeStyles, 
    IconButton,
}from '@material-ui/core';


{/* ESTILOS */}
const useStyles = makeStyles({
    icono: {
      color: '#787878',
    },
    iconoColorido: {
      color: '#199479',
      transition: 'color .5s',
    },
  });

const Input = (props) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [changeColor, setChangeColor] = useState(false);

    // Función para el color del icono de usuario
    const handleClickChangeColor = () => {
      setChangeColor(!changeColor);
    };

    // Función para cambiar visibilidad de la contraseña
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    // Función del icono de de visibilidad
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };

	if (props.isPassword) {
    return (
      <TextField
        fullWidth
        variant="outlined"
        label={props.title}
        onFocus={handleClickChangeColor}
        onBlur={handleClickChangeColor}
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {changeColor ? <LockOutlined className={classes.iconoColorido}/> : <LockOutlined className={classes.icono}/>}
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOutlined className={classes.icono}/> : <VisibilityOffOutlined className={classes.icono}/>}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    );
  }
  else {
    return (
      <TextField
        fullWidth
        variant="outlined"
        label={props.title}
        onFocus={handleClickChangeColor}
        onBlur={handleClickChangeColor}
        type={showPassword ? "text" : "password"}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {
                /* SWITCH PARA DETERMINAR EL ICONO QUE SE USARÁ */
                {
                  'person': 
                  <>
                    {changeColor ? <PersonOutlined className={classes.iconoColorido}/> : <PersonOutlined className={classes.icono}/>}
                  </>,
                  'otro': <LockOutlined />
                }[props.icon]
              }
            </InputAdornment>
          ),
        }}
      ></TextField>
    );
  }
}

export default Input;