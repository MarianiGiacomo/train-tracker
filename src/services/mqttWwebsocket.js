import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

const mqttConnectGetClient = async () => mqtt.connect(websocketUrl)

const mqttSubscribe = (client, topic) => client.subscribe(trainLocations + topic)

const mqttOnMessage = (client, callBack) => {
  client.on('message', (message) => {
    callBack(JSON.parse(new TextDecoder("utf-8").decode(message)))
  })
}

const mqttUnsubscribe = (client, topic) => client.unsubscribe(trainLocations + topic)

const closeConnection = (client) => client.end()

const webSocketService = {
  mqttConnectGetClient: mqttConnectGetClient,
  mqttSubscribe: mqttSubscribe,
  mqttOnMessage: mqttOnMessage,
  mqttUnsubscribe: mqttUnsubscribe,
  closeConnection: closeConnection
}

export default webSocketService;
