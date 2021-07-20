import React from "react";
import { makeStyles } from "@material-ui/core";
import makeCarousel from 'react-reveal/makeCarousel';
import Fade from 'react-reveal/Fade';
import Nature1 from '../img/nature1.svg';
import Nature2 from '../img/nature2.svg';
import Nature3 from '../img/nature3.svg';
import Nature4 from '../img/nature4.svg';
import Nature5 from '../img/nature5.svg';
import Nature6 from '../img/nature6.svg';
// ESTILOS
const useStyles = makeStyles({
  carrusel: {
    position: 'relative',
    overflow: 'hidden',
    height: '400px',
    width: '600px',
    margin: 'auto',
    textAlign: 'center',
    fontFamily: 'Quicksand',
    bottom: '0',
    color: '#199479'
  },
  contImage: {
    height: '300px',
    width: '309px',
    margin: 'auto',
  }
});

const Nature = (props) => {
  const classes = useStyles();
  const CarouselUI = ({ children }) => <div className={classes.carrusel}>{children}</div>;
  const Carousel = makeCarousel(CarouselUI);
  
  return (
    <Carousel defaultWait={7000}>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature3} />
        </div>
        <h2>Estamos comprometidos con el medio ambiente y con tu vehículo</h2>
      </Fade>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature1} />
        </div>
        <h2>Trata al ambiente igual de bien que a tu vehículo</h2>    
      </Fade>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature2} />
        </div>
        <h2>¿Sabías que los productos ecológicos no utilizan ningún producto químico?</h2>
      </Fade>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature4} />
        </div>
        <h2>La tierra no es una herencia de nuestros padres, sino un préstamo de nuestros hijos</h2>
      </Fade>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature5} />
        </div>
        <h2>Si pudiéramos ver el milagro de una sola flor claramente, nuestra vida entera cambiaría</h2>
      </Fade>
      <Fade>
        <div className={classes.contImage}>
          <img src={Nature6} />
        </div>
        <h2>Recuerda siempre que la naturaleza nunca ha traicionado a quién la ha amado</h2>
      </Fade>
    </Carousel>
  );
};

export default Nature;
