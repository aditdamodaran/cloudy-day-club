const playbackReducerDefaultState = {
  playerReady: false,
  pauseTrack: false,
  uri: '',
  albumArt: '',
  defaultColor: '#5F2233',
  albumColors: [],
  trackName: '',
  artist: '',
  queue : [],
  idx : 0,
  upcomingQueue: {},
  playingSong : false,
  autoPlayed : false,
}

export default (state = playbackReducerDefaultState, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return state = {
        ...state,
        pauseTrack: !state.pauseTrack
      }
    case 'PLAYING_SONG':
      return state = {
        ...state,
        playingSong: true,
        autoPlayed: false
      }
    case 'SET_PLAYER_READY':
      return state = {
        ...state,
        playerReady: true
      }
    case 'PLAY_TRACK':
      // If we toggle pause/play, this action
      // is not called. it's only called for new tracks
      if (state.queue.length === 0){
        // If we haven't played anything yet
        // Go ahead and add to queue
        state.queue.push(action.uri)
      }
      // If we play a new song, add that to the queue
      if (state.queue.length > 0 && (state.queue[state.queue.length -1] !== action.uri)){
        state.queue.push(action.uri)
      }

      return state = {
        ...state,
        pauseTrack: false,
        uri: action.uri,
        albumArt: action.albumArt,
        trackName: action.name,
        artist: action.artist,
        idx: action.idx,
        playingSong: false 
      }
    case 'SET_UPCOMING_QUEUE':
      // const tracks = Object.keys(action.tracks)
      return state = {
        ...state,
        upcomingQueue : action.tracks
      }
    case 'AUTO_PLAY_NEXT_SONG':
      if (state.queue.length > 0 && (state.queue[state.queue.length -1] !== action.uri)){
        state.queue.push(action.uri)
      }
      return state = {
        ...state,
        autoPlayed : true,
        uri: action.uri,
        albumArt: action.albumArt,
        trackName: action.name,
        artist: action.artist,
        idx: action.idx,
        playingSong: false 
      }
      

    default:
      return state;
  }
}