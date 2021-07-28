import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";

const TableReservacionesCliente = ({ setReservas, cedCliente, ...props }) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const getReservaciones = async () => {
      const url = `http://localhost:4000/api/reservaciones?rifSucursal=${
        user.rifSucursal
      }&?cedCliente=${cedCliente}&fechaActividad=${Date.now()}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const reservaciones = await response.json();

      setReservaciones(reservaciones);
      setLoading(false);
    };

    getReservaciones();
  }, [user, cedCliente]);

  const columns = [
    {
      title: "Numero de Reserva",
      field: "nroReserva",
    },
    {
      title: "Fecha de Reservación",
      field: "fechaReserva",
      type: "date",
    },
    {
      title: "Código de Servicio",
      field: "codServicio",
    },
    {
      title: "Nombre de Servicio",
      field: "nombreServicio",
    },
    {
      title: "Monto Abonado (Bs.S)",
      field: "montoAbonado",
      type: "numeric",
    },
  ];

  return (
    <div>
      <Table
        title="Reservaciones"
        columns={columns}
        data={reservaciones}
        isLoading={loading}
        selection
        onSelectionChange={(rows) => setReservas(rows)}
        {...props}
      />
    </div>
  );
};

export default TableReservacionesCliente;
