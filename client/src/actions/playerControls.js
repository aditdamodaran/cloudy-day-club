export const playTrack = ({albumArt, uri, name, artist}) => ({
  type: 'PLAY_TRACK',
  albumArt,
  uri,
  name,
  artist
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