import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableActividades from "./TableActividades";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableServicios = ({ servicios, setServicios, loadingS, ...props }) => {
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Código",
      field: "codServicio",
      editable: "never",
      align: "left",
      type: "numeric",
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
      emptyValue: "Ninguno",
      lookup: {
        "1 day": "1 día",
        "2 days": "2 días",
        "3 days": "3 días",
        "5 days": "5 días",
        "7 days": "1 semana",
        "14 days": "2 semanas",
        "21 days": "3 semanas",
      },
    },
    {
      title: "Porcentaje de abono al reservar",
      field: "porcentajeAbono",
      type: "numeric",
      align: "left",
      editable: "always",
      emptyValue: "Ninguno",
    },
  ];

  const addServicio = async (data) => {
    const url = "https://multiservicios-mundial.herokuapp.com/api/servicios";

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

    const servicio = await response.json();

    setServicios([...servicios, servicio]);
  };

  const updateServicio = async (newData, oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${oldData.codServicio}`;

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

    const servicio = await response.json();

    const updatedData = [...servicios];
    const index = oldData.tableData.id;
    updatedData[index] = servicio;

    setServicios(updatedData);
  };

  const deleteServicio = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${oldData.codServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
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
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableActividades codServicio={rowData.codServicio} />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableServicios;
