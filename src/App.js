import React, { useState } from "react";
import Modal from "react-modal";
import LoadingScreen from "./components/LoadingScreen";
import MainScreen from "./components/MainScreen";
import RandomizedListsView from "./components/RandomizedListsView";
import LatestListsModal from "./components/LatestListsModal";
import SpecialTournamentsModal from "./components/SpecialTournamentsModal";
import { usePlaylists } from "./hooks/usePlaylists";

import "./styles/App.css";
import { customModalStyle } from "./styles/modalStyle";

const options = [50, 60, 75, 90, 100, 150];

Modal.setAppElement(document.getElementById("root"));

function App() {
  const { allPlaylists, isLoading } = usePlaylists();
  const [randomizedPlaylists, choosePlaylists] = useState([]);
  const [numberToRandomize, setNumber] = useState(options[0]);
  const [chosenListsOrdinal, setBool] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(null);
  const [customEntry, setCustom] = useState(false);

  const lastAdded = allPlaylists[0]?.lists
    .slice(allPlaylists[0]?.lists.length - 10, allPlaylists[0]?.lists.length)
    .reverse();
  const listsToShow =
    allPlaylists.length > 0 ? allPlaylists[chosenListsOrdinal].lists : [];
  const showSeeLastAdded =
    chosenListsOrdinal === 0 && !randomizedPlaylists.length && !isLoading;

  const randomizeLists = () => {
    let stateArr = [];
    do {
      let val =
        listsToShow[Math.floor(Math.random() * listsToShow.length)].trim();
      if (stateArr.indexOf(val) === -1) {
        stateArr.push(val);
      }
    } while (stateArr.length < numberToRandomize);
    stateArr = stateArr.map((val, i) => (val = i + 1 + ". " + val));
    choosePlaylists(stateArr);
  };

  const handleInputEntry = (val) => {
    if (!/^\d+$/.test(val)) {
      setNumber(0);
    } else {
      if (val > 1000) {
        setNumber(1000);
      } else {
        val = val > listsToShow.length ? listsToShow.length : val;
        setNumber(parseInt(val));
      }
    }
  };

  const handleRandomizeAgain = () => {
    choosePlaylists([]);
    setNumber(options[0]);
    setCustom(false);
  };

  const onModalOptionClick = (i) => {
    setBool(i);
    setIsOpen(null);
    setNumber(options[0]);
  };

  const renderMainContent = () => {
    if (isLoading) {
      return <LoadingScreen />;
    }

    if (randomizedPlaylists.length > 0) {
      return (
        <RandomizedListsView
          playlists={randomizedPlaylists}
          onRandomizeAgain={handleRandomizeAgain}
        />
      );
    }

    return (
      <MainScreen
        allPlaylists={allPlaylists}
        chosenListsOrdinal={chosenListsOrdinal}
        listsToShow={listsToShow}
        numberToRandomize={numberToRandomize}
        customEntry={customEntry}
        onNumberSelect={setNumber}
        onInputChange={handleInputEntry}
        onCustomToggle={setCustom}
        onBackFromCustom={() => setCustom(false)}
        onSpecialTournamentsClick={() => setIsOpen("special")}
        onRandomize={randomizeLists}
        showSeeLastAdded={showSeeLastAdded}
        onSeeLatestClick={() => setIsOpen("latest")}
      />
    );
  };

  const renderModalCont = () => {
    if (modalIsOpen === "latest") {
      return <LatestListsModal lastAdded={lastAdded} totalLists={listsToShow.length} />;
    } else if (modalIsOpen === "special") {
      return (
        <SpecialTournamentsModal
          allPlaylists={allPlaylists}
          onSelect={onModalOptionClick}
        />
      );
    }
    return null;
  };

  return (
    <div className="appMain">
      {renderMainContent()}
      <Modal
        isOpen={modalIsOpen !== null}
        onRequestClose={() => setIsOpen(null)}
        style={customModalStyle}
        closeTimeoutMS={700}
      >
        {renderModalCont()}
      </Modal>
    </div>
  );
}

export default App;
