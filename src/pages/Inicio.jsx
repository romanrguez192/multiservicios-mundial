import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import Table from '../components/Table';


// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  containerInicio:{
    flexGrow: '1',
    marginTop: '60pt',
  },
  root: {
    display: 'flex',
  },
  tableContainer: {
    width: '80vw',
    margin: 'auto',
  },
});


const InicioSesion = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inicio"/>
        <main className={classes.containerInicio}>
          <div className={classes.tableContainer}>
            Solicitudes de servicio
          </div>
        </main>
      </div>
    </>
  );
};

export default InicioSesion;
