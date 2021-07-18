import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import TableReservaciones from '../components/TableReservaciones';


// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  containerReservaciones:{
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


const Reservaciones = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="reservaciones"/>
        <main className={classes.containerReservaciones}>
          <div className={classes.tableContainer}>
            <TableReservaciones />
          </div>
        </main>
      </div>
    </>
  );
};

export default Reservaciones;