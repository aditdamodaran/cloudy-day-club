import React, { Component } from 'react';
import Script from 'react-load-script';
import { connect } from 'react-redux'
import { setPlayerReady, togglePlay } from '../../actions/playerControls'
import CloudyDayClubLogo from '../../icons/logo.svg'
import { getAccessToken, playTrack, resumeTrack } from '../../spotify'
import styled from 'styled-components/macro';
import { NowPlayingText } from './NowPlayingText';
import { Controls } from './Controls';

const AlbumArt = styled.img`
  width: 20vw;
  height: 20vw;
  border: none;
`

const PlayerSection = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

class Player extends Component {
  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadFailure = this.handleLoadSuccess.bind(this);
    this.togglePlayback = this.togglePlayback.bind(this)
    this.cb = this.cb.bind(this);
    this.nodeRef = React.createRef(null);
    this.state = {
      playerReady: false,
      trackName: "",
      currentPosition: 0
    }
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.playback.uri !== "" && prevProps.playback.uri !== this.props.playback.uri){
      this.executePlaySong(this.props.playback.uri);
    }
  }

  async handleLoadSuccess() {
    this.setState({ scriptLoaded: true });
    const token = await getAccessToken();
    this.player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    
    // Error handling
    this.player.addListener('initialization_error', ({ message }) => { console.error(message); });
    this.player.addListener('authentication_error', ({ message }) => { console.error(message); });
    this.player.addListener('account_error', ({ message }) => { console.error(message); });
    this.player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    this.player.addListener('player_state_changed', state => { 
      this.setState({ paused: state.paused })
    });

    // Ready
    this.player.addListener('ready', ({ device_id }) => {
      this.setState({ playerReady: true });
      this.deviceId = device_id
      console.log('Ready with Device ID', device_id);
      this.props.setPlayerReady()
    });

    // Not Ready
    this.player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    this.player.connect();
  }

  cb(token) {
    return(token);
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log("Script created");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
    console.log("Script error");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true});
    console.log("Script loaded");
  }

  executePlaySong(uri){
    if (this.deviceId){
      playTrack(uri, this.deviceId)
    }
  }

  togglePlayback(){
    this.player.togglePlay()
    this.props.togglePlay()
  }

  executeResumeSong(){
    resumeTrack(this.deviceId)
  }

  render() {
    return (
      <PlayerSection className="fadeInFast">
        <AlbumArt id="album-art" 
          src={
            this.props.playback.albumArt 
            ? this.props.playback.albumArt 
            : CloudyDayClubLogo} 
        />
        <NowPlayingText 
          lightText={this.props.lightText} 
          trackName={this.props.playback.trackName}
        />
        {this.state.playerReady && this.props.playback.uri !== "" 
          ? <Controls 
              lightText={this.props.lightText} 
              togglePlayback={this.togglePlayback.bind(this)}
              paused={this.state.paused}
            />
          : <div />}
        <header>
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </header>
      </PlayerSection>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPlayerReady: () => dispatch(setPlayerReady()),
  togglePlay: () => dispatch(togglePlay())
})

const mapStateToProps = (state) => {
  const { playback } = state
  return { playback }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)