import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableDescripcionModelo from "./TableDescripcionModelo";
import TableListaMantenimientos from "./TableListaMantenimientos";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableModelos = ({ modelos, setModelos, loadingM, tiposVehiculos, ...props }) => {
  const lookup = {};
  tiposVehiculos &&
    tiposVehiculos.forEach((t) => {
      lookup[t.codTipoVehiculo] = t.nombre;
    });
  const { enqueueSnackbar } = useSnackbar();

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
    const url = "https://multiservicios-mundial.herokuapp.com/api/modelos";

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

    const modelo = await response.json();

    setModelos([...modelos, modelo]);
  };

  const updateModelo = async (newData, oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/modelos/${oldData.marca}/${oldData.modelo}`;

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

    const modelo = await response.json();

    const updatedData = [...modelos];
    const index = oldData.tableData.id;
    updatedData[index] = modelo;

    setModelos(updatedData);
  };

  const deleteModelo = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/modelos/${oldData.marca}/${oldData.modelo}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
            <>
              <TableContainer>
                <TableDescripcionModelo marca={rowData.marca} modelo={rowData.modelo} />
                <TableListaMantenimientos marca={rowData.marca} modelo={rowData.modelo} />
              </TableContainer>
            </>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableModelos;
