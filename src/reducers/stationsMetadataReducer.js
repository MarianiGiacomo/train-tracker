const stationMedatadaReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_STATION_METADATA':
      return action.data;
    default:
      return state;
  }
};

export const storestationsMetadataAction = (stationsMetadata) => async (dispatch) => {
  dispatch({
    type: 'SET_STATION_METADATA',
    data: stationsMetadata,
  });
};

export default stationMedatadaReducer;
