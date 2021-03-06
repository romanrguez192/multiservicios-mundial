import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableVehiculosCliente from "./TableVehiculosCliente";
import { useUser } from "../../contexts/UserContext";
import Slide from "react-reveal/Slide";
import { TableContainer } from "@material-ui/core";

const TableClientesSucursal = ({ clientesSucursal, loadingCS, ...props }) => {
  const user = useUser();

  const columns = [
    {
      title: "Cedula",
      field: "cedCliente",
      editable: "never",
      align: "left",
      type: "numeric",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Email",
      field: "email",
      editable: "never",
    },
    {
      title: "Teléfono principal",
      field: "tlfPrincipal",
      editable: "never",
    },
    {
      title: "Teléfono alternativo",
      field: "tlfAlternativo",
      editable: "always",
    },
    {
      title: "¿Es frecuente?",
      field: "esFrecuente",
      editable: "never",
      lookup: { true: "Sí", false: "No" },
    },
  ];

  return (
    <div>
      <Table
        title={`Clientes de ${user.nombreSucursal}`}
        columns={columns}
        data={clientesSucursal}
        isLoading={loadingCS}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <Slide top collapse>
                <TableVehiculosCliente cedCliente={rowData.cedCliente} />
              </Slide>
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableClientesSucursal;
