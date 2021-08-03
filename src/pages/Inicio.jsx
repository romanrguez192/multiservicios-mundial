import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import PageTitle from "../components/PageTitle";
import Nature from "../components/Nature";
import TableEstClientesReservas from "../components/tables/TableEstClientesReservas";
import TableEstSuministroProveedor from "../components/tables/TableEstSuministroProveedor";
import TableEstClientesFrecuentes from "../components/tables/TableEstClientesFrecuentes";
import TableEstMarcas from "../components/tables/TableEstMarcas";
import TableEstPersonal from "../components/tables/TableEstPersonal";
import TableEstProductosVendidos from "../components/tables/TableEstProductosVendidos";
import TableEstServiciosSolicitados from "../components/tables/TableEstServiciosSolicitados";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerInicio: {
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

const Inicio = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inicio" />
        <main className={classes.containerInicio}>
          <PageTitle title="Información de interés" />
          <div className={classes.tableContainer}>
            <TableEstMarcas />
            <TableEstPersonal />
            <TableEstClientesFrecuentes />
            <TableEstProductosVendidos />
            <TableEstServiciosSolicitados />
            <TableEstClientesReservas />
            <TableEstSuministroProveedor />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Inicio;
