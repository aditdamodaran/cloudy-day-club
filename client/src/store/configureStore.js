import {createStore, combineReducers} from 'redux'
import PlaybackReducer from '../reducers/playback'
import CacheReducer from '../reducers/cache'

export default () => {
  // STORE CREATION
  const store = createStore(
    combineReducers({
      playback: PlaybackReducer,
      cache: CacheReducer
    })
  ) 
  return store
}