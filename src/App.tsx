import { useState } from "react";
import "./App.css";
import { Home } from "./components/home/Home.tsx";
import Game from "./components/Game.tsx";

function App() {
  const [gameDetails, setgameDetails] = useState({ name: "", difficulty: "1" });
  return <Home setgameDetails={setgameDetails}/>;
}

export default App;
