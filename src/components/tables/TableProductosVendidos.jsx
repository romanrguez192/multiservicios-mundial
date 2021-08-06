import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableCompras = ({ loading, compras, setCompras, ...props }) => {
  

  const columns = [
    {
      title: "Código de producto",
      field: "codProducto",
    },
    {
      title: "Producto",
      field: "producto",
    },
    {
      title: "Cantidad",
      field: "cantidad",
    },
    {
      title: "Monto",
      field: "monto",
    },
  ];


  return (
    <div>
      <Table
        title="Compras"
        columns={columns}
        //data={compras}
        //isLoading={loading}
        {...props}
      />
    </div>
  );
};

export default TableCompras;
