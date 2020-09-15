const cacheReducerDefaultState = {
  playlists: {}
}

export default (state = cacheReducerDefaultState, action) => {
  switch (action.type) {
    case 'CACHE_PLAYLISTS':
      return state = {
        playlists: action.playlists
      }
    default:
      return state;
  }
}