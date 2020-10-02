import React from 'react';
import styled from 'styled-components/macro';
import StandardView from './Views/StandardView'
import DataView from './Views/DataView'

const PlayerSection = styled.div`
  height: 60%;
  width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const StandardPlayer = ({albumArt, lightText, trackName, uri, paused, playerReady, togglePlayback, standardView, artist}) => {
  return (
    <PlayerSection className="fadeInFast">
      {standardView
        ? <StandardView 
            albumArt={albumArt}
            lightText={lightText}
            trackName={trackName}
            playerReady={playerReady}
            togglePlayback={togglePlayback}
            paused={paused}
            uri={uri}
          />
        : <DataView 
            albumArt={albumArt}
            lightText={lightText}
            trackName={trackName}
            artist={artist}
            playerReady={playerReady}
            togglePlayback={togglePlayback}
            paused={paused}
            uri={uri}
          />}
    </PlayerSection>
  )
}