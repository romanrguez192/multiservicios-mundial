import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableHistorialVehiculo from "./TableHistorialVehiculo";
import TableMantenimientosPrevios from "./TableMantenimientosPrevios";
import { TableContainer } from "@material-ui/core";

const TableVehiculosCliente = ({ cedCliente, ...props }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelos, setModelos] = useState([]);

  const lookup = {};

  modelos.forEach((m) => {
    const str = m.marca + "|" + m.modelo;
    lookup[str] = m.marca + " " + m.modelo;
  });

  useEffect(() => {
    const getVehiculosCliente = async () => {
      setLoading(true);
      const url = `http://localhost:4000/api/vehiculos?cedCliente=${cedCliente}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const vehiculos = await response.json();
      vehiculos.forEach((v) => {
        v.modelo = v.marca + "|" + v.modelo;
      });

      setVehiculos(vehiculos);
      setLoading(false);
    };

    getVehiculosCliente();
  }, [cedCliente]);

  useEffect(() => {
    const getModelos = async () => {
      const url = "http://localhost:4000/api/modelos";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const modelos = await response.json();

      setModelos(modelos);
    };

    getModelos();
  }, []);

  const columns = [
    {
      title: "Código de Vehículo",
      field: "codVehiculo",
      editable: "never",
      type: "numeric",
      align: "left",
    },
    {
      title: "Placa",
      field: "placa",
      editable: "always",
    },
    {
      title: "Modelo",
      field: "modelo",
      editable: "always",
      lookup: lookup,
    },
    {
      title: "Fecha de adquisición",
      field: "fechaAdquisicion",
      editable: "always",
      type: "date",
    },
    {
      title: "Fecha de registro",
      field: "fechaRegistro",
      editable: "never",
      type: "date",
    },
    {
      title: "Nombre del Mecánico",
      field: "nombreMecanico",
      editable: "always",
    },
    {
      title: "Teléfono del Mecánico",
      field: "tlfMecanico",
      editable: "always",
    },
  ];

  const addVehiculo = async (data) => {
    const url = "http://localhost:4000/api/vehiculos";

    // TODO: OJO con los errores
    const marcaModelo = data.modelo.split("|");
    data.marca = marcaModelo[0];
    data.modelo = marcaModelo[1];

    data.cedCliente = cedCliente;

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

    const vehiculo = await response.json();
    vehiculo.modelo = vehiculo.marca + "|" + vehiculo.modelo;

    setVehiculos([...vehiculos, vehiculo]);
  };

  const updateVehiculo = async (newData, oldData) => {
    const url = `http://localhost:4000/api/vehiculos/${oldData.codVehiculo}`;

    // TODO: OJO con los errores
    const marcaModelo = newData.modelo.split("|");
    newData.marca = marcaModelo[0];
    newData.modelo = marcaModelo[1];

    newData.cedCliente = cedCliente;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const vehiculo = await response.json();
    vehiculo.modelo = vehiculo.marca + "|" + vehiculo.modelo;

    const updatedData = [...vehiculos];
    const index = oldData.tableData.id;
    updatedData[index] = vehiculo;

    setVehiculos(updatedData);
  };

  const deleteVehiculo = async (oldData) => {
    const url = `http://localhost:4000/api/vehiculos/${oldData.codVehiculo}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...vehiculos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setVehiculos(dataDelete);
  };

  return (
    <div>
      <Table
        title="Vehículos"
        columns={columns}
        data={vehiculos}
        isLoading={loading}
        subTable
        editable={{
          onRowAdd: addVehiculo,
          onRowUpdate: updateVehiculo,
          onRowDelete: deleteVehiculo,
        }}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableHistorialVehiculo codVehiculo={rowData.codVehiculo} />
              <TableMantenimientosPrevios codVehiculo={rowData.codVehiculo} />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableVehiculosCliente;
