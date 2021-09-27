import React, { useState, useEffect } from "react";
import Table from "./Table";
import { useUser } from "../../contexts/UserContext";
import Slide from "react-reveal/Slide";
import { useSnackbar } from "notistack";

const TableServiciosAsignados = ({ cedEmpleado, ...props }) => {
  const [serviciosAsignados, setServiciosAsignados] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  const lookupServicio = {};
  if (servicios) {
    servicios.forEach((s) => {
      lookupServicio[s.codServicio] = `${s.codServicio} - ${s.nombreServicio}`;
    });
  }

  useEffect(() => {
    const getServicios = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/serviciosOfrecidos/${user.rifSucursal}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const servicios = await response.json();

      setServicios(servicios);
    };

    getServicios();
  }, [user]);

  useEffect(() => {
    const getServiciosAsignados = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/serviciosAsignados/${cedEmpleado}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const serviciosAsignados = await response.json();

      setServiciosAsignados(serviciosAsignados);
      setLoading(false);
    };

    getServiciosAsignados();
  }, [cedEmpleado]);

  const columns = [
    {
      title: "Servicio",
      field: "codServicio",
      editable: "onAdd",
      type: "numeric",
      align: "left",
      lookup: lookupServicio,
    },
    {
      title: "¿Es coordinador?",
      field: "esCoordinador",
      editable: "never",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
  ];

  const addServicioAsignado = async (data) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/serviciosAsignados/${cedEmpleado}`;

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

    const servicioAsignado = await response.json();

    setServiciosAsignados([...serviciosAsignados, servicioAsignado]);
  };

  const deleteServicioAsignado = async (oldData) => {
    const url = `https://multiservicios-mundial.herokuapp.com/api/serviciosAsignados/${oldData.cedEmpleado}/${oldData.codServicio}`;

    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      // TODO: Error
      return enqueueSnackbar("Se ha producido un error", {
        variant: "error",
      });
    }

    const dataDelete = [...serviciosAsignados];
    const index = oldData.tableData.id;
    dataDelete.splice(index, 1);

    setServiciosAsignados(dataDelete);
  };

  return (
    <Slide top collapse>
      <Table
        title="Servicios Asignados"
        columns={columns}
        data={serviciosAsignados}
        isLoading={loading}
        subTable
        editable={{
          isDeleteHidden: (rowData) => rowData.esCoordinador === true,
          onRowAdd: addServicioAsignado,
          onRowDelete: deleteServicioAsignado,
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableServiciosAsignados;
