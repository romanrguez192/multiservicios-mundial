import React, { useState } from "react";
import Input from "./Input";
import Autocomplete from '@material-ui/lab/Autocomplete';

// Componente de input
const SelectPago = ({ setPago, ...props }) => {

  const tiposPago = [
    { title: 'Efectivo' },
    { title: 'Tarjeta de crédito' },
    { title: 'Tarjeta de débito' },
    { title: 'Transferencia' },
  ];

  const tipoMoneda = [
    { title: 'Bolívares' },
    { title: 'Dólares' },
  ];

  const handleChange = (value) => {
    setPago(value);
  };

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={props.title === "Tipo de Pago" ? tiposPago : tipoMoneda}
        getOptionLabel={(option) => option.title}
        style={{ width: 300, margin: "auto" }}
        renderInput={(params) => <Input {...params} label={props.title} />}
      />
    </>
  );
};

export default SelectPago;
