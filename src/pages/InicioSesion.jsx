import React from "react";
import logo from "../img/logo.svg"
import  { 
  Button, 
  makeStyles, 
}from '@material-ui/core';
import Input from "../components/Input";
import Background from "../img/fondoInicioSesion.svg";


{/* ESTILOS */}
const useStyles = makeStyles({
  fondoInicioSesion: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'inherit',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
  },
  containerInicioSesion: {
    margin: 'auto',
    width: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '10pt',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInicio: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    width: '250px',
    height: '200px',
  },
  containerInputs: {
    marginLeft: '30pt',
    marginRight: '30pt',
    marginBottom: '20pt',
  },
  botonRegistrarse: {
    textAlign: 'center',
    margin: 'auto',
    textDecoration: 'underline',
  },
  boton: {
    position: 'relative',
    left: '35%',
    margin: '-20px -50px',
    width: '200px',
    marginTop: '5pt',
    marginBottom: '1pt',
  },
  userInputLogin: {
    marginBottom: '10pt',
    marginTop: '20pt',
  },
  passwordInputLogin: {
    marginBottom: '20pt',
  },
  
});


const InicioSesion = () => {
    const initialState = {
      user: "",
      password: "",
    };
    const classes = useStyles();

  return (
    <div className={classes.fondoInicioSesion}>
        <div className={classes.containerInicioSesion}>
            <img className={classes.logoInicio} src={logo} alt="logo"/>
            <form className={classes.containerInputs}>
              <div className={classes.userInputLogin}>
                <Input title="Usuario" icon="person"/>
              </div>
              <div className={classes.passwordInputLogin}>
                <Input title="Contraseña" isPassword />
              </div>
              {/* luego cambiar esta <p> por link */}
              <p className={classes.botonRegistrarse}>¿No tienes cuenta? ¡Regístrate aquí!</p>
              <Button 
                variant="contained"
                color="primary"
                fullWidth
                className={classes.boton}
              >INGRESAR</Button>
            </form>
        </div>
    </div>
  );
};

export default InicioSesion;
