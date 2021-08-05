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
    const getSolicitudes = async() => {
      const url = `http://localhost:4000/api/solicitudesServicio/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const solicitudes = await response.json();

      setSolicitudes(solicitudes);
      setLoading(false);
    }

    getSolicitudes();
  }, [])

  const columns = [
    {
      title: "Número de solicitud",
      field: "nroSolicitud",
      editable: "never",
    },
    {
      title: "Código de vehiculo",
      field: "codVehiculo",
      editable: "never",
    },
    {
      title: "Fecha de entrada",
      field: "fechaEntrada",
      editable: "always",
      type: "date"
    },
    {
      title: "Fecha de salida (estimada)",
      field: "fechaSalidaEstimada",
      editable: "always",
      type: "date",
    },
    {
      title: "Fecha de salida (real)",
      field: "fechaSalidaReal",
      editable: "always",
      type: "date",
    },
    {
      title: "Autorizado para el retiro",
      field: "autorizado",
      editable: "always"
    }
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
