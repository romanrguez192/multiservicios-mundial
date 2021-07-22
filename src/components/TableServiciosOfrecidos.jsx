import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableServiciosOfrecidos = ({
  serviciosOfrecidos,
  setServiciosOfrecidos,
  loadingSO,
  servicios,
  ...props
}) => {
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
      title: "Teléfono",
      field: "telefono",
      editable: "always",
    },
  ];

  const addServicioOfrecido = async (data) => {
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

    const servicioOfrecido = await response.json();

    setServiciosOfrecidos([...serviciosOfrecidos, servicioOfrecido]);
  };

  const updateServicioOfrecido = async (newData, oldData) => {
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

    const servicioOfrecido = await response.json();

    const updatedData = [...serviciosOfrecidos];
    const index = oldData.tableData.id;
    updatedData[index] = servicioOfrecido;

    setServiciosOfrecidos(updatedData);
  };

  const deleteServicioOfrecido = async (oldData) => {
    const url = "url";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...serviciosOfrecidos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setServiciosOfrecidos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Servicios Ofrecidos"
        columns={columns}
        data={serviciosOfrecidos}
        isLoading={loadingSO}
        editable={{
          onRowAdd: addServicioOfrecido,
          onRowUpdate: updateServicioOfrecido,
          onRowDelete: deleteServicioOfrecido,
        }}
        {...props}
      />
    </div>
  );
};

export default TableServiciosOfrecidos;
