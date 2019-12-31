import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

class WebSocketService {
  connect = async () => {
    this.client = mqtt.connect(websocketUrl)
  }
  
  mqttSubscribe = (topic) => {
    this.client.subscribe(trainLocations + topic)
  }
  
  mqttOnMessage = (callBack) => {
    console.log('mqttOnMessage');
    this.client.on('message', (topic, message, packet) => {
      console.log('message', message);
      callBack(JSON.parse(new TextDecoder("utf-8").decode(message)))
    })
  }
  
  mqttUnsubscribe = (topic) => this.client.unsubscribe(trainLocations + topic)
  
  closeConnection = () => this.client.end()
}


// const webSocketService = {
//   mqttSubscribe: mqttSubscribe,
//   mqttOnMessage: mqttOnMessage,
//   mqttUnsubscribe: mqttUnsubscribe,
//   closeConnection: closeConnection
// }

export default WebSocketService;
