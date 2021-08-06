import React, { useState, useEffect } from "react";
import TableClientes from "../tables/TableClientes";
import { makeStyles } from "@material-ui/core";

// Estilos
const useStyles = makeStyles({
  tableContainer: {
    width: "80vw",
    margin: "auto",
  },
});

const Step1Compra = ({
  cliente,
  setCliente,
  setLista
}) => {
  const classes = useStyles();
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClientes = async () => {
      const url = "http://localhost:4000/api/clientes";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return console.log("Oh no");
      }

      const clientes = await response.json();

      setClientes(clientes);
      setLoading(false);
    };

    getClientes();
  }, []);

  const handleClick = (evt, selectedRow) => {
    // Se reinician los pasos siguientes
    setLista([]);
    // TODO: Reinciar datos finales

    if (cliente && cliente.cedCliente === selectedRow.cedCliente) {
      return setCliente(null);
    }
    setCliente(selectedRow);
  };

  return (
    <div className={classes.tableContainer}>
      <TableClientes
        title="Seleccionar Cliente"
        data={clientes}
        isLoading={loading}
        onRowClick={handleClick}
        detailPanel={undefined}
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              cliente && cliente.cedCliente === rowData.cedCliente
                ? "#9E9E9E50"
                : "#FFF",
          }),
          emptyRowsWhenPaging: true,
          pageSizeOptions: [5, 10, 20],
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

export default Step1Compra;
