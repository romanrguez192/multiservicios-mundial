import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableProductosCompra from "./TableProductosCompra";

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
        return console.log("Oh no");
      }

      const proveedor = await response.json();

      setProveedores(proveedor);
    };

    getProveedores();
  }, []);

  const columns = [
    {
      title: "Código",
      field: "codOrdCompra",
      editable: "never",
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
        return console.log("Oh no");
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
            <TableProductosCompra
              ordCompra={rowData}
              ordenesCompra={ordCompra}
              setOrdenesCompra={setOrdCompra}
            />
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableOrdenesCompra;