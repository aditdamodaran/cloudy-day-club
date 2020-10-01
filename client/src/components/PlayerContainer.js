import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAlbumPrimaryColor } from '../colors'
import { rgbToHex, calcTextColor } from '../utils';
import { catchErrors } from '../utils'
import styled from 'styled-components/macro';
import Player from './Player/Player'

const PlayerPageContainer = styled.div`
  height: 100%;
  flex-grow: 1;
  flex-basis: 40%;
  display: grid;
  place-content: center;
  transition: background-color 1.3s ease-in-out;
  -webkit-transition: background-color 1.3s ease-in-out;
  -moz-transition: background-color 1.3s ease-in-out;
  -o-transition: background-color 1.3s ease-in-out;
`
export default () => {
  const [color, setColor] = useState('#5F2233')
  const [lightText, setLightText] = useState(true)
  const [standardView, setStandardView] = useState(true)
  const albumArtUrl = useSelector(state => state.playback.albumArt)

  useEffect(() => {
    if (albumArtUrl !== '') {
      // only run upon playing a song
      async function updateColors() {
        var response = await getAlbumPrimaryColor(albumArtUrl);
        const color = rgbToHex(response.data);
        const lightText = calcTextColor(response.data);
        setColor(color)
        setLightText(lightText)
      }
      
      catchErrors(updateColors());
    }
  }, [albumArtUrl])

  return (
    <PlayerPageContainer style={{ backgroundColor: `${color}` }}>
      <Player lightText={lightText} standardView={standardView}/> 
      {/*<button onClick={()=>setStandardView(!standardView)}>Toggle Data View</button>*/}    
    </PlayerPageContainer>
  );
}