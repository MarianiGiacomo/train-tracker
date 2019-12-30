import moment from 'moment-timezone'; 

// Format the given date as 'YYYY-MM-DD'
export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate().toString().length === 1? 
  '0' + date.getDate() 
  : date.getDate();
  return `${year}-${month}-${day}`;
}

const getTimezonedDate = date => moment.tz(date, 'Europe/Helsinki').format('YYYY-MM-DD HH:mm');

// Extract from full trains array the data needed for the trains table 
export const getFormattedCurentlyRunningTrains = (trains, stationMetadata) => {  
  const reducedTrains = trains.filter(train => train.runningCurrently).map((train, i) => {
    return {
      key: i,
      trainNumber: train.trainNumber,
      departureStation: getDepartureStation(train, stationMetadata),
      departureTime: getTimezonedDate(train.timeTableRows[0].scheduledTime),
      arrivalStation: getArrivalStation(train, stationMetadata),
      arrivalTime: getTimezonedDate(train.timeTableRows[train.timeTableRows.length-1].scheduledTime),
    }
  })
  return reducedTrains;
}

const getDepartureStation = (train, stationMetadata) => {
  const stationName = getStationName(train.timeTableRows[0].stationShortCode, stationMetadata);
  return stationName;
}

const getArrivalStation = (train, stationMetadata) => getStationName(train.timeTableRows[train.timeTableRows.length-1].stationShortCode, stationMetadata);

const getStationName = (stationShortCode, stationMetadata) => {
  const station = stationMetadata.filter(stationData => stationData.stationShortCode === stationShortCode);
  return station[0].stationName;
} 