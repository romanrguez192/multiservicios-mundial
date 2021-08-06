import React, { useEffect, useState } from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
    width: "820pt",
  },
});

export default function TableDescripcionModelo({ marca, modelo, ...props }) {
  const classes = useStyles();
  const lookup = [];
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debeAplicarse, setDebeAplicarse] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProductos = async () => {
      const url = `http://localhost:4000/api/productosServicios`;

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productos = await response.json();
      setProductos(productos);
    };

    const getDebeAplicarse = async () => {
      const url = `http://localhost:4000/api/debeAplicarse/${marca}/${modelo}`;

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const debeAplicarse = await response.json();

      setDebeAplicarse(debeAplicarse);
      await getProductos();
      setLoading(false);
    };

    getDebeAplicarse();
  }, [marca, modelo]);

  productos.forEach((p) => {
    lookup[p.codProducto] = `${p.codProducto} - ${p.nombre}`;
  });

  const columns = [
    {
      title: "Producto",
      field: "codProductoServicio",
      type: "numeric",
      align: "left",
      lookup: lookup,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      type: "numeric",
      align: "left",
    },
    {
      title: "Unidad de medida",
      field: "unidadMedida",
    },
  ];

  const addDescripcion = async (data) => {
    data.modelo = modelo;
    data.marca = marca;

    const url = "http://localhost:4000/api/debeAplicarse";

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

    const newDebeAplicarse = await response.json();
    setDebeAplicarse([...debeAplicarse, newDebeAplicarse]);
  };

  const updateDescripcion = async (newData, oldData) => {
    const url = `http://localhost:4000/api/debeAplicarse/${marca}/${modelo}/${oldData.codProductoServicio}`;

    newData.modelo = modelo;
    newData.marca = marca;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
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

    const newDebeAplicarse = await response.json();

    const updatedData = [...debeAplicarse];
    const index = oldData.tableData.id;
    updatedData[index] = newDebeAplicarse;

    setDebeAplicarse(updatedData);
  };

  const deleteDescripcion = async (oldData) => {
    const url = `http://localhost:4000/api/debeAplicarse/${marca}/${modelo}/${oldData.codProductoServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...debeAplicarse];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setDebeAplicarse(dataDelete);
  };

  return (
    <div className={classes.table}>
      <Slide top collapse>
        <Table
          title="Productos Recomendados"
          subTable
          columns={columns}
          data={debeAplicarse}
          editable={{
            onRowAdd: addDescripcion,
            onRowUpdate: updateDescripcion,
            onRowDelete: deleteDescripcion,
          }}
          isLoading={loading}
          {...props}
        />
      </Slide>
    </div>
  );
}
