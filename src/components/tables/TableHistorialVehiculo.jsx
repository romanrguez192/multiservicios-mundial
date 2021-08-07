import React, { useState, useEffect } from "react";
import Table from "./Table";
import Add from "@material-ui/icons/AddOutlined";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import Slide from "react-reveal/Slide";

const TableSolServicios = ({ codVehiculo, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [solicitudes, setSolicitudes] = useState([]);
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getSolicitudes = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${codVehiculo}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const solicitudes = await response.json();

      setSolicitudes(solicitudes);
      setLoading(false);
    };

    getSolicitudes();
  });

  const columns = [
    {
      title: "Número de solicitud",
      field: "nroSolicitud",
      type: "numeric",
      align: "left",
    },
    {
      title: "Fecha de entrada",
      field: "fechaEntrada",
      type: "date",
    },
    {
      title: "Fecha de salida",
      field: "fechaSalidaReal",
      type: "date",
      emptyValue: "No aplica",
    },
    {
      title: "Finalizada",
      field: "finalizada",
      lookup: {
        true: "Sí", 
        false: "No"
      }
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

  const handleRowClick = (evt, rowData) => {
    history.push(`/solicitudes/${rowData.nroSolicitud}`);
  };

  return (
    <Slide top collapse>
      <Table
        title="Historial de solicitudes de servicio"
        subTable
        columns={columns}
        isLoading={loading}
        data={[solicitudes]}
        actions={actions}
        onRowClick={handleRowClick}
        {...props}
      />
    </Slide>
  );
};

export default TableSolServicios;
