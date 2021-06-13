export const playTrack = ({albumArt, uri, name, artist, idx}) => ({
  type: 'PLAY_TRACK',
  albumArt,
  uri,
  name,
  artist,
  idx
})

export const autoPlayNextSong = (albumArt, uri, name, artist, idx) => ({
  type: 'AUTO_PLAY_NEXT_SONG',
  albumArt,
  uri,
  name,
  artist,
  idx
})

export const setPlayerState = ({state}) => {
  return ({
    type: 'SET_PLAYER_STATE',
    state
  })
}

export const setPlayerReady = () => {
  return ({
    type: 'SET_PLAYER_READY'
  })
}

export const togglePlay = () => {
  return ({
    type: 'TOGGLE_PLAY'
  })
}

export const playingSong = () => {
  return ({
    type: 'PLAYING_SONG'
  })
}

export const setUpcomingQueue = ({tracks}) => {
  return ({
    type: 'SET_UPCOMING_QUEUE',
    tracks
  })
}