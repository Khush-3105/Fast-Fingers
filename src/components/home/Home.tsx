import { Dispatch, FC, SetStateAction, useState } from "react";
import "./Home.css";
import LogoImg from "../../assets/logo1.png";

interface HomeProps {
  setgameDetails: Dispatch<
    SetStateAction<{ name: string; difficulty: string }>
  >;
}
export const Home: FC<HomeProps> = ({ setgameDetails }) => {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("1");

  function handleGameStart() {
    if (!name) {
      alert("Please enter your name.");
    } else {
      setgameDetails({ name: name, difficulty: difficulty });
    }
  }

  return (
    <>
      <div className="home">
        <img src={LogoImg} height="100px" alt="logo" />
        <h1>Fast Fingers</h1>
        <input
          className="home__input"
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="home__select"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="1">Easy Level</option>
          <option value="2">Medium Level</option>
          <option value="3">Hard Level</option>
        </select>
        <button className="home__button" onClick={handleGameStart}>
          Start Game
        </button>
      </div>
    </>
  );
};
