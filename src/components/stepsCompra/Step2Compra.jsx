import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import TableComprarProductos from "../tables/TableComprarProductos";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Step2Compra = () => {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <TableComprarProductos />
    </div>
  );
};

export default Step2Compra;
