import React, { useState } from "react";
import { makeStyles, Paper } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import Input from "../inputs/Input";
import { Formik, Form } from "formik";
import SelectPago from "../inputs/SelectPago";

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
    paddingTop: "20pt",
  },
  divFlex: {
    display: "inline-flex",
    paddingBottom: "20pt",
  },
  spaceDiv: {
    marginLeft: "20pt",
    marginRight: "20pt",
  },
  datosAd: {
    width: "300px",
    margin: "auto",
    paddingBottom: "20pt",
  },
});

const Step3Compra = ({
  tipoPago,
  setTipoPago,
  datoPago,
  setDatoPago,
  setMoneda,
}) => {
  const classes = useStyles();

  const verificarTipoPago = (type) => {
    switch (type) {
      case "Transferencia":
        return (
          <>
            <p className={classes.subtitleDA}>Datos adicionales</p>
            <Input
              name="transferencia"
              label="Banco"
              placeholder="Banco"
              value={datoPago}
              onChange={(e) => setDatoPago(e.target.value)}
            />
          </>
        );
      case "Tarjeta de crédito":
        return (
          <>
            <p className={classes.subtitleDA}>Datos adicionales</p>
            <Input
              name="credito"
              label="Numero de tarjeta"
              placeholder="Numero de tarjeta"
              value={datoPago}
              onChange={(e) => setDatoPago(e.target.value)}
            />
          </>
        );
      case "Tarjeta de débito":
        return (
          <>
            <p className={classes.subtitleDA}>Datos adicionales</p>
            <Input
              name="debito"
              label="Numero de tarjeta"
              placeholder="Numero de tarjeta"
              value={datoPago}
              onChange={(e) => setDatoPago(e.target.value)}
            />
          </>
        );
      default:
        return;
    }
  };

  return (
    <Fade>
      <Paper className={classes.container}>
        <div className={classes.containerData}>
          <Formik>
            {() => (
              <Form className={classes.containerInputs}>
                <p className={classes.subtitleFH}>Seleccionar Tipo de pago</p>
                <SelectPago
                  name="tipoPago"
                  title="Tipo de Pago"
                  setTipoPago={setTipoPago}
                />
                <p className={classes.subtitleFH}>Seleccionar Moneda</p>
                <SelectPago
                  name="tipoMoneda"
                  title="Moneda"
                  setMoneda={setMoneda}
                />
                <div className={classes.datosAd}>
                  {verificarTipoPago(tipoPago)}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Paper>
    </Fade>
  );
};

export default Step3Compra;
