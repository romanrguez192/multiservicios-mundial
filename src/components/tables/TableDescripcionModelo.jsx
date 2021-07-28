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

export default function TableDescripcionModelo({ title, ...props }) {
  const classes = useStyles();

  //aca va las columnas q se muestran en la descripcion del modelo
  const columns = [
    {
      title: "Producto",
      field: "producto",
    },
    {
      title: "Cantidad",
      field: "cantidad",
    },
    {
      title: "Unidad de medida",
      field: "unidadMedida",
    },
  ];

  //pa probar namas
  const data=[
    { producto: 'Pulitura de carrocería', cantidad: '02/02/2021'},
    { producto: 'Lavado', cantidad: '08/05/2021'},
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
            title="Debe aplicarse"
            subTable
            columns={columns} 
            data={data}
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
