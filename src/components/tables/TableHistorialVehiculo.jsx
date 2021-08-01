import React, { useState } from "react";
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

export default function TableHistorialVehiculo({ codVehiculo, ...props }) {
  const classes = useStyles();
  const [loading, setLoading] = useState([]);

  //aca va las columnas q se muestran en mantenimiento
  const columns = [
    {
      title: "Servicio",
      field: "servicio",
    },
    {
      title: "Fecha",
      field: "fecha",
    },
  ];

  //pa probar namas
  const data=[
    { servicio: 'Pulitura de carrocería', fecha: '02/02/2021'},
    { servicio: 'Lavado', fecha: '08/05/2021'},
  ];

  const addMantenimiento = async (data) => {

  }

  const updateMantenimiento = async (newData, oldData) => {

  }

  const deleteMantenimiento = async (oldData) => {

  }

  return (
      <div className={classes.table}>
        <Slide top collapse>
          <Table
            title="Historial de mantenimientos"
            subTable
            columns={columns}
            data={data}
            // isLoading={loading}
            editable={{
              onRowAdd: addMantenimiento,
              onRowUpdate: updateMantenimiento,
              onRowDelete: deleteMantenimiento
            }}
            {...props}
          />
        </Slide>
      </div>
  );
}
