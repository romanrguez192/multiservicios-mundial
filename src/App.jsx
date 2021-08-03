import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import SolicitudesServicios from "./pages/SolicitudesServicios";
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
import CrearSolicitud from "./pages/CrearSolicitud";
import Compra from "./pages/Compra";
import Inicio from "./pages/Inicio";
import {
  unstable_createMuiStrictModeTheme as createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { UserProvider } from "./contexts/UserContext";
import Route from "./components/Route";

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
        <UserProvider>
          <Router>
            <Switch>
              <Route exact path="/" auth>
                <Inicio />
              </Route>
              <Route exact path="/solicitudes" auth>
                <SolicitudesServicios />
              </Route>
              <Route exact path="/solicitudes/crear" auth>
                <CrearSolicitud />
              </Route>
              <Route exact path="/facturas" auth>
                <Facturas />
              </Route>
              <Route exact path="/servicios" auth>
                <Servicios />
              </Route>
              <Route exact path="/clientes" auth>
                <Clientes />
              </Route>
              <Route exact path="/vehiculos" auth>
                <Vehiculos />
              </Route>
              <Route exact path="/reservaciones" auth>
                <Reservaciones />
              </Route>
              <Route exact path="/personal" auth>
                <Personal />
              </Route>
              <Route exact path="/inventario" auth>
                <Inventario />
              </Route>
              <Route exact path="/sucursales" auth>
                <Sucursales />
              </Route>
              <Route exact path="/tienda" auth>
                <Tienda />
              </Route>
              <Route exact path="/tienda/compra" auth>
                <Compra />
              </Route>
              <Route exact path="/proveedores" auth>
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
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
