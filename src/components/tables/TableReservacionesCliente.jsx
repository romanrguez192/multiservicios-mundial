import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

const TableReservacionesCliente = ({ setReservas, cedCliente, ...props }) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    const getReservaciones = async () => {
      const today = new Date().toISOString();
      const url = `http://localhost:4000/api/reservaciones?rifSucursal=${user.rifSucursal}&cedCliente=${cedCliente}&fechaActividad=${today}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const reservaciones = await response.json();

      setReservaciones(reservaciones);
      setLoading(false);
    };

    getReservaciones();
  }, [user, cedCliente]);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Numero de Reserva",
      field: "nroReserva",
      type: "numeric",
      align: "left",
    },
    {
      title: "Fecha de Reservación",
      field: "fechaReserva",
      type: "date",
    },
    {
      title: "Código de Servicio",
      field: "codServicio",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre de Servicio",
      field: "nombreServicio",
    },
    {
      title: "Monto Abonado (Bs.S)",
      field: "montoAbonado",
      type: "numeric",
      align: "left",
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
        // TODO: OJO borrar los datos finales si cambia
        onSelectionChange={(rows) => setReservas(rows)}
        {...props}
      />
    </div>
  );
};

export default TableReservacionesCliente;
