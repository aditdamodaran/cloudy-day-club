import { combineReducers } from 'redux';

import PlaybackReducer from './playback'
import CacheReducer from './cache'

export default combineReducers({
  playback: PlaybackReducer,
  cache: CacheReducer
});
