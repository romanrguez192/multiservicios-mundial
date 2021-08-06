import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

const TableFacturaActividades = ({}) => {
  const [facturaActividades, setFacturaActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getFacturaActividades();
  }, []);

  const getFacturaActividades = async () => {
    const url = "";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const facturaActividades = await response.json();

    setFacturaActividades(facturaActividades);
    setLoading(false);
  };

  const columns = [
    {
      title: "Número",
      field: "nroActividad",
      editable: "onAdd",
      type: "numeric",
      align: "left",
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "onAdd",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      editable: "onAdd",
      align: "left",
    },
  ];

  const addFacturaActividad = async (data) => {
    const url = "";

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

    const facturaActividad = await response.json();

    setFacturaActividades([...facturaActividades, facturaActividad]);
  };

  const deleteFacturaActividad = async (oldData) => {
    const url = "";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...facturaActividades];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setFacturaActividades(dataDelete);
  };

  return (
    <Slide top collapse>
      <Table
        title="Actividades"
        columns={columns}
        data={facturaActividades}
        isLoading={loading}
        subTable
        editable={{
          onRowAdd: addFacturaActividad,
          onRowDelete: deleteFacturaActividad,
        }}
      />
    </Slide>
  );
};

export default TableFacturaActividades;
