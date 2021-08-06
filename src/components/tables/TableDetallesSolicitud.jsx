import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";

const TableDetallesSolicitud = ({ nroSolicitud, codServicio, ...props }) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActividades = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${nroSolicitud}/servicios/${codServicio}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const actividades = await response.json();

      setActividades(actividades);
      setLoading(false);
    };

    getActividades();
  }, [nroSolicitud, codServicio]);

  const columns = [
    {
      title: "Número",
      field: "nroActividad",
      type: "numeric",
    },
    {
      title: "Descripción",
      field: "descripcion",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
    },
    {
      title: "Ejecutada",
      field: "ejecutada",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
  ];

  return (
    <Slide top collapse>
      <Table
        title="Actividades"
        columns={columns}
        data={actividades}
        isLoading={loading}
        subTable
        {...props}
      />
    </Slide>
  );
};

export default TableDetallesSolicitud;
