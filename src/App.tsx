import Button from "./components/Button";

import "./styles.css";

export default function App() {
  const launch = () => {
    console.log("launch");
  };

  return (
    <div className="App">
      <header>
        <h1>Wayflyer FE Engineer Take Home Test</h1>
      </header>
      <main>
        <Button label="Launch Rocket" onClick={launch} />
      </main>
    </div>
  );
}
