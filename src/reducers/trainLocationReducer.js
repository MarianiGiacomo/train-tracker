const trainLocationReducer = (state = {lat: 60.170605, lng: 24.940906}, action) => {
  switch (action.type){
    case 'SET_COORDINATES':
      return action.data
    default:
      return state
  }
}

export const setTrainLocation = (coordinates) => {
  return async dispatch => {
    dispatch({
      type: 'SET_COORDINATES',
      data: coordinates
    })
  }
}

export default trainLocationReducer