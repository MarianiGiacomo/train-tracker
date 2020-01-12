const filteredActiveTrainsReducer = (state = [], action) => {
  switch (action.type){
    case 'SET_FILTERED_TRAINS':
      return action.data;
    default:
      return state;
  }
};

export const storeFilteredTrainsAction = (trains) => async (dispatch) => {
  dispatch({
    type: 'SET_FILTERED_TRAINS',
    data: trains,
  });
};

export default filteredActiveTrainsReducer;
