import helperFunctions from '../../utils/helperFunctions'

const trains = [
  {
    "trainNumber": 1,
    "runningCurrently": false,
    "timeTableRows": [
      {
        "stationShortCode": "HKI",
        "scheduledTime": "2017-01-01T05:23:00.000Z",
      },
      {
        "stationShortCode": "JNS",
        "scheduledTime": "2017-01-01T09:40:00.000Z",
      }
    ]
  },
    {
    "trainNumber": 2,
    "runningCurrently": true,
    "timeTableRows": [
      {
        "stationShortCode": "TKU",
        "scheduledTime": "2017-01-01T05:23:00.000Z",
      },
      {
        "stationShortCode": "JNS",
        "scheduledTime": "2017-01-01T09:40:00.000Z",
      }
    ]
  }
]

const stationsMetadata = [
  {
    "stationName": "Helsinki",
    "stationShortCode": "HKI",
  },
  {
    "stationName": "Joensuu",
    "stationShortCode": "JNS",
  },
  {
    "stationName": "Turku",
    "stationShortCode": "TKU",
  },
]

describe('Tests for helper functions', () => {
  test('Return formatted date', () => {
    const dates = [ '2020-01-01', '2021-11-11', '2100-01-01' ];
    const formattedDates = dates.map( d => helperFunctions.getFormattedDate(new Date(d)))
    formattedDates.forEach( (date, i) =>  expect(date).toBe(dates[i]));
  })

  test('Return formatted currently running trains', () => {
    const result = helperFunctions.getFormattedCurentlyRunningTrains(trains, stationsMetadata)
    expect(result.length).toBe(1)
    expect(result[0].trainNumber).toBe(2)
    expect(Object.keys(result[0]).length).toBe(6)
  })

  test('Return list of trains according to given station', () => {
    const result = helperFunctions
    .getTrainsWithGivenStation(
      stationsMetadata[0].stationName, 
      trains, 
      stationsMetadata
    );
    expect(result.length).toBe(1);
    expect(result[0].trainNumber).toBe(1);
  })
})
