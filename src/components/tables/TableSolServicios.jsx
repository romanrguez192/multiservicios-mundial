import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import { useHistory } from "react-router-dom";

const TableSolServicios = ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const columns = [
    {
      title: "una columna",
      field: "codVehiculo",
      editable: "never",
    },
    {
      title: "otra columna",
      field: "placa",
      editable: "never",
    },
  ];

  const create = () => {
    history.push("/solicitudes/crear");
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
        title="Solicitudes de servicio"
        columns={columns}
        //isLoading={loading}
        actions={actions}
        {...props}
      />
    </div>
  );
};

export default TableSolServicios;
