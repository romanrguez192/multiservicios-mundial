import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';
import TablePersonal from "../components/TablePersonal";
import Nature from "../components/Nature";
import PageTitle from "../components/PageTitle";

// ESTILOS
const useStyles = makeStyles({
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  containerPersonal:{
    flexGrow: '1',
    marginTop: '60pt',
  },
  root: {
    display: 'flex',
  },
  tableContainer: {
    width: '80vw',
    margin: 'auto',
  },
});


const Personal = () => {
    const classes = useStyles();



  return (
    <>
      <div className={classes.root}>
        <Sidebar page="personal"/>
        <main className={classes.containerPersonal}>
          <PageTitle title="Personal"/>
          <div className={classes.tableContainer}>
            <TablePersonal />
          </div>
          <Nature />
        </main>
      </div>
    </>
  );
};

export default Personal;
