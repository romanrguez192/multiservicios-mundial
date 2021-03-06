import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import TableComprarProductos from "../tables/TableComprarProductos";
import { useSnackbar } from "notistack";
import { useUser } from "../../contexts/UserContext";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Quicksand",
    fontStyle: "normal",
    fontSize: "15pt",
    fontWeight: "bold",
    lineHeight: "28px",
    color: "#199479",
    marginRight: "10pt",
    marginLeft: "10pt",
  },
  divFlex: {
    display: "inline-flex",
    textAlign: "center",
  },
});

const Step2Compra = ({
  lista,
  setLista,
  cantidad,
  setCantidad,
  setTipoPago,
  setDatoPago,
  setMoneda,
  montoTotal,
  setMontoTotal,
}) => {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const user = useUser();

  useEffect(() => {
    const getProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/productosVentas?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosVenta = await response.json();

      setProductos(productosVenta);
      setLoading(false);
    };

    getProductos();

    // Se reinician los pasos siguientes
    setDatoPago(null);
    setMoneda(null);
    setTipoPago(null);
  }, []);

  return (
    <div className={classes.tableContainer}>
      <TableComprarProductos
        {...{
          productos,
          setProductos,
          montoTotal,
          setMontoTotal,
          cantidad,
          setCantidad,
          lista,
          setLista,
          loading,
          setLoading,
        }}
      />
      <div className={classes.divFlex}>
        <p className={classes.subtitle}>Monto total: {montoTotal}</p>
        <p className={classes.subtitle}>Cantidad total: {cantidad}</p>
      </div>
    </div>
  );
};

export default Step2Compra;
