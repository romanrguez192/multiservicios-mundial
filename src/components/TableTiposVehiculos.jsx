import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableTiposVehiculos = ({ rows, ...props }) => {
  const [tiposVehiculos, setTiposVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

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
    setLoading(false);
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

  const updateTipoVehiculo = async (newData, oldData) => {
    const url = `http://localhost:4000/api/tiposVehiculos/${oldData.codTipoVehiculo}`;

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

    const tipoVehiculo = await response.json();

    const updatedData = [...tiposVehiculos];
    const index = oldData.tableData.id;
    updatedData[index] = tipoVehiculo;

    setTiposVehiculos(updatedData);
  };

  const deleteTipoVehiculo = async (oldData) => {
    const url = `http://localhost:4000/api/tiposVehiculos/${oldData.codTipoVehiculo}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...tiposVehiculos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setTiposVehiculos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Tipos de Vehículos"
        columns={columns}
        data={tiposVehiculos}
        isLoading={loading}
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
