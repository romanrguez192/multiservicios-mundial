import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import { useHistory } from "react-router-dom";

const TableCompras = ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const columns = [
    {
      title: "una columna",
      field: "colmun",
      editable: "never",
    },
    {
      title: "otra columna",
      field: "otraColumn",
      editable: "never",
    },
  ];

  const create = () => {
    history.push("/tienda/compra");
  };

  const actions = [
    {
      icon: () => <Add />,
      tooltip: "Añadir",
      isFreeAction: true,
      onClick: create,
    },
  ];

  return (
    <div>
      <Table
        title="Compras"
        columns={columns}
        //isLoading={loading}
        actions={actions}
        {...props}
      />
    </div>
  );
};

export default TableCompras;
