import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";

const TableProductosServicios = ({
  productosServicios,
  setProductosServicios,
  loadingPS,
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
      editable: "never",
      type: "numeric",
      align: "left",
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
      lookup: lookup,
      align: "left",
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

  const addProductoServicio = async (data) => {
    const url = "http://localhost:4000/api/productosServicios";

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

    const productoServicio = await response.json();

    setProductosServicios([...productosServicios, productoServicio]);
  };

  const updateProductoServicio = async (newData, oldData) => {
    const url = `http://localhost:4000/api/productosServicios/${oldData.codProducto}`;

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

    const productoServicio = await response.json();

    const updatedData = [...productosServicios];
    const index = oldData.tableData.id;
    updatedData[index] = productoServicio;

    setProductosServicios(updatedData);
  };

  const deleteProductoServicio = async (oldData) => {
    const url = `http://localhost:4000/api/productosServicios/${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...productosServicios];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosServicios(dataDelete);
  };

  return (
    <div>
      <Table
        title="Productos para Servicio"
        columns={columns}
        data={productosServicios}
        isLoading={loadingPS}
        editable={{
          onRowAdd: addProductoServicio,
          onRowUpdate: updateProductoServicio,
          onRowDelete: deleteProductoServicio,
        }}
        {...props}
      />
    </div>
  );
};

export default TableProductosServicios;
