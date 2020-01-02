import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { 
  selectedTrainReducer, 
  trainsListReducer, 
  trainLocationReducer,
  mqttClientReducer } from './reducers'

const reducer = combineReducers({
  trains: trainsListReducer,
  selectedTrainNumber: selectedTrainReducer,
  trainLocation: trainLocationReducer,
  mqttClient: mqttClientReducer
})

const store = createStore(reducer,
  applyMiddleware(thunk))

export default store