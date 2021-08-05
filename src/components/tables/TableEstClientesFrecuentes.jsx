import React from "react";
import Table from "./Table";

//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstClientesFrecuentes = (props) => {
  const columns = [
    {
      title: "Cédula",
      field: "cedula",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Nº de veces que solicitó un servicio",
      field: "numServicios",
    },
  ];

  return (
    <div>
      <Table
        title="Clientes frecuentes"
        columns={columns}
        //data={lineas}
        //isLoading={loadingL}
        {...props}
      />
    </div>
  );
};

export default TableEstClientesFrecuentes;
