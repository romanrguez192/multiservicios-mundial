import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import Table from "../components/Table";
import { useUser } from "../contexts/UserContext";

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
          <div className={classes.tableContainer}>
            <Table title="Tienda" />
          </div>
          <h1>{JSON.stringify(user)}</h1>
        </main>
      </div>
    </>
  );
};

export default Tienda;
