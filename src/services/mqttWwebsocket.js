import mqtt from 'mqtt';

const websocketHslUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

class WebsocketClient {

  connect = async () => {
    this.client = mqtt.connect(websocketHslUrl);
  };

  subscribe = (topic) => {
    const subscribeTime = (new Date()).getTime()
    this.client.subscribe(trainLocations + topic);
    return subscribeTime;
  }

  message = (callBack) => {
    this.client.on('message', (topic, message, packet) => {
      const sizeof = require('object-sizeof');      
      callBack(this.decodeMessage(message), sizeof(packet));
    });
  }

  decodeMessage = message => JSON.parse(new TextDecoder("utf-8").decode(message));

  unsubscribe = (topic) => {
    this.client.unsubscribe(trainLocations + topic);
  };
  
  close = () => this.client.end();
}

export default WebsocketClient;
