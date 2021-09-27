import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

const TableProductosVendidos = ({ nroFactura, ...props }) => {
  const columns = [
    {
      title: "Código de producto",
      field: "codProducto",
      editable: "never",
    },
    {
      title: "Producto",
      field: "nombre",
      editable: "never",
    },
    // {
    //   title: "Cantidad",
    //   field: "cantidad",
    // },
    {
      title: "Precio unitario",
      field: "precio",
      editable: "never",
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/facturasVentas/productos/${nroFactura}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productos = await response.json();

      console.log(productos);
      setLoading(false);
      setProductos(productos);
    };

    getProductos();
  }, []);

  return (
    <div>
      <Slide top collapse>
        <Table title="Productos vendidos" subTable columns={columns} data={productos} isLoading={loading} {...props} />
      </Slide>
    </div>
  );
};

export default TableProductosVendidos;
