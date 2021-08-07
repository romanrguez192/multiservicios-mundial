import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableFacturaProductos from "./TableFacturaProductos";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";
import { useUser } from "../../contexts/UserContext";

const TableFacturasVentas = ({}) => {
  const [facturasVentas, setFacturasVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const user = useUser();

  useEffect(() => {
    const getFacturasVentas = async() => {
      const url = `http://localhost:4000/api/facturasVentas/factura/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const facturas = await response.json();

      setFacturasVentas(facturas);
      setLoading(false);
    }

    getFacturasVentas();
  }, [])
  const columns = [
    {
      title: "Nro Factura",
      field: "nroFactura",
      type: "numeric",
      editable: "onAdd",
      align: "left",
    },
    {
      title: "Cliente",
      field: "cedCliente",
      type: "numeric",
      editable: "onAdd",
    },
    {
      title: "Fecha de Facturación",
      field: "fechaFacturacion",
      type: "date",
      editable: "onAdd",
    },
    {
      title: "Forma de Pago",
      field: "formaPago",
      editable: "onAdd",
    },
    {
      title: "Descuento",
      field: "descuento",
      type: "numeric",
      align: "left",
      emptyValue: "Ninguno",
      editable: "onAdd",
    },
    {
      title: "Monto",
      field: "monto",
      type: "numeric",
      align: "left",
      editable: "onAdd",
    },
  ];

  return (
    <div>
      <Table
        title="Facturas de Ventas"
        columns={columns}
        data={facturasVentas}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableFacturaProductos nroFactura={rowData.nroFactura}/>
            </TableContainer>
          );
        }}
      />
    </div>
  );
};

export default TableFacturasVentas;
