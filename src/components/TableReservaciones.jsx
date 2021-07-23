import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableReservaciones = ({ rows, ...props }) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getReservaciones();
  }, []);

  const getReservaciones = async () => {
    const url = "http://localhost:4000/api/reservaciones";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const reservaciones = await response.json();

    setReservaciones(reservaciones);
    setLoading(false);
  };

  const columns = [
    {
      title: "Numero de reservación",
      field: "numReserva",
      editable: "never",
    },
    {
      title: "Fecha",
      field: "fecha",
      editable: "always",
    },
    {
      title: "Monto Abonado",
      field: "montoAbonado",
      editable: "never",
    },
    {
      title: "Nombre del Cliente",
      field: "nombreCliente",
      editable: "never",
    },
    {
      title: "Cedula del Cliente",
      field: "cedCliente",
      editable: "never",
    },
    {
      title: "Status",
      field: "status",
      editable: "never",
    },
  ];

  const addReservacion = async (data) => {
    const url = "http://localhost:4000/api/reservaciones";

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const reservacion = await response.json();

    setReservaciones([...reservaciones, reservacion]);
  };

  const updateReservacion = async (newData, oldData) => {
    const url = `http://localhost:4000/api/reservaciones/${oldData.numeroReserva}`;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const reservacion = await response.json();

    const updatedData = [...reservaciones];
    const index = oldData.tableData.id;
    updatedData[index] = reservacion;

    setReservaciones(updatedData);
  };

  const deleteReservacion = async (oldData) => {
    const url = `http://localhost:4000/api/reservaciones/${oldData.numeroReserva}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
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
