import axios from 'axios';
const baseUrl = 'https://rata.digitraffic.fi/api/v1/'

// Date should be given in format 'YYYY-MM-DD'
export const getAllTrainsByDate = async (date) => {
  const response = await axios.get(baseUrl + 'trains/' + date);
  console.log('All trains by date', response.data);
  return response.data;
}

// Stations list from https://rata.digitraffic.fi/api/v1/metadata/stations
export const getActiveTrains = async (station) => {
  const response = await axios.get(baseUrl + 'live-trains/station/' + station);
  console.log('Active trains by station', response.data);
  return response.data;
}

// Returns the latest location of the given train number
export const getTrainLocation = async (train) => {
  const response = await axios.get(baseUrl + '/train-locations/latest/' + train);
  console.log('Train location', response.data);
  return response.data;
}
