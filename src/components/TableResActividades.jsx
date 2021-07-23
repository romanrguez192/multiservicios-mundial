import React, { useState, useEffect } from "react";
import Table from "./Table";
import Slide from "react-reveal/Slide";

const TableResActividades = ({ codServicio, ...props }) => {

  const columns = [
    {
      title: "Actividad",
      field: "nroActividad",
      editable: "always",
      //lookup actividades
    },
    {
      title: "Descripción",
      field: "descripcion",
      editable: "never",
    },
    {
      title: "Precio (Bs.S)",
      field: "precio",
      type: "numeric",
      editable: "never",
    },
  ];

  const addActividad = async (data) => {
    
  };


  const deleteActividad = async (oldData) => {
    
  };

  return (
    <Slide top collapse>
      <Table
        title="Actividades"
        columns={columns}
        //data={actividades}
        //isLoading={loading}
        subTable
        editable={{
          onRowAdd: addActividad,
          onRowDelete: deleteActividad,
        }}
        {...props}
      />
    </Slide>
  );
};

export default TableResActividades;
