import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAlbumPrimaryColor } from '../colors'
import styled from 'styled-components/macro';
import { catchErrors } from '../utils'
import { rgbToHex, calcTextColor } from '../utils';
import Player from './Player/Player'

const PlayerPageSection = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`

const PlayerPageContainer = styled.div`
  height: 90%;
  flex-grow: 1;
  flex-basis: 40%;
  flex-wrap: wrap;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  -webkit-transition: background-color 1.3s ease-in-out;
  -ms-transition: background-color 1.3s ease-in-out;
  transition: background-color 1.3s ease-in-out;
`


class RecordPlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = React.createRef(null);
    this.state = {
      color: this.props.playback.defaultColor,
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
      && (this.state.color === this.props.playback.defaultColor)){
      // Starting Up Player
    } else {
      // New Song is Playing
    }
  }

  render() {
    // console.log(this.props.playback)
    return (
      <PlayerPageSection
        style={{
          backgroundColor: `${this.state.color}`,
          transition: '0.3s'
        }}
      >
        <PlayerPageContainer 
          ref={this.nodeRef}
        >
          <Player 
            lightText={this.state.lightText} 
            recordPlayer={true} 
            color={this.state.color}
          />
        </PlayerPageContainer>
      </PlayerPageSection>
    );
  }
}

const mapStateToProps = (state) => {
  const { playback } = state
  return { playback }
}

export default connect(mapStateToProps, undefined)(RecordPlayerContainer)