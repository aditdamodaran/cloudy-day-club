import React from 'react';
import styled from 'styled-components/macro';
import CloudyDayClubLogo from '../../icons/logo.svg'
import NowPlayingText from './NowPlayingText';
import Controls from './Controls';

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

export const StandardPlayer = ({albumArt, lightText, trackName, uri, paused, playerReady, togglePlayback}) => (
  <PlayerSection className="fadeInFast">
    <AlbumArt id="album-art" 
      src={
        albumArt 
        ? albumArt
        : CloudyDayClubLogo} 
    />
    <NowPlayingText 
      lightText={lightText} 
      trackName={trackName}
    />
    {playerReady && uri !== "" 
      ? <Controls 
          lightText={lightText} 
          togglePlayback={togglePlayback}
          paused={paused}
        />
      : <div />}
  </PlayerSection>
)