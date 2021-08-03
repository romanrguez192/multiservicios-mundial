import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableComprarProductos = ({ productos, setProductos, loadingCP, ...props }) => {
  const columns = [
    {
      title: "Código",
      field: "codProducto",
      editable: "never",
    },
    {
      title: "Nombre",
      field: "nombre",
      //lookup: lookup,
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "never",
    },
    {
      title: "Línea",
      field: "codLinea",
      editable: "never",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      editable: "never",
      type: "numeric",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "always",
      type: "numeric",
    },    
  ];

  const addProducto = async (data) => {
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

    const producto = await response.json();

    setProductos([...productos, producto]);
  };

  const updateProducto = async (newData, oldData) => {
    const url = ``;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const producto = await response.json();

    const updatedData = [...productos];
    const index = oldData.tableData.id;
    updatedData[index] = producto;

    setProductos(updatedData);
  };

  const deleteProducto = async (oldData) => {
    const url = ``;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...productos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Seleccionar Productos"
        columns={columns}
        data={productos}
        //isLoading={loadingCP}
        editable={{
          onRowAdd: addProducto,
          onRowUpdate: updateProducto,
          onRowDelete: deleteProducto,
        }}
        {...props}
      />
    </div>
  );
};

export default TableComprarProductos;
