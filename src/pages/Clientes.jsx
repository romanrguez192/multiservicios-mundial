import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import TableClientes from '../components/TableClientes';
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";


// ESTILOS
const useStyles = makeStyles({
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
          <PageTitle title="Clientes"/>
          <div className={classes.tableContainer}>
            <TableClientes />
            <Nature />
          </div>
        </main>
      </div>
    </>
  );
};

export default Clientes;
