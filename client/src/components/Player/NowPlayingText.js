import React from 'react';
import styled from 'styled-components/macro';

const NowPlaying = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  text-align: center;
  flex-basis: 100%;
`

export const NowPlayingText = ({lightText, trackName}) => (
  <NowPlaying
    style={{ color: `${lightText ? 'white' : 'black'}` }}
  >
    {trackName === "" ? 'Welcome to Cloudy Day Club' : trackName}
  </NowPlaying>
)