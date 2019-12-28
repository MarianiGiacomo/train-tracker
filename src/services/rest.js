import axios from 'axios';
const baseUrl = 'https://rata.digitraffic.fi/api/v1/'

// Date should be given in format 'YYYY-MM-DD'
export const getAllTrainsByDate = async (date) => {
  const response = await axios.get(baseUrl + 'trains/' + date);
  return response.data;
}

export const getActiveTrains = async (station) => {
  const response = await axios.get(baseUrl + 'live-trains/station/' + station);
  return response.data;
}

// Returns the latest location of the given train number
export const getTrainLocation = async (train) => {
  const response = await axios.get(baseUrl + '' +
      'train-locations/latest/' + train);
  return response;
}

// List of all stations. Needed to map station short code to station full name 
export const getStationMetadata = async () => {
  const response = await axios.get(baseUrl + '/metadata/stations');
  return response.data;
}