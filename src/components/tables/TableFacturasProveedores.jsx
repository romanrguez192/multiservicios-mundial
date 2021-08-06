import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import TableProductosFacturasProveedores from "./TableProductosFacturasProveedores";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableFacturasProveedores = ({ rifProveedor, ...props }) => {
  const [facturasProveedores, setFacturasProveedores] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getFacturasProveedores = async () => {
      const url =
        ""; /* `http://localhost:4000/api/facturasProveedores/${rifProveedor}`*/

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const facturasProveedores = await response.json();

      setFacturasProveedores(facturasProveedores);
      setLoading(false);
    };

    getFacturasProveedores();
  }, [rifProveedor]);

  const columns = [
    {
      title: "N° de Factura",
      field: "nroFactura",
      editable: "onAdd",
      type: "numeric",
      align: "left",
    },
    {
      title: "Orden de Compra",
      field: "codOrdCompra",
      editable: "onAdd",
      type: "numeric",
      align: "left",
    },
    {
      title: "Fecha de Facturación",
      field: "fechaFacturacion",
      type: "date",
      editable: "onAdd",
    },
    {
      title: "Fecha de Pago",
      field: "fechaPago",
      type: "date",
      editable: "onAdd",
      emptyValue: "No pagada",
    },
    {
      title: "Monto total",
      field: "montoTotal",
      type: "numeric",
      editable: "onAdd",
      align: "left",
    },
  ];

  const addFacturaProveedor = async (data) => {
    const url =
      ""; /* `http://localhost:4000/api/facturasProveedores/${rifProveedor}`*/

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

    const facturaProveedor = await response.json();

    setFacturasProveedores([...facturasProveedores, facturaProveedor]);
  };

  const deleteFacturaProveedor = async (oldData) => {
    const url =
      ""; /* `http://localhost:4000/api/facturasProveedores/${rifProveedor}${oldData.nroFactura}`*/

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...facturasProveedores];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setFacturasProveedores(dataDelete);
  };

  return (
    <Table
      title="Facturas de Proveedores"
      columns={columns}
      isLoading={loading}
      subTable
      editable={{
        onRowAdd: addFacturaProveedor,
        onRowDelete: deleteFacturaProveedor,
      }}
      detailPanel={() => {
        return (
          <TableContainer>
            <TableProductosFacturasProveedores />
          </TableContainer>
        );
      }}
    />
  );
};

export default TableFacturasProveedores;
