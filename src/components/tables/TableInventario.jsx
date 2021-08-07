import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableProductosVentas = ({ inventario, loadingI, ...props }) => {
  const columns = [
    {
      title: "Código",
      field: "codProducto",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Existencia teórica",
      field: "existenciaTeorica",
      type: "numeric",
      align: "left",
    },
    {
      title: "Cantidad física",
      field: "cantidadFisica",
      type: "numeric",
      align: "left",
      emptyValue: "Por registrar"
    },
  ];

  return (
    <div>
      <Table
        title="Inventario"
        columns={columns}
        data={inventario}
        isLoading={loadingI}
        {...props}
      />
    </div>
  );
};

export default TableProductosVentas;
