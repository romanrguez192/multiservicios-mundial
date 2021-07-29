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

export default function TableListaMantenimientos({ mantenimientos, setMantenimientos, ...props }) {
  const classes = useStyles();

  const columns = [
    {
      title: "Tiempo de uso",
      field: "tiempoUso",
    },
    {
      title: "Kilometraje",
      field: "kilometraje",
    },
    {
      title: "Mantenimiento recomendado",
      field: "mantenimiento",
    },
  ];


  const addDescripcion = async (data) => {
  
  };

  const updateDescripcion = async (newData, oldData) => {
  
  };

  const deleteDescripcion = async (oldData) => {

  };

  return (
      <div className={classes.table}>
        <Slide top collapse>
          <Table
            title="Mantenimientos recomendados"
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
