import React from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import Slide from "react-reveal/Slide";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: '20pt',
    width: '820pt',
  },
});

export default function TableMantenimientosPrevios({ mantenimientos, setMantenimientos, ...props }) {
  const classes = useStyles();

  //aca va las columnas q se muestran en la descripcion del modelo
  const columns = [
    {
      title: "Fecha",
      field: "fecha",
    },
    {
      title: "Descripción",
      field: "descripción",
    },
  ];


  const addDescripcion = async (data) => {
    const url = "";

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

  const updateDescripcion = async (newData, oldData) => {
    const url = ``;

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

  const deleteDescripcion = async (oldData) => {
    const url = ``;

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
            title="Mantenimientos previos a M&M"
            subTable
            triTable
            columns={columns} 
            //data={data}
            editable={{
                onRowAdd: addDescripcion,
                onRowUpdate: updateDescripcion,
                onRowDelete: deleteDescripcion,
            }}
            //isLoading={loading}
            {...props}
          />
        </Slide>
      </div>
  );
}
