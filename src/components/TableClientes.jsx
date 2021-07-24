import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableClientes = ({ clientes, setClientes, loadingC, ...props }) => {
  const columns = [
    {
      title: "Cedula",
      field: "cedCliente",
      editable: "always",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "always",
    },
    {
      title: "Email",
      field: "email",
      editable: "always",
    },
    {
      title: "Teléfono principal",
      field: "tlfPrincipal",
      editable: "always",
    },
    {
      title: "Teléfono alternativo",
      field: "tlfAlternativo",
      editable: "always",
    },
    {
      title: "¿Es frecuente?",
      field: "esFrecuente",
      editable: "never",
    },
  ];

  const addCliente = async (data) => {
    const url = "http://localhost:4000/api/clientes";

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

    const cliente = await response.json();

    setClientes([...clientes, cliente]);
  };

  const updateCliente = async (newData, oldData) => {
    const url = `http://localhost:4000/api/clientes/${oldData.cedCliente}`;

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

    const cliente = await response.json();

    const updatedData = [...clientes];
    const index = oldData.tableData.id;
    updatedData[index] = cliente;

    setClientes(updatedData);
  };

  const deleteCliente = async (oldData) => {
    const url = `http://localhost:4000/api/clientes/${oldData.cedCliente}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...clientes];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setClientes(dataDelete);
  };

  return (
    <div>
      <Table
        title="Clientes Registrados"
        columns={columns}
        data={clientes}
        isLoading={loadingC}
        editable={{
          onRowAdd: addCliente,
          onRowUpdate: updateCliente,
          onRowDelete: deleteCliente,
        }}
        {...props}
      />
    </div>
  );
};

export default TableClientes;
