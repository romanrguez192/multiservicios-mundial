import React, { useState } from "react";
import { makeStyles, Button } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import TableSucursales from "../components/tables/TableSucursales";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import { useUser } from "../contexts/UserContext";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerSucursales: {
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
  ir: {
    margin: "auto",
    width: "250px",
    paddingTop: "10pt",
    paddingBottom: "30pt",
  },
});

const Sucursales = () => {
  const classes = useStyles();
  const user = useUser();
  const [sucursal, setSucursal] = useState(user.rifSucursal);
  const { enqueueSnackbar } = useSnackbar();
  const [submitting, setSubmitting] = useState(false);

  const changeSucursal = async () => {
    setSubmitting(true);

    const data = {
      rifSucursal: sucursal,
    };

    const url = "https://multiservicios-mundial.herokuapp.com/api/empleados/dueno";

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      setSubmitting(false);
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    window.location.href = "/";
  };

  return (
    <div className={classes.root}>
      <Sidebar page="sucursales" />
      <main className={classes.containerSucursales}>
        <PageTitle title="Sucursales" />
        <div className={classes.tableContainer}>
          <TableSucursales sucursal={sucursal} setSucursal={setSucursal} />
        </div>
        <div className={classes.ir}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={changeSucursal}
            disabled={!sucursal || submitting}
          >
            Ir a la sucursal
          </Button>
        </div>

        <Nature />
      </main>
    </div>
  );
};

export default Sucursales;
