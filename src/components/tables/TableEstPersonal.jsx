import React from "react";
import Table from "./Table";

// Personal que realiza más/menos servicios por mes.
// Poner un input numerico para decir hace cuantos meses quieres ver los stats
const TableEstPersonal = (props) => {
  const columns = [
    {
      title: "Empleado",
      field: "empleado",
      editable: "never",
    },
    {
      title: "Nº de Servicios Atendidos",
      field: "numServiciosAtendidos",
      editable: "never",
    },
  ];
  return (
    <div>
      <Table
        title="Personal que realiza más/menos servicios por mes"
        columns={columns}
        {...props}
      />
    </div>
  );
};

export default TableEstPersonal;
