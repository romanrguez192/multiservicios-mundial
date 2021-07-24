import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../contexts/UserContext";

const TablePersonal = ({ ...props }) => {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    getPersonal();
  }, []);

  const getPersonal = async () => {
    const url = `http://localhost:4000/api/empleados?rifSucursal=${user.rifSucursal}`;

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const personal = await response.json();
    personal && personal.forEach( t => {
      t.nombreCompleto = `${t.nombre} ${t.apellido}`;
    })
    setPersonal(personal);
    setLoading(false);
  };

  const columns = [
    {
      title: "Cedula",
      field: "cedEmpleado",
      editable: "always",
    },
    {
      title: "Nombre",
      field: "nombreCompleto",
      editable: "always",
    },
    {
      title: "Teléfono",
      field: "telefono",
      editable: "always",
    },
    {
      title: "Dirección",
      field: "direccion",
      editable: "always",
    },
    {
      title: "Cargo",
      field: "tipoEmpleado",
      editable: "never",
    },
  ];

  return (
    <div>
      <Table
        title="Personal"
        columns={columns}
        data={personal}
        isLoading={loading}
        {...props}
      />
    </div>
  );
};

export default TablePersonal;
