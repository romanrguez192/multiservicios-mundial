import React, { useState, useEffect } from "react";
import Table from "./Table";

const TableModelos = ({ rows, ...props }) => {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getModelos();
  }, []);

  const getModelos = async () => {
    const url = "url";

    const response = await fetch(url);

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const modelos = await response.json();

    setModelos(modelos);
    setLoading(false);
  };

  const columns = [
    {
      title: "Modelo",
      field: "modelo",
      editable: "always",
    },    
    {
      title: "Marca",
      field: "marca",
      editable: "always",
    },
    {
      title: "Peso",
      field: "peso",
      editable: "always",
    },
    {
      title: "Nº de puestos",
      field: "numPuestos",
      editable: "always",
    },
    {
      title: "Aceite de motor",
      field: "aceiteMotor",
      editable: "always",
    },
    {
      title: "Aceite de caja",
      field: "aceiteCaja",
      editable: "always",
    },
    {
      title: "Refrigerante",
      field: "aceiteMotor",
      editable: "always",
    },
    {
      title: "Tipo de Vehiculo",
      field: "tipoVehiculo",
      editable: "always",
      lookup: { 34: 'Camionetica', 63: 'Todoterreno' },  //cambiar por los tipos de vehiculos
    },
  ];

  const addModelo = async (data) => {
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

    const modelo = await response.json();

    setModelos([...modelos, modelo]);
  };

  const updateModelo = async (newData, oldData) => {
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

    const modelo = await response.json();

    const updatedData = [...modelos];
    const index = oldData.tableData.id;
    updatedData[index] = modelo;

    setModelos(updatedData);
  };

  const deleteModelo = async (oldData) => {
    const url = "url";

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...modelos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setModelos(dataDelete);
  };

  //para probar namas
  const data=[
    { marca: 'Chevrolet', modelo: 'Optra'},
    { marca: 'Toyota', modelo: '4Runner'},
  ];

  return (
    <div>
      <Table
        title="Modelos"
        columns={columns}
        data={data} //cambiar despues por modelos
        //isLoading={loading}
        editable={{
          onRowAdd: addModelo,
          onRowUpdate: updateModelo,
          onRowDelete: deleteModelo,
        }}
        detailPanel={rowData => {
          return (
          /* Hacer un componente para añadir la descripcion del modelo */
            <div>
              Descripcion del modelo   
            </div>
          )
        }}
        {...props}
      />
    </div>
  );
};

export default TableModelos;
