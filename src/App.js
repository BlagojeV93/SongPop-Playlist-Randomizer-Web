import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import ScrollArea from 'react-scrollbar'
import Spinner from 'react-spinkit'
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import copyPic from './assets/copy.png'
import backPic from './assets/back.png'
import tournamentPic from './assets/cup.png'
import tournamentPicDark from './assets/cup-dark.png'
import backDarkPic from './assets/back-dark.png'

const corseHelperUri = 'https://cors-anywhere.herokuapp.com/'
const regularFileUri = 'https://songpophost.000webhostapp.com/allPlaylists.txt'
const specialUri = 'https://songpophost.000webhostapp.com/special.txt'
const options = [50, 60, 70, 90, 100, 150];

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

  const listsToShow = allPlaylists.length > 0 ? allPlaylists[chosenListsOrdinal].lists : [];
  const textarea = useRef();

  useEffect(() => {
    loading(true);
    getLists();
  }, [])

  const getLists = async () => {
    let content = await fetch(corseHelperUri + regularFileUri, {
      cache: "no-cache"
    }).then(res => res.text());
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

  const getSpecialLists = async (uri) => {
    let lists = await fetch(corseHelperUri + uri, { cache: "no-cache" }).then(res => res.status === 200 ? res.text() : null)
      .catch(e => console.log(e, 'error special fetch'));
    if (lists) {
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
    }
  }

  const randomizeLists = () => {
    let stateArr = [];
    do {
      let val = listsToShow[Math.floor(Math.random() * listsToShow.length)].trim();
      if (stateArr.indexOf(val) === -1 && val.length > 0) {
        stateArr.push(val);
      }
    } while (stateArr.length < numberToRandomize);
    stateArr = stateArr.map((val, i) => val = i + 1 + '. ' + val);
    choosePlaylists(stateArr);
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

  const copyToClipboard = () => {
    let copyText = textarea.current;
    copyText.select();
    document.execCommand("copy");
    toast("All lists copied to clipboard! Good luck!", { toastId: 'custom-id-yes' })
  }

  const topListsTitle = chosenListsOrdinal === 0 ? 'Click here for monthly tournaments!' : 'Change playlists'

  const renderMainContent = () => {
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
            <button onClick={() => copyToClipboard()} className="secondScreenBtns" style={{ backgroundColor: 'blue' }}>
              <img alt='' src={copyPic} className="btnImage" />
              <p className="secondScreenBtnsText">COPY</p>
            </button>
            <button onClick={() => choosePlaylists([])} className="secondScreenBtns" style={{ backgroundColor: 'purple' }}>
              <img alt='' src={backPic} className="btnImage" />
              <p className="secondScreenBtnsText">RANDOMIZE AGAIN</p>
            </button>

            <ToastContainer progressClassName="Toastify__progress-bar--dark" draggablePercent={40}/>
            <textarea
            disabled
              className="shareContentParagraph"
              ref={textarea}
              value={shareContent}
            />

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
    } else {
      return (
        <div className="loadingCont">
          <p className='loadingText'>Loading all playlists...Please wait...</p>
          <Spinner name='ball-spin-fade-loader' fadeIn='none' color='white' />
        </div>
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
