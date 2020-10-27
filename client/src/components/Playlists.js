import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylists } from '../spotify';
import { cachePlaylists } from '../actions/cachePlaylists';
import { catchErrors } from '../utils'
import styled from 'styled-components/macro';
import PlaylistContainer from './PlaylistContainer'
import defaultPlaylistCover from '../icons/default-playlist-cover.svg'
import Loader from '../components/Loader'

const PlaylistsGridContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  min-height: 75vh;
  margin: 2rem auto;
  flex-wrap: wrap;
`

const PlaylistsHeader= styled.h2`
  flex-basis: 100%;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-size: 2rem;
`

const PlaylistsGrid= styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;
  margin-bottom: 15rem;
`

export default () => {
  const cache = useSelector(state => state.cache);
  const [ playlists, setPlaylists ] = useState(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      const { data } = await getPlaylists();
      setPlaylists(data)
      dispatch(cachePlaylists({ playlists: data }))
    }

    // use the redux cache if we can, 
    // but get data on the first load
    if ( cache.playlists.items ) {
      setPlaylists(cache.playlists); 
    } else {
      catchErrors(getData());
    }
  }, [cache.playlists, dispatch])

  return (
    <PlaylistsGridContainer>
      <PlaylistsHeader>Playlists</PlaylistsHeader>
        {playlists ?
          <PlaylistsGrid 
            id="playlist-grid"
          >
            {playlists.items.map((playlist) => (
              <PlaylistContainer
                key={playlist.id}
                link={`playlist/${playlist.id}`}
                name={playlist.name}
                image={
                  playlist.images.length !== 0 
                  ? playlist.images[0].url 
                  : defaultPlaylistCover}
              />
            ))}
          </PlaylistsGrid>
        : <Loader />}
    </PlaylistsGridContainer>
  );
}