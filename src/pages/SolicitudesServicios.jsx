import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import PageTitle from "../components/PageTitle";
import Nature from "../components/Nature";
import TableSolServicios from "../components/tables/TableSolServicios";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerSolicitud: {
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

const SolicitudesServicios = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="solicitudes" />
        <main className={classes.containerSolicitud}>
          <PageTitle title="Solicitudes de Servicio" />
          <div className={classes.tableContainer}>
            <TableSolServicios />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default SolicitudesServicios;
