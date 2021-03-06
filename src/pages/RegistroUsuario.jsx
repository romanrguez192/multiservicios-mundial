import React, { useState, useEffect } from "react";
import logo from "../img/logo.svg";
import { Button, makeStyles, IconButton } from "@material-ui/core";
import { Link } from "react-router-dom";
import Input from "../components/inputs/Input";
import PasswordInput from "../components/inputs/PasswordInput";
import SelectInput from "../components/inputs/SelectInput";
import Background from "../img/fondoInicioSesion.svg";
import ArrowBackOutlinedIcon from "@material-ui/icons/ArrowBackOutlined";
import { Formik, Form } from "formik";
import { useSnackbar } from "notistack";

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

const RegistroUsuario = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    const getSucursales = async () => {
      const url = "https://multiservicios-mundial.herokuapp.com/api/sucursales";

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const sucursales = await response.json();

      setSucursales(sucursales);
    };

    getSucursales();
  }, []);

  const initialValues = {
    usuario: "",
    cedula: "",
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
    contrasena: "",
    confirmar: "",
    rifSucursal: "",
  };

  const onSubmit = async (data, { setSubmitting }) => {
    setSubmitting(true);
    const url = "https://multiservicios-mundial.herokuapp.com/api/auth/signup";

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
      setSubmitting(false);
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const user = { usuario: data.usuario, contrasena: data.contrasena };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/";
  };

  return (
    <div className={classes.fondorRegistroUsuario}>
      <div className={classes.containerRegistroUsuario}>
        <IconButton component={Link} to="/login" className={classes.backIcon}>
          <ArrowBackOutlinedIcon color="primary" />
        </IconButton>
        <img className={classes.logoRegistroUsuario} src={logo} alt="logo" />
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ isSubmitting }) => (
            <Form className={classes.containerInputs}>
              <div className={classes.divFlex}>
                <Input name="usuario" label="Usuario" icon="person" />
                <div className={classes.spaceDiv} />
                <Input name="cedula" label="C??dula" icon="identification" />
              </div>
              <div className={classes.divFlex}>
                <Input name="nombre" label="Nombre" icon="person" />
                <div className={classes.spaceDiv} />
                <Input name="apellido" label="Apellido" icon="person" />
              </div>
              <div className={classes.divFlex}>
                <Input name="telefono" label="Tel??fono" icon="phone" />
                <div className={classes.spaceDiv} />
                <Input name="direccion" label="Direcci??n" icon="ubication" />
              </div>
              <div className={classes.divFlex}>
                <PasswordInput name="contrasena" label="Contrase??a" />
                <div className={classes.spaceDiv} />
                <PasswordInput name="confirmar" label="Confirmar Contrase??a" />
              </div>
              <SelectInput
                name="rifSucursal"
                label="RIF de la Sucursal"
                icon="store"
                options={sucursales.map((s) => ({ label: s.nombre, value: s.rifSucursal }))}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                className={classes.boton}
                type="submit"
                disabled={isSubmitting}
              >
                REGISTRARSE
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegistroUsuario;
