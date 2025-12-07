import React from "react";
import "../styles/CustomNumberInput.css";

const CustomNumberInput = ({ onInputChange, onBack }) => {
  return (
    <div className="customInputCont">
      <p className="chooseAmountText">
        Enter desired number of lists (max 1000)
      </p>
      <input
        className="customInput"
        maxLength={4}
        inputMode="numeric"
        onChange={(e) => onInputChange(e.target.value)}
      ></input>
      <button onClick={onBack} className="backCustom">
        {"<< Back"}
      </button>
    </div>
  );
};

export default CustomNumberInput;

