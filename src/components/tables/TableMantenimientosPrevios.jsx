import React, { useEffect, useState } from "react";
import Table from "./Table";
import { makeStyles } from "@material-ui/core";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: "quicksand",
  },
  table: {
    marginBottom: "20pt",
    width: "820pt",
  },
});

export default function TableMantenimientosPrevios({ codVehiculo, ...props }) {
  const classes = useStyles();
  const [mantenimientos, setMantenimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Fecha",
      field: "fechaMant",
      type: "date",
    },
    {
      title: "Descripción",
      field: "descripcion",
    },
  ];

  useEffect(() => {
    const getMantenimientos = async () => {
      console.log(codVehiculo);
      const url = `http://localhost:4000/api/mantenimientosPrevios/${codVehiculo}`;

      const response = await fetch(url);

      if (!response.ok) {
        //TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const mantenimientos = await response.json();

      setMantenimientos(mantenimientos);
      setLoading(false);
    };

    getMantenimientos();
  }, [codVehiculo]);

  const addMantenimiento = async (data) => {
    const url = `http://localhost:4000/api/mantenimientosPrevios`;
    data.codVehiculo = codVehiculo;

    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const mantenimiento = await response.json();

    setMantenimientos([...mantenimientos, mantenimiento]);
  };

  const updateMantenimiento = async (newData, oldData) => {
    const url = `http://localhost:4000/api/mantenimientosPrevios/${codVehiculo}?fechaMant=${oldData.fechaMant}`;

    newData.codVehiculo = codVehiculo;

    const response = await fetch(url, {
      method: "PUT",
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const mantenimiento = await response.json();

    const updatedData = [...mantenimientos];
    const index = oldData.tableData.id;
    updatedData[index] = mantenimiento;

    setMantenimientos(updatedData);
  };

  const deleteMantenimiento = async (oldData) => {
    const url = `http://localhost:4000/api/mantenimientosPrevios/${codVehiculo}?fechaMant=${oldData.fechaMant}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...mantenimientos];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setMantenimientos(dataDelete);
  };

  return (
    <div className={classes.table}>
      <Slide top collapse>
        <Table
          title="Mantenimientos Previos a M&M"
          subTable
          triTable
          columns={columns}
          data={mantenimientos}
          editable={{
            onRowAdd: addMantenimiento,
            onRowUpdate: updateMantenimiento,
            onRowDelete: deleteMantenimiento,
          }}
          isLoading={loading}
          {...props}
        />
      </Slide>
    </div>
  );
}
