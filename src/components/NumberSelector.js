import React from "react";
import "../styles/NumberSelector.css";

const NumberSelector = ({ options, selectedValue, onSelect, disabledOptions }) => {
  const renderOptionButtons = options.map((opt, i) => {
    const borderLeftWidth = i === 0 ? 2 : 1;
    const borderRightWidth = i === options.length - 1 ? 2 : 1;
    const backgroundColor = opt === selectedValue ? "purple" : "#739fff";
    return (
      <button
        disabled={disabledOptions && disabledOptions.includes(opt)}
        onClick={() => onSelect(opt)}
        className="singleOptionBtn"
        style={{ borderLeftWidth, borderRightWidth, backgroundColor }}
        key={i}
      >
        <p className="optionNumberText">{opt}</p>
      </button>
    );
  });

  return <div className="optionsNumber">{renderOptionButtons}</div>;
};

export default NumberSelector;

