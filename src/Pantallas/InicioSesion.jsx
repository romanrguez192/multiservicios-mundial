import React , { useState } from "react";
import "./InicioSesion.css";
import logo from "../Imagenes/logo.svg"
import  { 
  TextField, 
  InputAdornment, 
  Button, 
  makeStyles, 
  IconButton,
}from '@material-ui/core';
import { 
  VisibilityOutlined,
   VisibilityOffOutlined,
   LockOutlined,
   PersonOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles({
  boton: {
    position: 'relative',
    left: '35%',
    margin: '-20px -50px',
    width: '200px',
    marginTop: '5pt',
    marginBottom: '1pt',
  },
  icono: {
    color: '#787878',
  },
  iconoColorido: {
    color: '#199479',
  },
});


const InicioSesion = () => {
    const initialState = {
      email: "",
      password: "",
    };
    const classes = useStyles();
    const [user, setUser] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [userColor, setUserColor] = useState(false);
    const [lockColor, setLockColor] = useState(false);

    // Función para cambiar el color del icono de contraseña
    const handleClickLockColor = () => {
      setLockColor(!lockColor);
    };

    // Función para el color del icono de usuario
    const handleClickUserColor = () => {
      setUserColor(!userColor);
    };

    // Función para cambiar visibilidad de la contraseña
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    // Función del icono de de visibilidad
    const handleMouseDownPassword = (e) => {
      e.preventDefault();
    };


  return (
    <div className="container">
        <div className="container-inicioSesion">
            <img className="logo-inicio" src={logo} alt="logo"/>
            <div className="container-inputs">
              <TextField
                fullWidth
                variant="outlined"
                label="Usuario"
                onFocus={handleClickUserColor}
                onBlur={handleClickUserColor}
                style={{marginBottom: "10pt"}}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {userColor ? <PersonOutlined className={classes.iconoColorido}/> : <PersonOutlined className={classes.icono}/>}
                    </InputAdornment>
                  ),
                }}
              ></TextField>
              <TextField
                fullWidth
                variant="outlined"
                label="Contraseña"
                onFocus={handleClickLockColor}
                onBlur={handleClickLockColor}
                style={{marginBottom: "20pt"}}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {lockColor ? <LockOutlined className={classes.iconoColorido}/> : <LockOutlined className={classes.icono}/>}
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
              {/* luego cambiar esta <p> por link */}
              <p className="boton-registrarse">¿No tienes cuenta? ¡Regístrate aquí!</p>
              <Button 
                variant="contained"
                color="primary"
                className={classes.boton}
              >INGRESAR</Button>
            </div>
        </div>
    </div>
  );
};

export default InicioSesion;
