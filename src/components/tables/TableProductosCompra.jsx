import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import { Button } from "@material-ui/core";
import { useUser } from "../../contexts/UserContext";

const TableProductosCompra = ({
  ordCompra,
  ordenesCompra,
  setOrdenesCompra,
  ...props
}) => {
  const [productosCompra, setProductosCompra] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const user = useUser();

  const lookup = {};
  productos.forEach((p) => {
    lookup[p.codProducto] = `${p.codProducto} - ${p.nombre}`;
  });

  useEffect(() => {
    setLoading(true);
    const getProductosCompra = async () => {
      const url = `http://localhost:4000/api/ordenesCompra/${ordCompra.codOrdCompra}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const productosCompra = await response.json();

      setProductosCompra(productosCompra);
      setLoading(false);
    };

    if (ordCompra.enviada) {
      getProductosCompra();
    } else {
      setLoading(false);
    }
  }, [ordCompra]);

  useEffect(() => {
    const getProductos = async () => {
      const url = `http://localhost:4000/api/proveedores/${ordCompra.rifProveedor}/productos`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const productos = await response.json();

      setProductos(productos);
    };

    getProductos();
  }, [ordCompra]);

  const columns = [
    {
      title: "Producto",
      field: "codProducto",
      editable: "onAdd",
      lookup: lookup,
    },
    {
      title: "Cantidad",
      field: "cantidad",
      editable: "always",
      type: "numeric",
    },
  ];

  const addProductoCompra = async (data) => {
    setProductosCompra([...productosCompra, data]);
  };

  const updateProductoCompra = async (newData, oldData) => {
    const updatedData = [...productosCompra];
    const index = oldData.tableData.id;
    updatedData[index] = newData;

    setProductosCompra(updatedData);
  };

  const deleteProductoCompra = async (oldData) => {
    const dataDelete = [...productosCompra];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setProductosCompra(dataDelete);
  };

  const enviar = async () => {
    setSubmitting(true);
    const url = "http://localhost:4000/api/ordenesCompra";

    const ordenCompra = { ...ordCompra };
    ordenCompra.rifSucursal = user.rifSucursal;
    ordenCompra.pide = productosCompra;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(ordenCompra),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const [newOrdenCompra, productos] = await response.json();
    newOrdenCompra.enviada = true;
    newOrdenCompra.recibida = false;

    const updatedData = [...ordenesCompra];
    const index = ordCompra.tableData.id;
    updatedData[index] = newOrdenCompra;

    setSubmitting(false);
    setOrdenesCompra(updatedData);
    setProductosCompra(productos);
  };

  return (
    <Slide top collapse>
      <div>
        <Table
          title={
            ordCompra.enviada ? "Productos Comprados" : "Productos a Comprar"
          }
          columns={columns}
          data={productosCompra}
          isLoading={loading}
          subTable
          editable={
            !ordCompra.enviada && {
              onRowAdd: addProductoCompra,
              onRowUpdate: updateProductoCompra,
              onRowDelete: deleteProductoCompra,
            }
          }
          {...props}
        />
        {!ordCompra.enviada && (
          <Button
            variant="contained"
            color="primary"
            disabled={!productosCompra.length || submitting}
            onClick={enviar}
          >
            Enviar
          </Button>
        )}
      </div>
    </Slide>
  );
};

export default TableProductosCompra;
