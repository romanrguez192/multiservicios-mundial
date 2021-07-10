import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import InicioSesion from "./pages/InicioSesion";
import RegistroUsuario from "./pages/RegistroUsuario";
import Facturas from "./pages/Facturas";
import Servicios from "./pages/Servicios";
import Clientes from "./pages/Clientes";
import Vehiculos from "./pages/Vehiculos";
import Reservaciones from "./pages/Reservaciones";
import Personal from "./pages/Personal";
import Inventario from "./pages/Inventario";
import Sucursales from "./pages/Sucursales";
import Tienda from "./pages/Tienda";
import Proveedores from "./pages/Proveedores";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

const theme = createMuiTheme({


  palette: {
    //Verde
    primary: {
      main: "#199479",
    },
    //Amarillo
    secondary: {
      main: "#FFBB56",
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Inicio />
              </Route>
              <Route exact path="/facturas">
                <Facturas />
              </Route>
              <Route exact path="/servicios">
                <Servicios />
              </Route>
              <Route exact path="/clientes">
                <Clientes />
              </Route>
              <Route exact path="/vehiculos">
                <Vehiculos />
              </Route>
              <Route exact path="/reservaciones">
                <Reservaciones />
              </Route>
              <Route exact path="/personal">
                <Personal />
              </Route>
              <Route exact path="/inventario">
                <Inventario />
              </Route>
              <Route exact path="/sucursales">
                <Sucursales />
              </Route>
              <Route exact path="/tienda">
                <Tienda />
              </Route>
              <Route exact path="/proveedores">
                <Proveedores />
              </Route>
              <Route path="/login">
                <InicioSesion />
              </Route>
              <Route path="/signup">
                <RegistroUsuario />
              </Route>
            </Switch>
          </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
