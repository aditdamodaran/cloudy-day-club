import React from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';
import { primaryTheme } from '../styles/themes';
import GlobalFonts from '../fonts';
import { darken } from 'polished'

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://agile-waters-30909.herokuapp.com/login';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
`

const LoginContainer = styled.div`
  height: 100%;
  width: 50%;
  padding: 0rem 0rem;
  background: ${props => props.theme.login.background};
  display: flex;
  align-items: center;
`

const Login = styled.div`
  width: 100%;
  height: 50%;
  padding: 4rem;
  /* border: 1px solid red; */
  color: ${props => props.theme.login.white};
  font-family: ${props => props.theme.login.fontFamily};
  margin: 0;
  h1 { margin: 0; font-size: 4.5rem; }
  h2 { margin: 0; font-size: 1.75rem; }
`

const LoginButton = styled.button`
  background: ${props => props.theme.spotifygreen};
  color: white;
  font-family: ${props => props.theme.login.fontFamily};
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
    <PageContainer className="container">
      <LoginContainer>
        <Login>
          <GlobalFonts />
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
    </PageContainer>
  </ThemeProvider>
);

