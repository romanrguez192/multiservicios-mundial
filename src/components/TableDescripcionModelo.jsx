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
  },
});

export default function TableDescripcionModelo({ title, ...props }) {
  const classes = useStyles();

  //aca va las columnas q se muestran en la descripcion del modelo
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
        <Slide top collapse>
          <Table
            title="Debe aplicarse"
            subTable
            columns={columns} 
            data={data}
            //isLoading={loading}
            {...props}
          />
        </Slide>
      </div>
  );
}
