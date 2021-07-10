import React, {useState} from 'react';
import MaterialTable from 'material-table-formik';
import  { 
  makeStyles, 
}from '@material-ui/core';
import {
    InfoOutlined,
    AddOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@material-ui/icons";

// ESTILOS
const useStyles = makeStyles({
  toolbar: {
    fontFamily: 'quicksand',

  }
});

export default function Tabla(props) {
  const classes = useStyles();

  const rows = [
    {id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    {id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    {id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    {id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    {id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 24 },
    {id: 6, lastName: 'Melisandre', firstName: 'Miguelanggelo', age: 150 },
    {id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    {id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    {id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const [data,setData] = useState(rows)

  const columns = [
    {
      title: 'ID',
      field: 'id',
      editable: false,
    },
    {
      title: 'Apellido',
      field: 'lastName',
    },
    {
      title: 'Nombre',
      field: 'firstName',
    },
    {
      title: 'Edad',
      field: 'age',
    },
  ];

  const TitleCliente = (
    <h1 className={classes.titleC}>
      {props.title}
    </h1>
  );

  return (
    <div>
      <MaterialTable
        selection={true}
        columns={columns}
        data={data}
        actions={[
          {
            icon: InfoOutlined,
            tooltip: "Información",
          },
        ]}
        title={TitleCliente}
        style={{fontFamily:'quicksand'}}
        editable={{
            onRowAdd:(newRow)=>new Promise((resolve,reject)=>{
                const updateRows=[...data,{id:Math.floor(Math.random()*100),...newRow}]
                setTimeout(()=>{
                  setData(updateRows)
                  resolve()
                },1000)
            }),
            onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setData(data.map((d) => (d.id === newData.id ? newData : d)));
              resolve();
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve();
              }, 1000);
            }),
        }}
        cellStyle={classes.iconoColorido}
        options={{
          actionsColumnIndex: -1,
          headerStyle: {backgroundColor: '#199479',color: '#fff', fontFamily:'quicksand'},
        }}
        localization={{ 
          deleteAction: "Borrar",
          deleteHeader: "Borrar",
          toolbar: { searchPlaceholder: 'Buscar' },
          header: {
            actions: "Acciones",
          },
          body: {
            addTooltip: "Añadir",
            editTooltip: "Editar",
            deleteTooltip: "Eliminar",
            editRow: {
              deleteText: "¿Estás seguro de querer eliminar esta información?",
              cancelTooltip: "Cancelar",
              saveTooltip: "Aceptar",
            },
          },
          pagination: {
            labelRowsSelect: "Filas",
            firstTooltip: "Ir al principio",
            nextTooltip: "Siguiente página",
            previousTooltip: "Página anterior",
            lastTooltip: "Ir al final",
          },
        }}
        icons={{
          Add: ()=> <AddOutlined />,
          Edit: ()=> <EditOutlined />,
        }}
      />
    </div>
  );
}