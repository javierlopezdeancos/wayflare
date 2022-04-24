import ButtonFetch from "./components/Buttons/ButtonFetch.component";

import "./styles.css";

const buttonFetchLabels = {
  default: {
    button: "Launch Rocket",
    tooltip: "Ignites the fuel",
  },
  inProgress: {
    button: "Launching",
    tooltip: "Cancel launch",
  },
  error: {
    button: "Launch Rocket",
    tooltip: "Ignition error",
  }
};

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
          labels={buttonFetchLabels}
          url="https://httpbin.org/delay/6"
          maxDuration={5}
        />
      </main>
    </div>
  );
}
