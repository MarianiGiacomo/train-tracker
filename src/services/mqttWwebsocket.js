import mqtt from 'mqtt';

const websocketUrl = 'wss://rata.digitraffic.fi:443/mqtt';
const trainLocations = 'train-locations/';

const getClient = async () => mqtt.connect(websocketUrl);

const changeSubscription = async (client, oldTopic, newTopic) => {
  await unsubscribe(client, oldTopic);
  await subscribe(client, newTopic);
};

const subscribe = async (client, topic) => {
  const response = await client.subscribe(trainLocations + topic);
  console.log('subscribe', response.data);
};

const onMessage = (client, callBack) => {
  client.on('message', (message) => {
    callBack(JSON.parse(new TextDecoder('utf-8').decode(message)));
  });
};

const unsubscribe = (client, topic) => client.unsubscribe(trainLocations + topic);

const closeConnection = (client) => client.end();

const mqttService = {
  getClient,
  changeSubscription,
  subscribe,
  onMessage,
  unsubscribe,
  closeConnection,
};

export default mqttService;
