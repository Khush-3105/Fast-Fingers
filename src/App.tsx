import { useState } from "react";
import "./App.css";
import { Home } from "./components/home/Home.tsx";
import Game from "./components/game/Game.tsx";

function App() {
  const [gameDetails, setgameDetails] = useState({ name: "", difficulty: "" });
  return (
    <>
      {!gameDetails.name ? (
        <Home setgameDetails={setgameDetails} />
      ) : (
        <Game gameDetails={gameDetails} setgameDetails={setgameDetails} />
      )}
    </>
  );
}

export default App;
