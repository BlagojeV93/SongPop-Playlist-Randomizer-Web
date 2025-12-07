import React from "react";
import NumberSelector from "./NumberSelector";
import CustomNumberInput from "./CustomNumberInput";
import SpecialTournamentsButton from "./SpecialTournamentsButton";
import "../styles/App.css";
import "../styles/NumberSelector.css";

const MainScreen = ({
  allPlaylists,
  chosenListsOrdinal,
  listsToShow,
  numberToRandomize,
  customEntry,
  onNumberSelect,
  onInputChange,
  onCustomToggle,
  onBackFromCustom,
  onSpecialTournamentsClick,
  onRandomize,
  showSeeLastAdded,
  onSeeLatestClick,
}) => {
  const isDisabled = customEntry && numberToRandomize === 0;
  const options = [50, 60, 75, 90, 100, 150];
  const disabledOptions = options.filter((opt) => opt > listsToShow.length);
  const topListsTitle =
    chosenListsOrdinal === 0
      ? "Click here for monthly tournaments!"
      : "Change playlists";

  return (
    <div className="mainInner">
      <div className="innerTop">
        <div className="numberofListsCont">
          {allPlaylists.length > 1 && (
            <SpecialTournamentsButton
              onClick={onSpecialTournamentsClick}
              title={topListsTitle}
            />
          )}
          <p className="numberofListsText">
            Total of {listsToShow.length} lists loaded
          </p>
        </div>
        {customEntry ? (
          <CustomNumberInput
            onInputChange={onInputChange}
            onBack={onBackFromCustom}
          />
        ) : (
          <>
            <p className="chooseAmountText">
              Choose the number of playlists to randomize
            </p>
            <NumberSelector
              options={options}
              selectedValue={numberToRandomize}
              onSelect={onNumberSelect}
              disabledOptions={disabledOptions}
            />
            <div className="customNumberButtonCont">
              <button
                onClick={() => {
                  onNumberSelect(0);
                  onCustomToggle(true);
                }}
                className="customNumberButton"
              >
                <p className="enterCustomNuberText">
                  Enter custom number of lists
                </p>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="innerBottom">
        <button
          disabled={isDisabled}
          onClick={onRandomize}
          className="randomizeBtn"
        >
          <p className="optionNumberText">RANDOMIZE</p>
        </button>
        {showSeeLastAdded && (
          <button onClick={onSeeLatestClick} className="seeLatestListsBtn">
            <p className="seeLatestListsText">LATEST ADDED LISTS</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default MainScreen;

