import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";

const TableOrdenesCompra = ({
  ordCompra,
  setOrdCompra,
  loadingOC,
  ...props
}) => {
  const [proveedores, setProveedores] = useState([]);
  const user = useUser();
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
    },
    {
      title: "Fecha",
      field: "fecha",
      type: "date",
      editable: "never",
    },
    {
      title: "Proveedor",
      field: "rifProveedor",
      lookup: proveedoresLookup,
      editable: "onAdd",
    },
  ];

  const addOrdCompra = async (data) => {
    const url = "http://localhost:4000/api/ordenesCompra";

    data.rifSucursal = user.rifSucursal;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const ordenCompra = await response.json();

    setOrdCompra([...ordCompra, ordenCompra]);
  };

  const deleteOrdCompra = async (oldData) => {
    const url = `http://localhost:4000/api/ordenesCompra/${oldData.codOrdCompra}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
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
        {...props}
      />
    </div>
  );
};

export default TableOrdenesCompra;
