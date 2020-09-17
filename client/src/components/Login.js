import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';
import { primaryTheme } from '../styles/themes';
import { darken } from 'polished'
import splashscreen from '../static/splashscreen.jpg'

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://cloudy-day-club.herokuapp.com/login';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
`

const LoginContainer = styled.div`
  height: 100%;
  padding: 0rem 0rem;
  background: ${props => props.theme.login.background};
  display: flex;
  align-items: center;
`

const LoginImage = styled.div`
  background: url(${splashscreen});
  background-size: cover !important;                 
  background-repeat: no-repeat !important;
  background-position: center center !important;   
  width: 50%;
  height: 100%;
`

const Login = styled.div`
  width: 100%;
  height: 50%;
  padding: 4rem;
  color: ${props => props.theme.login.white};
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0;
  h1 { margin: 0; font-size: 4.5rem; }
  h2 { margin: 0; font-size: 1.75rem; }
`

const LoginButton = styled.button`
  background: ${props => props.theme.spotifygreen};
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-weight: bold;
  font-size: 1rem;
  padding: 1rem 2rem;
  margin: 1rem 0rem;
  border: none;
  border-radius: 2rem;
  cursor: pointer;
  &:hover {
    background: ${props => darken(.1, props.theme.spotifygreen)};
  }
`

const LoginPageText = styled.h2`
  padding-top: 1rem;
  padding-bottom: 1rem;
  span.spotify-green {
    color: ${props => props.theme.spotifygreen};
  }
`

export default () => (
  <ThemeProvider theme={primaryTheme}>
    <PageContainer>
      <LoginContainer className="login-container">
        <Login>
          <h1 id="login-page-header">
            <span role="img" aria-label="cloud">☁️</span> Day Club
          </h1>
          <LoginPageText>
            Your <span className="spotify-green">Spotify Playlists</span>, with a splash of 
              <span className="colour" id="char-purple"> c</span>
              <span className="colour" id="char-blue">o</span> 
              <span className="colour" id="char-green">l</span> 
              <span className="colour" id="char-yellow">o</span> 
              <span className="colour" id="char-orange">u</span> 
              <span className="colour" id="char-red">r </span>  
            for those cloudy days.
          </LoginPageText>
          <a href={LOGIN_URI}> 
            <LoginButton>
              Login with Spotify
            </LoginButton>
          </a>
        </Login>
      </LoginContainer>
      <LoginImage id="login-image"/>
    </PageContainer>
  </ThemeProvider>
);

