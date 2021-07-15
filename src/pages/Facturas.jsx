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
  containerFacturas:{
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


const Facturas = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="facturas"/>
        <main className={classes.containerFacturas}>
          <div className={classes.tableContainer}>
            <Table title="Facturas" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Facturas;
