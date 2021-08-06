import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  makeStyles,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  IconButton,
} from "@material-ui/core";
import QontoConnector from "../components/stepsCrearSolicitud/QontoConnector";
import Step1Compra from "../components/stepsCompra/Step1Compra";
import Step2Compra from "../components/stepsCompra/Step2Compra";
import Step3Compra from "../components/stepsCompra/Step3Compra";
import { ArrowBackOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  container: {
    flexGrow: "1",
    marginTop: "60pt",
  },
  root: {
    display: "flex",
  },
  dialogStyle: {
    margin: "auto",
  },
  buttons: {
    width: "200pt",
    margin: "auto",
    marginBottom: "20pt",
  },
  backButton: {
    marginRight: "10pt",
    width: "90pt",
    color: "#fff",
  },
  nextButton: {
    marginLeft: "10pt",
    width: "90pt",
  },
  stepStyle: {
    backgroundColor: "#fafafa",
  },
  backIcon: {
    marginLeft: "5pt",
  },
});

const Compra = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cliente, setCliente] = useState(null);
  const [lista, setLista] = useState([]);
  const [tipoPago, setTipoPago] = useState(null);
  const [datoPago, setDatoPago] = useState(null);
  const [moneda, setMoneda] = useState(null);
  const [montoTotal, setMontoTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);

  const steps = [
    "Seleccionar el cliente",
    "Seleccionar los productos",
    "Seleccionar método de pago",
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Step1Compra {...{ cliente, setCliente, setLista }} />;
      case 1:
        return <Step2Compra {...{ 
          lista, setLista, montoTotal, setMontoTotal,
          setTipoPago, setDatoPago, setMoneda, cantidad, setCantidad }} />;
      case 2:
        return <Step3Compra  {...{ 
          tipoPago, setTipoPago, 
          moneda, setMoneda,
          datoPago, setDatoPago }} />;
      default:
        return "Error";
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const disable =
    (activeStep === 0 && !cliente) ||
    (activeStep === 1 && lista.length === 0) ||
    (activeStep === 2 && !datoPago);


  const save = async () => {
    console.log(cliente);
    console.log(lista);
    console.log(tipoPago);
    console.log(datoPago);
    console.log(moneda);
    console.log(montoTotal);
    console.log(cantidad);
  }

  return (
    <div className={classes.root}>
      <Sidebar page="tienda" />
      <main className={classes.container}>
        <IconButton component={Link} to="/tienda" className={classes.backIcon}>
          <ArrowBackOutlined color="primary" />
        </IconButton>
        <Fade>
          <Stepper
            activeStep={activeStep}
            className={classes.stepStyle}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Fade>
        <div>
          <div>{getStepContent(activeStep)}</div>
        </div>
        <div className={classes.buttons}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            color="secondary"
            variant="contained"
            className={classes.backButton}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            className={classes.nextButton}
            color="primary"
            onClick={activeStep === steps.length - 1 ? save : handleNext}
            disabled={disable}
          >
            {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Compra;
