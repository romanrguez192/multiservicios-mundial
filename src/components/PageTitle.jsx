import React from "react";
import { Typography, makeStyles } from "@material-ui/core";
import Background from "../img/titleBackground.svg";

// ESTILOS
const useStyles = makeStyles({
  title: {
    fontFamily: 'Quicksand',
    fontStyle: 'normal',
    fontSize: '60pt',
    fontWeight: 'bold',
    lineHeight: '64px',
    color: '#199479',
    margin: 'auto',
    textAlign: 'center',
    marginTop: '20pt',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundImage: `url(${Background})`,
    backgroundAttachment: 'fixed',
    textDecoration: 'underline',
    height: '50pt',
    justifyContent: 'center',
  },
});

// Componente de input
const PageTitle = (props) => {
  const classes = useStyles();

  return (
    <Typography className={classes.title}>
        {props.title}
    </Typography>
  );
};

export default PageTitle;
