import React from 'react';
import styled from 'styled-components/macro';
import CloudyDayClubLogo from './../../../icons/logo.svg';
import NowPlayingText from './../NowPlayingText';

const StandardViewSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

const AlbumArt = styled.img`
  width: 20vw;
  height: 20vw;
  border: none;
`

export default ({albumArt, lightText, trackName}) => (
  <StandardViewSection>
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
  </StandardViewSection>
)
