import React, { useState } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { 
  makeStyles,
  withStyles,
  Button,
  Stepper,
  Typography,
  Step,
  StepLabel,
  StepConnector,
  Icon,
 } from "@material-ui/core";
import TableClientesSucursal from "./TableClientesSucursal";

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#199479',
    },
  },
  completed: {
    '& $line': {
      borderColor: '#199479',
    },
  },
  line: {
    borderColor: '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
    transition: 'all 1s',
  },
})(StepConnector);

// ESTILOS
const useStyles = makeStyles({
  dialogStyle: {
    margin: 'auto',
  },
  buttons: {
    width: '200pt',
    margin: 'auto',
  },
  backButton: {
    marginRight: '10pt',
    width: '90pt',
    color: '#fff',
  },
  nextButton: {
    marginLeft: '10pt',
    width: '90pt',
  },
});


function getSteps() {
  return ['Seleccionar el cliente', 'Seleccionar el vehículo', 'Seleccionar Reserva (Opcional)','Datos de salida'];
}

const data=[
  { nombre: 'Pulitura de carrocería', cantidad: '02/02/2021'},
  { nombre: 'Lavado', cantidad: '08/05/2021'},
];


// Componente de input
const DialogSolicitud = (props) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const [selectedRow, setSelectedRow] = useState(null);

  const options = {
    rowStyle: rowData => ({
      backgroundColor: (selectedRow === rowData.tableData.id) ? '#9E9E9E50' : '#FFF'
    }),
    emptyRowsWhenPaging: true,
    pageSizeOptions: [5],
    actionsColumnIndex: -1,
    headerStyle: {
      backgroundColor: "#199479",
      color: "#fff",
      fontFamily: "quicksand",
    },
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <TableClientesSucursal
                onRowClick={(evt, selectedRow) => {
                  setSelectedRow(selectedRow.tableData.id);
                }}
                options={options}
                data={data}
              />;
      case 1:
        return 'Table de vehiculos';
      case 2:
        return 'Tabla de las reservaciones';
      case 3:
        return 'Inputs para llenar los datos de salida';
      default:
        return 'Error';
    }
  }

  const handleNext = () => {
    {activeStep === steps.length? setActiveStep((prevActiveStep) => prevActiveStep) : setActiveStep((prevActiveStep) => prevActiveStep + 1)};
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      open={props.dialog}
      onClose={props.handleClose}
      keepMounted
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>
        <Stepper activeStep={activeStep} alternativeLabel connector={<QontoConnector/>}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </DialogTitle>
      <DialogContent>
        <div>
          {activeStep === steps.length ? (
            <Typography>Guardar y cerrar</Typography>
          ) : (
            <div>
              {getStepContent(activeStep)}
            </div>
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
          <Button variant="contained" className={classes.nextButton} color="primary" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Guardar' : 'Siguiente'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogSolicitud;



