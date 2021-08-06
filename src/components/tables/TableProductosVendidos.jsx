import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";

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
      <Slide top collapse>
        <Table
            title="Productos vendidos"
            subTable
            columns={columns}
            //data={compras}
            //isLoading={loading}
            {...props}
        />
      </Slide>
    </div>
  );
};

export default TableCompras;
