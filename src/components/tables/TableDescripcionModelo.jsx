import React, {useEffect, useState} from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import Slide from "react-reveal/Slide";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: '20pt',
    width: '820pt',
  },
});

export default function TableDescripcionModelo({ data, ...props }) {
  const classes = useStyles();
  const lookup = []
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debeAplicarse, setDebeAplicarse] = useState([]);

  useEffect(() => {
    getProductos();
    getDebeAplicarse();
  }, [])
  
  const getData = () => data;

  productos && productos.forEach(p => {
    lookup[p.codProducto] = p.nombre;
  })
  

  

  //aca va las columnas q se muestran en la descripcion del modelo
  const columns = [
    {
      title: "Producto",
      field: "codProductoServicio",
      lookup: lookup,
    },
    {
      title: "Cantidad",
      field: "cantidad",
    },
    {
      title: "Unidad de medida",
      field: "unidadMedida",
    },
  ];

  const getDebeAplicarse = async () => {
    const url = `http://localhost:4000/api/debeAplicarse/${data.marca}/${data.modelo}`;

    const response = await fetch(url);

    if (!response.ok) {
      //TODO: Error
      return console.log("Oh no");
    }

    const debeAplicarse = await response.json();

    setDebeAplicarse(debeAplicarse); 
    setLoading(false);
  }

  const getProductos = async () => {
    const url = `http://localhost:4000/api/productosServicios`;
    
    const response = await fetch(url);

    if (!response.ok) {
      //TODO: Error
      return console.log("Oh no");
    }

    const productos = await response.json();
    setProductos(productos);    
  }

  const addDescripcion = async (data) => {
    const { modelo, marca } = getData();
    data.modelo = modelo;
    data.marca = marca;

    const url = "http://localhost:4000/api/debeAplicarse";

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

    const newDebeAplicarse = await response.json();
    setDebeAplicarse([...debeAplicarse, newDebeAplicarse]);
  };

  const updateDescripcion = async (newData, oldData) => {
    const { modelo, marca } = getData();
    const url = `http://localhost:4000/api/debeAplicarse/${marca}/${modelo}/${oldData.codProductoServicio}`;

    newData.modelo = modelo;
    newData.marca = marca;

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

    const newDebeAplicarse = await response.json();

    const updatedData = [...debeAplicarse];
    const index = oldData.tableData.id;
    updatedData[index] = newDebeAplicarse;

    setDebeAplicarse(updatedData);
  };

  const deleteDescripcion = async (oldData) => {
    const { modelo, marca } = getData();
    const url = `http://localhost:4000/api/debeAplicarse/${marca}/${modelo}/${oldData.codProductoServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return console.log("Oh no");
    }

    const dataDelete = [...debeAplicarse];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setDebeAplicarse(dataDelete);
  };

  return (
      <div className={classes.table}>
        <Slide top collapse>
          <Table
            title="Debe aplicarse"
            subTable
            columns={columns} 
            data={debeAplicarse}
            editable={{
                onRowAdd: addDescripcion,
                onRowUpdate: updateDescripcion,
                onRowDelete: deleteDescripcion,
            }}
            isLoading={loading}
            {...props}
          />
        </Slide>
      </div>
  );
}
