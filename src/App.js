import React, { useState, useEffect } from 'react';
import './App.css';

import ScrollArea from 'react-scrollbar'
import { Message, GenericTemplate, GenericElement, ShareButton } from 'react-messenger-ui';

import sharePic from './assets/share.png'
import backPic from './assets/back.png'

const fetchUri = 'https://cors-anywhere.herokuapp.com/https://songpophost.000webhostapp.com/allPlaylists.txt'
const options = [60, 70, 90, 100, 150]

function App() {

  const [allPlaylists, setAll] = useState([0]);
  const [randomizedPlaylists, choosePlaylists] = useState([]);
  const [numberToRandomize, setNumber] = useState(options[0]);

  useEffect(() => {
    getLists();
  }, [])

  const getLists = async () => {
    const content = await fetch(fetchUri).then(res => res.text());
    setAll(content.split('•'));
  }

  const randomizeLists = () => {
    let stateArr = [];
    do {
      let val = allPlaylists[Math.floor(Math.random() * allPlaylists.length)].trim();
      if (stateArr.indexOf(val) === -1 && val.length > 0) {
        stateArr.push(val);
      }
    } while (stateArr.length < numberToRandomize);
    stateArr = stateArr.map((val, i) => val = i + 1 + '. ' + val);
    choosePlaylists(stateArr);
  }

  const renderOptionButtons = options.map((opt, i) => {
    const borderLeftWidth = i == 0 ? 2 : 1;
    const borderRightWidth = i == options.length - 1 ? 2 : 1;
    const backgroundColor = opt == numberToRandomize ? 'purple' : '#739fff';
    return (
      <button onClick={() => setNumber(opt)} className="singleOptionBtn" style={{ borderLeftWidth, borderRightWidth, backgroundColor }} key={i}>
        <p className="optionNumberText">{opt}</p>
      </button>
    )
  })

  const renderRandomizedPlaylists = randomizedPlaylists.map((el, i) => {
    return (
      <p key={i} className="playlistNameText">{el}</p>
    )
  })

  const renderMainContent = () => {
    if (randomizedPlaylists.length > 0) {
      return (
        <div className="secondScreenMainCont">
          <ScrollArea
            speed={0.8}
            className='randomizedListsCont'
            horizontal={false}
            verticalScrollbarStyle={{ backgroundColor: 'white' }}
          >
            {renderRandomizedPlaylists}
          </ScrollArea>
          <button className="secondScreenBtns" style={{ backgroundColor: 'blue' }}>
            <img src={sharePic} className="btnImage" />
            <p className="secondScreenBtnsText">SHARE</p>
          </button>
          <button onClick={() => choosePlaylists([])} className="secondScreenBtns" style={{ backgroundColor: 'purple' }}>
            <img src={backPic} className="btnImage" />
            <p className="secondScreenBtnsText">RANDOMIZE AGAIN</p>
          </button>
        </div>
      )
    } else {
      return (
        <div className="mainInner">
          <div className="innerTop">
            <div className="numberofListsCont">
              <p className='numberofListsText'>Total of {allPlaylists.length - 1} lists loaded</p>
            </div>
            <p className='chooseAmountText'>Choose the number of playlists to randomize</p>
            <div className='optionsNumber'>
              {renderOptionButtons}
            </div>
          </div>
          <div className="innerBottom">
            <button onClick={() => randomizeLists()} className='randomizeBtn'>
              <p className="optionNumberText">RANDOMIZE</p>
            </button>
          </div>
          
        </div>
      )
    }
  }

  return (
    <div className="appMain">
      {renderMainContent()}
    </div>

  );
}

export default App;
