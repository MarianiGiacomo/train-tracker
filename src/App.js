import React from 'react';

import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';

import './style/App.css';

const App = (props) => {

  return(
    <div className='content-wrapper'>
      <div className='header-component'>
        <AppHeader title='Train Tracker'/>
      </div>
      <div className='content-component'>
        <AppContent />
      </div>
      
    </div>
  )
}

export default App;