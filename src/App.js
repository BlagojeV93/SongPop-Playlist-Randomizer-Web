import React, { useState, useEffect } from 'react';
import './App.css';

import ScrollArea from 'react-scrollbar'
import Spinner from 'react-spinkit'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import copy from 'copy-to-clipboard';
import 'react-toastify/dist/ReactToastify.css';

import copyPic from './assets/copy.png'
import backPic from './assets/back.png'
import tournamentPic from './assets/cup.png'
import tournamentPicDark from './assets/cup-dark.png'
import backDarkPic from './assets/back-dark.png'

const regularFileUri = 'https://raw.githubusercontent.com/BlagojeV93/SongPop-Playlist-Randomizer-Web/master/AllPlaylists.txt'
const specialUri = 'https://raw.githubusercontent.com/BlagojeV93/SongPop-Playlist-Randomizer-Web/master/rock.txt'
const options = [50, 60, 75, 90, 100, 150];

const customModalStyle = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(220,220,220)',
    padding: 0
  }
};

Modal.setAppElement(document.getElementById('root'));

function App() {
  const [allPlaylists, setAll] = useState([]);
  const [randomizedPlaylists, choosePlaylists] = useState([]);
  const [numberToRandomize, setNumber] = useState(options[0]);
  const [indicator, loading] = useState(false);
  const [chosenListsOrdinal, setBool] = useState(0);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [customEntry, setCustom] = useState(false);

  const listsToShow = allPlaylists.length > 0 ? allPlaylists[chosenListsOrdinal].lists : [];

  useEffect(() => {
    loading(true);
    getLists();
  }, [])

  const getLists = async () => {
    const res = await fetch(regularFileUri, {
      cache: "no-cache"
    })
    let content = await res.text()
    content = content.split('•');
    content.shift();
    setAll(prevContent => {
      let arr = [...prevContent];
      arr.push({ title: 'Regular Lists', lists: content })
      return arr;
    })
    await getSpecialLists(specialUri);
    loading(false);
  }

  const getSpecialLists = async (url) => {
    try {
      let res = await fetch(url, { cache: "no-cache" })
      let lists = await res.text()
      lists = lists.split('•');
      lists.shift();
      const uri = lists[1].trim();
      const title = lists[0].trim();
      lists.splice(0, 2);
      setAll(prevContent => {
        let arr = [...prevContent];
        arr.push({ title, lists })
        return arr;
      })
      if (uri !== 'null') {
        getSpecialLists(uri)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const randomizeLists = () => {
    let stateArr = [];
    do {
      let val = listsToShow[Math.floor(Math.random() * listsToShow.length)].trim();
      if (stateArr.indexOf(val) === -1) {
        stateArr.push(val);
      }
    } while (stateArr.length < numberToRandomize);
    stateArr = stateArr.map((val, i) => val = i + 1 + '. ' + val);
    choosePlaylists(stateArr);
  }

  const handleInputEntry = (val) => {
    if (!(/^\d+$/.test(val))) {
      setNumber(0)
    } else {
      if (val > 1000) {
        setNumber(1000)
      } else {
        val = val > listsToShow.length ? listsToShow.length : val
        setNumber(parseInt(val))
      }
    }
  }

  const renderOptionButtons = options.map((opt, i) => {
    const borderLeftWidth = i === 0 ? 2 : 1;
    const borderRightWidth = i === options.length - 1 ? 2 : 1;
    const backgroundColor = opt === numberToRandomize ? 'purple' : '#739fff';
    return (
      <button disabled={opt > listsToShow.length} onClick={() => setNumber(opt)} className="singleOptionBtn" style={{ borderLeftWidth, borderRightWidth, backgroundColor }} key={i}>
        <p className="optionNumberText">{opt}</p>
      </button>
    )
  });

  const copyToClipboard = (textToCopy) => {
    copy(textToCopy);
    toast("All lists copied to clipboard! Good luck!", { toastId: 'custom-id-yes' })
  }

  const topListsTitle = chosenListsOrdinal === 0 ? 'Click here for monthly tournaments!' : 'Change playlists'

  const renderMainContent = () => {
    const isDisabled = customEntry && numberToRandomize === 0;
    if (!indicator) {
      if (randomizedPlaylists.length > 0) {

        let shareContent = [...randomizedPlaylists];
        shareContent.forEach(element => { element = element + `\n` });
        shareContent = shareContent.join(`\n`);

        return (
          <div className="secondScreenMainCont">
            <ScrollArea
              speed={0.8}
              className='randomizedListsCont'
              horizontal={false}
              verticalScrollbarStyle={{ backgroundColor: 'white' }}
            >
              {randomizedPlaylists.map((el, i) => {
                return (
                  <p key={i} className="playlistNameText">{el}</p>
                )
              })}
            </ScrollArea>
            <button onClick={() => copyToClipboard(shareContent)} className="secondScreenBtns" style={{ backgroundColor: 'blue' }}>
              <img alt='' src={copyPic} className="btnImage" />
              <p className="secondScreenBtnsText">COPY</p>
            </button>
            <button
              onClick={() => { choosePlaylists([]); setNumber(options[0]); setCustom(false) }}
              className="secondScreenBtns" style={{ backgroundColor: 'purple' }}>
              <img alt='' src={backPic} className="btnImage" />
              <p className="secondScreenBtnsText">RANDOMIZE AGAIN</p>
            </button>

            <ToastContainer progressClassName="Toastify__progress-bar--dark" draggablePercent={40} />

          </div>
        )
      } else {
        return (
          <div className="mainInner">
            <div className="innerTop">
              <div className="numberofListsCont">
                {allPlaylists.length > 1 &&
                  <button onClick={() => setIsOpen(true)} className="specialTournamentsCont">
                    <img alt='' src={tournamentPic} className="btnImage" />
                    <p className="specialTournamentsTitle">{topListsTitle}</p>
                    <img alt='' src={tournamentPic} className="btnImage" />
                  </button>
                }
                <p className='numberofListsText'>Total of {listsToShow.length} lists loaded</p>
              </div>
              {renderStandardOrCustom()}
            </div>
            <div className="innerBottom">
              <button disabled={isDisabled} onClick={() => randomizeLists()} className='randomizeBtn'>
                <p className="optionNumberText">RANDOMIZE</p>
              </button>
            </div>
          </div>
        )
      }
    } else {
      return (
        <div className="loadingCont">
          <p className='loadingText'>Loading all playlists...Please wait...</p>
          <Spinner name='ball-spin-fade-loader' fadeIn='none' color='white' />
        </div>
      )
    }
  }

  const renderStandardOrCustom = () => {
    if (customEntry) {
      return (
        <div className="customInputCont">
          <p className='chooseAmountText'>Enter desired number of lists (max 1000)</p>
          <input
            className="customInput"
            maxLength={4}
            inputMode="numeric"
            onChange={(e) => handleInputEntry(e.target.value)}
          ></input>
          <button onClick={() => setCustom(false)} className='backCustom'>
            {'<< Back'}
          </button>
        </div>
      )
    } else {
      return (
        <>
          <p className='chooseAmountText'>Choose the number of playlists to randomize</p>
          <div className='optionsNumber'>
            {renderOptionButtons}
          </div>
          <div className="customNumberButtonCont">
            <button onClick={() => { setNumber(0); setCustom(true) }} className="customNumberButton">
              <p className='enterCustomNuberText'>Enter custom number of lists</p>
            </button>
          </div>
        </>
      )
    }
  }

  const onModalOptionClick = (i) => {
    setBool(i);
    setIsOpen(false);
    setNumber(options[0]);
  }

  const renderModalCont = () => {
    const titles = allPlaylists.map((e => e.title));
    return (
      <div className="mainModalCont">
        <p className="modalTitleText">
          You can select one of the active monthly tournaments below and randomize playlists for that special event!
        </p>
        {titles.map((title, i) => {
          if (i > 0) {
            const last = i === titles.length - 1;
            return (
              <button onClick={() => onModalOptionClick(i)} key={i} className="tournamentOptionCont" style={{ borderBottomWidth: last ? 2 : 0 }}>
                <img alt='' src={tournamentPicDark} className="btnImage" />
                <p className="tournamentOptionText">{title}</p>
              </button>
            )
          }
        })}
        <button onClick={() => onModalOptionClick(0)} className="tournamentOptionCont backToRegularBtn">
          <img alt='' src={backDarkPic} className="btnImage" />
          <p className="tournamentOptionText">REGULAR LISTS</p>
        </button>
      </div>
    )
  }

  return (
    <div className="appMain">
      {renderMainContent()}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customModalStyle}
        closeTimeoutMS={700}
      >
        {renderModalCont()}
      </Modal>
    </div>

  );
}

export default App;