import React from 'react';
import styled from 'styled-components/macro';
import CloudyDayClubLogo from './../../../icons/logo.svg';
import NowPlayingText from './../NowPlayingText';
import Controls from '../Controls';

const StandardViewSection = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-basis: 100%;
`

const AlbumArt = styled.img`
  width: 20vw;
  height: 20vw;
  display: flex;
  align-self: flex-end;
  /* border: none; */
`

const StandardNowPlayingText = styled(NowPlayingText)`
  margin: 2rem auto;
  text-align: center;
  flex-direction: column;
  align-self: center;
`;

export default ({uri, albumArt, lightText, trackName, playerReady, togglePlayback, paused}) => (
  <StandardViewSection>
    <AlbumArt id="album-art" 
      src={
        albumArt 
        ? albumArt
        : CloudyDayClubLogo} 
    />
    <StandardNowPlayingText 
      lightText={lightText} 
      trackName={trackName}
      altText={'Welcome to Cloudy Day Club'}
    />
    {playerReady && uri !== '' 
      ? <Controls 
          lightText={lightText} 
          togglePlayback={togglePlayback}
          paused={paused}
        />
      : null}
  </StandardViewSection>
)
