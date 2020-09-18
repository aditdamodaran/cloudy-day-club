import { createStore } from 'redux'
import rootReducer from '../reducers/rootReducer'

export default () => {
  // STORE CREATION
  const store = createStore(rootReducer) 
  return store
}