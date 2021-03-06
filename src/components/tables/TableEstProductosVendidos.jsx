import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";

//Tabla de Marca de vehículos que más atendemos por tipo de servicio.
const TableEstProductosVendidos = () => {
  const user = useUser();
  const [productosVendidos, setProductosVendidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProductosVendidos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/estadisticas/productosVendidos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosVendidos = await response.json();

      setProductosVendidos(productosVendidos);
      setLoading(false);
    };

    getProductosVendidos();
  }, []);

  const columns = [
    {
      title: "Código",
      field: "codProducto",
      type: "numeric",
      align: "left",
    },
    {
      title: "Producto",
      field: "nombre",
    },
    {
      title: "Nº de salida por ventas",
      field: "totalVentas",
      type: "numeric",
      align: "left",
    },
  ];

  return (
    <div>
      <Table title="Productos más/menos vendidos" columns={columns} data={productosVendidos} isLoading={loading} />
    </div>
  );
};

export default TableEstProductosVendidos;
