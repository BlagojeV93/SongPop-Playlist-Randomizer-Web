import React from "react";
import "../styles/Modal.css";

const LatestListsModal = ({ lastAdded, totalLists }) => {
  return (
    <div className="latestListsContainer">
      {lastAdded.map((list, i) => (
        <div className="singleLatestList" key={i}>
          <p className="latestListText">
            No.{totalLists - i}&nbsp;&nbsp;{"---->"}&nbsp;&nbsp;
          </p>
          <span style={{ fontWeight: "700" }} className="latestListText">
            {list}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LatestListsModal;

