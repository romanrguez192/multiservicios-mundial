import React, { useState } from "react";
import {
   makeStyles,
   Paper,
} from "@material-ui/core";
import InputDate from "./InputDate";
import Fade from "react-reveal/Fade";
import Input from "../inputs/Input";
import { Formik, Form } from "formik";

// Estilos
const useStyles = makeStyles({
  container: {
    width: "80vw",
    margin: "auto",
    marginBottom: "20pt",
  },
  containerData: {
    margin: "auto",
    alignItems: "center",
    textAlign: "center",
  },
  subtitleFH: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '15pt',
    fontWeight: 'bold',
    lineHeight: '28px',
    color: '#199479',
    paddingTop: '20pt',
  },
  subtitleDA: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '15pt',
    fontWeight: 'bold',
    lineHeight: '28px',
    color: '#199479',
    paddingBottom: '20pt',
  },
  divFlex: {
    display: "inline-flex",
    paddingBottom: "10pt",
  },
  spaceDiv: {
    marginLeft: '20pt',
    marginRight: '20pt',
  }
});

const Step4 = () => {
  const classes = useStyles();

  const initialValues = {
    cedula: "",
    nombre: "",
    telefono: "",
  };


  return (
    <Fade>
      <Paper className={classes.container}>
        <div className={classes.containerData}>
          <p className={classes.subtitleFH}>Fecha y hora estimada para la salida</p>
          <InputDate/>
          <p className={classes.subtitleDA}>Datos del autorizado para retirar el vehículo</p>
          <Formik initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form className={classes.containerInputs}>
              <div className={classes.divFlex}>
                <Input name="nombre" label="Nombre" icon="person" />
                <div className={classes.spaceDiv} />
                <Input name="cedula" label="Cédula" icon="identification" />
                <div className={classes.spaceDiv} />
                <Input name="telefono" label="Teléfono" icon="phone" />
              </div>
            </Form>
          )}
        </Formik>
        </div>
      </Paper>
    </Fade>
  );
};

export default Step4;
