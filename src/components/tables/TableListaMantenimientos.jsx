import React, { useState, useEffect } from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import Slide from "react-reveal/Slide";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
    width: "820pt",
  },
});

export default function TableListaMantenimientos({ marca, modelo, ...props }) {
  const classes = useStyles();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMantenimientos = async () => {
      const url = `http://localhost:4000/api/mantenimientosRecomendados/${marca}/${modelo}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const mantenimientos = await response.json();

      setMantenimientos(mantenimientos);
      setLoading(false);
    };

    getMantenimientos();
  }, [marca, modelo]);

  const columns = [
    {
      title: "Tiempo de uso",
      field: "tiempoUso",
      editable: "always",
      emptyValue: "Ninguno",
      lookup: {
        "3 months": "3 meses",
        "6 months": "6 meses",
        "1 year": "1 año",
        "2 years": "2 años",
        "3 years": "3 años",
        "4 years": "4 años",
        "5 years": "5 años",
        "6 years": "6 años",
        "7 years": "7 años",
      },
    },
    {
      title: "Kilometraje",
      field: "kilometraje",
      type: "numeric",
    },
    {
      title: "Mantenimiento recomendado",
      field: "mantenimiento",
    },
  ];

  const addMantenimiento = async (data) => {
    const url = `http://localhost:4000/api/mantenimientosRecomendados`;

    data.marca = marca;
    data.modelo = modelo;

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

    const mantenimiento = await response.json();

    setMantenimientos([...mantenimientos, mantenimiento]);
  };

  const updateMantenimiento = async (newData, oldData) => {
    const url = `http://localhost:4000/api/mantenimientosRecomendados/${marca}/${modelo}?tiempoUso=${oldData.tiempoUso}&kilometraje=${oldData.kilometraje}&mantenimiento=${oldData.mantenimiento}`;

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

    const mantenimiento = await response.json();

    const updatedData = [...mantenimientos];
    const index = oldData.tableData.id;
    updatedData[index] = mantenimiento;

    setMantenimientos(updatedData);
  };

  const deleteMantenimiento = async (oldData) => {
    const url = `http://localhost:4000/api/mantenimientosRecomendados/${marca}/${modelo}?tiempoUso=${oldData.tiempoUso}&kilometraje=${oldData.kilometraje}&mantenimiento=${oldData.mantenimiento}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...mantenimientos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setMantenimientos(dataDelete);
  };

  return (
    <div className={classes.table}>
      <Slide top collapse>
        <Table
          title="Mantenimientos Recomendados"
          subTable
          triTable
          columns={columns}
          data={mantenimientos}
          editable={{
            onRowAdd: addMantenimiento,
            onRowUpdate: updateMantenimiento,
            onRowDelete: deleteMantenimiento,
          }}
          isLoading={loading}
          {...props}
        />
      </Slide>
    </div>
  );
}
