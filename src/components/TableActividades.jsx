import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableActividades = ({ codServicio, ...props }) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActividades();
  }, []);

  const getActividades = async () => {
    const url = `http://localhost:4000/api/servicios/${codServicio}/actividades`;

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const actividades = await response.json();

    setActividades(actividades);
    setLoading(false);
  };

  const columns = [
    {
      title: "Número",
      field: "nroActividad",
      editable: "always",
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "always",
    },
    {
      title: "Precio",
      field: "precio",
      type: "numeric",
      editable: "always",
    },
    {
      title: "Capacidad diaria",
      field: "capacidad",
      type: "numeric",
      editable: "always",
    },
  ];

  const addActividad = async (data) => {
    const url = `http://localhost:4000/api/servicios/${codServicio}/actividades`;

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

    const actividad = await response.json();

    setActividades([...actividades, actividad]);
  };

  const updateActividad = async (newData, oldData) => {
    const url = `http://localhost:4000/api/servicios/${codServicio}/actividades/${oldData.nroActividad}`;

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

    const actividad = await response.json();

    const updatedData = [...actividades];
    const index = oldData.tableData.id;
    updatedData[index] = actividad;

    setActividades(updatedData);
  };

  const deleteActividad = async (oldData) => {
    const url = `http://localhost:4000/api/servicios/${codServicio}/actividades/${oldData.nroActividad}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...actividades];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setActividades(dataDelete);
  };

  return (
    <div>
      <Table
        title="Actividades"
        columns={columns}
        data={actividades}
        isLoading={false}
        subTable
        editable={{
          onRowAdd: addActividad,
          onRowUpdate: updateActividad,
          onRowDelete: deleteActividad,
        }}
        {...props}
      />
    </div>
  );
};

export default TableActividades;
