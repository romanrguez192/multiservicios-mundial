import React, { useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
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
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "15pt",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#199479",
    paddingTop: "20pt",
  },
  subtitleDA: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "15pt",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#199479",
    paddingBottom: "20pt",
  },
  divFlex: {
    display: "inline-flex",
    paddingBottom: "20pt",
  },
  spaceDiv: {
    marginLeft: "20pt",
    marginRight: "20pt",
  },
});

const Step4 = ({
  setFechaSalida,
  nombreAutorizado,
  setNombreAutorizado,
  tlfAutorizado,
  setTlfAutorizado,
}) => {
  const classes = useStyles();

  return (
    <Fade>
      <Paper className={classes.container}>
        <div className={classes.containerData}>
          <p className={classes.subtitleFH}>
            Fecha y hora estimada para la salida
          </p>
          <InputDate {...{ setFechaSalida }} />
          <p className={classes.subtitleDA}>
            Datos del autorizado para retirar el vehículo
          </p>
          <Formik>
            {() => (
              <Form className={classes.containerInputs}>
                <div className={classes.divFlex}>
                  <Input
                    value={nombreAutorizado}
                    name="nombre"
                    label="Nombre"
                    icon="person"
                    onChange={(e) => setNombreAutorizado(e.target.value)}
                  />
                  <div className={classes.spaceDiv} />
                  <Input
                    value={tlfAutorizado}
                    name="telefono"
                    label="Teléfono"
                    icon="phone"
                    onChange={(e) => setTlfAutorizado(e.target.value)}
                  />
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
