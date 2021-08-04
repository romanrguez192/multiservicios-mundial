import React, { useState } from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";

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

export default function TableOrdenServicio({ codVehiculo, ...props }) {
  const classes = useStyles();
  const [loading, setLoading] = useState([]);

  //aca va las columnas q se muestran en mantenimiento
  const columns = [
    {
      title: "Nº de Solicitud",
      field: "numSolicitud",
      editable: "never",
    },
    {
      title: "Servicio",
      field: "servicio",
			editable: "always",
			//lookup: lookup de los servicios
    },
		{
      title: "Actividad",
      field: "actividad",
			editable: "always",
			//lookup: lookup de las actividades
    },
		{
      title: "Producto",
      field: "codProducto",
			editable: "always",
			//lookup: lookup de los productos
    },
		{
      title: "cantidad",
      field: "cantidad",
			editable: "always",
			type: "numeric",
    },
		{
      title: "Unidad de medida",
      field: "unidadMedida",
			editable: "always",
			type: "numeric",
    },
  ];

  const addOrdenServicio = async (data) => {

  }

  const updateOrdenServicio = async (newData, oldData) => {

  }

  const deleteOrdenServicio = async (oldData) => {

  }

  return (
      <div className={classes.table}>
				<Table
					title="Órdenes de Servicio"
					columns={columns}
					//data={data}
					// isLoading={loading}
					editable={{
						onRowAdd: addOrdenServicio,
						onRowUpdate: updateOrdenServicio,
						onRowDelete: deleteOrdenServicio,
					}}
					{...props}
				/>
      </div>
  );
}
