import React from "react";
import logo from "../img/logo.svg";
import { Button, makeStyles, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Formik, Form } from "formik";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Background from "../img/fondoInicioSesion.svg";

// ESTILOS
const useStyles = makeStyles({
  fondoInicioSesion: {
    backgroundImage: `url(${Background})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "inherit",
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },
  containerInicioSesion: {
    margin: "auto",
    width: "400px",
    backgroundColor: "#ffffff",
    borderRadius: "10pt",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  logoInicio: {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block",
    width: "250px",
    height: "200px",
  },
  containerInputs: {
    marginLeft: "30pt",
    marginRight: "30pt",
    marginBottom: "20pt",
  },
  botonRegistrarse: {
    textAlign: "center",
    margin: "auto",
    textDecoration: "underline",
    marginLeft: "14pt",
    color: "#787878",
  },
  boton: {
    position: "relative",
    left: "35%",
    margin: "-20px -50px",
    width: "200px",
    marginTop: "5pt",
    marginBottom: "1pt",
  },
  userInputLogin: {
    marginBottom: "10pt",
    marginTop: "20pt",
  },
  passwordInputLogin: {
    marginBottom: "20pt",
  },
});

const InicioSesion = () => {
  const classes = useStyles();

  const initialValues = {
    usuario: "",
    contrasena: "",
  };

  const onSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);

    const url = "http://localhost:4000/api/auth/login";

    // TODO: try catch ?

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    localStorage.setItem("user", JSON.stringify(data));

    setSubmitting(false);
    window.location.href = "/";
  };

  return (
    <div className={classes.fondoInicioSesion}>
      <div className={classes.containerInicioSesion}>
        <img className={classes.logoInicio} src={logo} alt="logo" />
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className={classes.containerInputs}>
              <Input
                name="usuario"
                className={classes.userInputLogin}
                label="Usuario"
                icon="person"
              />
              <PasswordInput
                name="contrasena"
                className={classes.passwordInputLogin}
                label="Contraseña"
              />
              <Link
                component={RouterLink}
                to="/signup"
                className={classes.botonRegistrarse}
              >
                ¿No tienes cuenta? ¡Regístrate aquí!
              </Link>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.boton}
                type="submit"
                disabled={isSubmitting}
              >
                INGRESAR
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default InicioSesion;
