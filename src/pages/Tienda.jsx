import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Table from "../components/tables/Table";
import { useUser } from "../contexts/UserContext";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import TableCompras from "../components/tables/TableCompras";
import { useSnackbar } from "notistack";


// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerTienda: {
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

const Tienda = () => {
  const classes = useStyles();
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCompras = async() => {
      const url = `http://localhost:4000/api/facturasVentas/sucursal/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const compras = await response.json();

      setCompras(compras);
      setLoading(false);
    }

    getCompras();
  }, [])

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="tienda" />
        <main className={classes.containerTienda}>
          <PageTitle title="Tienda" />
          <div className={classes.tableContainer}>
            <TableCompras {...{ loading, compras, setCompras }} />
          </div>
          <Nature/>
        </main>
      </div>
    </>
  );
};

export default Tienda;
