import restService from '../services/rest';
import helperFunctions from '../utils/helperFunctions';

const trainsListReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_TRAINS_BY_DATE':
      return action.data;
    case 'GET_ALL_TRAINS_BY_STATION':
      return action.data;
    default:
      return state;
  }
};

export const getAndStoreActiveTrainsByDate = (date) => async (dispatch) => {
  const allTrains = await restService.getAllTrainsByDate(
    helperFunctions.getFormattedDate(date)
  );
  const stationMetadata = await restService.getStationMetadata();
  const reducedTrains = helperFunctions
    .getFormattedCurentlyRunningTrains(allTrains, stationMetadata);
  dispatch({
    type: 'GET_ALL_TRAINS_BY_DATE',
    data: reducedTrains,
  });
};

export const getAndStoreActiveTrainsByStation = (station) => async (dispatch) => {
  const trains = [];
  dispatch({
    type: 'GET_ALL_TRAINS_BY_STATION',
    data: trains,
  });
};

export default trainsListReducer;
