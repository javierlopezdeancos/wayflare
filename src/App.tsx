import ButtonFetch from "./components/Buttons/ButtonFetch.component";

import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Go Go Go
          <span role="img" aria-label="rocket emoji">
            🚀
          </span>
        </h1>
      </header>
      <main>
        <ButtonFetch
          label="Launch Rocket"
          labelInProgress="Launching"
          url="https://httpbin.org/delay/6"
          timeout={5}
        />
      </main>
    </div>
  );
}
