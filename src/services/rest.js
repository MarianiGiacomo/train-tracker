import axios from 'axios';

const baseUrl = 'https://rata.digitraffic.fi/api/v1/';


// Date should be given in format 'YYYY-MM-DD'
const getAllTrainsByDate = async (date) => {
  const response = await axios.get(`${baseUrl}trains/${date}`);
  return response.data;
};

const getActiveTrains = async (station) => {
  const response = await axios.get(`${baseUrl}live-trains/station/${station}`);
  return response.data;
};

// List of all stations. Needed to map station short code to station full name
const getStationMetadata = async () => {
  const response = await axios.get(`${baseUrl}/metadata/stations`);
  return response.data;
};

const restService = {
  getAllTrainsByDate,
  getActiveTrains,
  getStationMetadata,
};

export default restService;
