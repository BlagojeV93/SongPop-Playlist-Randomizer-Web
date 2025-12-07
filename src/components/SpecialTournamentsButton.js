import React from "react";
import tournamentPic from "../assets/images/cup.png";
import "../styles/SpecialTournamentsButton.css";

const SpecialTournamentsButton = ({ onClick, title }) => {
  return (
    <button onClick={onClick} className="specialTournamentsCont">
      <img alt="" src={tournamentPic} className="btnImage" />
      <p className="specialTournamentsTitle">{title}</p>
      <img alt="" src={tournamentPic} className="btnImage" />
    </button>
  );
};

export default SpecialTournamentsButton;

