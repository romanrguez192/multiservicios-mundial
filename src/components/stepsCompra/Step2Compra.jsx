import React, { useState, useEffect } from "react";
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
  const [productos, setProductos] = useState([]);
  const [lista, setLista] = useState([])
  const [montoTotal, setMontoTotal] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductos = async() => {
      const url = `http://localhost:4000/api/productosVentas`;

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return console.log("Oh no");
      }

      const productosVenta = await response.json();

      setProductos(productosVenta);
      setLoading(false);
    }

    getProductos();
  }, [])

  return (
    <div className={classes.tableContainer}>
      <TableComprarProductos {...{
        productos,
        setProductos,
        montoTotal, 
        setMontoTotal,
        cantidad, 
        setCantidad,
        lista,
        setLista,
        loading,
        setLoading
      }}/>
      <h4>{ montoTotal }</h4>
      <h4>{ cantidad }</h4>
    </div>
  );
};

export default Step2Compra;
