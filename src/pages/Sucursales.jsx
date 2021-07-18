import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableSucursales from "../components/TableSucursales";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerSucursales: {
    flexGrow: "1",
    marginTop: "60pt",
  },
  root: {
    display: "flex",
  },
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Sucursales = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="sucursales" />
        <main className={classes.containerSucursales}>
          <div className={classes.tableContainer}>
            <TableSucursales />
          </div>
        </main>
      </div>
    </>
  );
};

export default Sucursales;
