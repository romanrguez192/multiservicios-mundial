import React from "react";
import  { 
  makeStyles, 
}from '@material-ui/core';
import Sidebar from '../components/Sidebar';


{/* ESTILOS */}
const useStyles = makeStyles({
  divFlex: {
    display: 'inline-flex',
    marginBottom: '10pt',
  },
  containerInicio:{
    flexGrow: '1',
    marginTop: '45pt',
  },
  root: {
    display: 'flex',
  }
});


const InicioSesion = () => {
    const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <Sidebar page="inicio"/>
        <main className={classes.containerInicio}>
          <div>
            HOLA
          </div>
        </main>
      </div>
    </>
  );
};

export default InicioSesion;
