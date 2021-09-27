import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import { useSnackbar } from "notistack";
//Proveedor que nos suministra más/menos productos
const TableEstSuministroProveedor = (props) => {
  const user = useUser();
  const [proveedorProductos, setProveedorProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getProveedorProductos = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/estadisticas/proveedorProductos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const proveedorProductos = await response.json();

      setProveedorProductos(proveedorProductos);
      setLoading(false);
    };

    getProveedorProductos();
  }, []);

  const columns = [
    {
      title: "Rif",
      field: "rifProveedor",
      editable: "never",
    },
    {
      title: "Proveedor",
      field: "razonSocial",
      editable: "never",
    },
    // TO DO No sé si esto se manejaría por la cantidad de productos así
    //O tipo la variedad de productos, no lo c
    {
      title: "Número de productos suministrados",
      field: "cantidadTotal",
      editable: "never",
      type: "numeric",
      align: "left",
    },
  ];
  return (
    <div>
      <Table
        title="Proveedores que suministran más/menos productos"
        columns={columns}
        data={proveedorProductos}
        isLoading={loading}
      />
    </div>
  );
};

export default TableEstSuministroProveedor;
