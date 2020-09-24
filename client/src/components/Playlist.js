import React, {Component} from 'react';
import { getPlaylist, getAudioFeaturesForTracks } from '../spotify';
import { catchErrors } from '../utils'
import { connect } from 'react-redux'
import { playTrack } from '../actions/playerControls'
import { PlaylistHeader } from './Playlist/PlaylistHeader'
import { PlayButton } from './Playlist/PlayButton'
import playIcon from '../icons/play-icon-circular.svg'
import defaultPlaylistCover from '../icons/default-playlist-cover.svg'
import Loader from '../components/Loader'
import styled from 'styled-components/macro';
import _ from 'lodash'


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

class Playlist extends Component {
  constructor(props){
    super(props)
    this.handlePlay = this.handlePlay.bind(this)
    this.state = {
      playlist: null,
      tracks: null,
      audioFeatures: null,
      combined: {},
      paused: false,
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
      // Dispatch playTrack action
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
          : <Loader />}
        {Object.keys(combined).length !== 0 
          ? <div className="fadeinFast">
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
                  {Object.keys(combined).map((key, idx) => (
                      <tr key={key}>
                        <td>
                          {this.props.playback.playerReady 
                            ? <PlayButton
                                  nowPlaying={this.props.playback.uri === key} 
                                  albumArt={combined[key].albumArt}
                                  uri={key}
                                  trackName={combined[key].trackName}
                                  playOnKeyDown={this.handlePlay.bind(this)}
                                  playOnClick={this.handlePlay.bind(this)}
                                />
                            : <img alt="play-icon-loading" src={playIcon} />}
                        </td>
                        <td><TableText>{combined[key].trackName}</TableText></td>
                        <td><TableText>{combined[key].trackArtist}</TableText></td>
                        <td>{this.formatTime(combined[key].trackLength)}</td>
                      </tr>
                    ))}
                  </tbody>
                </PlaylistItems>
              </div>
            : <Loader />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { playback, cache } = state
  return { playback, cache }
}

const mapDispatchToProps = (dispatch) => ({
  playTrack: (trackObject) => dispatch(playTrack(trackObject))
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlist)