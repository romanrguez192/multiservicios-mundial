import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../contexts/UserContext";
import Slide from "react-reveal/Slide";

const TableServiciosAsignados = ({ cedEmpleado, ...props }) => {
  const [serviciosAsignados, setServiciosAsignados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const lookupServicio = {};
  if (servicios) {
    servicios.forEach((s) => {
      lookupServicio[s.codServicio] = `${s.codServicio} - ${s.nombreServicio}`;
    });
  }

  useEffect(() => {
    const getServicios = async () => {
      const url = `http://localhost:4000/api/serviciosOfrecidos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const servicios = await response.json();

      setServicios(servicios);
    };

    getServicios();
  }, [user]);

  useEffect(() => {
    const getServiciosAsignados = async () => {
      const url = `http://localhost:4000/api/serviciosAsignados/${cedEmpleado}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const serviciosAsignados = await response.json();

      setServiciosAsignados(serviciosAsignados);
      setLoading(false);
    };

    getServiciosAsignados();
  }, [cedEmpleado]);

  const columns = [
    {
      title: "Servicio",
      field: "codServicio",
      editable: "onAdd",
      lookup: lookupServicio,
    },
    {
      title: "¿Es coordinador?",
      field: "esCoordinador",
      editable: "never",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
  ];

  const addServicioAsignado = async (data) => {
    const url = `http://localhost:4000/api/serviciosAsignados/${cedEmpleado}`;

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

    const servicioAsignado = await response.json();

    setServiciosAsignados([...serviciosAsignados, servicioAsignado]);
  };

  const deleteServicioAsignado = async (oldData) => {
    const url = `http://localhost:4000/api/serviciosAsignados/${oldData.cedEmpleado}/${oldData.codServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...serviciosAsignados];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setServiciosAsignados(dataDelete);
  };

  return (
    <Slide top collapse>
      <Table
        title="Servicios Asignados"
        columns={columns}
        data={serviciosAsignados}
        isLoading={loading}
        subTable
        editable={{
          isDeleteHidden: (rowData) => rowData.esCoordinador === true,
          onRowAdd: addServicioAsignado,
          onRowDelete: deleteServicioAsignado,
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableServiciosAsignados;
