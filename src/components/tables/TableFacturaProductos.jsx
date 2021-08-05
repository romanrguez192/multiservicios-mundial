import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableFacturaProductos = ({}) => {
  const [facturaProductos, setFacturaProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFacturaProductos = async () => {
      const url = "";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const facturaProductos = await response.json();

      setFacturaProductos(facturaProductos);
      setLoading(false);
    };

    getFacturaProductos();
  });

  useEffect(() => {
    const getProductos = async () => {
      const url = `http://localhost:4000/api/productosVentas`;
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
      title: "Código",
      field: "codProducto",
      editable: "onAdd",
      lookup: lookup,
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "onAdd",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "onAdd",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      editable: "onAdd",
    },
  ];

  const addFacturaProducto = async (data) => {
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

    const facturaProducto = await response.json();

    setFacturaProductos([...facturaProductos, facturaProducto]);
  };

  const deleteFacturaProducto = async (oldData) => {
    const url = "";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...facturaProductos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setFacturaProductos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Productos"
        columns={columns}
        data={facturaProductos}
        isLoading={loading}
        subTable
        editable={{
          onRowAdd: addFacturaProducto,
          onRowDelete: deleteFacturaProducto,
        }}
      />
    </div>
  );
};

export default TableFacturaProductos;