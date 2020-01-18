import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffi.fi:443/mqtt';
const trainLocations = 'train-locations/';

function getClient(errorHandler) {
  const client = mqtt.connect(websocketUrl);
  client.stream.on('error', (err) => { 
    errorHandler(`Connection to ${websocketUrl} failed`);
    client.end();
  });
  return client;
}

function subscribe(client, topic, errorHandler) {
  const callBack = (err, granted) => {
    if (err) {
      errorHandler('Subscription request failed');
    }
  };
  return client.subscribe(trainLocations + topic, callBack);
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
