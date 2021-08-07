import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";

const TableSucursales = ({ ...props }) => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getSucursales = async () => {
      const url = "http://localhost:4000/api/sucursales";

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const sucursales = await response.json();

      setSucursales(sucursales);
      setLoading(false);
    };

    getSucursales();
  }, []);

  const columns = [
    {
      title: "RIF",
      field: "rifSucursal",
      editable: "always",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "always",
    },
    {
      title: "Dirección",
      field: "direccion",
      editable: "always",
    },
    {
      title: "Ciudad",
      field: "ciudad",
      editable: "always",
    },
    {
      title: "Encargado",
      field: "nombreEncargado",
      emptyValue: "N/A",
      editable: "never",
    },
    {
      title: "Cédula del encargado",
      field: "cedEncargado",
      emptyValue: "N/A",
      editable: "never",
    },
    {
      title: "Fecha de inicio del encargado",
      field: "fechaInicioEncargado",
      type: "date",
      emptyValue: "N/A",
      editable: "onUpdate",
    },
  ];

  const addSucursal = async (data) => {
    const url = "http://localhost:4000/api/sucursales";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const sucursal = await response.json();

    setSucursales([...sucursales, sucursal]);
  };

  const updateSucursal = async (newData, oldData) => {
    const url = `http://localhost:4000/api/sucursales/${oldData.rifSucursal}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      //TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const sucursal = await response.json();

    sucursal.nombreEncargado = oldData.nombreEncargado;
    sucursal.cedEncargado = oldData.cedEncargado;

    const updatedData = [...sucursales];
    const index = oldData.tableData.id;
    updatedData[index] = sucursal;

    setSucursales(updatedData);
  };

  const deleteSucursal = async (oldData) => {
    const url = `http://localhost:4000/api/sucursales/${oldData.rifSucursal}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      //TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...sucursales];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setSucursales(dataDelete);
  };

  return (
    <div>
      <Table
        title="Sucursales"
        columns={columns}
        data={sucursales}
        isLoading={loading}
        editable={{
          onRowAdd: addSucursal,
          onRowUpdate: updateSucursal,
          onRowDelete: deleteSucursal,
        }}
        {...props}
      />
    </div>
  );
};

export default TableSucursales;
