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

  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [debeAplicarse, setDebeAplicarse] = useState([]);

  useEffect(() => {
    getProductos();
    getDebeAplicarse();
  }, [])
  

  //aca va las columnas q se muestran en la descripcion del modelo
  const columns = [
    {
      title: "Producto",
      field: "producto",
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
    console.log(debeAplicarse)
    debeAplicarse && debeAplicarse.forEach(async (t) => {
      const url2 = `http://localhost:4000/api/productosServicios/${t.codProductoServicio}`

      const res = await fetch(url2);

      if (!res.ok) {
        //TODO: Error
        return console.log("Oh no");
      }

      const  codProducto = await res.json();
      console.log(codProducto)
    }) 

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
    console.log(productos)
    setProductos(productos);    
  }

  const addDescripcion = async (data) => {
    
  };

  const updateDescripcion = async (newData, oldData) => {
    
  };

  const deleteDescripcion = async (oldData) => {
    
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
