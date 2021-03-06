import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { Button } from "@material-ui/core";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";
import { composeClasses } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core";

// Estilos
const useStyles = makeStyles({
  buttonEnviar: {
    width: "250px",
    margin: "auto",
    paddingBottom: "20pt",
  },
});

const TableProductosCompra = ({ ordCompra, ordenesCompra, setOrdenesCompra, ...props }) => {
  const [productosCompra, setProductosCompra] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();

  const lookup = {};
  productos.forEach((p) => {
    lookup[p.codProducto] = `${p.codProducto} - ${p.nombre}`;
  });

  useEffect(() => {
    setLoading(true);
    const getProductosCompra = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/ordenesCompra/${ordCompra.codOrdCompra}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosCompra = await response.json();

      setProductosCompra(productosCompra);
      setLoading(false);
    };

    if (ordCompra.enviada) {
      getProductosCompra();
    } else {
      setLoading(false);
    }
  }, [ordCompra]);

  useEffect(() => {
    const getProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${ordCompra.rifProveedor}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productos = await response.json();

      setProductos(productos);
    };

    getProductos();
  }, [ordCompra]);

  const columns = [
    {
      title: "Producto",
      field: "codProducto",
      editable: "onAdd",
      type: "numeric",
      align: "left",
      lookup: lookup,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "always",
      type: "numeric",
      align: "left",
    },
  ];

  const addProductoCompra = async (data) => {
    setProductosCompra([...productosCompra, data]);
  };

  const updateProductoCompra = async (newData, oldData) => {
    const updatedData = [...productosCompra];
    const index = oldData.tableData.id;
    updatedData[index] = newData;

    setProductosCompra(updatedData);
  };

  const deleteProductoCompra = async (oldData) => {
    const dataDelete = [...productosCompra];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosCompra(dataDelete);
  };

  const enviar = async () => {
    setSubmitting(true);
    const url = "https://multiservicios-mundial.herokuapp.com/api/ordenesCompra";

    const ordenCompra = { ...ordCompra };
    ordenCompra.rifSucursal = user.rifSucursal;
    ordenCompra.pide = productosCompra;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(ordenCompra),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      setSubmitting(false);
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const [newOrdenCompra, productos] = await response.json();
    newOrdenCompra.enviada = true;
    newOrdenCompra.recibida = false;

    const updatedData = [...ordenesCompra];
    const index = ordCompra.tableData.id;
    updatedData[index] = newOrdenCompra;

    setSubmitting(false);
    setOrdenesCompra(updatedData);
    setProductosCompra(productos);
  };

  return (
    <Slide top collapse>
      <div>
        <Table
          title={ordCompra.enviada ? "Productos Comprados" : "Productos a Comprar"}
          columns={columns}
          data={productosCompra}
          isLoading={loading}
          subTable
          editable={
            !ordCompra.enviada && {
              onRowAdd: addProductoCompra,
              onRowUpdate: updateProductoCompra,
              onRowDelete: deleteProductoCompra,
            }
          }
          {...props}
        />
        {!ordCompra.enviada && (
          <div className={classes.buttonEnviar}>
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disabled={!productosCompra.length || submitting}
              onClick={enviar}
            >
              Enviar
            </Button>
          </div>
        )}
      </div>
    </Slide>
  );
};

export default TableProductosCompra;
