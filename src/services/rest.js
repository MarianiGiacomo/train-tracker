import axios from 'axios';

const baseUrl = 'https://rata.digitraffic.fi/api/v1/';

// Date should be given in format 'YYYY-MM-DD'
async function getAllTrainsByDate(date) {
  const response = await axios.get(`${baseUrl}trains/${date}`);
  return response.data;
}

// List of all stations. Needed to map station short code to station full name
async function getstationsMetadata() {
  const response = await axios.get(`${baseUrl}/metadata/stations`);
  return response.data;
}

const restService = {
  getAllTrainsByDate,
  getstationsMetadata,
};

export default restService;
