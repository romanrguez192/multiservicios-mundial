import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import { useHistory } from "react-router-dom";
import TableProductosVendidos from "./TableProductosVendidos";
import { TableContainer } from "@material-ui/core";

const TableCompras = ({ loading, compras, setCompras, ...props }) => {
  
  const history = useHistory();

  const columns = [
    {
      title: "Número de factura",
      field: "nroFactura",
    },
    {
      title: "Fecha de facturación",
      field: "fechaFacturacion",
      type: "date",
    },
    {
      title: "Cédula del cliente",
      field: "cedCliente",
    },
    {
      title: "Número de factura",
      field: "nroFactura",
    },
    {
      title: "Descuento",
      field: "descuento",
      emptyValue: "Ninguno",
    },
  ];

  const create = () => {
    history.push("/tienda/compra");
  };

  const actions = [
    {
      icon: () => <Add />,
      tooltip: "Añadir",
      isFreeAction: true,
      onClick: create,
    },
  ];

  return (
    <div>
      <Table
        title="Ventas"
        columns={columns}
        data={compras}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableProductosVendidos
                nroFactura={rowData.nroFactura}
              />
            </TableContainer>
          );
        }}
        actions={actions}
        {...props}
      />
    </div>
  );
};

export default TableCompras;
