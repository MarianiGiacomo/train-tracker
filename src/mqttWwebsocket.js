import mqtt from 'mqtt';

const websocketHslUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

class WebsocketClient {

  connect = async () => {
    this.client = mqtt.connect(websocketHslUrl);
    console.log('mqtt connected:', websocketHslUrl);
  };

  subscribe = (date) => {
    this.client.subscribe(trainLocations + date);
    console.log('mqtt client subscribed:', trainLocations);
  }

  decodeMessage = message => new TextDecoder("utf-8").decode(message);

  message = () => {
    this.client.on('message', (topic, message, packet) => {
    console.log(this.decodeMessage(message));
    });
  }

  close = () => this.client.end();
}

export default WebsocketClient;
