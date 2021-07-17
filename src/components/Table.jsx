import React, { useState } from "react";
import MaterialTable from "material-table-formik";
import { makeStyles } from "@material-ui/core";
import {
  AddOutlined,
  EditOutlined,
  ImportantDevices,
} from "@material-ui/icons";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: '20pt',
    textAlign: 'center !important',
  },
});

export default function Table({ title, ...props }) {
  const classes = useStyles();

  const Title = <h1 className={classes.titleC}>{title}</h1>;

  return (
    <div className={classes.table}>
      <MaterialTable
        title={Title}
        style={{ fontFamily: "quicksand" }}
        cellStyle={classes.iconoColorido}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#199479",
            color: "#fff",
            fontFamily: "quicksand",
          },
        }}
        localization={{
          deleteAction: "Borrar",
          deleteHeader: "Borrar",
          toolbar: { searchPlaceholder: `Buscar ${title}` },
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
          Add: () => <AddOutlined />,
          Edit: () => <EditOutlined />,
        }}
        {...props}
      />
    </div>
  );
}
