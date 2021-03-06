import React from "react";
import "./App.scss";
import { Route, useLocation } from "react-router-dom";
import { Landing, Modal } from "./components";
import Home from "./components/Home/Home";

function App() {
  const location = useLocation();

  return (
    <div
      className="App"
      style={{ overflow: location.pathname === "/" ? "auto" : "hidden" }}
    >
      <Modal />
      <Route path="/" exact render={() => <Landing />} />
      <Route path="/home" exact render={() => <Home />} />
    </div>
  );
}

export default App;
