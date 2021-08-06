import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import { useUser } from "../contexts/UserContext";
import TableLineas from "../components/tables/TableLineas";
import TableProductosServicios from "../components/tables/TableProductosServicio";
import TableProductosVentas from "../components/tables/TableProductosVentas";
import TableInventario from "../components/tables/TableInventario";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import TableOrdenesCompra from "../components/tables/TableOrdenesCompra";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerInventario: {
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

const Inventario = () => {
  const classes = useStyles();
  const [lineas, setLineas] = useState([]);
  const [loadingL, setLoadingL] = useState(true);
  const [loadingOC, setLoadingOC] = useState(true);
  const [productosServicios, setProductosServicios] = useState([]);
  const [loadingPS, setLoadingPS] = useState(true);
  const [productosVentas, setProductosVentas] = useState([]);
  const [loadingPV, setLoadingPV] = useState(true);
  const [inventario, setInventario] = useState([]);
  const [loadingI, setLoadingI] = useState(true);
  const [ordCompra, setOrdCompra] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const user = useUser();

  useEffect(() => {
    const getLineas = async () => {
      setLoadingL(true);
      const url = "http://localhost:4000/api/lineas";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const lineas = await response.json();

      setLineas(lineas);
      setLoadingL(false);
    };

    getLineas();
  }, []);

  useEffect(() => {
    const getProductosServicios = async () => {
      setLoadingPS(true);
      const url = "http://localhost:4000/api/productosServicios";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosServicios = await response.json();

      setProductosServicios(productosServicios);
      setLoadingPS(false);
    };

    getProductosServicios();
  }, [lineas]);

  useEffect(() => {
    const getProductosVentas = async () => {
      setLoadingPV(true);
      const url = "http://localhost:4000/api/productosVentas";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const productosVentas = await response.json();

      setProductosVentas(productosVentas);
      setLoadingPV(false);
    };

    getProductosVentas();
  }, [lineas]);

  useEffect(() => {
    const getInventario = async () => {
      setLoadingI(true);
      const url = `http://localhost:4000/api/inventario/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const inventario = await response.json();

      setInventario(inventario);
      setLoadingI(false);
    };

    getInventario();
  }, [productosServicios, productosVentas, user]);

  useEffect(() => {
    const getOrdCompra = async () => {
      const url = `http://localhost:4000/api/ordenesCompra?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const ordenesCompra = await response.json();

      setOrdCompra(ordenesCompra);
      setLoadingOC(false);
    };

    getOrdCompra();
  }, [user]);

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inventario" />
        <main className={classes.containerInventario}>
          <PageTitle title="Inventario" />
          <div className={classes.tableContainer}>
            <TableOrdenesCompra
              {...{
                //props
                ordCompra,
                setOrdCompra,
                loadingOC,
              }}
            />
            <TableLineas
              {...{
                //props
                lineas,
                setLineas,
                loadingL,
              }}
            />
            <TableProductosServicios
              {...{
                // props
                productosServicios,
                setProductosServicios,
                lineas,
                loadingPS,
              }}
            />
            <TableProductosVentas
              {...{
                // props
                productosVentas,
                setProductosVentas,
                lineas,
                loadingPV,
              }}
            />
            <TableInventario
              {...{
                // props
                inventario,
                loadingI,
              }}
            />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Inventario;
