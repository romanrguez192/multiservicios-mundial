import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableFacturaProductos from "./TableFacturaProductos";

const TableFacturasVentas = ({}) => {
  const [facturasVentas, setFacturasVentas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFacturasVentas = async () => {
      const url = "";
      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const facturasVentas = await response.json();

      setFacturasVentas(facturasVentas);
      setLoading(false);
    };

    getFacturasVentas();
  });

  const columns = [
    {
      title: "Nro Factura",
      field: "nroFactura",
      editable: "onAdd",
    },
    {
      title: "Cliente",
      field: "cedCliente",
      editable: "onAdd",
    },
    {
      title: "Fecha de Facturación",
      field: "fechaFacturacion",
      type: "date",
      editable: "onAdd",
    },
    {
      title: "Forma de Pago",
      field: "modalidadPago",
      editable: "onAdd",
    },
    {
      title: "Descuento",
      field: "descuento",
      type: "numeric",
      editable: "onAdd",
    },
    {
      title: "Monto",
      field: "montoTotal",
      type: "numeric",
      editable: "onAdd",
    },
  ];

  const addFacturaVenta = async (data) => {
    const url = "";
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

    const facturaVenta = await response.json();

    setFacturasVentas([...facturasVentas, facturaVenta]);
  };

  const deleteFacturaVenta = async (oldData) => {
    const url = "";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...facturasVentas];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setFacturasVentas(dataDelete);
  };

  return (
    <div>
      <Table
        title="Facturas de Ventas"
        columns={columns}
        data={facturasVentas}
        isLoading={loading}
        editable={{
          onRowAdd: addFacturaVenta,
          onRowDelete: deleteFacturaVenta,
        }}
        detailPanel={() => {
          return <TableFacturaProductos />;
        }}
      />
    </div>
  );
};

export default TableFacturasVentas;
