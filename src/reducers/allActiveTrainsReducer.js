const allActiveTrainsReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_TRAINS_BY_DATE':
      return action.data;
    default:
      return state;
  }
};

export const storeActiveTrainsAction = (trains) => async (dispatch) => {
  dispatch({
    type: 'GET_ALL_TRAINS_BY_DATE',
    data: trains,
  });
};

export default allActiveTrainsReducer;
