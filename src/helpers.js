// Format the given date as 'YYYY-MM-DD'
export const getFormattedDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate().toString().length === 1? 
  '0' + date.getDate() 
  : date.getDate();
  return `${year}-${month}-${day}`;
}

// Extract from full trains array the data needed for the trains table 
export const getFormattedTrains = (trains, metadata) => {  
  const reducedTrains = trains.filter(train => train.runningCurrently).map((train, i) => {
    return {
      key: i,
      trainNumber: train.trainNumber,
      departureStation: getDepartureStation(train, metadata),
      departureTime: train.timeTableRows[0].scheduledTime,
      arrivalStation: getArrivalStation(train, metadata),
      arrivalTime: train.timeTableRows[train.timeTableRows.length-1].scheduledTime,
    }
  })
  return reducedTrains;
}

const getDepartureStation = (train, metadata) => {
  const stationName = getStationName(train.timeTableRows[0].stationShortCode, metadata);
  return stationName;
}

const getArrivalStation = (train, metadata) => getStationName(train.timeTableRows[train.timeTableRows.length-1].stationShortCode, metadata);

const getStationName = (stationShortCode, metadata) => {
  const station = metadata.filter(stationData => stationData.stationShortCode === stationShortCode);
  return station[0].stationName;
} 