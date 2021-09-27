import React, { useState, useEffect } from "react";
import Table from "./Table";
import TableHistorialVehiculo from "./TableHistorialVehiculo";
import { useUser } from "../../contexts/UserContext";
import TableMantenimientosPrevios from "./TableMantenimientosPrevios";
import { TableContainer } from "@material-ui/core";
import { useSnackbar } from "notistack";

const TableVehiculos = ({ modelos, ...props }) => {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const getVehiculos = async () => {
      const url = "https://multiservicios-mundial.herokuapp.com/api/vehiculos";

      const response = await fetch(url);

      if (!response.ok) {
        // TODO: Error
        return enqueueSnackbar("Se ha producido un error", {
          variant: "error",
        });
      }

      const vehiculos = await response.json();

      setVehiculos(vehiculos);
      setLoading(false);
    };

    getVehiculos();
  }, []);

  const columns = [
    {
      title: "Código de Vehículo",
      field: "codVehiculo",
      type: "numeric",
    },
    {
      title: "Placa",
      field: "placa",
    },
    {
      title: "Cédula del cliente",
      field: "cedCliente",
      type: "numeric",
      align: "left",
    },
    {
      title: "Nombre del cliente",
      field: "nombreCliente",
    },
    {
      title: "Marca",
      field: "marca",
    },
    {
      title: "Modelo",
      field: "modelo",
    },
    {
      title: "Fecha de adquisición",
      field: "fechaAdquisicion",
      type: "date",
    },
    {
      title: "Fecha de registro",
      field: "fechaRegistro",
      type: "date",
    },
    {
      title: "Nombre del Mecánico",
      field: "nombreMecanico",
    },
    {
      title: "Teléfono del Mecánico",
      field: "tlfMecanico",
    },
  ];

  return (
    <div>
      <Table
        title={`Vehículos de ${user.nombreSucursal}`}
        columns={columns}
        data={vehiculos}
        isLoading={loading}
        detailPanel={(rowData) => {
          return (
            <>
              <TableContainer>
                <TableHistorialVehiculo codVehiculo={rowData.codVehiculo} />
                <TableMantenimientosPrevios codVehiculo={rowData.codVehiculo} />
              </TableContainer>
            </>
          );
        }}
        {...props}
      />
    </div>
  );
};

export default TableVehiculos;
