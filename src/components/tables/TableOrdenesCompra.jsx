import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableProductosCompra from "./TableProductosCompra";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableOrdenesCompra = ({
  ordCompra,
  setOrdCompra,
  loadingOC,
  ...props
}) => {
  const [proveedores, setProveedores] = useState([]);
  const proveedoresLookup = {};

  proveedores.forEach((p) => {
    proveedoresLookup[p.rifProveedor] = p.razonSocial;
  });

  useEffect(() => {
    const getProveedores = async () => {
      const url = "http://localhost:4000/api/proveedores";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const proveedor = await response.json();

      setProveedores(proveedor);
    };

    getProveedores();
  }, []);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Código",
      field: "codOrdCompra",
      editable: "never",
      type: "numeric",
      align: "left",
      emptyValue: "N/A",
    },
    {
      title: "Proveedor",
      field: "rifProveedor",
      lookup: proveedoresLookup,
      editable: "onAdd",
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date",
      editable: "never",
    },
    {
      title: "Enviada",
      field: "enviada",
      editable: "never",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
    {
      title: "Recibida",
      field: "recibida",
      editable: "never",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
  ];

  const addOrdCompra = async (data) => {
    data.enviada = false;
    data.recibida = false;
    setOrdCompra([...ordCompra, data]);
  };

  const deleteOrdCompra = async (oldData) => {
    if (oldData.enviada) {
      const url = `http://localhost:4000/api/ordenesCompra/${oldData.codOrdCompra}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }
    }

    const dataDelete = [...ordCompra];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setOrdCompra(dataDelete);
  };

  return (
    <div>
      <Table
        title="Órdenes de Compra"
        columns={columns}
        data={ordCompra}
        isLoading={loadingOC}
        editable={{
          onRowAdd: addOrdCompra,
          onRowDelete: deleteOrdCompra,
        }}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableProductosCompra
                ordCompra={rowData}
                ordenesCompra={ordCompra}
                setOrdenesCompra={setOrdCompra}
              />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableOrdenesCompra;
