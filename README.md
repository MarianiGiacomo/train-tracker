# WWW-Applications Course Group Project - Live Train Geolocation, WebSocket vs. HTTP-REST

Deployed to: [https://ws-rest-train-tracking.firebaseapp.com](https://ws-rest-train-tracking.firebaseapp.com)

## Stack

* Mqtt
* Websocket
* Web app or mobile app

## Project Description

We are going to use Digitraffic's [train traffic interface](https://www.digitraffic.fi/rautatieliikenne/) to geolocate live trains. We will use both WebSocket and REST API.

## About WebScoket

WebSocket provides applications a way of communicating with the server that does not require opening multiple HTTP connections. WebSocket is a naturally full-duplex,
bidirectional, single-socket connection, so there is no need to continuously poll the server for updates and the server has one connection for each client.

WebSocket is useful for applications that require efficient real time communication, like games, multiuser applications with simultaneous
editing, chat, video conferencing, social media feeds, stock tickers, real time tracking of position and timetables.

## Messurement/Analize Results
Performance comparison of the MQTT over Websockets against REST.

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

