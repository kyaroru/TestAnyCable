import logo from "./logo.svg";
import "./App.css";
import CableService from "./cable";
import { useEffect, useState } from "react";

let mycable = null;

function App() {
  const [connected, setConnected] = useState(false);
  useEffect(() => {
    const url = "wss://ws-demo-app-anycable.herokuapp.com/cable";
    mycable = new CableService(url, setConnected);

    return () => {
      // Similar to componentWillUnmount()
      mycable.disconnect();
    };
  }, []); // use [] so it only run once
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>AnyCable connected: {connected ? "true" : "false"}</p>
        <button
          disabled={!connected}
          onClick={(e) => {
            e.preventDefault();
            if (mycable) {
              mycable.sendToken("hello123456abc");
            }
          }}
        >
          Send Token
        </button>
      </header>
    </div>
  );
}

export default App;
