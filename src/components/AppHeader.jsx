import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import '../style/AppHeader.css'

const { Header } = Layout;

const AppHeader = props => {
  return (
    <div>
      <Header className='header'>
        <h2>{props.title}</h2>
      </Header>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default AppHeader;