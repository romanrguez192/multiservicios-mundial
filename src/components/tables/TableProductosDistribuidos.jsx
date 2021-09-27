import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

const TableProductosDistribuidos = ({ rifProveedor, ...props }) => {
  const [productosDistribuidos, setProductosDistribuidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProductosDistribuidos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${rifProveedor}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosDistribuidos = await response.json();

      setProductosDistribuidos(productosDistribuidos);
      setLoading(false);
    };

    getProductosDistribuidos();
  }, [rifProveedor]);

  useEffect(() => {
    const getProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
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
      type: "numeric",
      align: "left",
      lookup: lookup,
    },
  ];

  const addProductoDistribuido = async (data) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${rifProveedor}/productos`;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
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

    const productoDistribuido = await response.json();

    setProductosDistribuidos([...productosDistribuidos, productoDistribuido]);
  };

  const deleteProductoDistribuido = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${rifProveedor}/productos/${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...productosDistribuidos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosDistribuidos(dataDelete);
  };

  return (
    <Slide top collapse>
      <Table
        title="Productos que Distribuye"
        columns={columns}
        data={productosDistribuidos}
        isLoading={loading}
        subTable
        editable={{
          onRowAdd: addProductoDistribuido,
          onRowDelete: deleteProductoDistribuido,
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableProductosDistribuidos;
