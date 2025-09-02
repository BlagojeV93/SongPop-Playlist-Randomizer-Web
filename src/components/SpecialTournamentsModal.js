import React from "react";
import tournamentPicDark from "../assets/cup-dark.png";
import backDarkPic from "../assets/back-dark.png";

const SpecialTournamentsModal = ({ onChooseOption, tournamentTitles }) => {

  return (
    <div className="mainModalCont">
      <p className="modalTitleText">
        You can select one of the active monthly tournaments below and randomize
        playlists for that special event!
      </p>
      {tournamentTitles.map((title, i) => {
        if (i > 0) {
          const last = i === tournamentTitles.length - 1;
          return (
            <button
              onClick={() => onChooseOption(i)}
              key={i}
              className="tournamentOptionCont"
              style={{ borderBottomWidth: last ? 2 : 0 }}
            >
              <img alt="" src={tournamentPicDark} className="btnImage" />
              <p className="tournamentOptionText">{title}</p>
            </button>
          );
        }
        return <></>;
      })}
      <button
        onClick={() => onChooseOption(0)}
        className="tournamentOptionCont backToRegularBtn"
      >
        <img alt="" src={backDarkPic} className="btnImage" />
        <p className="tournamentOptionText">REGULAR LISTS</p>
      </button>
    </div>
  );
};

export default SpecialTournamentsModal;
