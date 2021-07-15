import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableServicios = ({ rows, ...props }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getServicios();
  }, []);

  const getServicios = async () => {
    const url = "url";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const servicios = await response.json();

    setServicios(servicios);
    setLoading(false);
  };

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
      title: "Tiempo mínimo para reservar",
      field: "minTiempoReserva",
      editable: "always",
    },
    {
      title: "Porcentaje de abono mínimo al reservar",
      field: "porcentajeAbono",
      editable: "always",
    },
  ];

  const addServicio = async (data) => {
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

    const servicio = await response.json();

    setServicios([...servicios, servicio]);
  };

  const updateServicio = async (newData, oldData) => {
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

    const servicio = await response.json();

    const updatedData = [...servicios];
    const index = oldData.tableData.id;
    updatedData[index] = servicio;

    setServicios(updatedData);
  };

  const deleteServicio = async (oldData) => {
    const url = "url";

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
        isLoading={loading}
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
