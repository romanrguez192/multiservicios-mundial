import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableServicios = ({ rows, ...props }) => {
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    getServicios();
  }, []);

  const getServicios = async () => {
    const url = "url de servicios en la api";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const servicios = await response.json();

    setServicios(servicios);
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
    const url = "url de servicios en la api";

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

  const updateServicio = () => null;

  const deleteServicio = () => null;

  return (
    <div>
      <Table
        title="Servicios"
        columns={columns}
        data={servicios}
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
