import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableSucursales = ({ rows, ...props }) => {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSucursales();
  }, []);

  const getSucursales = async () => {
    const url = "http://localhost:4000/api/sucursales";

    const response = await fetch(url);

    if (!response.ok) {
      //TODO: Error
      return console.log("Oh no");
    }

    const sucursales = await response.json();

    setSucursales(sucursales);
    setLoading(false);
  };

  const columns = [
    {
      title: "Rif",
      field: "rifSucursal",
      editable: "never",
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
      editable: "always",
    },
    {
      title: "CI de encargado",
      field: "cedEncargado",
      editable: "always",
    },
    {
      title: "Última fecha del inventario físico",
      field: "fechaInvFisico",
      editable: "always",
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
      return console.log("Oh no");
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
      return console.log("OH NO");
    }

    const sucursal = await response.json();

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
      return console.log("OH NO");
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
