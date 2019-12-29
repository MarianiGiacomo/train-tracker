import { getFormattedDate, getFormattedTrains } from '../../src/utils/helpers.js'

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
        "stationShortCode": "HKI",
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
]

test('Return formatted date', () => {
  const date = new Date()
  const year = date.getFullYear();
  const month = date.getMonth()+1;
  const day = date.getDate().toString().length === 1? 
  '0' + date.getDate() 
  : date.getDate();

  const result = getFormattedDate(date)
  expect(result).toBe(`${year}-${month}-${day}`)
})

test('Return formatted currently running trains', () => {
  const result = getFormattedTrains(trains, stationsMetadata)
  expect(result.length).toBe(1)
  expect(result[0].trainNumber).toBe(2)
  expect(Object.keys(result[0]).length).toBe(6)
})