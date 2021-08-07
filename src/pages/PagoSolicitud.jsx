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
import Input from "../components/inputs/Input";
import { Formik, Form } from "formik";
import SelectPago from "../components/inputs/SelectPago";

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
    paddingBottom: "10pt",
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
    textAlign: "center",
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
  datos: {
    width: "300px",
    margin: "auto",
    paddingBottom: "20pt",
  },
  separator: {
    width: "50pt",
  }
});

const DetalleSolicitud = () => {
  const classes = useStyles();
  const [solicitud, setSolicitud] = useState(null);
  const [moneda, setMoneda] = useState(null);
  const [tipoPago, setTipoPago] = useState(null);
  const [numPago, setNumPago] = useState(0);
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


  const forPago = (numPagos) => {
    var rows = [];
      for (var i = 0; i < numPagos; i++) {
          rows.push(
            <div key={i}>
              <p className={classes.title}>Pago {i+1}</p>
              <p className={classes.subtitle}>Seleccionar Moneda</p>
              <div className={classes.datos}>
                <SelectPago
                  name="tipoMoneda"
                  title="Moneda"
                  setMoneda={setMoneda}
                />
              </div>
              <p className={classes.subtitle}>Seleccionar Tipo de pago</p>
              <div className={classes.datos}>
                <SelectPago
                  name="tipoPago"
                  title="Tipo de Pago"
                  setTipoPago={setTipoPago}
                />
              </div>
              <div className={classes.divFlex}>
                <Input
                  label="Banco"
                />
                <div className={classes.separator}/>
                <Input
                  label="Numero de Tarjeta"
                  type="number"
                  inputProps={{ min: 0 }}
                />
              </div>
            </div>
          );
      }
      return <div>{rows}</div>;
  };

  return (
    <div className={classes.root}>
      <Sidebar page="solicitudes" />
      <main className={classes.container}>
        <PageTitle classname={classes.pagetitle} title={`Finalización de solicitud #${solicitud.nroSolicitud}`} />
        <div className={classes.tableContainer}>
          <Fade>
            <Paper className={classes.paperContainer}>
              <div className={classes.containerInformation}>
                <Formik>
                  {() => (
                    <Form className={classes.containerInputs}>
                      <p className={classes.title}>Monto a pagar: (poner monto) Bs</p>
                      <p className={classes.title}>Número de pagos a realizar</p>
                      <div className={classes.datos}>
                        <Input
                          label="Numero de pagos"
                          type="number"
                          inputProps={{ min: 0 , max: 10 }}
                          onChange={(e) => setNumPago(e.target.value)}
                        />
                      </div>
                      {forPago(numPago)}
                    </Form>
                  )}
                </Formik>
              </div>
            </Paper>
          </Fade>
        </div>
      </main>
    </div>
  );
};

export default DetalleSolicitud;
