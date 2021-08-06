import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableComprarProductos = ({ 
  productos, setProductos, 
  montoTotal, setMontoTotal,
  cantidad, setCantidad,
  loading, setLoading,
  lista, setLista, ...props }) => {

  const lookup = {};

  productos && productos.forEach((p) => {
    lookup[p.codProducto] = p.nombre;
  })

  const columns = [
    {
      title: "Código",
      field: "codProducto",
      editable: "never",
      align: "left",
      type: "numeric",
    },
    {
      title: "Nombre",
      field: "nombreTabla",
      lookup: lookup,
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "never",
    },
    {
      title: "Línea",
      field: "codLinea",
      type: "numeric",
      align: "left",
      editable: "never",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      editable: "never",
      align: "left",
      type: "numeric",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "always",
      align: "left",
      type: "numeric",
    },
  ];

  const addProducto = async (data) => {
    if (data.nombreTabla && data.cantidad) {
      data.codProducto = parseInt(data.nombreTabla);
      productos &&
        productos.forEach((p) => {
          if (parseInt(data.codProducto) === p.codProducto) {
            data.nombre = p.nombre;
            data.descripcion = p.descripcion;
            data.codLinea = p.codLinea;
            data.precio = p.precio;
            return;
          }
        });
      setCantidad(cantidad + data.cantidad);
      setMontoTotal(montoTotal + data.precio * data.cantidad);
      setLista([...lista, data]);
    }
  };

  const updateProducto = async (newData, oldData) => {
    newData.codProducto = oldData.codProducto;
    newData.nombre = oldData.nombre;
    newData.codLinea = oldData.codLinea;
    newData.precio = oldData.precio;

    const updatedData = [...lista];
    const index = oldData.tableData.id;
    updatedData[index] = newData;

    setMontoTotal(
      montoTotal -
        oldData.precio * oldData.cantidad +
        newData.precio * newData.cantidad
    );
    setCantidad(cantidad - oldData.cantidad + newData.cantidad);
    setLista(updatedData);
  };

  const deleteProducto = async (oldData) => {
    const dataDelete = [...lista];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setMontoTotal(montoTotal - oldData.precio * oldData.cantidad);
    setCantidad(cantidad - oldData.cantidad);
    setLista(dataDelete);
  };

  return (
    <div>
      <Table
        title="Seleccionar Productos"
        columns={columns}
        data={lista}
        isLoading={loading}
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
