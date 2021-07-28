import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import DialogSolicitud from "../DialogSolicitud";

const TableSolServicios = ({ modelos, ...props }) => {
  const [dialog, setDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const openDialog = () => {
    setDialog(true);
  };

  const handleClose = () => {
    setDialog(false);
  };

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

  const actions = [
    {
      icon: () => <Add />,
      tooltip: 'Añadir',
      isFreeAction: true,
      onClick: openDialog,
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
      <DialogSolicitud dialog={dialog} handleClose={handleClose}/>
    </div>
  );
};

export default TableSolServicios;
