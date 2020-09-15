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
  overflow-x: hidden;
  display: flex;
  /* background: #f4bed1; */
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background: darkred;
  height: 100%;
  width: 5%;
  position: fixed;
  background: ${props => props.theme.spotifydarkgray};
`
// Margin Left Must = Navbar Container's Width
const InterfaceContainer = styled.div`
  overflow-y: scroll;
  margin-left: 5%;
  background: #2b2a2a;
  /* background: gray; */
  flex-basis: 55%;
`

class Dashboard extends React.Component {

  render() {
    
    return (
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
    )
  }

}

export default Dashboard