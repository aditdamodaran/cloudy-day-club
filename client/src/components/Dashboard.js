import React from 'react';
import Playlists from './Playlists'
import Playlist from './Playlist'
import PlayerContainer from './PlayerContainer'
import Navbar from './Navbar'
import { Router } from '@reach/router';
import styled, {ThemeProvider} from 'styled-components/macro';
import { primaryTheme } from '../styles/themes';

const DashboardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background: darkred;
  height: 100%;
  width: 4rem;
  min-width: 4rem;
  position: fixed;
  background: ${props => props.theme.spotifydarkgray};
`
/* Margin Left Must = Navbar Container's Width */
const InterfaceContainer = styled.div`
  overflow-y: scroll;
  margin-left: 4rem;
  background: #2b2a2a;
  flex-basis: 55%;
`

const Dashboard = () => (
  <ThemeProvider theme={primaryTheme}>
    <DashboardContainer>
      <NavbarContainer>
        <Navbar />
      </NavbarContainer>
      <InterfaceContainer>
        <Router>
          <Playlists path="/"/>
          <Playlist path="/:playlistId" />
        </Router>
      </InterfaceContainer>
      <PlayerContainer />
    </DashboardContainer>
  </ThemeProvider>
);

export default Dashboard;