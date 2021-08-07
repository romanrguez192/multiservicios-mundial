import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  makeStyles,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { ArrowBackOutlined } from "@material-ui/icons";
import TableServiciosSolicitud from "../components/tables/TableServiciosSolicitud";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";

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
  box2: {
    width: "39vw",
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
    paddingTop: "10pt",
    textAlign: "center",
    paddingBottom: "10pt",
    display: "inline-flex",
  },
  divider: {
    marginLeft: "10pt",
    marginRight: "10pt",
  },
  loading: {
    position: "fixed",
    top: "50%",
    left: "50%",
  },
  endServ: {
    margin: "auto",
    width: "250px",
    paddingTop: "10pt",
    paddingBottom: "30pt",
  },
});

const DetalleSolicitud = () => {
  const classes = useStyles();
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getSolicitud = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${params.id}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const solicitud = await response.json();

      setSolicitud(solicitud);
      setLoading(false);
    };

    getSolicitud();
  }, [params]);

  if (loading) {
    return (
      <div>
        <Sidebar page="solicitudes" />
        <CircularProgress className={classes.loading} />;
      </div>
    );
  }

  function formatDate(string){
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
    return new Date(string).toLocaleDateString('ES-es',options);
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
                  <p className={classes.title}>Nombre del cliente</p>
                  <p className={classes.subtitle}>{solicitud.nombreCliente}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>Fecha de entrada</p>
                  <p className={classes.subtitle}>{formatDate(solicitud.fechaEntrada)}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>
                    {"Fecha de salida" +
                      (solicitud.finalizada ? "" : " estimada")}
                  </p>
                  <p className={classes.subtitle}>
                    {solicitud.finalizada
                      ? formatDate(solicitud.fechaSalidaReal)
                      : formatDate(solicitud.fechaSalidaEstimada)}
                  </p>
                </div>
              </div>
              <Divider className={classes.divider} />
              <div className={classes.containerInformation}>
                <div className={classes.box}>
                  <p className={classes.title}>Placa de vehículo</p>
                  <p className={classes.subtitle}>{solicitud.placa}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>Marca del vehículo</p>
                  <p className={classes.subtitle}>{solicitud.marca}</p>
                </div>
                <Divider orientation="vertical" flexItem />
                <div className={classes.box}>
                  <p className={classes.title}>Modelo del vehículo</p>
                  <p className={classes.subtitle}>{solicitud.modelo}</p>
                </div>
              </div>
            </Paper>
          </Fade>
          <TableServiciosSolicitud nroSolicitud={solicitud.nroSolicitud} />
          {solicitud.finalizada ? (
            <div></div>
          ) : (
            <div className={classes.endServ}>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary"
                component={Link}
                to={`pagoSolicitud/${solicitud.nroSolicitud}`}
              >
                Finalizar Servicio
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DetalleSolicitud;
