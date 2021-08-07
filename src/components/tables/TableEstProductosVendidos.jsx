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
      const url = `http://localhost:4000/api/estadisticas/productosVendidos/${user.rifSucursal}`;

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
  });

  const columns = [
    {
      title: "Código",
      field: "codigo",
      type: "numeric",
      align: "left",
    },
    {
      title: "Producto",
      field: "producto",
    },
    {
      title: "Nº de salida por ventas",
      field: "numVentas",
      type: "numeric",
      align: "left",
    },
  ];

  return (
    <div>
      <Table
        title="Productos más/menos vendidos"
        columns={columns}
        data={productosVendidos}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstProductosVendidos;
