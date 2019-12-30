import axios from 'axios';
const baseUrl = 'https://rata.digitraffic.fi/api/v1/'


// Date should be given in format 'YYYY-MM-DD'
const getAllTrainsByDate = async (date) => {
  const response = await axios.get(baseUrl + 'trains/' + date);
  return response.data;
}

const getActiveTrains = async (station) => {
  const response = await axios.get(baseUrl + 'live-trains/station/' + station);
  return response.data;
}

// Returns the latest location of the given train number
const getTrainLocation = async (train) => {
  const response = await axios.get(baseUrl + '' +
      'train-locations/latest/' + train);
  return response;
}

// List of all stations. Needed to map station short code to station full name 
const getStationMetadata = async () => {
  const response = await axios.get(baseUrl + '/metadata/stations');
  return response.data;
}

const restService = {
  getAllTrainsByDate: getAllTrainsByDate,
  getActiveTrains: getActiveTrains,
  getTrainLocation: getTrainLocation,
  getStationMetadata: getStationMetadata
}

export default restService