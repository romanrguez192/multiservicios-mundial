import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

// Personal que realiza más/menos servicios
const TableEstPersonal = () => {
  const user = useUser();
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getPersonal = async () => {
      const url = `http://localhost:4000/api/estadisticas/personalServicios/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const personal = await response.json();

      setPersonal(personal);
      setLoading(false);
    };

    getPersonal();
  }, []);

  const columns = [
    {
      title: "Cédula del empleado",
      field: "cedEmpleado",
      editable: "never",
    },
    {
      title: "Empleado",
      field: "nombreEmpleado",
      editable: "never",
    },
    {
      title: "Nº de Servicios Atendidos",
      field: "totalServicios",
      editable: "never",
      type: "numeric",
      align: "left",
    },
  ];
  
  return (
    <div>
      <Table
        title="Personal que realiza más/menos servicios"
        columns={columns}
        data={personal}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstPersonal;
