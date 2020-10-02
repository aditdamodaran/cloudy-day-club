const playbackReducerDefaultState = {
  playerReady: false,
  pauseTrack: false,
  uri: '',
  albumArt: '',
  defaultColor: '#5F2233',
  albumColors: [],
  trackName: '',
  artist: ''
}

export default (state = playbackReducerDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return state = {
        ...state,
        pauseTrack: !state.pauseTrack
      }
    case 'SET_PLAYER_READY':
      return state = {
        ...state,
        playerReady: true
      }
    case 'PLAY_TRACK':
      return state = {
        ...state,
        pauseTrack: false,
        uri: action.uri,
        albumArt: action.albumArt,
        trackName: action.name,
        artist: action.artist
      }
    default:
      return state;
  }
}