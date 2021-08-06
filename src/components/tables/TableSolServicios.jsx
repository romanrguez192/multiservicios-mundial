import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import { useHistory } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";

const TableSolServicios = ({ ...props }) => {
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const history = useHistory();
  const user = useUser();

  useEffect(() => {
    const getSolicitudes = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const solicitudes = await response.json();

      setSolicitudes(solicitudes);
      setLoading(false);
    };

    getSolicitudes();
  }, [user]);

  const columns = [
    {
      title: "Número de solicitud",
      field: "nroSolicitud",
      type: "numeric",
      align: "left",
    },
    {
      title: "Código de vehiculo",
      field: "codVehiculo",
      type: "numeric",
      align: "left",
    },
    {
      title: "Fecha de entrada",
      field: "fechaEntrada",
      type: "date",
    },
    {
      title: "Fecha de salida (estimada)",
      field: "fechaSalidaEstimada",
      type: "date",
    },
    {
      title: "Fecha de salida (real)",
      field: "fechaSalidaReal",
      type: "date",
      emptyValue: "No aplica",
    },
    {
      title: "Autorizado para el retiro",
      field: "nombreAutorizado",
      emptyValue: "Ninguno",
    },
    {
      title: "Teléfono del autorizado",
      field: "tlfAutorizado",
      emptyValue: "Ninguno",
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
        isLoading={loading}
        data={solicitudes}
        actions={actions}
        {...props}
      />
    </div>
  );
};

export default TableSolServicios;
