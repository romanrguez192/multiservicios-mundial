import React from "react";
import Table from "./Table";

//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstMarcas = (props) => {
  const columns = [
    {
      title: "Servicio",
      field: "servicio",
    },
    {
      title: "Marca",
      field: "marca",
    },
    {
      title: "Nº de veces que se atendió esta marca",
      field: "numMarcasAtendidas",
      type: "numeric",
      align: "left",
    },
  ];

  return (
    <div>
      <Table
        title="Marca de vehículos más atendida por servicio"
        columns={columns}
        //data={lineas}
        //isLoading={loadingL}
        {...props}
      />
    </div>
  );
};

export default TableEstMarcas;
