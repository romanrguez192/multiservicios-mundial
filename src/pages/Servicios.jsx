import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableServicios from "../components/tables/TableServicios";
import TableServiciosOfrecidos from "../components/tables/TableServiciosOfrecidos";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import { useUser } from "../contexts/UserContext";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerServicios: {
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

const Servicios = () => {
  const classes = useStyles();
  const user = useUser();
  const [servicios, setServicios] = useState([]);
  const [loadingS, setLoadingS] = useState(true);
  const [serviciosOfrecidos, setServiciosOfrecidos] = useState([]);
  const [loadingSO, setLoadingSO] = useState(true);

  useEffect(() => {
    const getServicios = async () => {
      const url = "http://localhost:4000/api/servicios";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const servicios = await response.json();

      setServicios(servicios);
      setLoadingS(false);
    };

    getServicios();
  }, []);

  useEffect(() => {
    const getServiciosOfrecidos = async () => {
      const url = `http://localhost:4000/api/serviciosOfrecidos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const serviciosOfrecidos = await response.json();

      setServiciosOfrecidos(serviciosOfrecidos);
      setLoadingSO(false);
    };

    getServiciosOfrecidos();
  }, [servicios, user]);

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="servicios" />
        <main className={classes.containerServicios}>
          <PageTitle title="Servicios" />
          <div className={classes.tableContainer}>
            <TableServicios
              // props
              {...{
                servicios,
                setServicios,
                loadingS,
              }}
            />
            <TableServiciosOfrecidos
              {...{
                serviciosOfrecidos,
                setServiciosOfrecidos,
                loadingSO,
                servicios,
              }}
            />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Servicios;
