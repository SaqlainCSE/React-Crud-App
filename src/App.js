import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Route, Switch } from "react-router-dom";
import "./App.css";

import PlayerList from './components/PlayerList';
import AddPlayer from './components/AddPlayer';
import Player from './components/Player';

function App() {
  return (
    <div>

      <nav className="navbar navbar-expand navbar-dark bg-dark">

        <a href="/players" className="navbar-brand">
          React Crud App
        </a>

        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/players"} className="nav-link">
              Players
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>

      </nav>

      <div className="container mt-3">

        <Switch>
            <Route exact path={["/", "/players"]}  component={PlayerList} />
            <Route exact path="/add" component={AddPlayer} />
            <Route path="/players/:id" component={Player} />
        </Switch>

      </div>

    </div>
  );
}

export default App;
