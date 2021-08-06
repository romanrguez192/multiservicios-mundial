import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableDetallesSolicitud from "./TableDetallesSolicitud";
import { TableContainer } from "@material-ui/core";

const TableServiciosSolicitud = ({ nroSolicitud, ...props }) => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    {
      title: "Código",
      field: "codServicio",
      type: "numeric",
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
        return console.log("Oh no");
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
        title="Servicios"
        columns={columns}
        data={servicios}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <TableContainer>
              <TableDetallesSolicitud
                nroSolicitud={rowData.nroSolicitud}
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
