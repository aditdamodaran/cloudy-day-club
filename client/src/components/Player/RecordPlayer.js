import React from 'react';
import defaultCover from '../../icons/default-playlist-cover.svg'
import styled from 'styled-components/macro';
import vinylDisc from '../../static/vinyldisc.svg'
import player from '../../static/player.svg'

const AlbumArt = styled.img`
  width: 20vw;
  height: 20vw;
  border: none;
`

const PlayerSection = styled.div`
  height: 50%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const RecordPlayerSection = styled.div`
  display: flex;
  flex-basis: 100%;
  text-align: center;
  justify-content: center;
  position: relative;
  .vinyl-disc, img {
    width: 20vw;
    height: 20vw;
  }
  .vinyl-disc {
    left: 0.55vw;
    top: 1.9vw;
    width: 14.3vw;
    height: 14.3vw;
    border-radius: 50%;
  }
  img {
    filter: grayscale(1) brightness(1.3) contrast(1.2);
  }
`

const VinylColor = styled.div`
  position: absolute;
  opacity: 0.7;
  filter: brightness(0.8);
`

const VinylCenter = styled.div`
  position: absolute;
  background: #333;
  z-index: 4;
  left: 7.4vw;
  top: 8.85vw;
  width: 0.4vw;
  height: 0.4vw;
  border-radius: 3vw;
`

const VinylDisc = styled.div`
  background-image: url(${vinylDisc});
  position: absolute;
  background-size: cover !important;                 
  background-repeat: no-repeat !important;
  background-position: center center !important; 
`


export const RecordPlayer = ({color, albumArt, lightText, trackName}) => (
  <PlayerSection className="fadeInFast"
    style={{
      color,
      fontWeight: "bold",
      fontSize: "3rem",
    }}
  >
    <AlbumArt id="album-art" 
      src={
        albumArt 
        ? albumArt
        : defaultCover} 
    />
    <RecordPlayerSection>
      <VinylCenter />
      <VinylColor className="vinyl vinyl-disc" 
        lightText={lightText}
        style={{
          background: `radial-gradient(circle, transparent 25%, ${color} 20%)`,
          zIndex: '4'
        }}
      />
      <VinylDisc className="vinyl vinyl-disc vinyl-rotate" 
        lightText={lightText}
        style={{
          transition: "background 0.3s",
          zIndex: '2'
        }}
      />
      <img alt="player-image" src={player} style={{
        position: 'absolute'
      }}/>
    </RecordPlayerSection>
  </PlayerSection>
)