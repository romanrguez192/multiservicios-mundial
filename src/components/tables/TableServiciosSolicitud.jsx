import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableDetallesSolicitud from "./TableDetallesSolicitud";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableServiciosSolicitud = ({ nroSolicitud, ...props }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const columns = [
    {
      title: "Código",
      field: "codServicio",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre",
      field: "nombre",
    },
    {
      title: "Descripción",
      field: "descripcion",
    },
  ];

  useEffect(() => {
    const getServicios = async () => {
      const url = `http://localhost:4000/api/solicitudesServicio/${nroSolicitud}/servicios`;

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const servicios = await response.json();

      setServicios(servicios);
      setLoading(false);
    };

    getServicios();
  }, [nroSolicitud]);
  

  return (
    <div>
      <Table
        title="Servicios Contratados"
        columns={columns}
        data={servicios}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableDetallesSolicitud
                nroSolicitud={nroSolicitud}
                codServicio={rowData.codServicio}
              />
            </TableContainer>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableServiciosSolicitud;
