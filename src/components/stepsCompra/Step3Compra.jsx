import React, { useState } from "react";
import {
  makeStyles,
  Paper,
} from "@material-ui/core";
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
    paddingTop: '20pt',
  },
  divFlex: {
    display: "inline-flex",
    paddingBottom: "20pt",
  },
  spaceDiv: {
    marginLeft: '20pt',
    marginRight: '20pt',
  },
});

const Step3Compra = ({
  
}) => {
  const classes = useStyles();
  const [pago, setPago] = useState(null);

  const initialValues = {
    nombre: "",
    telefono: "",
    tipoPago: "",
  };

  function tipoDePago(type){
    switch(type) {
      case null:
        return
      case 'Efectivo':
        return <SelectPago name="tipoPago" title="Moneda" />
      case 'Transferencia':
        return <Input name="tarjeta" placeholder="Banco"/>
      default:
        return <Input name="tarjeta" placeholder="Numero de tarjeta"/>
    }
  };


  return (
    <Fade>
      <Paper className={classes.container}>
        <div className={classes.containerData}>
        <Formik initialValues={initialValues}>
          {({ isSubmitting }) => (
            <Form className={classes.containerInputs}>
              <p className={classes.subtitleFH}>Seleccionar Tipo de pago</p>
              <SelectPago name="tipoPago" title="Tipo de Pago"/>
              <p className={classes.subtitleDA}>Datos adicionales</p>
              <div className={classes.divFlex}>
                {tipoDePago(null)} {/* aca verificar dependiendo de que tenga el SelectPago */}
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
