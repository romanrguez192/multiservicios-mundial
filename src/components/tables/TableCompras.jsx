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
      editable: "never",
    },
    {
      title: "Fecha de facturación",
      field: "fechaFacturacion",
      type: "date",
      editable: "never",
    },
    {
      title: "Cédula del cliente",
      field: "cedCliente",
      editable: "never",
    },
    {
      title: "Número de factura",
      field: "nroFactura",
      editable: "never",
    },
    {
      title: "Descuento",
      field: "descuento",
      emptyValue: "Ninguno",
      editable: "never",
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
        title="Compras"
        columns={columns}
        data={compras}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableProductosVendidos
                
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
