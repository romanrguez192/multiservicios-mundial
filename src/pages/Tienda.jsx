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
  containerTienda:{
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


const Tienda = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="tienda"/>
        <main className={classes.containerTienda}>
          <div className={classes.tableContainer}>
            <Tabla title="Tienda" />
          </div>
        </main>
      </div>
    </>
  );
};

export default Tienda;
