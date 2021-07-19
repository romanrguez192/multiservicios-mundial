import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableServicios = ({ servicios, setServicios, loadingS, ...props }) => {
  const columns = [
    {
      title: "Código",
      field: "codServicio",
      editable: "never",
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
      // TODO: Colocar si quiere reserva o no?
      title: "Tiempo mínimo para reservar",
      field: "minTiempoReserva",
      type: "time",
      editable: "always",
    },
    {
      title: "Porcentaje de abono al reservar",
      field: "porcentajeAbono",
      type: "numeric",
      editable: "always",
    },
  ];

  const addServicio = async (data) => {
    const url = "http://localhost:4000/api/servicios";

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

    const servicio = await response.json();

    setServicios([...servicios, servicio]);
  };

  const updateServicio = async (newData, oldData) => {
    const url = `http://localhost:4000/api/servicios/${oldData.codServicio}`;

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

    const servicio = await response.json();

    const updatedData = [...servicios];
    const index = oldData.tableData.id;
    updatedData[index] = servicio;

    setServicios(updatedData);
  };

  const deleteServicio = async (oldData) => {
    const url = `http://localhost:4000/api/servicios/${oldData.codServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...servicios];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setServicios(dataDelete);
  };

  return (
    <div>
      <Table
        title="Servicios"
        columns={columns}
        data={servicios}
        isLoading={loadingS}
        editable={{
          onRowAdd: addServicio,
          onRowUpdate: updateServicio,
          onRowDelete: deleteServicio,
        }}
        {...props}
      />
    </div>
  );
};

export default TableServicios;
