import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';

const PlaylistItem = styled.div`
  margin: 0 auto;
  width: 100%;
  vertical-align: top;
  display: inline-block;
  /* Works way faster than loading in Proxima Nova?? */
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-weight: 600;
`

const PlaylistCoverContainer = styled.div`
  width: 100%;
  display: inline-block;
`
const PlaylistCover = styled.div` 
  width: 100%;
  height: 0;
  padding-bottom: 100%;   
`

export default ({image, link, name}) => (
  <PlaylistItem>
    <Link to={link}>
      <PlaylistCoverContainer>
        <PlaylistCover className="playlist-cover" 
        style={{
          background: `url(${image ? image : ""})`
        }}
        alt={name}
      />
      </PlaylistCoverContainer>
    </Link>
    <Link to={link} className="playlist-link">{name}</Link>
  </PlaylistItem>
)