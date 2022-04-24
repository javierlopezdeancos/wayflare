import ButtonFetch from "./components/Buttons/ButtonFetch.component";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Flying to the moon...
          <span role="img" aria-label="rocket emoji">
            🚀
          </span>
        </h1>
      </header>
      <main>
        <ButtonFetch
          label="Launch Rocket"
          labelInfo="Ignites the fuel"
          labelInProgress="Launching"
          labelInfoInProgress="Cancel launch"
          labelError="Launch Rocket"
          labelInfoError="Ignition error"
          url="https://httpbin.org/delay/6"
          maxDuration={5}
        />
      </main>
    </div>
  );
}
