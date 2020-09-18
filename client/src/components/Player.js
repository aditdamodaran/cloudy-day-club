import React, { Component } from 'react';
import Script from 'react-load-script';
import { connect } from 'react-redux'
import { getAccessToken, playTrack, resumeTrack } from '../spotify'
import styled from 'styled-components/macro';
import spotifyLogo from '../icons/spotify-logo.svg'
import playIcon from '../icons/play-icon.svg'
import pauseIcon from '../icons/pause-icon.svg'
import { setPlayerReady, togglePlay } from '../actions/playerControls'

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

const NowPlaying = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  text-align: center;
  flex-basis: 100%;
`

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const CircularContainer = styled.div`
  z-index: 0;
  width: 5vw;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`

const TogglePlay = styled.img`
  z-index: 1;
  width: 50%;
  /* border: 1px solid ${this.props.lightText ? 'white' : 'black'}; */
`

// const SliderContainer = styled.div`
//   width: 100%;
//   display: flex;
// `
// const Slider = styled.input`
//   width: 50%;
//   margin: 0 auto;
// `

class Player extends Component {
  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadFailure = this.handleLoadSuccess.bind(this);
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

  handleLoadSuccess() {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
    const token = getAccessToken();
    console.log('Running handleLoadSuccess in Player')
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
      // console.log('executePlaySong', uri)
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
      <PlayerSection>
        <AlbumArt id="album-art" 
          src={this.props.playback.albumArt ? this.props.playback.albumArt : spotifyLogo} 
        />
        <NowPlaying
          style={{
            color: `${this.props.lightText ? 'white' : 'black'}`
          }}
        >
          {this.props.playback.trackName === "" ? 
          'Welcome to Cloudy Day Club' 
          : this.props.playback.trackName}
        </NowPlaying>
        {this.state.playerReady && this.props.playback.uri !== "" ?
          (<ControlsContainer>
            
            {/*<SliderContainer>
              <Slider type="range" min="1" max="100" value={this.calcSliderPosition()} />
            </SliderContainer>*/}
            {/*<button onClick={() => this.executePlaySong(this.props.playback.uri.toString())}>Start from Beginning</button>*/}
              <CircularContainer
                style={{
                  border: `${this.props.lightText ? '3px solid white' : '3px solid black'}`
                }}
                onClick={() => this.togglePlayback()}
              >
                <TogglePlay 
                  src={(this.state.paused) ? 
                    playIcon : pauseIcon 
                  }
                  style={{
                    filter: `${this.props.lightText ? 'brightness(0) invert(1)' : 'brightness(0)'}`,
                  }}
                />
              </CircularContainer>
            </ControlsContainer>
          )
          : (<div></div>)
        }
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
  // setPlayerState: (state) => dispatch(setPlayerState(state)),
  setPlayerReady: () => dispatch(setPlayerReady()),
  togglePlay: () => dispatch(togglePlay())
})


const mapStateToProps = (state) => {
  // From Store
  const { playback } = state
  // console.log(playback)
  return { playback }
}


export default connect(mapStateToProps, mapDispatchToProps)(Player)