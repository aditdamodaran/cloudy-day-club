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

const PlaylistCover = styled.div`
  width: 100%;
  display: inline-block;
  img {
    &:hover{
      opacity: 0.5;
      transition: 0.2s;
    }
    width: 12.5vw;
    height: 12.5vw;
    object-fit: cover;
  }
`

export default ({image, link, name}) => (
  <PlaylistItem>
    <Link to={link}>
      <PlaylistCover>
        <img src={image} alt={name}/>
      </PlaylistCover>
    </Link>
    <Link to={link} className="playlist-link">{name}</Link>
  </PlaylistItem>
)