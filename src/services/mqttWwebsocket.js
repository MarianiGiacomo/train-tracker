import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

const getClient = () => mqtt.connect(websocketUrl);

const subscribe = (client, topic) => {
  client.subscribe(trainLocations + topic);
};

const onMessage = (client, callBack) => {
  client.on('message', (topic, message, packet) => {
    callBack(JSON.parse(new TextDecoder('utf-8').decode(message)));
  });
};

const unsubscribe = (client, topic) => client.unsubscribe(trainLocations + topic);

const closeConnection = (client) => client.end();

const mqttService = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};

export default mqttService;
