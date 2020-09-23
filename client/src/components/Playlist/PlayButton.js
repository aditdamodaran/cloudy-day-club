import React from 'react';
import playIcon from '../../icons/play-icon-circular.svg'
import soundIcon from '../../icons/sound-icon-circular.svg'
import styled from 'styled-components/macro';

const PlayButtonStyle = styled.img`
  opacity: ${props => props.nowPlaying ? '0.3' : '1'};
`

export const PlayButton = ({nowPlaying, albumArt, uri, trackName, playOnKeyDown, playOnClick}) => (
  <PlayButtonStyle
    alt="play-icon"
    nowPlaying={nowPlaying}
    src={nowPlaying ? soundIcon : playIcon} 
    tabIndex={0}
    onKeyDown={(event) => {
      if(event.key === 'Enter'){
        playOnKeyDown(albumArt, uri, trackName)
      }
    }}
    onClick={() => playOnClick(albumArt, uri, trackName)}
  />
)