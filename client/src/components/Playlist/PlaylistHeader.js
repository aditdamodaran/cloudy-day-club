import React from 'react';
import styled from 'styled-components/macro';

const PlaylistHeaderContainer = styled.div`
  margin: 2rem auto;
  width: 90%;
  display: flex;
  img {
    display: flex;
    width: 12.5vw;
    height: 12.5vw;
    object-fit: cover;
  }
`

const PlaylistInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 70%;
  flex-grow: 1;
  margin-left: 1rem;
  width: 90%;
  color: white;
`

const PlaylistTitle = styled.h1` 
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0 0;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  width: 90%;
  align-self: flex-start;
`

const SubHeader = styled.div`
  align-self: flex-end;
`

const PlaylistCreator = styled.h3`
  width: 100%;
  display: block;  
  color: white;
  font-weight: 500;
  font-size: 1rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0;
  margin-bottom: 0.3rem;
  a {
    color: white;
  }
`

const OpenWithSpotify = styled.a`
  margin: 0;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
`

export const PlaylistHeader = ({name, image, ownerUrl, ownerName, spotifyUrl}) => (
  <PlaylistHeaderContainer>
    <img alt={`Playlist cover for ${name}`} src={image} />
    <PlaylistInfo>

      <PlaylistTitle>{name}</PlaylistTitle>

      <SubHeader>
        <PlaylistCreator>{`By: `}   
        <a href={ownerUrl}>
          {ownerName}
        </a></PlaylistCreator>
        <OpenWithSpotify href={spotifyUrl}>
          Open this playlist with Spotify
        </OpenWithSpotify>
      </SubHeader>
      
    </PlaylistInfo>
  </PlaylistHeaderContainer>
)