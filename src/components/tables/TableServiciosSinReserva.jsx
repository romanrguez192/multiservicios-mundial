import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import Fade from "react-reveal/Fade";

const TableServiciosSinReserva = ({ setServicios, ...props }) => {
  const [serviciosSR, setServiciosSR] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const getServicios = async () => {
      const url = `http://localhost:4000/api/serviciosOfrecidos/${user.rifSucursal}?sinReserva=true`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const servicios = await response.json();

      setServiciosSR(servicios);
      setLoading(false);
    };

    getServicios();
  }, [user]);

  const columns = [
    {
      title: "Servicio",
      field: "codServicio",
    },
    {
      title: "Nombre",
      field: "nombreServicio",
    },
  ];

  return (
    <Fade>
      <Table
        title={`Servicios sin Reserva`}
        columns={columns}
        data={serviciosSR}
        isLoading={loading}
        selection
        // TODO: OJO borrar los datos finales si cambia
        onSelectionChange={(rows) => setServicios(rows)}
        {...props}
      />
    </Fade>
  );
};

export default TableServiciosSinReserva;
