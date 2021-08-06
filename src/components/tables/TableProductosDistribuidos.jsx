import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";

const TableProductosDistribuidos = ({ rifProveedor, ...props }) => {
  const [productosDistribuidos, setProductosDistribuidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductosDistribuidos = async () => {
      const url = `http://localhost:4000/api/proveedores/${rifProveedor}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const productosDistribuidos = await response.json();

      setProductosDistribuidos(productosDistribuidos);
      setLoading(false);
    };

    getProductosDistribuidos();
  }, [rifProveedor]);

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
      type: "numeric",
      align: "left",
      lookup: lookup,
    },
  ];

  const addProductoDistribuido = async (data) => {
    const url = `http://localhost:4000/api/proveedores/${rifProveedor}/productos`;

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

    const productoDistribuido = await response.json();

    setProductosDistribuidos([...productosDistribuidos, productoDistribuido]);
  };

  const deleteProductoDistribuido = async (oldData) => {
    const url = `http://localhost:4000/api/proveedores/${rifProveedor}/productos/${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
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
