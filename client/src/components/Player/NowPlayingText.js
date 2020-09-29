import React from 'react';
import styled from 'styled-components/macro';

const NowPlaying = styled.h1`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  text-align: center;
  flex-basis: 100%;
  width: 100%;
  font-size: 2.4rem;
`;

export default ({ lightText, trackName }) => (
  <NowPlaying
    style={{ color: `${lightText ? 'white' : 'black'}` }}
  >
    {trackName === '' ? 'Welcome to Cloudy Day Club' : trackName}
  </NowPlaying>
);
