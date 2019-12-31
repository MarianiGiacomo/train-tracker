const selectedTrainReducer = (state = 0, action) => {
  switch(action.tyoe){
    case 'SET_TRAIN':
      return action.data
    default:
      return state
  }
}

export const setSelectedTrain = (selectedTrainNumber) => {
  return async dispatch => {
    //webSocketService.mqttSubscribe(selectedTrainNumber)
    dispatch({
      type: 'SET_TRAIN',
      data: selectedTrainNumber
    })
  }
}

export default selectedTrainReducer