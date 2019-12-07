import axios from 'axios';
const baseUrl = 'https://rata.digitraffic.fi/api/v1/'

// Date should be given in format 'YYYY-MM-DD'
export const getAllTrainsByDate = async (date) => {
  const response = await axios.get(baseUrl + 'trains/' + date);
  // console.log('All trains by date', response.data);
  return response.data;
}

// Stations list from https://rata.digitraffic.fi/api/v1/metadata/stations
export const getActiveTrains = async (station) => {
  const response = await axios.get(baseUrl + 'live-trains/station/' + station);
  // console.log('Active trains by station', response.data);
  return response.data;
}

// Returns the latest location of the given train number
export const getTrainLocation = async (train) => {
  const response = await axios.get(baseUrl + '' +
      'train-locations/latest/' + train);
  // console.log('Train location', response.data);
  return response;
}

// List of all stations. Needed to map station short code to station full name 
export const getStationMetadata = async () => {
  const response = await axios.get(baseUrl + '/metadata/stations');
  return response.data;
}


// Returns the train locations of the latestes trains within a bounding box
export const getTrainLocationsWithinBoundingBox = async (bounding_box) => {
    const response = await axios.get(baseUrl + 'train-locations/latest?' + bounding_box);
    // console.log('Send rest api request', baseUrl + 'train-locations/latest?' + bounding_box);
    // console.log('Train locations withing bounding box', response.data);
    return response.data;
}
