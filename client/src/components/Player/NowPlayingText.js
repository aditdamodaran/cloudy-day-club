import React from 'react';
import styled from 'styled-components/macro';

const NowPlaying = styled.h1`
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  flex-basis: 100%;
  width: 100%;
  font-size: 2.4rem;
`;

export default ({ className, lightText, trackName, altText }) => (
  <NowPlaying
    className={className}
    style={{ color: `${lightText ? 'white' : 'black'}` }}
  >
    {trackName === '' ? altText : trackName}
  </NowPlaying>
);
