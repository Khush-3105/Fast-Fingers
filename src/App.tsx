import Home from "./components/Home.tsx";
import "./styles/App.css";
import Game from "./components/Game.tsx";
import { MemoryRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />{" "}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MemoryRouter>
  );
}

export default App;
