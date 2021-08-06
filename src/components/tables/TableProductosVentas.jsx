import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";

const TableProductosVentas = ({
  productosVentas,
  setProductosVentas,
  loadingPV,
  lineas,
  ...props
}) => {
  const lookup = {};
  lineas &&
    lineas.forEach((l) => {
      lookup[l.codLinea] = l.descripcion;
    });
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Código",
      field: "codProducto",
      type: "numeric",
      align: "left",
      editable: "never",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "always",
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "always",
    },
    {
      title: "Línea",
      field: "codLinea",
      editable: "always",
      type: "numeric",
      align: "left",
      lookup: lookup,
    },
    {
      title: "Fabricante",
      field: "fabricante",
      editable: "always",
    },
    {
      title: "Ecológico",
      field: "esEcologico",
      editable: "always",
      lookup: { true: "Sí", false: "No" },
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      editable: "always",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nivel mínimo",
      field: "nivelMinimo",
      editable: "always",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nivel máximo",
      field: "nivelMaximo",
      editable: "always",
      type: "numeric",
      align: "left",
    },
  ];

  const addProductoVenta = async (data) => {
    const url = "http://localhost:4000/api/productosVentas";

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

    const productoVenta = await response.json();

    setProductosVentas([...productosVentas, productoVenta]);
  };

  const updateProductoVenta = async (newData, oldData) => {
    const url = `http://localhost:4000/api/productosVentas/${oldData.codProducto}`;

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

    const productoVenta = await response.json();

    const updatedData = [...productosVentas];
    const index = oldData.tableData.id;
    updatedData[index] = productoVenta;

    setProductosVentas(updatedData);
  };

  const deleteProductoVenta = async (oldData) => {
    const url = `http://localhost:4000/api/productosVentas/${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...productosVentas];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosVentas(dataDelete);
  };

  return (
    <div>
      <Table
        title="Productos para Venta"
        columns={columns}
        data={productosVentas}
        isLoading={loadingPV}
        editable={{
          onRowAdd: addProductoVenta,
          onRowUpdate: updateProductoVenta,
          onRowDelete: deleteProductoVenta,
        }}
        {...props}
      />
    </div>
  );
};

export default TableProductosVentas;
