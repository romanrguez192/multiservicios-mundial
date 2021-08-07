import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

//Clientes que hacen reservas y después no usan el servicio.
const TableEstClientesReservas = () => {
  const user = useUser();
  const [clientesReservas, setClientesReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getClientesReservas = async () => {
      const url = `http://localhost:4000/api/estadisticas/clientesNoUsanServicio/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const clientesReservas = await response.json();

      setClientesReservas(clientesReservas);
      setLoading(false);
    };

    getClientesReservas();
  });

  const columns = [
    {
      title: "Cédula",
      field: "cedula",
      type: "numeric",
      editable: "never",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Número de reservas perdidas",
      field: "numReservasPerdidas",
      type: "numeric",
      editable: "never",
      align: "left",
    },
  ];
  return (
    <div>
      <Table
        title="Clientes con reservas perdidas"
        columns={columns}
        data={clientesReservas}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstClientesReservas;
