import React from "react";
import Table from "./Table";

//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstServiciosSolicitados = (props) => {
  const columns = [
    {
      title: "Código",
      field: "codigo",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Nº de veces que se solicitó",
      field: "numSolicitudes",
    },
  ];

  return (
    <div>
      <Table
        title="Servicios solicitados"
        columns={columns}
        //data={lineas}
        //isLoading={loadingL}
        {...props}
      />
    </div>
  );
};

export default TableEstServiciosSolicitados;
