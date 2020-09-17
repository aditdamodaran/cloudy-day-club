import React from 'react';
import styled from 'styled-components/macro';
import playlistsIcon from '../icons/list-icon.svg'
import { Link } from '@reach/router';

const NavigationContainer = styled.div`
  display: grid;
  align-items: start;
  height: 70%;
  width: 40%;
  margin: auto;
`
const NavIcon = styled.div`
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.1s;
  &:hover {
    opacity: 0.4;
  }
  padding-bottom: 1rem;
`

const Navigation = styled.nav`
  color: white;
`

const Navbar = () => (
  <NavigationContainer>
    <Navigation>
      <NavIcon>
        <Link to='/'>
          <img src={playlistsIcon} alt="playlists" />
        </Link>
      </NavIcon>
    </Navigation>
  </NavigationContainer>
);

export default Navbar