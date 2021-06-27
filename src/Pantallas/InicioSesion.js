import React , { useState } from "react";
import "./InicioSesion.css";
import logo from "../Imagenes/logo.svg"
import  { 
  TextField, 
  InputAdornment, 
  Button, 
  makeStyles, 
}from '@material-ui/core';
import { Visibility, VisibilityOff } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  boton: {
    position: 'relative',
    left: '35%',
    margin: '-20px -50px',
    width: '200px',
    marginTop: '5pt',
    marginBottom: '1pt',
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
                style={{marginBottom: "10pt"}}
              ></TextField>
              <TextField
                fullWidth
                variant="outlined"
                label="Contraseña"
                style={{marginBottom: "20pt"}}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
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
