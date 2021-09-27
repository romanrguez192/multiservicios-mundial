import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";
import TableOrdenServicio from "./TableOrdenServicio";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableDetallesSolicitud = ({ nroSolicitud, codServicio, ...props }) => {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getActividades = async () => {
      const url = `https://multiservicios-mundial.herokuapp.com/api/solicitudesServicio/${nroSolicitud}/servicios/${codServicio}`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const actividades = await response.json();

      setActividades(actividades);
      setLoading(false);
    };

    getActividades();
  }, [nroSolicitud, codServicio]);

  const columns = [
    {
      title: "Número",
      field: "nroActividad",
      align: "left",
      type: "numeric",
    },
    {
      title: "Descripción",
      field: "descripcion",
    },
    {
      title: "Precio (Bs.S)",
      field: "monto",
      type: "numeric",
      align: "left",
    },
    {
      title: "Ejecutada",
      field: "ejecutada",
      lookup: {
        true: "Sí",
        false: "No",
      },
    },
  ];

  return (
    <Slide top collapse>
      <Table
        title="Actividades"
        columns={columns}
        data={actividades}
        isLoading={loading}
        subTable
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableOrdenServicio
                nroSolicitud={nroSolicitud}
                codServicio={rowData.codServicio}
                nroActividad={rowData.nroActividad}
              />
            </TableContainer>
          );
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableDetallesSolicitud;
