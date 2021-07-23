import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableResActividades from "./TableResActividades";

const TableReservaciones = ({ rows, ...props }) => {
  const [reservaciones, setReservaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [servicios, setServicios] = useState([]);

  useEffect(() => {
    getServicios();
    getReservaciones();
  }, []);

  const lookup = {}
  servicios &&
  servicios.forEach((t) => {
      lookup[t.codServicio] = t.nombre;
  });

  const getServicioById = id => {
    let resul = null;
    const codServicio = parseInt(id)
    servicios.forEach(t => {
      if(t.codServicio === codServicio) {
        resul = t.nombre;
        return;
      }
    });
    return resul
  }

  const getServicios = async () => {
    const url = "http://localhost:4000/api/servicios";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const servicios = await response.json();

    setServicios(servicios);
    setLoading(false);
  }

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
      field: "nroReserva",
      editable: "never",
    },
    {
      title: "Fecha (aaaa-mm-dd)",
      field: "fechaActividad",
      editable: "always",
    },
    {
      title: "Cedula del Cliente",
      field: "cedCliente",
      editable: "always",
    },
    {
      title: "Servicio",
      field: "codServicio",
      editable: "always",
      lookup: lookup
    },
    {
      title: "Monto Abonado",
      field: "montoAbonado",
      editable: "always",
    },
    {
      title: "Status",
      field: "status",
      editable: "never",
    },
  ];

  const addReservacion = async (data) => {
    data.montoAbonado = parseFloat(data.montoAbonado);

    //LUEGO VEO COMO OBTENER EL RIF DE LA SUCURSAL
    data.rifSucursal = "799072750";

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
    newData.montoAbonado = parseFloat(newData.montoAbonado)
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
      return console.log("Oh no");
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
        detailPanel={(rowData) => {
          return <TableResActividades codServicio={rowData.codServicio} />;
        }}
        {...props}
      />
    </div>
  );
};

export default TableReservaciones;
