import React, { Component } from 'react';
import Script from 'react-load-script';
import { connect } from 'react-redux'
import { setPlayerReady, togglePlay } from '../../actions/playerControls'
import { getAccessToken, playTrack, resumeTrack } from '../../spotify'
import { StandardPlayer } from './StandardPlayer'

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
      if (state){
        this.setState({ paused: state.paused })
      } 
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
      <div>
          <StandardPlayer  
              albumArt={this.props.playback.albumArt}
              lightText={this.props.lightText} 
              trackName={this.props.playback.trackName}
              playerReady={this.state.playerReady}
              uri={this.props.playback.uri}
              paused={this.state.paused}
              togglePlayback={this.togglePlayback.bind(this)}
          />
        <header>
          <Script
            url="https://sdk.scdn.co/spotify-player.js"
            onCreate={this.handleScriptCreate.bind(this)}
            onError={this.handleScriptError.bind(this)}
            onLoad={this.handleScriptLoad.bind(this)}
          />
        </header>
      </div>
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