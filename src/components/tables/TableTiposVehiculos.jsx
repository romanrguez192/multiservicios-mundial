import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";

const TableTiposVehiculos = ({
  tiposVehiculos,
  setTiposVehiculos,
  loadingT,
  ...props
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const columns = [
    {
      title: "Código",
      field: "codTipoVehiculo",
      editable: "never",
      type: "numeric",
      align: "left",
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
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
        isLoading={loadingT}
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
