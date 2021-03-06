import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

const TableEstClientesFrecuentes = () => {
  const user = useUser();
  const [clientesFrecuentes, setClientesFrecuentes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getClientesFrecuentes = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/estadisticas/clientesMasMenosFrecuentes/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const clientesFrecuentes = await response.json();

      setClientesFrecuentes(clientesFrecuentes);
      setLoading(false);
    };

    getClientesFrecuentes();
  }, []);

  const columns = [
    {
      title: "Cédula",
      field: "cedCliente",
      type: "numeric",
      align: "left",
      editable: "never",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Nº de veces que solicitó un servicio",
      field: "totalVeces",
      type: "numeric",
      align: "left",
      editable: "never",
    },
  ];

  return (
    <div>
      <Table title="Clientes más/menos frecuentes" columns={columns} data={clientesFrecuentes} isLoading={loading} />
    </div>
  );
};

export default TableEstClientesFrecuentes;
