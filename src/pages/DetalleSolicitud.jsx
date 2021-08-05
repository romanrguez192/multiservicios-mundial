import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  makeStyles,
  IconButton,
  Paper,
  Divider,
} from "@material-ui/core";
import { ArrowBackOutlined } from "@material-ui/icons";
import TableOrdenServicio from "../components/tables/TableOrdenServicio";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import PageTitle from "../components/PageTitle";

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
    marginBottom: '20pt',
  },
  tableContainer: {
    width: '80vw',
    margin: 'auto',
  },
  title: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '20pt',
    fontWeight: 'bold',
    lineHeight: '28px',
    color: '#199479',
  },
  subtitle: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '15pt',
    fontWeight: 'bold',
    lineHeight: '28px',
  },
  containerInformation: {
    padding: '10pt',
    display: "inline-flex",
  },
  box: {
    width: '26vw',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  divFlex: {
    display: "inline-flex",
    textAlign: "center",
  },
});

const CrearSolicitud = () => {
  const classes = useStyles();
  const [servicio, setServicio] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [productosS, setProductosS] = useState([]);

  useEffect(() => {
    const getActividades = async () => {
      const url = "http://localhost:4000/api/actividades";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const actividades = await response.json();

      setActividades(actividades);
    };

    getActividades();
  }, []);

  useEffect(() => {
    const getProductosS = async () => {
      const url = "http://localhost:4000/api/productosServicios";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const productos = await response.json();

      setProductosS(productos);
    };

    getProductosS();
  }, []);

  return (
    <div className={classes.root}>
      <Sidebar page="solicitudes" />
      <main className={classes.container}>
        <IconButton component={Link} to="/solicitudes" className={classes.backIcon}>
          <ArrowBackOutlined color="primary" />
        </IconButton>
        <PageTitle title="Solicitud 11"/>
        <div className={classes.tableContainer}>
          <Fade>
            <Paper className={classes.paperContainer}>
              <div className={classes.containerInformation}>
                <div className={classes.box}>
                  <p className={classes.title}>Nombre</p>
                  <p className={classes.subtitle}>José Saad</p>
                </div>
                <Divider orientation="vertical" flexItem/>
                <div className={classes.box}>
                  <p className={classes.title}>Placa de vehículo</p>
                  <p className={classes.subtitle}>AB622FE</p>
                </div>
                <Divider orientation="vertical" flexItem/>
                <div className={classes.box}>
                  <p className={classes.title}>Fecha</p>
                  <p className={classes.subtitle}>04/09/2021</p>
                </div>
              </div>
            </Paper>
          </Fade>
          <TableOrdenServicio
            {...{
              //props
              servicio,
              actividades,
              productosS,
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default CrearSolicitud;
