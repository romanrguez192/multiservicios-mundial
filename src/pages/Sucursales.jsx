import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableSucursales from "../components/tables/TableSucursales";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";

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
          <PageTitle title="Sucursales"/>
          <div className={classes.tableContainer}>
            <TableSucursales />
          </div>
          <Nature/>
        </main>
      </div>
    </>
  );
};

export default Sucursales;
