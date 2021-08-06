import React from "react";
import Table from "./Table";

//Proveedor que nos suministra más/menos productos
const TableEstSuministroProveedor = (props) => {
  const columns = [
    {
      title: "Rif",
      field: "rif",
      editable: "never",
      type: "numeric",
      align: "left",
    },
    {
      title: "Proveedor",
      field: "proveedor",
      editable: "never",
    },
    // TO DO No sé si esto se manejaría por la cantidad de productos así
    //O tipo la variedad de productos, no lo c
    {
      title: "Número de productos suministrados",
      field: "numProductosSuministrados",
      editable: "never",
      type: "numeric",
      align: "left",
    },
  ];
  return (
    <div>
      <Table
        title="Proveedores que suministran más productos"
        columns={columns}
        {...props}
      />
    </div>
  );
};

export default TableEstSuministroProveedor;
