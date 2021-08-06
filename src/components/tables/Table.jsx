import React, { useState } from "react";
import MaterialTable from "material-table-formik";
import { makeStyles } from "@material-ui/core";
import {
  AddOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@material-ui/icons";
import Fade from "react-reveal/Fade";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
  },
  icono: {
    color: "#787878",
  },
});

export default function Table({
  selection,
  triTable,
  subTable,
  title,
  ...props
}) {
  const classes = useStyles();

  const Title = subTable ? <h2>{title}</h2> : <h1>{title}</h1>;

  const colorHeader = subTable ? (triTable ? "#E9967A" : "#FFBB56") : "#199479";

  const styleTable = subTable
    ? { fontFamily: "quicksand", borderColor: "#787878" }
    : { fontFamily: "quicksand" };

  const pageSize = subTable ? [5] : [5, 10, 20];

  return (
    <Fade>
      <div className={classes.table}>
        <MaterialTable
          title={Title}
          style={styleTable}
          options={{
            filtering: true,
            selection: selection,
            emptyRowsWhenPaging: true,
            pageSizeOptions: pageSize,
            actionsColumnIndex: -1,
            showTextRowsSelected: false,
            showSelectAllCheckbox: false,
            headerStyle: {
              backgroundColor: colorHeader,
              color: "#fff",
              fontFamily: "quicksand",
            },
          }}
          localization={{
            deleteAction: "Borrar",
            deleteHeader: "Borrar",
            toolbar: {
              searchPlaceholder: "Buscar",
              nRowsSelected: "{0} fila(s) seleccionadas",
            },
            header: {
              actions: "Acciones",
            },
            body: {
              addTooltip: "Añadir",
              editTooltip: "Editar",
              deleteTooltip: "Eliminar",
              emptyDataSourceMessage: "No hay datos para mostrar",
              editRow: {
                deleteText:
                  "¿Estás seguro de querer eliminar esta información?",
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
              labelDisplayedRows: "{from}-{to} de {count}",
            },
          }}
          icons={{
            Add: () => <AddOutlined className={classes.icono} />,
            Edit: () => <EditOutlined className={classes.icono} />,
            Search: () => <SearchOutlined className={classes.icono} />,
            Delete: () => <DeleteOutlined className={classes.icono} />,
          }}
          {...props}
        />
      </div>
    </Fade>
  );
}
