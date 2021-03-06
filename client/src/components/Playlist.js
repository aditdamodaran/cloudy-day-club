import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlaylistHeader } from './Playlist/PlaylistHeader'
import { getPlaylist, getAudioFeaturesForTracks } from '../spotify';
import { playTrack, setUpcomingQueue } from '../actions/playerControls'
import { PlayButton } from './Playlist/PlayButton'
import playIcon from '../icons/play-icon-circular.svg'
import defaultPlaylistCover from '../icons/default-playlist-cover.svg'
import Loader from '../components/Loader'
import { catchErrors, formatTime } from '../utils'
import merge from 'lodash.merge'
import styled from 'styled-components/macro';

const PlaylistItems = styled.table`
  color: white;
  display: grid;
  border-collapse: collapse;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-size: 0.8rem;
  min-width: 100%;
  grid-template-columns: 
    minmax(75px, 1fr)
    minmax(150px, 2fr)
    minmax(150px, 2fr)
    minmax(150px, 1fr);

  thead, tbody, tr {
    display: contents;
  }

  th, td {
    padding: 0.7rem;
    padding-left: 0.3rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th {
    top: 0;
    text-align: left;
    font-weight: normal;
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
  }

  th:last-child {
    border: 0;
  }

  td {
    display: flex;
    border-top: 1px solid #3A3A3A;
    align-items: center;
  }

  td:first-child {
    img {
      width: 20%;
      filter: brightness(0) invert(1);
      margin: 0 auto;
      padding: 0;
      cursor: pointer;
      &:hover {
        opacity: 0.75;
      }
    }
  }

  td {
    padding: 0.5rem 0.3rem;
    color: #CACACA;
  }
`

const TableText = styled.div`
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 90%;
`

const handlePlay = (playback, dispatch, albumArt, uri, name, artist, idx) => {
  // first check that we are in fact playing a different track
  if (!playback.pauseTrack || playback.uri !== uri) { 
    dispatch(
      playTrack({
      albumArt,
      uri,
      name,
      artist,
      idx
    }))
  }
}

const handleSetUpcomingQueue = (tracks, dispatch) => {
  dispatch(setUpcomingQueue({tracks}))
}

export default ({ playlistId }) => {
  const [playlist, setPlaylist] = useState(undefined)
  const [playlistTracks, setPlaylistTracks] = useState(undefined)
  const playback = useSelector(state => state.playback)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getData() {
      const playlistData = await getPlaylist(playlistId);
      // const audioFeaturesData = await getAudioFeaturesForTracks(playlistData.data.tracks.items);
      
      // const audioFeatures = audioFeaturesData.data.audio_features.reduce((obj, item) => (
      //   obj[item.id] = {
      //     acousticness: item.acousticness,
      //     danceability: item.danceability,
      //     energy: item.energy,
      //     instrumentalness: item.instrumentalness,
      //     speechiness: item.speechiness,
      //     temp: item.tempo,
      //     valence: item.valence
      //     // eslint-disable-next-line 
      //   }, obj) ,{}
      // );
      
      const tracks = playlistData.data.tracks.items.map(({track}, idx)=>({[idx] : track})).reduce((obj, item) => {
        const index = Object.keys(item)[0]
        const track = item[index]
        return (obj[track.id] = {
            idx : parseInt(index),
            trackArtist: track.artists[0].name,
            trackLength: track.duration_ms,
            trackName: track.name,
            albumArt: track.album.images[0].url,
            albumName: track.album.name
            // eslint-disable-next-line 
          }, obj)
      }, {})

      catchErrors(dispatch(setUpcomingQueue({tracks})))

      const combined = merge(tracks) // , audioFeatures)
      setPlaylist(playlistData.data)
      setPlaylistTracks(combined)
    }
    
    catchErrors(getData());
  }, [playlistId])

  return(
    <div>
      {playlist 
      ? <PlaylistHeader 
          name={playlist.name}
          image={
            playlist.images.length !== 0 
            ? playlist.images[0].url 
            : defaultPlaylistCover}
          ownerUrl={playlist.owner.external_urls.spotify}
          ownerName={playlist.owner.display_name}
          spotifyUrl={playlist.external_urls.spotify}
        />
      : <div />}
      {playlistTracks
        ? <div>
            <PlaylistItems>
              <thead>
                <tr>
                  <th>{/*Play Btns.*/}</th>
                  <th>NAME</th>
                  <th>ARTIST</th>
                  <th>LENGTH</th>
                </tr>
              </thead>
              <tbody>
              {Object.keys(playlistTracks).map((key)=> {
                const track = playlistTracks[key]
                return (
                  <tr key={key}>
                    <td>
                      {playback.playerReady 
                        ? <PlayButton
                            nowPlaying={playback.uri === key} 
                            albumArt={track.albumArt}
                            uri={key}
                            trackName={track.trackName}
                            artist={track.trackArtist}
                            playOnKeyDown={() => 
                              handlePlay(
                              playback, // redux store state
                              dispatch, // dispatch function
                              track.albumArt, // albumArt
                              key, // uri
                              track.trackName, // track
                              track.trackArtist, // artist,
                              track.idx // idx
                              )                 
                            }
                            playOnClick={() => 
                              handlePlay(
                                playback, // redux store state
                                dispatch, // dispatch function
                                track.albumArt, // albumArt
                                key, // uri
                                track.trackName, // track
                                track.trackArtist, // artist,
                                track.idx // idx
                              )
                            }
                          />
                        : <img alt="play-icon-loading" src={playIcon} />}
                    </td>
                    <td><TableText>{track.trackName}</TableText></td>
                    <td><TableText>{track.trackArtist}</TableText></td>
                    <td>{formatTime(track.trackLength)}</td>
                  </tr>
              )})}
              </tbody>
            </PlaylistItems>
          </div>
        : <Loader />}
    </div>
  )
}