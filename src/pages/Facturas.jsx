import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import TableFacturasVentas from '../components/tables/TableFacturasVentas';
import TableFacturasProveedores from '../components/tables/TableFacturasProveedores';
import TableFacturasServicios from '../components/tables/TableFacturasServicios';
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";


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
          <PageTitle title="Facturas" />
          <div className={classes.tableContainer}>
            <TableFacturasVentas />
            <TableFacturasServicios />
            <TableFacturasProveedores />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Facturas;
