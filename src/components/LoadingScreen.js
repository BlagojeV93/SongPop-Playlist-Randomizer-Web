import React from "react";
import Spinner from "react-spinkit";
import "../styles/LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loadingCont">
      <p className="loadingText">Loading all playlists...Please wait...</p>
      <Spinner name="ball-spin-fade-loader" fadeIn="none" color="white" />
    </div>
  );
};

export default LoadingScreen;

