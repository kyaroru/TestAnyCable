import logo from "./logo.svg";
import "./App.css";
import CableService from "./cable";
import { useEffect } from "react";

function App() {
  let cable = null;
  useEffect(() => {
    const url = "wss://ws-demo-app-anycable.herokuapp.com/cable";
    cable = new CableService(url);

    return () => {
      // Similar to componentWillUnmount()
      cable.disconnect();
    };
  }, []); // use [] so it only run once
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
