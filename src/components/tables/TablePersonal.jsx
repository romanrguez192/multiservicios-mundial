import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableServiciosAsignados from "./TableServiciosAsignados";
import { useUser } from "../../contexts/UserContext";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TablePersonal = ({ ...props }) => {
  const [personal, setPersonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getPersonal = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/empleados?rifSucursal=${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const personal = await response.json();

      setPersonal(personal);
      setLoading(false);
    };

    getPersonal();
  }, [user]);

  const columns = [
    {
      title: "Cédula",
      field: "cedEmpleado",
      type: "numeric",
      editable: "never",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
      editable: "never",
    },
    {
      title: "Apellido",
      field: "apellido",
      editable: "never",
    },
    {
      title: "Teléfono",
      field: "telefono",
      editable: "never",
    },
    {
      title: "Dirección",
      field: "direccion",
      editable: "never",
    },
    {
      title: "Cargo",
      field: "tipoEmpleado",
      lookup: {
        personal: "Personal",
        encargado: "Encargado",
      },
      editable: user.tipoEmpleado === "dueño" ? "always" : "never",
    },
  ];

  if (user.tipoEmpleado !== "personal") {
    columns.splice(5, 0, {
      title: "Sueldo (Bs.S)",
      field: "sueldo",
      editable: "always",
      type: "numeric",
      emptyValue: "No asignado",
    });
  }

  const update = async (newData, oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/empleados/${oldData.cedEmpleado}`;

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

    const empleado = await response.json();

    const updatedData = [...personal];
    const index = oldData.tableData.id;
    updatedData[index] = empleado;

    setPersonal(updatedData);
  };

  return (
    <div>
      <Table
        title="Personal"
        columns={columns}
        data={personal}
        isLoading={loading}
        editable={
          user.tipoEmpleado !== "personal" && {
            isEditHidden: (rowData) => rowData.cedEmpleado === user.cedEmpleado,
            onRowUpdate: update,
            // TODO: Se podrían borrar alguna vez? Para pensar luego
          }
        }
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableServiciosAsignados cedEmpleado={rowData.cedEmpleado} />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TablePersonal;
