import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableVehiculosCliente from "./TableVehiculosCliente";
import { useUser } from "../../contexts/UserContext";

const TableClientesSucursal = ({ clientesSucursal, loadingCS, ...props }) => {
  const user = useUser();

  const columns = [
    {
      title: "Cedula",
      field: "cedCliente",
      editable: "never",
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
          return <TableVehiculosCliente cedCliente={rowData.cedCliente} />;
        }}
        {...props}
      />
    </div>
  );
};

export default TableClientesSucursal;