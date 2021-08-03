import React, { useEffect, useState } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { makeStyles } from "@material-ui/core";

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

const TableProductosFacturasProveedores = ({}) => {
  const classes = useStyles();
  const [productosFacturasProveedores, setProductosFacturasProveedores] =
    useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductosFacturasProveedores = async () => {
      const url = "";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: error
        return console.log("Oh no");
      }

      const productosFacturasProveedores = await response.json();

      setProductosFacturasProveedores(productosFacturasProveedores);
      setLoading(false);
    };

    getProductosFacturasProveedores();
  });

  useEffect(() => {
    const getProductos = async () => {
      const url = `http://localhost:4000/api/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const productos = await response.json();

      setProductos(productos);
      setLoading(false);
    };

    getProductos();
  }, []);

  const lookup = {};
  productos &&
    productos.forEach((p) => {
      lookup[p.codProducto] = `${p.codProducto} - ${p.nombre}`;
    });

  const columns = [
    {
      title: "Producto",
      field: "codProducto",
      editable: "onAdd",
      lookup: lookup,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "onAdd",
    },
    {
      title: "Precio Unitario",
      field: "precioUnitario",
      editable: "never",
    },
    {
      title: "Precio Total",
      field: "precioTotal",
      editable: "never",
    },
  ];

  const addProductoFacturasProveedores = async (data) => {
    const url = "";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const productoFacturasProveedores = await response.json();

    setProductosFacturasProveedores([
      ...productosFacturasProveedores,
      productoFacturasProveedores,
    ]);
  };

  const deleteProductoFacturasProveedores = async (oldData) => {
    const url = "";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...productosFacturasProveedores];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosFacturasProveedores(dataDelete);
  };

  return (
    <div className={classes.table}>
      <Slide top collapse>
        <Table
          title="Productos"
          subTable
          triTable
          columns={columns}
          data={{}}
          editable={{
            onRowAdd: addProductoFacturasProveedores,
            onRowDelete: deleteProductoFacturasProveedores,
          }}
          isLoading={loading}
        />
      </Slide>
    </div>
  );
};

export default TableProductosFacturasProveedores;
