import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableProveedores = ({ ...props }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    const url = "http://localhost:4000/api/proveedores";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const proveedores = await response.json();

    setProveedores(proveedores);
    setLoading(false);
  };

  const columns = [
    {
      title: "RIF",
      field: "rifProveedor",
      editable: "always",
    },
    {
      title: "Razón Social",
      field: "razonSocial",
      editable: "always",
    },
    {
      title: "Dirección",
      field: "direccion",
      editable: "always",
    },
    {
      title: "Persona de Contacto",
      field: "personaContacto",
      editable: "always",
    },
    {
      title: "Teléfono Celular",
      field: "telefonoCelular",
      editable: "always",
    },
    {
      title: "Teléfono Local",
      field: "telefonoLocal",
      editable: "always",
    },
  ];

  const addProveedor = async (data) => {
    const url = "http://localhost:4000/api/proveedores";

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

    const proveedor = await response.json();

    setProveedores([...proveedores, proveedor]);
  };

  const updateProveedor = async (newData, oldData) => {
    const url = `http://localhost:4000/api/proveedores/${oldData.rifProveedor}`;

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

    const proveedor = await response.json();

    const updatedData = [...proveedores];
    const index = oldData.tableData.id;
    updatedData[index] = proveedor;

    setProveedores(updatedData);
  };

  const deleteProveedor = async (oldData) => {
    const url = `http://localhost:4000/api/proveedores/${oldData.rifProveedor}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...proveedores];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProveedores(dataDelete);
  };

  return (
    <div>
      <Table
        title="Proveedores"
        columns={columns}
        data={proveedores}
        isLoading={loading}
        editable={{
          onRowAdd: addProveedor,
          onRowUpdate: updateProveedor,
          onRowDelete: deleteProveedor,
        }}
        {...props}
      />
    </div>
  );
};

export default TableProveedores;
