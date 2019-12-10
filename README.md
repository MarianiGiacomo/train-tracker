# Aalto vehicle tracker

Deployed to: [https://ws-rest-train-tracking.firebaseapp.com](https://ws-rest-train-tracking.firebaseapp.com)

## Stack

* Mqtt
* Websocket
* Web app or mobile app

## Project Description

We are going Digitransit's vehicle position [High-frequency positioning (HFP)](https://digitransit.fi/en/developers/apis/4-realtime-api/vehicle-positions/) API to fetch specific buses that passes by the campus premises. The app will show real time tracking of all the buses going or coming to the range of the area.

Details about how to present the data will be refined when we go along the project demo.

## About WebScoket

WebSocket provides applications a way of communicating with the server that does not require opening multiple HTTP connections. WebSocket is a naturally full-duplex,
bidirectional, single-socket connection, so there is no need to continuously poll the server for updates and the server has one connection for each client.

WebSocket is useful for applications that require efficient real time communication, like games, multiuser applications with simultaneous
editing, chat, video conferencing, social media feeds, stock tickers, real time tracking of position and timetables.

## Messurement/Analize Results
Performance comparison of the MQTT over Websockets and MQTT without Websockets (GPRS, G2, G3 and LTE)

How much slower is MQTT over Websockets?
Is MQTT over Websockets still usable with a bad internet connection?

Capture packets with Wireshark and analize them:
 * Average packets/sec
 * Average packet size (bytes)
 * Bytes
 * Average bytes/sec

 ## Steps to run the react app

 Install [node](https://nodejs.org/en/) 10.15.3, you can use [nvm](https://github.com/nvm-sh/nvm)

 ```
 $ nvm install 10.15.3 
 ````
 Install the dependenceis 

  ```
 $ npm install 
 ````
Then run the react appusing the following command 
 ```
 $ npm start
 ````

 Currently, the app only spits the websocket response in console log. But the json data can be passed down as props(position) to Marker component to show real time movement of the vehicle.

 There are also multiple ways to construct the topic url to subscirbe digitransit server and get realtime data. One option could be to subscribe to all action inside the following [GeoJSON](http://geojson.io/#map=2/20.0/0.0) Polygon

 ```javascript
 {
  "type": "Feature",
  "geometry": {
    "type": "Polygon",
    "coordinates": [
      [
        [24.9578905105, 60.1836538254],
        [24.9646711349, 60.1836538254],
        [24.9646711349, 60.1894146967],
        [24.9578905105, 60.1894146967],
        [24.9578905105, 60.1836538254]
      ]
    ]
  }
}
```