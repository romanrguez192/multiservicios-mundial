import React, { useState } from "react";
import MaterialTable from "material-table-formik";
import { makeStyles } from "@material-ui/core";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import Fade from 'react-reveal/Fade';

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: '20pt',
  },
  icono: {
    color: '#787878',
  },
});

export default function Table({ title, ...props }) {
  const classes = useStyles();

  const Title = props.subTable ? <h2>{title}</h2> : <h1>{title}</h1> ;

  const colorHeader = props.subTable ? "#FFBB56" : "#199479";

  const placeH = props.subTable ? "Buscar" : `Buscar ${title}`;

  const styleTable = props.subTable ? { fontFamily: "quicksand" ,borderColor: "#787878"} : { fontFamily: "quicksand" }; 

  const pageSize = props.subTable ? [5] : [5,10,20];

  return (
    <Fade>
      <div className={classes.table}>
        <MaterialTable
          title={Title}
          style={styleTable}
          options={{
            emptyRowsWhenPaging: true,   //to make page size fix in case of less data rows
            pageSizeOptions: pageSize,
            actionsColumnIndex: -1,
            headerStyle: {
              backgroundColor: colorHeader,
              color: "#fff",
              fontFamily: "quicksand",
            },
          }}
          localization={{
            deleteAction: "Borrar",
            deleteHeader: "Borrar",
            toolbar: { searchPlaceholder: placeH },
            header: {
              actions: "Acciones",
            },
            body: {
              addTooltip: "Añadir",
              editTooltip: "Editar",
              deleteTooltip: "Eliminar",
              emptyDataSourceMessage: "No hay datos para mostrar",
              editRow: {
                deleteText: "¿Estás seguro de querer eliminar esta información?",
                cancelTooltip: "Cancelar",
                saveTooltip: "Aceptar",
              },
            },
            pagination: {
              labelRowsSelect: "Filas",
              firstTooltip: "Ir al principio",
              nextTooltip: "Siguiente página",
              previousTooltip: "Página anterior",
              lastTooltip: "Ir al final",
              labelDisplayedRows: "{from}-{to} de {count}"
            },
          }}
          icons={{
            Add: () => <AddOutlined className={classes.icono}/>,
            Edit: () => <EditOutlined className={classes.icono}/>,
            Search: () => <SearchOutlined className={classes.icono}/>,
            Delete: () => <DeleteOutlined className={classes.icono}/>,
          }}
          {...props}
        />
      </div>
    </Fade>
  );
}
