import React, {Component} from 'react';
import { getPlaylist, getAudioFeaturesForTracks } from '../spotify';
import { catchErrors } from '../utils'
import { connect } from 'react-redux'
import { playTrack } from '../actions/playerControls'
import styled from 'styled-components/macro';
import playIcon from '../icons/play-icon-circular.svg'
import { Link } from '@reach/router';
import _ from 'lodash'

const PlaylistHeaderContainer = styled.div`
  margin: 2rem auto;
  width: 90%;
  display: flex;
  img {
    display: flex;
    width: 12.5vw;
    height: 12.5vw;
    object-fit: cover;
  }
`

const PlaylistInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 70%;
  flex-grow: 1;
  margin-left: 1rem;
  width: 90%;
  color: white;
`

const PlaylistHeader = styled.h1` 
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0 0;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  width: 90%;
  align-self: flex-start;
`

const SubHeader = styled.div`
  align-self: flex-end;
`

const PlaylistCreator = styled.h3`
  width: 100%;
  display: block;  
  color: white;
  font-weight: 500;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0;
  margin-bottom: 0.3rem;
  a {
    color: white;
  }
`

const OpenWithSpotify = styled.a`
  margin: 0;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
`

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
    /* padding: 0.3rem 0.3rem; */
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

class Playlist extends Component {
  constructor(props){
    super(props)
    this.state = {
      playlist: null,
      tracks: null,
      audioFeatures: null,
      combined: {}
    };
  }

  componentDidMount() {
    catchErrors(this.getData());
  }

  async getData() {
    const { playlistId } = this.props;
    const { data } = await getPlaylist(playlistId);
    this.setState({ playlist: data });

    if (data) {
      const { playlist } = this.state;
      const { data } = await getAudioFeaturesForTracks(playlist.tracks.items);

      console.log(playlist)

      const audioFeatures = data.audio_features.reduce((obj, item) => (
        obj[item.id] = {
          acousticness: item.acousticness,
          danceability: item.danceability,
          energy: item.energy,
          instrumentalness: item.instrumentalness,
          speechiness: item.speechiness,
          temp: item.tempo,
          valence: item.valence
        // eslint-disable-next-line no-sequences
        }, obj) ,{}
      );
      // console.log(playlist.tracks.items)
      const tracks = playlist.tracks.items.map(({track})=>track).reduce((obj, item) => (
        obj[item.id] = {
          trackArtist: item.artists[0].name,
          trackLength: item.duration_ms,
          trackName: item.name,
          albumArt: item.album.images[0].url,
          albumName: item.album.name
        // eslint-disable-next-line no-sequences
        }, obj) ,{}
      );

      const combined = _.merge(tracks, audioFeatures)
      // console.log(combined)

      this.setState({ 
        audioFeatures: data,  
        combined
      });

    }
  }

  formatTime = ms => {
    const secs = (ms / 1000) // to seconds
    const minutes = parseInt(secs / 60) // to minutes
    let secsLeft = parseInt(secs - (minutes*60))
    secsLeft = ('0' + secsLeft).slice(-2)
    const result = `${minutes}:${secsLeft}`
    return result
  }

  handlePlay(albumArt, uri, name){
    // If the track is NOT already playing
    // or if a new track is selected, PLAY
    if (!this.props.playback.pauseTrack || (
      this.props.playback.uri !== uri
    )){
      this.props.playTrack({
        albumArt,
        uri,
        name
      })
    }
  }

  render() {
    const { combined, playlist } = this.state;
 
    return (
      <div>
          {playlist ?
          (<PlaylistHeaderContainer>
            <img alt={`Playlist cover for ${playlist.name}`} src={playlist.images[0].url} />
            <PlaylistInfo>
              <PlaylistHeader>{playlist.name}</PlaylistHeader>
              <SubHeader>
              <PlaylistCreator>By: @ 
                <a href={playlist.owner.external_urls.spotify}>
                  {playlist.owner.id}
                </a></PlaylistCreator>
                <OpenWithSpotify href={playlist.external_urls.spotify}>
                  Open this playlist with Spotify
                </OpenWithSpotify>
              </SubHeader>
            </PlaylistInfo>
          </PlaylistHeaderContainer>
          )
          : <div>Loading</div>}
        <PlaylistItems>
          <thead>
            <tr>
              <th></th>
              <th>NAME</th>
              <th>ARTIST</th>
              <th>LENGTH</th>
              {/*<th>acousticness</th>
              <th>danceability</th>
              <th>energy</th>
              <th>valence</th>
              <th>instrumentalness</th>
              <th>speechiness</th>
              <th>temp</th>
              <th>URI ID</th>*/}
            </tr>
          </thead>
          <tbody>
            {Object.keys(combined).length !== 0 ? 
              (Object.keys(combined).map((key, idx) => {
                return(
                  <tr key={key}>
                    <td>{this.props.playback.playerReady ? 
                      (<img alt="play-icon" 
                        src={playIcon} 
                        tabIndex={idx+1}
                        onKeyDown={(event) => {
                          if(event.key === 'Enter'){
                            this.handlePlay(combined[key].albumArt, key, combined[key].trackName)
                          }
                        }}
                        onClick={() => 
                          this.handlePlay(combined[key].albumArt, key, combined[key].trackName)
                        }
                        />)
                    : <img alt="play-icon-loading"  
                        src={playIcon} 
                      />}</td>
                    <td><TableText>{combined[key].trackName}</TableText></td>
                    <td><TableText>{combined[key].trackArtist}</TableText></td>
                    <td>{this.formatTime(combined[key].trackLength)}</td>
                    {/*<td>{combined[key].acousticness}</td>
                    <td>{combined[key].danceability}</td>
                    <td>{combined[key].energy}</td>
                    <td>{combined[key].valence}</td>
                    <td>{combined[key].instrumentalness}</td>
                    <td>{combined[key].speechiness}</td>
                    <td>{combined[key].temp}</td>
                    <td>{key}</td>*/}
                  </tr>
                )
              }
              ))
              : (<tr><td>Loading</td></tr>)}
          </tbody>
        </PlaylistItems>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  // From Store
  const { playback, cache } = state
  // console.log(playback)
  return { playback, cache }
}


const mapDispatchToProps = (dispatch) => ({
  playTrack: (trackObject) => dispatch(playTrack(trackObject)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)