import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import PokeApp from "./components/PokeApp";

function App() {
  return (
    <div className="App">
      <PokeApp />
    </div>
  );
}

export default App;
