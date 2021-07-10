import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import Tabla from '../components/Tabla';


// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  containerClientes:{
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


const Clientes = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="clientes"/>
        <main className={classes.containerClientes}>
          <div className={classes.tableContainer}>
            <Tabla title="Clientes" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Clientes;
