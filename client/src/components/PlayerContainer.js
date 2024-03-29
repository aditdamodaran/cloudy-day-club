import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAlbumPrimaryColor } from '../colors'
import { rgbToHex, calcTextColor } from '../utils';
import { catchErrors } from '../utils'
import styled from 'styled-components/macro';
import statsIcon from '../icons/stats-icon.svg'
import fullScreenIcon from '../icons/full-screen.svg'
import recordIcon from '../icons/album-cover-icon.svg'
import minimizeFullScreenIcon from '../icons/minimize-full-screen.svg'
import Player from './Player/Player'

const PlayerPageContainer = styled.div`
  height: calc(100% - 2rem);
  flex-grow: 1;
  flex-basis: 40%;
  padding: 1rem;
  transition: background-color 1.3s ease-in-out;
  -webkit-transition: background-color 1.3s ease-in-out;
  -moz-transition: background-color 1.3s ease-in-out;
  -o-transition: background-color 1.3s ease-in-out;
`

const PlayerPageInnerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const ToggleDataViewButton = styled.button`
  background: none;
  border: none;
  width: 3rem;
  height: 3rem;
  align-self: flex-end;
  cursor: pointer;
  img {
    background: none;
  }
  &:focus {
    outline: ${props => props.userCanClick ? 'none' : '-webkit-focus-ring-color auto 1px'}
  }
`

const FullScreenButton = styled.button`
  background: none;
  border: none;
  width: 3rem;
  height: 3rem;
  align-self: flex-end;
  cursor: pointer;
  img {
    background: none;
  }
  /* &:focus {
    outline: ${props => props.userCanClick ? 'none' : '-webkit-focus-ring-color auto 1px'}
  } */
`


export default () => {
  const [color, setColor] = useState('#111111')
  const [lightText, setLightText] = useState(true)
  const [standardView, setStandardView] = useState(true)
  const [fullScreen, setFullScreen] = useState(false)
  const albumArtUrl = useSelector(state => state.playback.albumArt)
  // Accessibility Minded Toggle Focus -- Assumes User is On Keyboard by Default
  const [userCanClick, setUserCanClick] = useState(false)     

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
    <PlayerPageContainer 
      style={{ backgroundColor: `${color}` }}
      className={`fadeIn2sAfter1s + ${fullScreen ? 'full-screen-player' : 'half-screen-player'}`}
    >
      <PlayerPageInnerContainer>
        <Player 
          lightText={lightText} 
          standardView={standardView}
        /> 
        <FullScreenButton
          style={{
            filter: lightText ? 'brightness(0) invert(1)' : 'none'
          }}
          onClick={()=>{
            setFullScreen(!fullScreen)
            setUserCanClick(true)
          }}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              e.preventDefault()
              setFullScreen(!fullScreen)
            }
          }}
        >
          <img src={fullScreen ? minimizeFullScreenIcon : fullScreenIcon} alt="toggle-full-screen" />
        </FullScreenButton>
        <ToggleDataViewButton
          userCanClick={userCanClick}
          style={{
            filter: lightText ? 'brightness(0) invert(1)' : 'none'
          }}
          onClick={()=>{
            setStandardView(!standardView)
            setUserCanClick(true)
          }}
          onKeyDown={(e) => {
            if(e.key === 'Enter'){
              e.preventDefault()
              setStandardView(!standardView)
            }
          }}
          >
          <img src={standardView ? statsIcon : recordIcon} alt="view-songs-statistics" />
        </ToggleDataViewButton>
      </PlayerPageInnerContainer>
    </PlayerPageContainer>
  );
}