import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";
//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstMarcas = () => {
  const user = useUser();
  const [marcasVehiculos, setMarcasVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getMarcasVehiculos = async () => {
      const url = `http://localhost:4000/api/estadisticas/marcasAtendidas/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const marcasVehiculos = await response.json();

      setMarcasVehiculos(marcasVehiculos);
      setLoading(false);
    };

    getMarcasVehiculos();
  });

  const columns = [
    {
      title: "Servicio",
      field: "servicio",
      editable: "never",
    },
    {
      title: "Marca",
      field: "marca",
      editable: "never",
    },
    {
      title: "Nº de veces que se atendió esta marca",
      field: "numMarcasAtendidas",
      type: "numeric",
      align: "left",
      editable: "never",
    },
  ];

  return (
    <div>
      <Table
        title="Marca de vehículos más atendida por servicio"
        columns={columns}
        data={marcasVehiculos}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstMarcas;
