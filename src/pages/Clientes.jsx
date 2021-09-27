import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableClientes from "../components/tables/TableClientes";
import TableClientesSucursal from "../components/tables/TableClientesSucursal";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  containerClientes: {
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

const Clientes = () => {
  const classes = useStyles();
  const [clientes, setClientes] = useState([]);
  const [loadingC, setLoadingC] = useState(true);
  const [clientesSucursal, setClientesSucursal] = useState([]);
  const [loadingCS, setLoadingCS] = useState(true);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getClientes = async () => {
      const url = "https://multiservicios-mundial.herokuapp.com/api/clientes";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const clientes = await response.json();

      setClientes(clientes);
      setLoadingC(false);
    };

    getClientes();
  }, []);

  useEffect(() => {
    const getClientesSucursal = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/clientes?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const clientesSucursal = await response.json();

      setClientesSucursal(clientesSucursal);
      setLoadingCS(false);
    };

    getClientesSucursal();
  }, [clientes, user]);

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="clientes" />
        <main className={classes.containerClientes}>
          <PageTitle title="Clientes" />
          <div className={classes.tableContainer}>
            <TableClientes
              {...{
                // props
                clientes,
                setClientes,
                loadingC,
              }}
            />
            <TableClientesSucursal
              {...{
                // props
                clientesSucursal,
                loadingCS,
              }}
            />
            <Nature />
          </div>
        </main>
      </div>
    </>
  );
};

export default Clientes;
