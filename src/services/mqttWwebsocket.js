import mqtt from 'mqtt';

const websocketHslUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

class WebsocketClient {

  connect = async () => {
    this.client = mqtt.connect(websocketHslUrl);
  };

  subscribe = (topic) => {
    this.client.subscribe(trainLocations + topic);
  }

  decodeMessage = message => JSON.parse(new TextDecoder("utf-8").decode(message));

  message = (callBack) => {
    let wssMessage = '';
    
    this.client.on('message', (topic, message, packet) => {
      callBack(this.decodeMessage(message));
    });

    return wssMessage;
  }

  close = () => this.client.end();
}

export default WebsocketClient;
