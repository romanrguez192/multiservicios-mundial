import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  makeStyles,
  Button,
  Stepper,
  Step,
  StepLabel,
  IconButton,
} from "@material-ui/core";
import QontoConnector from "../components/stepsCrearSolicitud/QontoConnector";
import Step1 from "../components/stepsCrearSolicitud/Step1";
import Step2 from "../components/stepsCrearSolicitud/Step2";
import Step3 from "../components/stepsCrearSolicitud/Step3";
import Step4 from "../components/stepsCrearSolicitud/Step4";
import { ArrowBackOutlined, HistorySharp } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useUser } from "../contexts/UserContext";

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

const CrearSolicitud = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [vehiculo, setVehiculo] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [fechaSalida, setFechaSalida] = useState(null);
  const [nombreAutorizado, setNombreAutorizado] = useState("");
  const [tlfAutorizado, setTlfAutorizado] = useState("");
  const user = useUser();

  const steps = [
    "Seleccionar el cliente",
    "Seleccionar el vehículo",
    "Seleccionar los servicios",
    "Datos de salida",
  ];

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <Step1
            {...{
              cliente,
              setCliente,
              setVehiculo,
              setReservas,
              setServicios,
              setFechaSalida,
              setNombreAutorizado,
              setTlfAutorizado,
            }}
          />
        );
      case 1:
        return (
          <Step2
            {...{
              vehiculo,
              setVehiculo,
              cliente,
              setReservas,
              setServicios,
              setFechaSalida,
              setNombreAutorizado,
              setTlfAutorizado,
            }}
          />
        );
      case 2:
        return (
          <Step3
            {...{
              setServicios,
              setReservas,
              cliente,
            }}
          />
        );
      case 3:
        return (
          <Step4
            {...{
              fechaSalida,
              setFechaSalida,
              nombreAutorizado,
              setNombreAutorizado,
              tlfAutorizado,
              setTlfAutorizado,
            }}
          />
        );
      default:
        return "Error";
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setReservas([]);
    setServicios([]);
    setFechaSalida(null);
    setNombreAutorizado("");
    setTlfAutorizado("");
    setActiveStep(activeStep - 1);
  };

  const save = async () => {
    setSubmitting(true);

    const data = {
      fechaSalidaEstimada: fechaSalida,
      codVehiculo: vehiculo.codVehiculo,
      rifSucursal: user.rifSucursal,
      nombreAutorizado: nombreAutorizado,
      tlfAutorizado: tlfAutorizado,
      reservas: reservas,
      servicios: servicios,
    };

    const url = `http://localhost:4000/api/solicitudesServicio`;

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
      return console.log("Oh no");
    }

    const solicitud = await response.json();

    setSubmitting(false);
    HistorySharp.push("/solicitudes/" + solicitud.nroSolicitud);
  };

  const disable =
    (activeStep === 0 && !cliente) ||
    (activeStep === 1 && !vehiculo) ||
    (activeStep === 2 && !reservas.length && !servicios.length) ||
    (activeStep === 3 && !fechaSalida);

  return (
    <div className={classes.root}>
      <Sidebar page="solicitudes" />
      <main className={classes.container}>
        <IconButton
          component={Link}
          to="/solicitudes"
          className={classes.backIcon}
        >
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
        <div>{getStepContent(activeStep)}</div>
        <div className={classes.buttons}>
          <Button
            disabled={activeStep === 0 || submitting}
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
            disabled={disable || submitting}
          >
            {activeStep === steps.length - 1 ? "Guardar" : "Siguiente"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default CrearSolicitud;
