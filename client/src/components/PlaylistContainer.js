import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components/macro';

const PlaylistItem = styled.div`
  margin: 0 auto;
  width: 100%;
  vertical-align: top;
  display: inline-block;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-weight: 600;
`

const PlaylistCoverContainer = styled.div`
  width: 100%;
  display: inline-block;
  margin-bottom: 0.25rem;
`

const PlaylistCover = styled.div` 
  width: 100%;
  height: 0;
  padding-bottom: 100%;   
`

const PlaylistName = styled(Link)`
  font-weight: 600;
  font-size: 0.8rem;
`

export default ({image, link, name}) => (
  <PlaylistItem>
    <Link to={link}>
      <PlaylistCoverContainer>
        <PlaylistCover className="playlist-cover" 
          style={{background: `url(${image ? image : ""})`}}
          alt={name}
        />
      </PlaylistCoverContainer>
    </Link>
    <PlaylistName to={link} className="playlist-link">{name}</PlaylistName>
  </PlaylistItem>
)