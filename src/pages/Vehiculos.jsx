import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableTiposVehiculos from "../components/TableTiposVehiculos";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerVehiculos: {
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

const Vehiculos = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Sidebar page="vehiculos" />
      <main className={classes.containerVehiculos}>
        <div className={classes.tableContainer}>
          <TableTiposVehiculos />
        </div>
      </main>
    </div>
  );
};

export default Vehiculos;
