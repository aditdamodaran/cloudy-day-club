import React, { useState } from 'react';
import styled from 'styled-components/macro';
import playIcon from '../../icons/play-icon.svg'
import pauseIcon from '../../icons/pause-icon.svg'

const ControlsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const CircularContainer = styled.div`
  z-index: 0;
  width: 5vw;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-content: center;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    opacity: 0.75;
  }
`;

const TogglePlay = styled.img`
  z-index: 1;
  width: 50%;
  &:focus {
    outline: ${props => props.userCanClick ? 'unset' : '-webkit-focus-ring-color auto 1px'}
  }
`;

export default ({ className, lightText, togglePlayback, paused }) => {
  // Accessibility Minded Toggle Focus -- Assumes User is On Keyboard by Default
  const [userCanClick, setUserCanClick] = useState(false)     
  
  return (
    <ControlsContainer className={className}>
      <CircularContainer
        style={{
          border: `${
            lightText 
            ? '3px solid white' 
            : '3px solid black'}`
        }}
        onClick={() => {
          togglePlayback()
          setUserCanClick(true) // Maybe set this via Redux to cache the behavior
        }}
        onKeyDown={(event) => {
          if(event.key === 'Enter'){
            togglePlayback()        
          }
        }}
      >
        <TogglePlay 
          userCanClick={userCanClick}
          tabIndex={0}
          src={paused 
            ? playIcon 
            : pauseIcon 
          }
          style={{
            filter: `${
              lightText 
              ? 'brightness(0) invert(1)' 
              : 'brightness(0)'}`
          }}
        />
      </CircularContainer>
    </ControlsContainer>
  );
};
