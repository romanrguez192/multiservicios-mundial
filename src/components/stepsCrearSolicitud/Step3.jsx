import React, { useState } from "react";
import TableReservacionesCliente from "../tables/TableReservacionesCliente";
import TableServiciosSinReserva from "../tables/TableServiciosSinReserva";
import { makeStyles } from "@material-ui/core";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Step3 = ({ setServicios, setReservas, cliente }) => {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <TableReservacionesCliente setReservas={setReservas} cedCliente={cliente.cedCliente} />
      <TableServiciosSinReserva setServicios={setServicios} />
    </div>
  );
};

export default Step3;
