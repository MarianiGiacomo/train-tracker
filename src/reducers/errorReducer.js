const errorReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.data;
    default:
      return state;
  }
};


export const storeErrorAction = (error, timeout) => async (dispatch) => {
  dispatch({
    type: 'SET_ERROR',
    data: error,
  });
  if (timeout) {
    setTimeout(() => dispatch({
      type: 'SET_ERROR',
      data: '',
    }), timeout);
  }
};

export const resetError = () => async (dispatch) => {
  dispatch({
    type: 'SET_ERROR',
    data: '',
  });
};

export default errorReducer;
