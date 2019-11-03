import mqtt from 'mqtt';

const websocketHslUrl = 'wss://mqtt.hsl.fi:443/';
// const topicUrl = '/hfp/v2/journey/ongoing/vp/bus/0020/00018/5565/1/Espoontori/#';
// const tpurl = '/hfp/v2/journey/ongoing/vp/+/+/+/+/+/+/+/+/0/#';
const coordinate1 = "/hfp/v2/journey/ongoing/vp/bus/+/+/+/+/+/+/+/+/60;24/19/85/#";

class WebsocketClient {
  connect = async () => {
    this.client = mqtt.connect(websocketHslUrl);
    console.log('mqtt connected:', websocketHslUrl);
  };

  subscribe = () => {
    this.client.subscribe(coordinate1);
    console.log('mqtt client subscribed:', coordinate1);
  }

  decodeMessage = message => new TextDecoder("utf-8").decode(message);

  message = () => {
    this.client.on('message', (topic, message, packet) => {
    console.log(this.decodeMessage(message));
    // console.log('mqtt client on massage', topic, decodeMessage(message), packet);
    });
  }

  close = () => this.client.end();
}

export default WebsocketClient;