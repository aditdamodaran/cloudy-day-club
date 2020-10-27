import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { getTrackAudioFeatures } from '../../../spotify'
import { catchErrors } from '../../../utils'
import NowPlayingText from './../NowPlayingText';
import defaultPlaylistCover from '../../../icons/default-playlist-cover.svg'
import Controls from '../Controls';

const keys = ['C','C# / D♭', 'D', 'D# / E♭', 'E', 'F', 'F# / G♭', 'G', 'G# / A♭', 'A', 'A# / B♭', 'B']

const DataViewTopSection = styled.div`
  display: inline-flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* border: 1px solid green; */
`

const AlbumArt = styled.img`
  /* width: 12.5vw;
  height: 12.5vw; */
  /* flex-grow: 1; */
  /* width: 10%; */
  /* display: flex; */
  min-width: 20%;
  max-width: 30%;
  /* border: 1px solid red; */
`

const SongInfo = styled.div`
  display: flex;
  justify-self: flex-start;
  align-content: center;
  margin-left: 5%;
  flex-wrap: wrap;
  /* height: 12.5vw; */
  /* border: 1px solid blue; */
`

const DataNowPlayingText = styled(NowPlayingText)`
  margin: 0.25rem auto;
  text-align: left;
  font-size: 2rem;
`

const ArtistText = styled(NowPlayingText)`
  margin: 0 auto;
  text-align: left;
  font-size: 1rem;
  font-weight: 400;
`

const CustomControls = styled(Controls)`
  justify-content: flex-start;
  align-items: center;
  margin-right: 1rem;
  flex-basis: 10%;
  div {
    width: 2.5vw;
    height: 2.5vw;
  }
`

const SubHeaderContainer = styled.div`
  display: grid;
  margin-top: 1rem;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  div:first-child{
    grid-row: 1/3;
  }
  .subheader-info {
    grid-column: 2/3;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 1rem;
    display: flex;
    align-items: center;
    b {
      font-weight: bold; 
      white-space: nowrap;
    }
    p {
      white-space: nowrap;
    }
    .feature {
      margin: 0 0;
      margin-left: 0.25rem;
      font-weight: 200;
    }
  }
`


export default ({albumArt, lightText, uri, trackName, artist, playerReady, togglePlayback, paused}) => {
  const trackURI = useSelector(state => state.playback.uri)
  const [trackAudioFeatures, setTrackAudioFeatures] = useState(null)

  const mapKey = (idx, mode) => {
    return (idx !== -1 ? `${keys[idx]} ${mode ? 'Major' : 'Minor'}` : 'Unknown')
  }

  useEffect(() => {
    if (trackURI !== '') {
      async function getTrackAF() {
        const analysis = await getTrackAudioFeatures(trackURI);
        setTrackAudioFeatures(analysis.data)
      }
  
      catchErrors(getTrackAF())
    }
  }, [trackURI])

  return (
    <DataViewTopSection>
      <AlbumArt src={albumArt !== '' ? albumArt : defaultPlaylistCover} />
      <SongInfo>
        <div 
          style={{
            alignContent: 'flex-start', 
            flexWrap: 'wrap'
          }}>
          <DataNowPlayingText 
            trackName={trackName} 
            lightText={lightText} 
            style={{ textAlign: 'left', margin: '0 auto'}}
            altText={'Welcome to Cloudy Day Club'}
          />
          <ArtistText
            trackName={artist} 
            lightText={lightText} 
            style={{ textAlign: 'left', margin: '0 auto'}}
            altText={'Play a song to get started.'}
          />
          {playerReady && uri !== '' 
            ? <SubHeaderContainer>
                <CustomControls 
                  lightText={lightText} 
                  togglePlayback={togglePlayback}
                  paused={paused}
                />
                <div className="subheader-info"  style={{ color: `${lightText ? 'white' : 'black'}` }}>
                  <b>Key:</b> 
                  <p className="feature">{trackAudioFeatures ? `${mapKey(trackAudioFeatures.key, trackAudioFeatures.mode)}` : null}</p>
                </div>
                <div className="subheader-info"  style={{ color: `${lightText ? 'white' : 'black'}` }}>
                  <b>Tempo:</b>
                  <p className="feature">{trackAudioFeatures ? `${Math.round(trackAudioFeatures.tempo)} BPM` : null}</p>
                </div>
              </SubHeaderContainer>
            : <div />}
        </div>
      </SongInfo>
    </DataViewTopSection>
  )
}


// <div className="subheader-info">Key: {trackInfo ? trackInfo.audioFeatures.track.key : null}</div>
// <div className="subheader-info">Tempo: {trackInfo ? trackInfo.audioFeatures.track.tempo : null}</div>