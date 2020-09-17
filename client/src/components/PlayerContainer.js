import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAlbumPrimaryColor } from '../colors'
import styled from 'styled-components/macro';
import { catchErrors } from '../utils'
import { rgbToHex, calcTextColor } from '../utils';
import { CSSTransition } from 'react-transition-group'
import Player from './Player'

const defaultColor = "#5F2233"

const PlayerPageContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-basis: 40%;
  display: grid;
  place-content: center;
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
      <CSSTransition
        in={(this.props.playback.trackName === this.state.trackName)} 
        timeout={300}
        className="test"
        nodeRef={this.nodeRef}
      >
        <PlayerPageContainer 
          ref={this.nodeRef}
          style={{
            background: `${this.state.color}`
          }}
        >
        <Player lightText={this.state.lightText}/>      
      </PlayerPageContainer>
      </CSSTransition>
    );
  }
}


const mapStateToProps = (state) => {
  const { playback } = state
  return { playback }
}


export default connect(mapStateToProps, undefined)(PlayerContainer)