import React from "react";
import { makeStyles } from "@material-ui/core";
import Sidebar from "../components/Sidebar";
import PageTitle from "../components/PageTitle";
import Nature from "../components/Nature";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: "inline-flex",
    marginBottom: "10pt",
  },
  containerInicio: {
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

const Inicio = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inicio" />
        <main className={classes.containerInicio}>
          <PageTitle title={"Bienvenido a M&M"} />
          <div className={classes.tableContainer}>
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Inicio;
