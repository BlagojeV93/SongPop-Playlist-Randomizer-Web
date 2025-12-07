import React from "react";
import tournamentPicDark from "../assets/images/cup-dark.png";
import backDarkPic from "../assets/images/back-dark.png";
import "../styles/Modal.css";

const SpecialTournamentsModal = ({ allPlaylists, onSelect }) => {
  const titles = allPlaylists.map((e) => e.title);

  return (
    <div className="mainModalCont">
      <p className="modalTitleText">
        You can select one of the active monthly tournaments below and
        randomize playlists for that special event!
      </p>
      {titles.map((title, i) => {
        if (i > 0) {
          const last = i === titles.length - 1;
          return (
            <button
              onClick={() => onSelect(i)}
              key={i}
              className="tournamentOptionCont"
              style={{ borderBottomWidth: last ? 2 : 0 }}
            >
              <img alt="" src={tournamentPicDark} className="btnImage" />
              <p className="tournamentOptionText">{title}</p>
            </button>
          );
        }
        return <React.Fragment key={i}></React.Fragment>;
      })}
      <button
        onClick={() => onSelect(0)}
        className="tournamentOptionCont backToRegularBtn"
      >
        <img alt="" src={backDarkPic} className="btnImage" />
        <p className="tournamentOptionText">REGULAR LISTS</p>
      </button>
    </div>
  );
};

export default SpecialTournamentsModal;

