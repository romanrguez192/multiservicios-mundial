import React from "react";
import Table from "./Table";

//Clientes que hacen reservas y después no usan el servicio.
const TableEstClientesReservas = (props) => {
  const columns = [
    {
      title: "Cédula",
      field: "cedula",
      type: "numeric",
      editable: "never",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Número de reservas perdidas",
      field: "numReservasPerdidas",
      type: "numeric",
      editable: "never",
      align: "left",
    },
  ];
  return (
    <div>
      <Table
        title="Clientes con reservas perdidas"
        columns={columns}
        {...props}
      />
    </div>
  );
};

export default TableEstClientesReservas;
