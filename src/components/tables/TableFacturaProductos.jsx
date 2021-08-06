import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";

const TableFacturaProductos = ({}) => {
  const [facturaProductos, setFacturaProductos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getFacturaProductos = async () => {
      const url = "";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
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
      title: "Código",
      field: "codProducto",
      editable: "onAdd",
      type: "numeric",
      lookup: lookup,
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "onAdd",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      type: "numeric",
      editable: "onAdd",
      align: "left",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      editable: "onAdd",
      align: "left",
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
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
