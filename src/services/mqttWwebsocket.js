import mqtt from 'mqtt';

const websocketHslUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

class WebsocketClient {

  connect = async () => {
    this.client = mqtt.connect(websocketHslUrl);
  };

  subscribe = (topic, callBack) => {
    this.client.on('message', (topic, message, packet) => {
      const sizeof = require('object-sizeof');      
      callBack(this.decodeMessage(message), sizeof(packet));
    });
    const subscribeTime = (new Date()).getTime()
    this.client.subscribe(trainLocations + topic);
    return subscribeTime;
  }

  decodeMessage = message => JSON.parse(new TextDecoder("utf-8").decode(message));

  close = () => this.client.end();
}

export default WebsocketClient;
