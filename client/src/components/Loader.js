import React  from 'react';
import styled from 'styled-components/macro';

const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  flex-grow: 1;
  place-content: center;
`

const Spinner = styled.div`
`

export default () => (
 <Loader>
  <Spinner className="loader loader-1">
    <div className="loader-outer" />
    <div className="loader-inner" />
  </Spinner>
 </Loader>
);


