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

const TableOrdenServicio = ({
  actividades,
  productosS,
  servicio,
  ...props
}) => {

  const actividadesLookup = {};
  actividades &&
    actividades.forEach((l) => {
      actividadesLookup[l.codServicio] = l.descripcion;
    }
  );

  const productosSLookup = {};
  productosS &&
    productosS.forEach((l) => {
      productosSLookup[l.codProducto] = l.nombre;
    }
  );

  const servicioLookup = {};
  servicio &&
    servicio.forEach((l) => {
      servicioLookup[l.codServicio] = l.nombre;
    }
  );

  const classes = useStyles();

  //aca va las columnas q se muestran en mantenimiento
  const columns = [
    {
      title: "Servicio",
      field: "servicio",
			editable: "always",
			lookup: servicioLookup,
    },
		{
      title: "Actividad",
      field: "actividad",
			editable: "always",
			//lookup: actividadesLookup,  nu sirve :(
    },
    {
      title: "Cédula del empleado",
      field: "cedulaEmp",
			editable: "always",
    },
		{
      title: "Producto",
      field: "codProducto",
			editable: "always",
			lookup: productosSLookup,
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

export default TableOrdenServicio;