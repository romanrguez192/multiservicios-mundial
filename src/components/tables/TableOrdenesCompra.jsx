import React, { useState, useEffect } from "react";
import Table from "./Table";


const TableOrdenesCompra = ({
  proveedores,
  ordCompra,
  setOrdCompra,
  loadingOC,
  rifSucursal,
  ...props
}) => {

  const proveedoresLookup = {};
  proveedores &&
    proveedores.forEach((l) => {
      proveedoresLookup[l.rifProveedor] = l.razonSocial;
    });

  const columns = [
    {
      title: "Código",
      field: "codOrdCompra",
      editable: "never",
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date",
      editable: "always",
    },
    {
      title: "Proveedor",
      field: "rifProveedor",
      lookup: proveedoresLookup,
      editable: "always",
    },
  ];

  const addOrdCompra = async (data) => {
    const url = "http://localhost:4000/api/ordenesCompra";

    data.rifSucursal = rifSucursal;

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

    const ordenCompra = await response.json();

    setOrdCompra([...ordCompra, ordenCompra]);
  };

  const updateOrdCompra = async (newData, oldData) => {
    const url = `http://localhost:4000/api/ordenesCompra/${oldData.codOrdCompra}`;

    newData.rifSucursal = rifSucursal;
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

    const ordenCompra = await response.json();

    const updatedData = [...ordCompra];
    const index = oldData.tableData.id;
    updatedData[index] = ordenCompra;

    setOrdCompra(updatedData);
  };

  const deleteOrdCompra = async (oldData) => {
    const url = `http://localhost:4000/api/ordenesCompra/${oldData.codOrdCompra}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...ordCompra];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setOrdCompra(dataDelete);
  };
  return (
    <div>
      <Table
        title="Órdenes de Compra"
        columns={columns}
        data={ordCompra}
        isLoading={loadingOC}
        editable={{
            onRowAdd: addOrdCompra,
            onRowUpdate: updateOrdCompra,
            onRowDelete: deleteOrdCompra,
          }}
        {...props}
      />
    </div>
  );
};

export default TableOrdenesCompra;
