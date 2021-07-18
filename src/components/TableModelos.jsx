import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableModelos = ({
  modelos,
  setModelos,
  loadingM,
  tiposVehiculos,
  ...props
}) => {
  const lookup = {};
  tiposVehiculos &&
    tiposVehiculos.forEach((t) => {
      lookup[t.codTipoVehiculo] = t.nombre;
    });

  const columns = [
    {
      title: "Marca",
      field: "marca",
      editable: "always",
    },
    {
      title: "Modelo",
      field: "modelo",
      editable: "always",
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "always",
    },
    {
      title: "Nº de puestos",
      field: "numPuestos",
      type: "numeric",
      editable: "always",
    },
    {
      title: "Peso (Kg)",
      field: "peso",
      type: "numeric",
      editable: "always",
    },

    {
      title: "Octanaje",
      field: "octanaje",
      editable: "always",
      type: "numeric",
      lookup: { 91: 91, 95: 95 },
    },
    {
      title: "Aceite de motor",
      field: "tipoAceiteMotor",
      editable: "always",
    },
    {
      title: "Aceite de caja",
      field: "tipoAceiteCaja",
      editable: "always",
    },
    {
      title: "Refrigerante",
      field: "tipoRefrigerante",
      editable: "always",
    },
    {
      title: "Tipo de Vehiculo",
      field: "codTipoVehiculo",
      editable: "always",
      lookup: lookup,
    },
  ];

  const addModelo = async (data) => {
    const url = "http://localhost:4000/api/modelos";

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

    const modelo = await response.json();

    setModelos([...modelos, modelo]);
  };

  const updateModelo = async (newData, oldData) => {
    const url = `http://localhost:4000/api/modelos/${oldData.marca}/${oldData.modelo}`;

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

    const modelo = await response.json();

    const updatedData = [...modelos];
    const index = oldData.tableData.id;
    updatedData[index] = modelo;

    setModelos(updatedData);
  };

  const deleteModelo = async (oldData) => {
    const url = `http://localhost:4000/api/modelos/${oldData.marca}/${oldData.modelo}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...modelos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setModelos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Modelos"
        columns={columns}
        data={modelos}
        isLoading={loadingM}
        editable={{
          onRowAdd: addModelo,
          onRowUpdate: updateModelo,
          onRowDelete: deleteModelo,
        }}
        detailPanel={(rowData) => {
          return (
            /* Hacer un componente para añadir la descripcion del modelo */
            <div>Descripcion del modelo</div>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableModelos;
