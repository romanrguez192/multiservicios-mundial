import 'date-fns';
import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  CalendarTodayOutlined,
  WatchLaterOutlined,
} from "@material-ui/icons";
import { makeStyles } from '@material-ui/core';
import { es } from "date-fns/locale";

  // ESTILOS
  const useStyles = makeStyles({
    divFlex: {
      display: "inline-flex",
      marginBottom: "10pt",
    },
    icono: {
      color: "#787878",
    },
    iconoColorido: {
      color: "#199479",
      transition: "color .5s",
    },
    separator: {
      marginLeft: '20pt',
      marginRight: '20pt',
    }
  });

export default function InputDate({ setFechaSalida, ...props }) {
    // The first commit of Material-UI
    const [selectedDate, setSelectedDate] = useState(null);
    const [fecha, setFecha] = useState(false);
    const [hora, setHora] = useState(false);
    const classes = useStyles();
  
    const handleDateChange = (date) => {
      setSelectedDate(date);
      setFechaSalida(date.toJSON());
    };

    const handleFecha = () => {
      setFecha(!fecha);
    };

    const handleHora = () => {
      setHora(!hora);
    };

    // Clase del icono a mostrar

    const iconClassFecha = fecha ? "iconoColorido" : "icono";

    const iconClassHora = hora ? "iconoColorido" : "icono";

    const iconsObject = {
      'date': <CalendarTodayOutlined className={classes[iconClassFecha]} />,
      'time': <WatchLaterOutlined className={classes[iconClassHora]} />,
    };
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
          <div className={classes.divFlex}>
            <KeyboardDatePicker
              onBlur={handleFecha}
              onFocus={handleFecha}
              margin="normal"
              okLabel="Ok"
              cancelLabel="Cancelar"
              keyboardIcon={iconsObject['date']}
              label="Fecha de Salida"
              format="yyyy/MM/dd"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'Cambiar la fecha',
              }}
            />
            <div className={classes.separator} /> 
            <KeyboardTimePicker
              margin="normal"
              okLabel="Ok"
              ampm={false}
              cancelLabel="Cancelar"
              onBlur={handleHora}
              onFocus={handleHora}
              keyboardIcon={iconsObject['time']}
              label="Hora de salida"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'Cambiar la hora',
              }}
            />
          </div>
      </MuiPickersUtilsProvider>
    );
  }