import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

const TableEstServiciosSolicitados = () => {
  const user = useUser();
  const [serviciosSolicitados, setServiciosSolicitados] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getServiciosSolicitados = async () => {
      const url = `http://localhost:4000/api/estadisticas/serviciosSolicitados/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const serviciosSolicitados = await response.json();

      setServiciosSolicitados(serviciosSolicitados);
      setLoading(false);
    };

    getServiciosSolicitados();
  }, []);

  const columns = [
    {
      title: "Código",
      field: "codServicio",
      type: "numeric",
      align: "left",
      editable: "never",
    },
    {
      title: "Servicio",
      field: "nombreServicio",
      editable: "never",
    },
    {
      title: "Nº de veces que se solicitó",
      field: "totalVeces",
      type: "numeric",
      align: "left",
      editable: "never",
    },
  ];

  return (
    <div>
      <Table
        title="Servicios más/menos solicitados"
        columns={columns}
        data={serviciosSolicitados}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstServiciosSolicitados;
