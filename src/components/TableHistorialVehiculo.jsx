import React from "react";
import MaterialTable from "material-table-formik";
import { makeStyles } from "@material-ui/core";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: '20pt',
  },
});

export default function TableHistorialVehiculo({ title, ...props }) {
  const classes = useStyles();

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

  return (
      <div className={classes.table}>
        <MaterialTable
            columns={columns}
            data={data}
            style={{ fontFamily: "quicksand" }}
            options={{
            actionsColumnIndex: -1,
            toolbar: false,
            headerStyle: {
                backgroundColor: "#FFBB56",
                color: "#fff",
                fontFamily: "quicksand",
            },
            }}
            localization={{
            pagination: {
                labelRowsSelect: "Filas",
                firstTooltip: "Ir al principio",
                nextTooltip: "Siguiente página",
                previousTooltip: "Página anterior",
                lastTooltip: "Ir al final",
                labelDisplayedRows: "{from}-{to} de {count}"
            },
            }}
            {...props}
        />
      </div>
  );
}
