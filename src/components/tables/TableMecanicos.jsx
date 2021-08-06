import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableMecanicos = ({ rows, ...props }) => {
  const [mecanicos, setMecanicos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMecanicos();
  }, []);

  const getMecanicos = async () => {
    const url = "url";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const mecanicos = await response.json();

    setMecanicos(mecanicos);
    setLoading(false);
  };

  const columns = [
    {
      title: "Cedula",
      field: "cedCliente",
      editable: "always",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "always",
    },
    {
      title: "Teléfono",
      field: "telefono",
      editable: "always",
    },
  ];

  const addMecanico = async (data) => {
    const url = "url";

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

    const mecanico = await response.json();

    setMecanicos([...mecanicos, mecanico]);
  };

  const updateMecanico = async (newData, oldData) => {
    const url = "url";

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

    const mecanico = await response.json();

    const updatedData = [...mecanicos];
    const index = oldData.tableData.id;
    updatedData[index] = mecanico;

    setMecanicos(updatedData);
  };

  const deleteMecanico = async (oldData) => {
    const url = "url";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...mecanicos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setMecanicos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Mecánicos"
        columns={columns}
        data={mecanicos}
        isLoading={loading}
        editable={{
          onRowAdd: addMecanico,
          onRowUpdate: updateMecanico,
          onRowDelete: deleteMecanico,
        }}
        {...props}
      />
    </div>
  );
};

export default TableMecanicos;
