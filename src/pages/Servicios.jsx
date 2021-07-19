import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableServicios from "../components/TableServicios";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";

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
  const [servicios, setServicios] = useState([]);
  const [loadingS, setLoadingS] = useState(true);

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

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="servicios" />
        <main className={classes.containerServicios}>
          <PageTitle title="Servicios"/>
          <div className={classes.tableContainer}>
            <TableServicios
              // props
              {...{
                servicios,
                setServicios,
                loadingS,
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
