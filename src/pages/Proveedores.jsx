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
  containerProveedores:{
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


const Proveedores = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="proveedores"/>
        <main className={classes.containerProveedores}>
          <div className={classes.tableContainer}>
            <Tabla title="Proveedores" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Proveedores;
