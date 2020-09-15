const playbackReducerDefaultState = {
  playerReady: false,
  pauseTrack: false,
  uri: "",
  albumArt: "",
  trackName: "",
  // playerState: {}
}

export default (state = playbackReducerDefaultState, action) => {
  // console.log(action.type)
  switch (action.type) {
    // case 'SET_PLAYER_STATE':
    //   console.log('HERE')
    //   return state = {
    //     ...state,
    //     playerState: action.state
    //   }
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
      // console.log("Reducer", state.uri)
      return state = {
        ...state,
        pauseTrack: false,
        uri: action.uri,
        albumArt: action.albumArt,
        trackName: action.name
      }
    default:
      return state;
  }
}