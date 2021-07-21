import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableTiposVehiculos from "../components/TableTiposVehiculos";
import TableModelos from "../components/TableModelos";
import TableVehiculos from "../components/TableVehiculos";
import PageTitle from "../components/PageTitle";
import Nature from "../components/Nature";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerVehiculos: {
    flexGrow: "1",
    marginTop: "60pt",
  },
  root: {
    display: "flex",
  },
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Vehiculos = () => {
  const classes = useStyles();
  const [tiposVehiculos, setTiposVehiculos] = useState([]);
  const [loadingT, setLoadingT] = useState(true);
  const [modelos, setModelos] = useState([]);
  const [loadingM, setLoadingM] = useState(true);

  useEffect(() => {
    const getTiposVehiculos = async () => {
      const url = "http://localhost:4000/api/tiposVehiculos";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const tiposVehiculos = await response.json();

      setTiposVehiculos(tiposVehiculos);
      setLoadingT(false);
    };

    getTiposVehiculos();
  }, []);

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
      setLoadingM(false);
    };

    getModelos();
  }, [tiposVehiculos]);

  return (
    <div className={classes.root}>
      <Sidebar page="vehiculos" />
      <main className={classes.containerVehiculos}>
        <PageTitle title="Vehículos" />
        <div className={classes.tableContainer}>
          <TableVehiculos {...{ modelos }}/>
          <TableTiposVehiculos
            // props
            {...{
              tiposVehiculos,
              setTiposVehiculos,
              loadingT,
            }}
          />
          <TableModelos
            // props
            {...{
              modelos,
              setModelos,
              loadingM,
              tiposVehiculos,
            }}
          />
          <Nature />
        </div>
      </main>
    </div>
  );
};

export default Vehiculos;
