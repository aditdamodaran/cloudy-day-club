import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAlbumPrimaryColor } from '../colors'
import styled from 'styled-components/macro';
import { catchErrors } from '../utils'
import { rgbToHex, calcTextColor } from '../utils';
import Player from './Player/Player'

const defaultColor = "#5F2233"

const PlayerPageContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-basis: 40%;
  display: grid;
  place-content: center;
  -webkit-transition: background-color 1.3s ease-in-out;
  -ms-transition: background-color 1.3s ease-in-out;
  transition: background-color 1.3s ease-in-out;
`
class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = React.createRef(null);
    this.state = {
      color: defaultColor,
      lightText: true
    }
  }

  // Applies new Color if Album Changes
  async getAlbumColor(albumArtUrl) {
    var resp = await getAlbumPrimaryColor(albumArtUrl);
    const color = rgbToHex(resp.data);
    const lightText = calcTextColor(resp.data);
    const trackName = this.props.playback.trackName;
    this.setState({color, lightText, trackName})
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.playback.uri !== this.props.playback.uri) {
      const albumArtUrl = this.props.playback.albumArt;
      if (albumArtUrl !== prevProps.playback.albumArt){
        catchErrors(this.getAlbumColor(albumArtUrl));
      } else {
        // Same Album (No Update Necessary)
      }
    } else if (prevProps.playback.uri === this.props.playback.uri 
      && (this.state.color === defaultColor)){
      // Starting Up Player
    } else {
      // New Song is Playing
    }
  }

  render() {
    return (
      <PlayerPageContainer 
        ref={this.nodeRef}
        style={{
          backgroundColor: `${this.state.color}`
        }}
      >
        <Player lightText={this.state.lightText}/>      
      </PlayerPageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  const { playback } = state
  return { playback }
}

export default connect(mapStateToProps, undefined)(PlayerContainer)