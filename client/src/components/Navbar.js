import React from 'react';
import styled from 'styled-components/macro';
import { Link } from '@reach/router';
import { logout } from '../spotify'
import playlistsIcon from '../icons/list-icon.svg'
import logoutIcon from '../icons/logout-icon.svg'

const NavigationContainer = styled.div`
  display: grid;
  height: 95%;
  width: 80%;
  margin: auto;
`

const NavIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.1s;
  &:hover {
    opacity: 0.4;
  }
  .nav-icon {
    width: 50%;
    margin: 0 auto;
  }
  p { 
    font-size: 0.75rem; 
    margin: 0 auto; 
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
    padding-bottom: 1rem;
    font-weight: 100;
  }
`

const LogoutIcon = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: flex-end;
  filter: brightness(0) invert(1);
  opacity: 0.8;
  transition: opacity 0.1s;
  &:hover {
    opacity: 0.4;
  }
  .nav-icon {
    width: 50%;
    margin: 0 auto;
  }
  p { 
    font-size: 0.75rem; 
    margin: 0 auto; 
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
    font-weight: 100;
  }
`

const Navigation = styled.nav`
  color: white;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  align-self: end;
`

const Navbar = () => (
  <NavigationContainer>
    <Navigation className="fadeInFast">
      <NavIcon>
        <Link to='/' className="nav-icon">
          <img src={playlistsIcon} alt="playlists" />
        </Link>
        <p>Playlists</p>
      </NavIcon>
      <LogoutIcon>
        <Link to='/' onClick={logout} className="nav-icon">
          <img src={logoutIcon} alt="logout" 
          style={{
            transform: `rotate(180deg)`, 
          }}/>
        </Link>
        <p>Logout</p>
      </LogoutIcon>
    </Navigation>
  </NavigationContainer>
);

export default Navbar