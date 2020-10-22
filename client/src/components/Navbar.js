import React from 'react';
import styled from 'styled-components/macro';
import NavLink from './NavLink'
import { logout } from '../spotify'
import playlistsIcon from '../icons/list-icon.svg'
import logoutIcon from '../icons/logout-icon.svg'

const NavigationContainer = styled.div`
  display: grid;
  height: 95%;
  width: 100%;
  margin: auto;
`

const Navigation = styled.nav`
  color: white;
  display: flex;
  flex-wrap: wrap;
  height: 90%;
  align-self: end;
`

const NavLinkContainer1 = styled.div`
  width: 100%;
  align-self: flex-start;
`

const NavLinkContainer2 = styled(NavLinkContainer1)`
  align-self: flex-end;
  img {
    transform: scale(-1, 1);
  }
`

const Navbar = () => (
  <NavigationContainer>
    <Navigation className="fadeIn1s">
      <NavLinkContainer1>
        <NavLink 
          to='/' 
          img={playlistsIcon}
          text={"Playlists"}
          className={'nav-icon'}
        />
      </NavLinkContainer1>
      <NavLinkContainer2>
        <NavLink 
          to='/logout' 
          onClick={logout} 
          img={logoutIcon}
          text={"Logout"} 
          className={'nav-icon'}
        />
      </NavLinkContainer2>
    </Navigation>
  </NavigationContainer>
);

export default Navbar