import React, { useState } from "react";
import TableReservacionesCliente from "../tables/TableReservacionesCliente";
// import TableServiciosSinReserva from "../tables/TableServiciosSinReserva";
import { makeStyles } from "@material-ui/core";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Step3 = ({ servicios, setServicios, reservas, setReservas, cliente }) => {
  const classes = useStyles();

  return (
    <div className={classes.tableContainer}>
      <TableReservacionesCliente setReservas={setReservas} cedCliente={cliente.cedCliente} />
    </div>
  );
};

export default Step3;
