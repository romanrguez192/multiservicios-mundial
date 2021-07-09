import React from "react";
import logo from "../img/logo.svg";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Background from "../img/fondoInicioSesion.svg";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";

// ESTILOS

const useStyles = makeStyles({
  fondorRegistroUsuario: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "inherit",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  containerRegistroUsuario: {
    margin: "auto",
    width: "600px",
    backgroundColor: "#ffffff",
    borderRadius: "10pt",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoRegistroUsuario: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "250px",
    height: "200px",
    marginTop: "-30pt",
  },
  containerInputs: {
    marginLeft: "30pt",
    marginRight: "30pt",
    marginBottom: "10pt",
  },
  boton: {
    position: "relative",
    left: "40%",
    margin: "-20px -50px",
    width: "200px",
    marginTop: "10pt",
    marginBottom: "1pt",
  },
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  spaceDiv: {
    marginLeft: "4pt",
    marginRight: "4pt",
  },
  backIcon: {
    marginTop: "5pt",
    marginLeft: "5pt",
  },
});

const InicioSesion = () => {
  const classes = useStyles();

  return (
    <div className={classes.fondorRegistroUsuario}>
      <div className={classes.containerRegistroUsuario}>
        <IconButton component={Link} to="/login" className={classes.backIcon}>
          <ArrowBackOutlinedIcon color="primary" />
        </IconButton>
        <img className={classes.logoRegistroUsuario} src={logo} alt="logo" />
        <form className={classes.containerInputs}>
          <div className={classes.divFlex}>
            <Input label="Usuario" icon="person" />
            <div className={classes.spaceDiv} />
            <Input label="Cédula" icon="identification" />
          </div>
          <div className={classes.divFlex}>
            <Input label="Nombre" icon="person" />
            <div className={classes.spaceDiv} />
            <Input label="Apellido" icon="person" />
          </div>
          <div className={classes.divFlex}>
            <Input label="Teléfono" icon="phone" />
            <div className={classes.spaceDiv} />
            <Input label="Dirección" icon="ubication" />
          </div>
          <div className={classes.divFlex}>
            <PasswordInput label="Contraseña" />
            <div className={classes.spaceDiv} />
            <PasswordInput label="Confirmar contraseña" />
          </div>
          <Input label="Código de la sucursal" icon="store" />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            className={classes.boton}
          >
            REGISTRARSE
          </Button>
        </form>
      </div>
    </div>
  );
};

export default InicioSesion;
