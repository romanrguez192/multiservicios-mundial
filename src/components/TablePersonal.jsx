import React, { useState, useEffect } from "react";
import Table from "./Table";

const TablePersonal = ({ rows, ...props }) => {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPersonal();
  }, []);

  const getPersonal = async () => {
    const url = "url";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const personal = await response.json();

    setPersonal(personal);
    setLoading(false);
  };

  const columns = [
    {
      title: "Cedula",
      field: "cedTrabajador",
      editable: "always",
    },
    {
      title: "Nombre",
      field: "nombre",
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
      field: "cargo",
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
