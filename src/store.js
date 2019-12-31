import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { 
  selectedTrainReducer, 
  trainsListReducer, 
  trainLocationReducer,
  webSocketReducer } from './reducers'

const reducer = combineReducers({
  trains: trainsListReducer,
  selectedTrainNumber: selectedTrainReducer,
  trainLocation: trainLocationReducer,
  webSocket: webSocketReducer
})

const store = createStore(reducer,
  applyMiddleware(thunk))

export default store