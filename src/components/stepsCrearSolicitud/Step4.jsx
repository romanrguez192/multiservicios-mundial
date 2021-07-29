import React, { useState } from "react";
import {
   makeStyles,
   Paper,
} from "@material-ui/core";
import InputDate from "./InputDate";
import Fade from "react-reveal/Fade";
import Input from "../inputs/Input";

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
});

const Step4 = () => {
  const classes = useStyles();

  return (
    <Fade>
      <Paper className={classes.container}>
        <div className={classes.containerData}>
          <p className={classes.subtitleFH}>Fecha y hora estimada para la salida</p>
          <InputDate/>
          <p className={classes.subtitleDA}>Datos del autorizado para retirar el vehículo</p>
          
        </div>
      </Paper>
    </Fade>
  );
};

export default Step4;
