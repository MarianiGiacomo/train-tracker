const selectedTrainReducer = (state = 0, action) => {
  switch(action.tyoe){
    case 'SET_TRAIN':
      return action.data
    default:
      return state
  }
}

export const storeSelectedTrain = (selectedTrainNumber) => {
  return async dispatch => {
    dispatch({
      type: 'SET_TRAIN',
      data: selectedTrainNumber
    })
  }
}

export default selectedTrainReducer