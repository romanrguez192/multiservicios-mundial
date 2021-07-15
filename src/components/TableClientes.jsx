import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableClientes = ({ rows, ...props }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  const getClientes = async () => {
    const url = "url de clientes en la api";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const clientes = await response.json();

    setClientes(clientes);
  };

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
    const url = "url de clientes en la api";

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

  const updateCliente = () => null;

  const deleteCliente = () => null;

  return (
    <div>
      <Table
        title="Clientes"
        columns={columns}
        data={clientes}
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
