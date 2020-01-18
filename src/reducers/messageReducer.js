const messageReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data;
    case 'CLEAR_MESSAGE':
      if (action.data === state) {
        return '';
      } return state;
    default:
      return state;
  }
};


export const storeMessageAction = (message, timeout) => async (dispatch) => {
  dispatch({
    type: 'SET_MESSAGE',
    data: message,
  });
  if (timeout) {
    setTimeout(() => dispatch({
      type: 'SET_MESSAGE',
      data: '',
    }), timeout);
  }
};

export const clearMessageAction = (message) => async (dispatch) => {
  dispatch({
    type: 'CLEAR_MESSAGE',
    data: message,
  });
};

export const resetMessage = () => async (dispatch) => {
  dispatch({
    type: 'SET_MESSAGE',
    data: '',
  });
};

export default messageReducer;
