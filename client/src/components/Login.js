import React  from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';
import { primaryTheme } from '../styles/themes';
import { darken } from 'polished'
import splashscreen from '../static/splashscreen.jpg'

// 7 colors that can be randomly applied
const colorsMap = [
  '#cc7ae2', // purple
  '#5d86ba', // blue
  '#12adea', // indigo
  '#7ea04d', // green
  '#f97116', // orange
  '#f74040', // red
  '#d54062', // magenta
]
const idx = Math.floor(Math.random() * (colorsMap.length));
const bgColor = colorsMap[idx]


const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/login'
    : 'https://www.cloudyday.club/login';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  background: ${props => props.theme.login.background};
`

const LoginContainer = styled.div`
  height: 100%;
  padding: 0rem 0rem;
  display: flex;
  align-items: center;
  z-index: 3;
`

const ColorContainer = styled.div`
  height: 100%;
  display: flex;
  width: 100%;
  overflow-y: hidden;
  background: ${bgColor};
  position: absolute;
  filter: brightness(.8) saturate(0.5);
`

const LoginImage = styled.div`
  background: url(${splashscreen});
  background-size: cover !important;                 
  background-repeat: no-repeat !important;
  background-position: center center !important;   
  width: 50%;
  height: 100%;
  flex-grow: 1;
  z-index: 3;
`

const Login = styled.div`
  width: 100%;
  height: 50%;
  padding: 4rem;
  overflow: hidden;
  color: ${props => props.theme.login.white};
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  margin: 0;
  h1 { margin: 0; font-size: 4.5rem; }
  h2 { margin: 0; font-size: 1.75rem; }

  @media (max-width: ${'768px'}) {
    text-align: center;
    padding: 1rem;
    margin: 0 auto;
    height: 75%;
    h1 { margin: 0 auto; font-size: 3rem; }
    h2 { margin: 0 auto; font-size: 1rem; }
  }
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
`

const Notices = styled.p`
  color: white;
  a { color: white;}
  font-weight: 200;
  font-size: 1.1rem;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 

  @media (max-width: ${'768px'}) {
    font-size: 1rem;
  }
`

export default () => (
  <ThemeProvider theme={primaryTheme}>
    <PageContainer>
        <ColorContainer className="slideUp" />
        <LoginContainer className="becomeTransparent">
          <Login>
            <h1 id="login-page-header" className="fadeInFast">
              <span role="img" aria-label="cloud">☁️</span> Day Club
            </h1>
            <LoginPageText className="fadeInSlow">
              Your <span className="greenToWhite">Spotify Playlists</span>, with a splash of
              <br/> 
                <span className="colourSpan">
                  <span className="purpleToWhite"> c</span>
                  <span className="blueToWhite"  >o</span> 
                  <span className="greenToWhite" >l</span> 
                  <span className="yellowToWhite">o</span> 
                  <span className="orangeToWhite">u</span> 
                  <span className="redToWhite"   >r </span>  
                </span>
              for those cloudy days.
            </LoginPageText>
            <a href={LOGIN_URI} className="fadeInSlower"> 
              <LoginButton>
                Login with Spotify Premium
              </LoginButton>
            </a>
            <Notices className="fadeInSlower">
            Dear music loving friend:
            <br/>
              <a href="https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers">
                Spotify's Web Player SDK does not support Safari or mobile devices yet. 
              </a>
            <br />Cloudy Day Club works on Chrome, Brave, Firefox, and Edge.</Notices>
          </Login>
          </LoginContainer>
      <LoginImage id="login-image"/>

    </PageContainer>
  </ThemeProvider>
);


