import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  makeStyles,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
} from "@material-ui/core";
import QontoConnector from "../components/stepsCrearSolicitud/QontoConnector";
import Step1 from "../components/stepsCrearSolicitud/Step1";
import Step2 from "../components/stepsCrearSolicitud/Step2";
import Step3 from "../components/stepsCrearSolicitud/Step3";
import Step4 from "../components/stepsCrearSolicitud/Step4";

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
});

const CrearSolicitud = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [cliente, setCliente] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [servicios, setServicios] = useState([]);

  const steps = [
    "Seleccionar el cliente",
    "Seleccionar el vehículo",
    "Seleccionar los servicios",
    "Datos de salida",
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Step1 {...{ cliente, setCliente }} />;
      case 1:
        return <Step2 {...{ vehiculo, setVehiculo, cliente }} />;
      case 2:
        return <Step3 {...{ servicios, setServicios }} />;
      case 3:
        return <Step4 />;
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
    (activeStep === 1 && !vehiculo) ||
    (activeStep === 2 && !servicios.length);

  return (
    <div className={classes.root}>
      <Sidebar page="solicitudes" />
      <main className={classes.container}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <Typography>Guardar y cerrar</Typography>
          ) : (
            <div>{getStepContent(activeStep)}</div>
          )}
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
            onClick={handleNext}
            disabled={disable}
          >
            {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CrearSolicitud;
