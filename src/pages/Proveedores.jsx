import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import TableProveedores from "../components/tables/TableProveedores";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";

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
          <PageTitle title="Proveedores"/>
          <div className={classes.tableContainer}>
            <TableProveedores />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Proveedores;
