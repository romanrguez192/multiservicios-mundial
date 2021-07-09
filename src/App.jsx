import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import InicioSesion from "./pages/InicioSesion";
import RegistroUsuario from "./pages/RegistroUsuario";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Inicio />
          </Route>
          <Route path="/login">
            <InicioSesion />
          </Route>
          <Route path="/signup">
            <RegistroUsuario />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
