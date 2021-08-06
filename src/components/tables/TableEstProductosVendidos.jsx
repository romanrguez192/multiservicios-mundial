import React from "react";
import Table from "./Table";

//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstProductosVendidos = (props) => {
  const columns = [
    {
      title: "Código",
      field: "codigo",
      type: "numeric",
      align: "left",
    },
    {
      title: "Producto",
      field: "producto",
    },
    {
      title: "Nº de salida por ventas",
      field: "numVentas",
      type: "numeric",
      align: "left",
    },
  ];

  return (
    <div>
      <Table
        title="Productos vendidos"
        columns={columns}
        //data={lineas}
        //isLoading={loadingL}
        {...props}
      />
    </div>
  );
};

export default TableEstProductosVendidos;
