import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getAlbumPrimaryColor } from '../colors'
import styled from 'styled-components/macro';
import { catchErrors } from '../utils'
import { rgbToHex, calcTextColor } from '../utils';
import { CSSTransition } from 'react-transition-group'
import Player from './Player'

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
      color: "#5F2233",
      lightText: true
    }
  }

  async getAlbumColor(albumArtUrl) {
    var resp = await getAlbumPrimaryColor(albumArtUrl);
    const color = rgbToHex(resp.data);
    const lightText = calcTextColor(resp.data);
    const trackName = this.props.playback.trackName;
    console.log('applying new color')
    this.setState({color, lightText, trackName})
  }

  componentDidUpdate(prevProps, prevState){
    // console.log('playerCONTAINER componentDidUpdate')
    if (prevProps.playback.uri !== this.props.playback.uri) {
      // console.log('componentDidUpdate, track changed', this.props.playback.trackName)
      const albumArtUrl = this.props.playback.albumArt;
      if (albumArtUrl !== prevProps.playback.albumArt){
        // console.log('componentDidUpdate, album changed', this.props.playback.albumArt, prevProps.playback.albumArt)
        catchErrors(this.getAlbumColor(albumArtUrl));
      } else {
        console.log('no updates to color')
      }
    } else if (prevProps.playback.uri === this.props.playback.uri && (this.state.color === 'peachpuff')){
      console.log('starting up')
    }
    else {
      console.log('no updates to track')
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
        }}>
        <Player lightText={this.state.lightText}/>      
      </PlayerPageContainer>
      </CSSTransition>
    );
  }
}


const mapStateToProps = (state) => {
  // From Store
  const { playback } = state
  return { playback }
}


export default connect(mapStateToProps, undefined)(PlayerContainer)