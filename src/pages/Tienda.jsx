import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Table from "../components/tables/Table";
import { useUser } from "../contexts/UserContext";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";
import TableCompras from "../components/tables/TableCompras";

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

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="tienda" />
        <main className={classes.containerTienda}>
          <PageTitle title="Tienda" />
          <div className={classes.tableContainer}>
            <TableCompras />
          </div>
          <Nature/>
        </main>
      </div>
    </>
  );
};

export default Tienda;
