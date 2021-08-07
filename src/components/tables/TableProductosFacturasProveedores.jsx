import React, { useEffect, useState } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { makeStyles } from "@material-ui/core";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
    width: "820pt",
  },
});

const TableProductosFacturasProveedores = ({ codOrdCompra }) => {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProductos = async () => {
      const url = `http://localhost:4000/api/ordenesCompra/${codOrdCompra}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productos = await response.json();

      setProductos(productos);
      setLoading(false);
    };

    getProductos();
  }, []);

  const columns = [
    {
      title: "Código del producto",
      field: "codProducto",
      editable: "never",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre de producto",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      type: "numeric",
      align: "left",
      editable: "never",
    },
    {
      title: "Precio Total (Bs.S)",
      field: "precio",
      type: "numeric",
      align: "left",
      editable: "always",
      emptyValue: "Por registrar",
    },
  ];

  const update = async (newData, oldData) => {
    const url = `http://localhost:4000/api/ordenesCompra/${codOrdCompra}/productos/${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const producto = await response.json();

    const updatedData = [...productos];
    const index = oldData.tableData.id;
    updatedData[index] = producto;

    setProductos(updatedData);
  };

  return (
    <div className={classes.table}>
      <Slide top collapse>
        <Table
          title="Productos"
          subTable
          triTable
          columns={columns}
          data={productos}
          editable={{
            onRowUpdate: update,
          }}
          isLoading={loading}
        />
      </Slide>
    </div>
  );
};

export default TableProductosFacturasProveedores;
