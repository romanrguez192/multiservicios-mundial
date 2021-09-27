import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

const TableActividades = ({ codServicio, ...props }) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getActividades();
  }, []);

  const getActividades = async () => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${codServicio}/actividades`;

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const actividades = await response.json();

    setActividades(actividades);
    setLoading(false);
  };

  const columns = [
    {
      title: "Número",
      field: "nroActividad",
      type: "numeric",
      editable: "always",
      align: "left",
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "always",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      align: "left",
      editable: "always",
    },
    {
      title: "Capacidad diaria",
      field: "capacidad",
      type: "numeric",
      align: "left",
      editable: "always",
    },
  ];

  const addActividad = async (data) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${codServicio}/actividades`;

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

    const actividad = await response.json();

    setActividades([...actividades, actividad]);
  };

  const updateActividad = async (newData, oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${codServicio}/actividades/${oldData.nroActividad}`;

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

    const actividad = await response.json();

    const updatedData = [...actividades];
    const index = oldData.tableData.id;
    updatedData[index] = actividad;

    setActividades(updatedData);
  };

  const deleteActividad = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/servicios/${codServicio}/actividades/${oldData.nroActividad}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...actividades];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setActividades(dataDelete);
  };

  return (
    <Slide top collapse>
      <Table
        title="Actividades"
        columns={columns}
        data={actividades}
        isLoading={loading}
        subTable
        editable={{
          onRowAdd: addActividad,
          onRowUpdate: updateActividad,
          onRowDelete: deleteActividad,
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableActividades;
