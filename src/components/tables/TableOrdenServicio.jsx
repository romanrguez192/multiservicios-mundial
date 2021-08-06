import React, { useState, useEffect } from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
    width: "820pt",
  },
});

const TableOrdenServicio = ({
  nroSolicitud,
  codServicio,
  nroActividad,
  ...props
}) => {
  const classes = useStyles();
  const [productos, setProductos] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const user = useUser();

  const productosLookup = {};

  productos.forEach((p) => {
    productosLookup[p.codProducto] = `${p.codProducto} - ${p.nombre}`;
  });

  const empleadosLookup = {};

  empleados.forEach((e) => {
    empleadosLookup[e.cedEmpleado] = `${e.cedEmpleado} - ${e.nombre}`;
  });

  useEffect(() => {
    const getProductos = async () => {
      // TODO: Los del inventario... á
      const url = "http://localhost:4000/api/productosServicios";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productos = await response.json();

      setProductos(productos);
    };

    getProductos();
  }, []);

  useEffect(() => {
    const getEmpleados = async () => {
      const url = `http://localhost:4000/api/empleados/?rifSucursal=${user.rifSucursal}&codServicio=${codServicio}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const empleados = await response.json();

      setEmpleados(empleados);
    };

    getEmpleados();
  }, [user, codServicio]);

  useEffect(() => {
    const getOrdenes = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${nroSolicitud}/servicios/${codServicio}/actividades/${nroActividad}/ordenes`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const ordenes = await response.json();

      setOrdenes(ordenes);
      setLoading(false);
    };

    getOrdenes();
  }, [nroSolicitud, codServicio, nroActividad]);

  const columns = [
    {
      title: "Producto",
      field: "codProducto",
      lookup: productosLookup,
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date",
    },
    {
      title: "Cantidad",
      field: "cantidad",
      type: "numeric",
    },
    {
      title: "Unidad de medida",
      field: "unidadMedida",
    },
    {
      title: "Empleado Responsable",
      field: "cedEmpleado",
      lookup: empleadosLookup,
    },
  ];

  const addOrdenServicio = async (data) => {
    const url = `http://localhost:4000/api/solicitudesServicio/${nroSolicitud}/servicios/${codServicio}/actividades/${nroActividad}/ordenes`;

    data.nroSolicitud = nroSolicitud;
    data.codServicio = codServicio;
    data.nroActividad = nroActividad;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const orden = await response.json();

    setOrdenes([...ordenes, orden]);
  };

  const deleteOrdenServicio = async (oldData) => {
    const url = `http://localhost:4000/api/solicitudesServicio/${nroSolicitud}/servicios/${codServicio}/actividades/${nroActividad}/ordenes/?fecha=${oldData.fecha}&codProducto=${oldData.codProducto}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...ordenes];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setOrdenes(dataDelete);
  };

  return (
    <div className={classes.table}>
      <Table
        title="Órdenes de Suministro"
        columns={columns}
        data={ordenes}
        isLoading={loading}
        subTable
        triTable
        editable={{
          onRowAdd: addOrdenServicio,
          onRowDelete: deleteOrdenServicio,
        }}
        {...props}
      />
    </div>
  );
};

export default TableOrdenServicio;
