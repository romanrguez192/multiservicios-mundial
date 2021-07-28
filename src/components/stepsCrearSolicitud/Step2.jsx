import React, { useState } from "react";
import TableVehiculosCliente from "../tables/TableVehiculosCliente";
import { makeStyles } from "@material-ui/core";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Step2 = ({ vehiculo, setVehiculo, cliente, setServicios }) => {
  const classes = useStyles();

  const handleClick = (evt, selectedRow) => {
    // Se reinician los pasos siguientes
    setServicios([]);
    // TODO: Reinciar datos finales

    if (vehiculo && vehiculo.codVehiculo === selectedRow.codVehiculo) {
      return setVehiculo(null);
    }
    setVehiculo(selectedRow);
  };

  return (
    <div className={classes.tableContainer}>
      <TableVehiculosCliente
        title="Seleccionar Vehículo"
        onRowClick={handleClick}
        cedCliente={cliente.cedCliente}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              vehiculo && vehiculo.codVehiculo === rowData.codVehiculo
                ? "#9E9E9E50"
                : "#FFF",
          }),
          emptyRowsWhenPaging: true,
          pageSizeOptions: [5],
          actionsColumnIndex: -1,
          headerStyle: {
            backgroundColor: "#199479",
            color: "#fff",
            fontFamily: "quicksand",
          },
        }}
      />
    </div>
  );
};

export default Step2;
