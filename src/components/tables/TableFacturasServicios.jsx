import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableFacturaActividades from "./TableFacturaActividades";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableFacturasServicios = ({}) => {
  const [facturasServicios, setFacturasServicios] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getFacturasServicios = async () => {
      const url = "";
      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const facturasServicios = await response.json();

      setFacturasServicios(facturasServicios);
      setLoading(false);
    };

    getFacturasServicios();
  });

  const columns = [
    {
      title: "Nro Factura",
      field: "nroFactura",
      type: "numeric",
      align: "left",
      editable: "onAdd",
    },
    {
      title: "Servicio",
      field: "nombreServicio",
      editable: "onAdd",
    },
    {
      title: "Cliente",
      field: "cedCliente",
      type: "numeric",
      align: "left",
      editable: "onAdd",
    },
    {
      title: "Fecha de Facturación",
      field: "fechaFacturacion",
      type: "date",
      editable: "onAdd",
    },
    {
      title: "Descuento",
      field: "descuento",
      type: "numeric",
      align: "left",
      editable: "onAdd",
    },
    {
      title: "Monto",
      field: "montoTotal",
      type: "numeric",
      align: "left",
      editable: "onAdd",
    },
  ];

  const addFacturaServicio = async (data) => {
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

    const facturaServicio = await response.json();

    setFacturasServicios([...facturasServicios, facturaServicio]);
  };

  const deleteFacturaServicio = async (oldData) => {
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

    const dataDelete = [...facturasServicios];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setFacturasServicios(dataDelete);
  };

  return (
    <div>
      <Table
        title="Facturas de Servicios"
        columns={columns}
        data={facturasServicios}
        isLoading={loading}
        editable={{
          onRowAdd: addFacturaServicio,
          onRowDelete: deleteFacturaServicio,
        }}
        detailPanel={() => {
          return (
            <TableContainer>
              <TableFacturaActividades />
            </TableContainer>
          );
        }}
      />
    </div>
  );
};

export default TableFacturasServicios;
