const selectedTrainReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_TRAIN':
      return state.concat(action.data);
    default:
      return state;
  }
};

export const storeSelectedTrainAction = (selectedTrain) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TRAIN',
      data: selectedTrain,
    });
  };
};



export default selectedTrainReducer;
