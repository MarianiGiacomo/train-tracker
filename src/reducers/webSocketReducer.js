import WebSocketService from '../services/mqttWwebsocket'

const webSocketReducer = (state = new WebSocketService, action) => {
  switch(action.type){
    case 'CONNECT':
      return action.data
    default:
      return state
  }
}

export const connectWebSocket = () => {
  return async dispatch => {
    dispatch({
      type: 'CONNECT',
      data: new WebSocketService()
    })
  }
}

export default webSocketReducer