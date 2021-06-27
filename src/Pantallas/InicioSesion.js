import React from "react";
import "./InicioSesion.css";
import logo from "../Imagenes/logo.svg"
import  { TextField, Button, makeStyles }from '@material-ui/core';

const useStyles = makeStyles({
  boton: {
    position: 'relative',
    left: '35%',
    margin: '-20px -50px',
    width: '200px',
  },
});


const InicioSesion = () => {
    const classes = useStyles();
    const IniciarSesion = (
        <div>hola</div>
    );

    const RegistrarUsuario = (
        <div>hola</div>
    );

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
              ></TextField>
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
