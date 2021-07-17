import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableLineas from "../components/TableLineas";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerInventario: {
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

const Inventario = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inventario" />
        <main className={classes.containerInventario}>
          <div className={classes.tableContainer}>
            <TableLineas />
          </div>
        </main>
      </div>
    </>
  );
};

export default Inventario;
