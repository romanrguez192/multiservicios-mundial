import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableProductosDistribuidos from "./TableProductosDistribuidos";
import TableFacturasProveedores from "./TableFacturasProveedores";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableProveedores = ({ ...props }) => {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getProveedores();
  }, []);

  const getProveedores = async () => {
    const url = "https://multiservicios-mundial.herokuapp.com/api/proveedores";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const proveedores = await response.json();

    setProveedores(proveedores);
    setLoading(false);
  };

  const columns = [
    {
      title: "RIF",
      field: "rifProveedor",
      editable: "always",
    },
    {
      title: "Razón Social",
      field: "razonSocial",
      editable: "always",
    },
    {
      title: "Dirección",
      field: "direccion",
      editable: "always",
    },
    {
      title: "Persona de Contacto",
      field: "personaContacto",
      editable: "always",
    },
    {
      title: "Teléfono Celular",
      field: "telefonoCelular",
      editable: "always",
    },
    {
      title: "Teléfono Local",
      field: "telefonoLocal",
      editable: "always",
    },
  ];

  const addProveedor = async (data) => {
    const url = "https://multiservicios-mundial.herokuapp.com/api/proveedores";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }

    const proveedor = await response.json();

    setProveedores([...proveedores, proveedor]);
  };

  const updateProveedor = async (newData, oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${oldData.rifProveedor}`;

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

    const proveedor = await response.json();

    const updatedData = [...proveedores];
    const index = oldData.tableData.id;
    updatedData[index] = proveedor;

    setProveedores(updatedData);
  };

  const deleteProveedor = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/proveedores/${oldData.rifProveedor}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...proveedores];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProveedores(dataDelete);
  };

  return (
    <div>
      <Table
        title="Proveedores"
        columns={columns}
        data={proveedores}
        isLoading={loading}
        editable={{
          onRowAdd: addProveedor,
          onRowUpdate: updateProveedor,
          onRowDelete: deleteProveedor,
        }}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableProductosDistribuidos rifProveedor={rowData.rifProveedor} />
              <TableFacturasProveedores rifProveedor={rowData.rifProveedor} />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableProveedores;
