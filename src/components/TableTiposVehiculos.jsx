import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableTiposVehiculos = ({ rows, ...props }) => {
  const [tiposVehiculos, setTiposVehiculos] = useState([]);

  useEffect(() => {
    getTiposVehiculos();
  }, []);

  const getTiposVehiculos = async () => {
    const url = "http://localhost:4000/api/tiposVehiculos";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const tiposVehiculos = await response.json();

    setTiposVehiculos(tiposVehiculos);
  };

  const columns = [
    {
      title: "Código",
      field: "codTipoVehiculo",
      editable: "never",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "always",
    },
    {
      title: "Descripcion",
      field: "descripcion",
      editable: "always",
    },
  ];

  const addTipoVehiculo = async (data) => {
    const url = "http://localhost:4000/api/tiposVehiculos";

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

    const tipoVehiculo = await response.json();

    setTiposVehiculos([...tiposVehiculos, tipoVehiculo]);
  };

  const updateTipoVehiculo = () => null;

  const deleteTipoVehiculo = () => null;

  return (
    <div>
      <Table
        title="Tipos de Vehículos"
        columns={columns}
        data={tiposVehiculos}
        editable={{
          onRowAdd: addTipoVehiculo,
          onRowUpdate: updateTipoVehiculo,
          onRowDelete: deleteTipoVehiculo,
        }}
        {...props}
      />
    </div>
  );
};

export default TableTiposVehiculos;
