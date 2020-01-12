const mqttClientReducer = (state = null, action) => {
  switch (action.type) {
    case 'CONNECT':
      return action.data;
    default:
      return state;
  }
};

export const storeMqttClientAction = (client) => async (dispatch) => {
  dispatch({
    type: 'CONNECT',
    data: client,
  });
};

export default mqttClientReducer;
