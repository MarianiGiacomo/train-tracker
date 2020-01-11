import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

function getClient() {
  return mqtt.connect(websocketUrl);
}

function subscribe(client, topic) {
  client.subscribe(trainLocations + topic);
}

function onMessage(client, callBack) {
  client.on('message', (topic, message, packet) => {
    callBack(JSON.parse(new TextDecoder('utf-8').decode(message)));
  });
}

function unsubscribe(client, topic) {
  client.unsubscribe(trainLocations + topic);
}

function closeConnection(client) {
  client.end();
}

const mqttService = {
  getClient,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};

export default mqttService;
