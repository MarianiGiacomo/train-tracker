import restService from '../services/rest';
import { getFormattedDate, getFormattedCurentlyRunningTrains } from '../utils/helpers';

const trainsListReducer = (state = [], action) => {
  switch(action.type){
    case 'GET_ALL_TRAINS_BY_DATE':
      return action.data
    case 'GET_ALL_TRAINS_BY_STATION':
      return action.data
    default:
      return state
  }
}

export const getAllActiveTrainsByDate = (date) => {
  return async dispatch => {
    const allTrains = await restService.getAllTrainsByDate(getFormattedDate(date))
    const stationMetadata = await restService.getStationMetadata()
    const reducedTrains = getFormattedCurentlyRunningTrains(allTrains, stationMetadata)
    dispatch({
      type: 'GET_ALL_TRAINS_BY_DATE',
      data: reducedTrains 
    })
  }
}

export const getAllActiveTrainsByStation = (station) => {
  return async dispatch => {
    const trains = []
    dispatch({
      type: 'GET_ALL_TRAINS_BY_STATION',
      data: trains
    })
  }
}

export default trainsListReducer