import moment from 'moment-timezone';

const addZeroToSingleDigit = (number) => (number.toString().length === 1 ? `0${number}` : number);

const getStationName = (stationShortCode, stationMetadata) => {
  const station = stationMetadata.filter(
    (stationData) => stationData.stationShortCode === stationShortCode,
  );
  return station[0].stationName;
};

const getDepartureStation = (train, stationMetadata) => {
  return getStationName(train.timeTableRows[0].stationShortCode, stationMetadata);
};

const getTimezonedDate = (date) => moment.tz(date, 'Europe/Helsinki').format('YYYY-MM-DD HH:mm');

const getArrivalStation = (train, stationMetadata) => {
  return getStationName(
    train.timeTableRows[train.timeTableRows.length - 1].stationShortCode, stationMetadata,
  );
};


// Format the given date as 'YYYY-MM-DD'
function getFormattedDate(date) {
  const year = date.getFullYear();
  const month = addZeroToSingleDigit(date.getMonth() + 1);
  const day = addZeroToSingleDigit(date.getDate());
  return `${year}-${month}-${day}`;
}

// Extract from full trains array the data needed for the trains table
function getFormattedCurentlyRunningTrains(trains, stationMetadata) {
  const reducedTrains = trains.filter((train) => train.runningCurrently).map((train, i) => ({
    key: i,
    trainNumber: train.trainNumber,
    departureStation: getDepartureStation(train, stationMetadata),
    departureTime: getTimezonedDate(train.timeTableRows[0].scheduledTime),
    arrivalStation: getArrivalStation(train, stationMetadata),
    arrivalTime: getTimezonedDate(
      train.timeTableRows[train.timeTableRows.length - 1].scheduledTime,
    ),
  }));
  return reducedTrains;
}

function extractTrainLocationREST(message) {
  const { coordinates } = message.data[0].location;
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}

function extractTrainLocationWS(message) {
  const { coordinates } = message.location;
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}

const helperFunctions = {
  getFormattedDate,
  getFormattedCurentlyRunningTrains,
  extractTrainLocationREST,
  extractTrainLocationWS,
};

export default helperFunctions;
