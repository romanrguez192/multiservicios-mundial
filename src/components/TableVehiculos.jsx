import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableHistorialVehiculo from "./TableHistorialVehiculo";

const TableVehiculos = ({ modelos, ...props }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  const lookup = {}
  modelos &&
    modelos.forEach((t) => {
      lookup[t.modelo] = t.modelo;
  });

  useEffect(() => {
    getVehiculos();
  }, []);

  const getMarcaByModelo = modelo => {
    let resul = null;
    modelos.forEach(t => {
      if(t.modelo === modelo) {
        resul = t.marca;
        return;
      }
    });
    return resul
  }
  

  const getVehiculos = async () => {
    const url = "http://localhost:4000/api/vehiculos";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const vehiculos = await response.json();

    setVehiculos(vehiculos);
    setLoading(false);
  };

  const columns = [
    {
      title: "Código de Vehículo",
      field: "codVehiculo",
      editable: "never",
    },
    {
      title: "Placa",
      field: "placa",
      editable: "always",
    },
    {
      title: "Fecha de adquisición (aaaa/mm/dd)",
      field: "fechaAdquisicion",
      editable: "always",
    },
    {
      title: "Cédula del cliente",
      field: "cedCliente",
      editable: "always",
    },
    {
      title: "Modelo",
      field: "modelo",
      editable: "always",
      lookup: lookup,  //cambiar por los modelos de vehiculos
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
    }
  ];

  const addVehiculo = async (data) => {
    const url = "http://localhost:4000/api/vehiculos";
    data["marca"] = getMarcaByModelo(data.modelo);
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

    setVehiculos([...vehiculos, vehiculo]);
  };

  const updateVehiculo = async (newData, oldData) => {
    const url = `http://localhost:4000/api/vehiculos/${oldData.codVehiculo}`;
    newData["marca"] = getMarcaByModelo(newData.modelo)
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
        data={vehiculos} //cambiar despues por vehiculos
        //isLoading={loading}
        editable={{
          onRowAdd: addVehiculo,
          onRowUpdate: updateVehiculo,
          onRowDelete: deleteVehiculo,
        }}
        detailPanel={rowData => {
          return (
          /* Hacer un componente que muestre los mantenimientos realizados por el vehiculo */
            <TableHistorialVehiculo codVehiculo={rowData.codVehiculo}/>
          )
        }}
        {...props}
      />
    </div>
  );
};

export default TableVehiculos;
