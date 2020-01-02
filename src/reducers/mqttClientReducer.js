import mqttService from '../services/mqttWwebsocket'

const mqttClientReducer = (state = null, action) => {
  switch(action.type){
    case 'CONNECT':
      return action.data
    default:
      return state
  }
}

export const getAndStoreMqttClient = (callBackOnMessage) => {
  return async dispatch => {
    const client = await mqttService.getClient()
    mqttService.onMessage(client, callBackOnMessage)
    dispatch({
      type: 'CONNECT',
      data: client
    })
  }
}

export default mqttClientReducer