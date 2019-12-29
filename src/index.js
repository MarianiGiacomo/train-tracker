import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import './index.css';
import "antd/dist/antd.css";

const render = () => {
  ReactDOM.render(
      <App />,
    document.getElementById('root')
  )
}

render()
