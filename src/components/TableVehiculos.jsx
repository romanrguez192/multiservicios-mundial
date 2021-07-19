import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableHistorialVehiculo from "./TableHistorialVehiculo";

const TableVehiculos = ({ rows, ...props }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVehiculos();
  }, []);

  const getVehiculos = async () => {
    const url = "url";

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
      title: "Fecha de adquisición",
      field: "fechaAdquisicion",
      editable: "always",
    },
    {
      title: "Fecha de registro",
      field: "fechaRegistro",
      editable: "always",
    },
    {
      title: "Cédula del cliente",
      field: "cedCliente",
      editable: "always",
    },
    {
      title: "Modelo",
      field: "modeloVehiculo",
      editable: "always",
      lookup: { 34: '4Runner', 63: 'Optra' },  //cambiar por los modelos de vehiculos
    },
    {
      title: "Cédula del mecánico",
      field: "cedMecanico",
      editable: "always",
    },
  ];

  const addVehiculo = async (data) => {
    const url = "url";

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
    const url = "url";

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
    const url = "url";

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

  //para probar namas
  const data=[
    { codVehiculo: '0FB1', placa: 'AB644FE'},
    { codVehiculo: '0FB2', placa: 'CE997KO'},
  ];

  return (
    <div>
      <Table
        title="Vehículos"
        columns={columns}
        data={data} //cambiar despues por vehiculos
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
