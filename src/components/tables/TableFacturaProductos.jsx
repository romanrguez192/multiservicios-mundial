import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useSnackbar } from "notistack";
import Slide from "react-reveal";

const TableFacturaProductos = ({ nroFactura }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getFacturaProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/facturasVentas/productos/${nroFactura}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const facturaProductos = await response.json();

      setProductos(facturaProductos);
      setLoading(false);
    };

    getFacturaProductos();
  });

  const columns = [
    {
      title: "Código",
      field: "codProducto",
      editable: "onAdd",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "onAdd",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      editable: "onAdd",
      align: "left",
    },
  ];

  return (
    <Slide top collapse>
      <Table title="Productos" columns={columns} data={productos} isLoading={loading} subTable />
    </Slide>
  );
};

export default TableFacturaProductos;
