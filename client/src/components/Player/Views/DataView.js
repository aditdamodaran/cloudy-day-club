import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { getTrackInfo } from '../../../spotify'
import { catchErrors } from '../../../utils'

const DataViewSection = styled.div`
`

export default () => {
  const trackURI = useSelector(state => state.playback.uri)

  useEffect(() => {
    if (trackURI !== '') {
      async function getTrackAnalysis() {
        const analysis = await getTrackInfo(trackURI);
        console.log(analysis)
      }
  
      catchErrors(getTrackAnalysis())
    }
  }, [trackURI])

  return (
    <DataViewSection>
      {trackURI}
    </DataViewSection>
  )
}