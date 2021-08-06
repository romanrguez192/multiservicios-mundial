import React, { useState } from "react";
import Input from "./Input";
import Autocomplete from '@material-ui/lab/Autocomplete';

// Componente de input
const SelectPago = ({ setTipoPago, setMoneda, ...props }) => {

  const tiposPago = [
    { title: 'Efectivo' },
    { title: 'Tarjeta de crédito' },
    { title: 'Tarjeta de débito' },
    { title: 'Transferencia' },
  ];

  const tipoMoneda = [
    { title: 'Bolívar' },
    { title: 'Divisa' },
  ];

  const handleChange = (event, value) => {
    value 
    ? 
    (props.name === "tipoPago") ? setTipoPago(value.title) : setMoneda(value.title)
    :
    (props.name === "tipoPago") ? setTipoPago(null) : setMoneda(null)
  };

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={props.name === "tipoPago" ? tiposPago : tipoMoneda}
        onChange={handleChange}
        getOptionLabel={(option) => option.title}
        style={{ width: 300, margin: "auto" }}
        renderInput={(params) => <Input {...params} label={props.title} />}
      />
    </>
  );
};

export default SelectPago;
