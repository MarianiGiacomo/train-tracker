import moment from 'moment-timezone';

const addZeroToSingleDigit = (number) => (number.toString().length === 1 ? `0${number}` : number);

const getStationName = (stationShortCode, stationsMetadata) => {
  const station = stationsMetadata.filter(
    (stationData) => stationData.stationShortCode === stationShortCode,
  );
  return station[0].stationName;
};

const getDepartureStation = (train, stationsMetadata) => {
  return getStationName(train.timeTableRows[0].stationShortCode, stationsMetadata);
};

const getTimezonedDate = (date) => moment.tz(date, 'Europe/Helsinki').format('YYYY-MM-DD HH:mm');

const getArrivalStation = (train, stationsMetadata) => {
  return getStationName(
    train.timeTableRows[train.timeTableRows.length - 1].stationShortCode, stationsMetadata,
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
function filterTrains(trains, stationsMetadata) {
  const reducedTrains = trains.filter((train) => train.runningCurrently).map((train, i) => ({
    key: i,
    trainNumber: train.trainNumber,
    timeTableRows: train.timeTableRows,
    departureStation: getDepartureStation(train, stationsMetadata),
    departureTime: getTimezonedDate(train.timeTableRows[0].scheduledTime),
    arrivalStation: getArrivalStation(train, stationsMetadata),
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

function getTrainsWithGivenStation(stationName, trains, stationsMetadata) {
  return trains.filter((train) => {
    const station = stationsMetadata.find((stationData) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      stationData.stationName.toUpperCase() === stationName.toUpperCase());
    return train.timeTableRows.some((row) => row.stationShortCode === station.stationShortCode);
  });
}

const helpers = {
  getFormattedDate,
  filterTrains,
  extractTrainLocationREST,
  extractTrainLocationWS,
  getTrainsWithGivenStation,
};

export default helpers;
