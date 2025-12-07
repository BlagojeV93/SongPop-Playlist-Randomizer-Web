import React from "react";
import ScrollArea from "react-scrollbar";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import copy from "copy-to-clipboard";
import "react-toastify/dist/ReactToastify.css";
import copyPic from "../assets/images/copy.png";
import backPic from "../assets/images/back.png";
import "../styles/RandomizedListsView.css";

const RandomizedListsView = ({ playlists, onRandomizeAgain }) => {
  const copyToClipboard = () => {
    let shareContent = [...playlists];
    shareContent.forEach((element) => {
      element = element + `\n`;
    });
    shareContent = shareContent.join(`\n`);
    copy(shareContent);
    toast("All lists copied to clipboard! Good luck!", {
      toastId: "custom-id-yes",
    });
  };

  return (
    <div className="secondScreenMainCont">
      <ScrollArea
        speed={0.8}
        className="randomizedListsCont"
        horizontal={false}
        verticalScrollbarStyle={{ backgroundColor: "white" }}
      >
        {playlists.map((el, i) => {
          return (
            <p key={i} className="playlistNameText">
              {el}
            </p>
          );
        })}
      </ScrollArea>
      <button
        onClick={copyToClipboard}
        className="secondScreenBtns"
        style={{ backgroundColor: "blue" }}
      >
        <img alt="" src={copyPic} className="btnImage" />
        <p className="secondScreenBtnsText">COPY</p>
      </button>
      <button
        onClick={onRandomizeAgain}
        className="secondScreenBtns"
        style={{ backgroundColor: "purple" }}
      >
        <img alt="" src={backPic} className="btnImage" />
        <p className="secondScreenBtnsText">RANDOMIZE AGAIN</p>
      </button>

      <ToastContainer
        progressClassName="Toastify__progress-bar--dark"
        draggablePercent={40}
      />
    </div>
  );
};

export default RandomizedListsView;
