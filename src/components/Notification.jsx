import React from 'react';
import PropTypes from 'prop-types';

const Notification = (props) => {
  const {
    message,
    error,
  } = props;

  const styleMessage = {

  };

  const styleError = {

  };

  return (
    <div className="modal">
      {message ? <div className="message">{message}</div> : undefined}
      {error ? <div className="error">{error}</div> : undefined}
    </div>
  );
};


Notification.propTypes = {

};

export default Notification;
