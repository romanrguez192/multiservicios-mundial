import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../contexts/UserContext";
import Fade from "react-reveal/Fade";

const TableServiciosOfrecidos = ({
  serviciosOfrecidos,
  setServiciosOfrecidos,
  loadingSO,
  servicios,
  ...props
}) => {
  const [empleados, setEmpleados] = useState([]);
  const user = useUser();

  const lookupServicio = {};
  if (servicios) {
    servicios.forEach((s) => {
      lookupServicio[s.codServicio] = `${s.codServicio} - ${s.nombre}`;
    });
  }

  const lookupCoordinador = {};
  if (empleados) {
    empleados.forEach((e) => {
      lookupCoordinador[e.cedEmpleado] = `${e.cedEmpleado} - ${e.nombre} ${e.apellido}`;
    });
  }

  useEffect(() => {
    const getEmpleados = async () => {
      const url = `http://localhost:4000/api/empleados?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const empleados = await response.json();

      setEmpleados(empleados);
    };

    getEmpleados();
  }, [user]);

  const columns = [
    {
      title: "Servicio",
      field: "codServicio",
      editable: "onAdd",
      lookup: lookupServicio,
    },
    {
      title: "Coordinador",
      field: "cedCoordinador",
      editable: "always",
      lookup: lookupCoordinador,
    },
  ];

  const addServicioOfrecido = async (data) => {
    const url = `http://localhost:4000/api/serviciosOfrecidos`;

    data = { codServicio: data.codServicio, cedEmpleado: data.cedCoordinador };

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

    const servicioOfrecido = await response.json();

    setServiciosOfrecidos([...serviciosOfrecidos, servicioOfrecido]);
  };

  const updateServicioOfrecido = async (newData, oldData) => {
    const url = `http://localhost:4000/api/serviciosOfrecidos/${oldData.codServicio}/${oldData.cedCoordinador}`;

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

    const servicioOfrecido = await response.json();

    const updatedData = [...serviciosOfrecidos];
    const index = oldData.tableData.id;
    updatedData[index] = servicioOfrecido;

    setServiciosOfrecidos(updatedData);
  };

  const deleteServicioOfrecido = async (oldData) => {
    const url = `http://localhost:4000/api/serviciosOfrecidos/${oldData.codServicio}/${oldData.cedCoordinador}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...serviciosOfrecidos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setServiciosOfrecidos(dataDelete);
  };

  return (
    <Fade>
      <Table
        title={`Servicios Ofrecidos en ${user.nombreSucursal}`}
        columns={columns}
        data={serviciosOfrecidos}
        isLoading={loadingSO}
        editable={{
          onRowAdd: addServicioOfrecido,
          onRowUpdate: updateServicioOfrecido,
          onRowDelete: deleteServicioOfrecido,
        }}
        {...props}
      />
    </Fade>
  );
};

export default TableServiciosOfrecidos;
