import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableLineas = ({ lineas, setLineas, loadingL, ...props }) => {
  const columns = [
    {
      title: "Código",
      field: "codLinea",
      editable: "never",
    },
    {
      title: "Descripcion",
      field: "descripcion",
      editable: "always",
    },
  ];

  const addLinea = async (data) => {
    const url = "http://localhost:4000/api/lineas";

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

    const linea = await response.json();

    setLineas([...lineas, linea]);
  };

  const updateLinea = async (newData, oldData) => {
    const url = `http://localhost:4000/api/lineas/${oldData.codLinea}`;

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

    const linea = await response.json();

    const updatedData = [...lineas];
    const index = oldData.tableData.id;
    updatedData[index] = linea;

    setLineas(updatedData);
  };

  const deleteLinea = async (oldData) => {
    const url = `http://localhost:4000/api/lineas/${oldData.codLinea}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...lineas];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setLineas(dataDelete);
  };

  return (
    <div>
      <Table
        title="Líneas"
        columns={columns}
        data={lineas}
        isLoading={loadingL}
        editable={{
          onRowAdd: addLinea,
          onRowUpdate: updateLinea,
          onRowDelete: deleteLinea,
        }}
        {...props}
      />
    </div>
  );
};

export default TableLineas;
