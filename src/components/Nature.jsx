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
});

const Nature = (props) => {
  const classes = useStyles();
  const CarouselUI = ({ children }) => <div className={classes.carrusel}>{children}</div>;
  const Carousel = makeCarousel(CarouselUI);
  

  return (
    <Carousel defaultWait={7000}>
      <Fade>
        <div>
          <img src={Nature3} />
          <h2>Estamos comprometidos con el medio ambiente y con tu vehículo</h2>
        </div>
      </Fade>
      <Fade>
        <div>
          <img src={Nature1} />
          <h2>Trata el ambiente igual de bien que a tu vehículo</h2>
        </div>
      </Fade>
      <Fade>
        <div>
          <img src={Nature2} />
          <h2>¿Sabías que los productos ecológicos no utilizan ningún producto químico?</h2>
        </div>
      </Fade>
      <Fade>
        <div>
          <img src={Nature4} />
          <h2>La tierra no es una herencia de nuestros padres, sino un préstamo de nuestros hijos</h2>
        </div>
      </Fade>
      <Fade>
        <div>
          <img src={Nature5} />
          <h2>Si pudiéramos ver el milagro de una sola flor claramente, nuestra vida entera cambiaría</h2>
        </div>
      </Fade>
      <Fade>
        <div>
          <img src={Nature6} />
          <h2>Recuerda siempre que la naturaleza nunca ha traicionado a quién la ha amado</h2>
        </div>
      </Fade>
    </Carousel>
  );
};

export default Nature;
