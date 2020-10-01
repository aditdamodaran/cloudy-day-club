import React from 'react';
import styled from 'styled-components/macro';
import StandardView from './Views/StandardView'
import DataView from './Views/DataView'
import Controls from './Controls';

const PlayerSection = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const StandardPlayer = ({albumArt, lightText, trackName, uri, paused, playerReady, togglePlayback, standardView}) => {
  return (
    <PlayerSection className="fadeInFast">
      {standardView
        ? <StandardView 
            albumArt={albumArt}
            lightText={lightText}
            trackName={trackName}
          />
        : <DataView />}
      {playerReady && uri !== "" 
        ? <Controls 
            lightText={lightText} 
            togglePlayback={togglePlayback}
            paused={paused}
          />
        : <div />}
    </PlayerSection>
  )
}