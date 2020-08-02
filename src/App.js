import React, { useEffect } from 'react';
import background from './assets/sppic.png';
import './App.css';

function App() {

  useEffect(() => {
    console.log('jao mile')
  }, [])

  const imgBackgroundStyle = {
    backgroundImage: "url(" + background + ")",
    backgroundPosition: 'center top',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className="app">

    </div>

  );
}

export default App;
