import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { makeStyles, IconButton, Paper, Divider } from "@material-ui/core";
import { ArrowBackOutlined } from "@material-ui/icons";
import TableServiciosSolicitud from "../components/tables/TableServiciosSolicitud";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";

// ESTILOS
const useStyles = makeStyles({
  container: {
    flexGrow: "1",
    marginTop: "60pt",
  },
  root: {
    display: "flex",
  },
  backIcon: {
    marginLeft: "5pt",
    float: "left",
  },
  paperContainer: {
    marginBottom: "20pt",
  },
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
  title: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "20pt",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#199479",
  },
  subtitle: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "15pt",
    fontWeight: "bold",
    lineHeight: "28px",
  },
  containerInformation: {
    padding: "10pt",
    display: "inline-flex",
  },
  box: {
    width: "26vw",
    textAlign: "center",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  divFlex: {
    display: "inline-flex",
    textAlign: "center",
  },
  containerSubInformation: {
    textAlign: "center",
    paddingBottom: "10pt",
  },
  divider: {
    marginLeft: "10pt",
    marginRight: "10pt",
  },
});

const DetalleSolicitud = () => {
  const classes = useStyles();
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getSolicitud = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${params.id}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const solicitud = await response.json();

      setSolicitud(solicitud);
      setLoading(false);
    };

    getSolicitud();
  }, [params]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={classes.root}>
      <Sidebar page="solicitudes" />
      <main className={classes.container}>
        <IconButton
          component={Link}
          to="/solicitudes"
          className={classes.backIcon}
        >
          <ArrowBackOutlined color="primary" />
        </IconButton>
        <PageTitle title={`Solicitud #${solicitud.nroSolicitud}`} />
        <div className={classes.tableContainer}>
          <Fade>
            <Paper className={classes.paperContainer}>
              <div className={classes.containerInformation}>
                <div className={classes.box}>
                  <p className={classes.title}>Cliente</p>
                  <p className={classes.subtitle}>{solicitud.nombreCliente}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>Placa de vehículo</p>
                  <p className={classes.subtitle}>{solicitud.placa}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>Fecha de Inicio</p>
                  <p className={classes.subtitle}>{solicitud.fechaEntrada}</p>
                </div>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.containerSubInformation}>
                <p className={classes.title}>Servicios</p>
                <p className={classes.subtitle}>
                  Lavado y pulitura de carrocería
                </p>
                <p className={classes.subtitle}>Servicio de motor y chasis</p>
              </div>
            </Paper>
          </Fade>
          <TableServiciosSolicitud nroSolicitud={solicitud.nroSolicitud} />
        </div>
      </main>
    </div>
  );
};

export default DetalleSolicitud;
