import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

const TableReservaciones = ({ ...props }) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicios, setServicios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getServicios = async () => {
      const url = `http://localhost:4000/api/serviciosOfrecidos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const servicios = await response.json();

      setServicios(servicios);
    };

    const getClientes = async () => {
      const url = `http://localhost:4000/api/clientes`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const clientes = await response.json();

      setClientes(clientes);
    };

    const getReservaciones = async () => {
      const url = `http://localhost:4000/api/reservaciones?rifSucursal=${user.rifSucursal}`;

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

    getServicios();
    getClientes();
    getReservaciones();
  }, [user]);

  const lookupServicios = {};
  servicios &&
    servicios.forEach((s) => {
      lookupServicios[s.codServicio] = `${s.codServicio} - ${s.nombreServicio}`;
    });

  const lookupClientes = {};
  clientes &&
    clientes.forEach((c) => {
      lookupClientes[c.cedCliente] = `${c.cedCliente} - ${c.nombre}`;
    });

  const columns = [
    {
      title: "Numero de Reserva",
      field: "nroReserva",
      type: "numeric",
      editable: "never",
      align: "left",
    },
    {
      title: "Cliente",
      field: "cedCliente",
      editable: "always",
      type: "numeric",
      align: "left",
      lookup: lookupClientes,
    },
    {
      title: "Fecha de Reservación",
      field: "fechaReserva",
      type: "datetime",
      editable: "never",
    },
    {
      title: "Fecha de la Actividad",
      field: "fechaActividad",
      type: "datetime",
      editable: "always",
    },
    {
      title: "Servicio",
      field: "codServicio",
      type: "numeric",
      align: "left",
      editable: "always",
      lookup: lookupServicios,
    },
    {
      title: "Monto Abonado (Bs.S)",
      field: "montoAbonado",
      type: "numeric",
      align: "left",
      editable: "always",
    },
    {
      title: "Status",
      field: "status",
      editable: "onUpdate",
      lookup: {
        pendiente: "Pendiente",
        cancelada: "Cancelada",
        perdida: "Perdida",
        atendida: "Atendida",
      },
    },
  ];

  const addReservacion = async (data) => {
    const url = "http://localhost:4000/api/reservaciones";

    data.rifSucursal = user.rifSucursal;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }
    const reservacion = await response.json();
    setReservaciones([...reservaciones, reservacion]);
  };

  const updateReservacion = async (newData, oldData) => {
    const url = `http://localhost:4000/api/reservaciones/${oldData.nroReserva}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const reservacion = await response.json();

    const updatedData = [...reservaciones];
    const index = oldData.tableData.id;
    updatedData[index] = reservacion;

    setReservaciones(updatedData);
  };

  const deleteReservacion = async (oldData) => {
    const url = `http://localhost:4000/api/reservaciones/${oldData.nroReserva}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...reservaciones];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setReservaciones(dataDelete);
  };

  return (
    <div>
      <Table
        title="Reservaciones"
        columns={columns}
        data={reservaciones}
        isLoading={loading}
        editable={{
          onRowAdd: addReservacion,
          onRowUpdate: updateReservacion,
          onRowDelete: deleteReservacion,
        }}
        {...props}
      />
    </div>
  );
};

export default TableReservaciones;
