import React  from 'react';
import styled, {ThemeProvider} from 'styled-components/macro';
import { primaryTheme } from '../styles/themes';
// import splashscreen from '../static/splashscreen.jpg'
import LogoDarkBg from '../static/LogoDarkBg.svg'
import CloudyDayClubTextWhite from '../static/CloudyDayClubTextWhite.svg'

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
    : 'https://cloudy-day-club.herokuapp.com/login';

const PageContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  background-color: #141414;
  justify-content: center;
  align-items: center;
  /* background: ${props => props.theme.login.background}; */
`

const LoginContainer = styled.div`
  /* border: 1px solid red; */
  height: 70%;
  width: 50%;
  margin: 15% auto;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center; */
  z-index: 3; 
  @media (max-width: ${'768px'}) {
    width: 100%;
  }
`

const LoginRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  /* border: 1px solid green; */
`

const LogoContainer = styled.div`
  /* border: 1px solid white; */
  /* padding: 40%; */
  /* display: block; */
  width: 35%;
  /* margin: 0 auto; */
`

const TitleContainer = styled.div`
  /* border: 1px solid blue; */
  /* border: 1px solid white; */
  /* display: flex; */
  width: 70%;
  margin-top: 2.5rem;
  margin-bottom: 0.5rem;
`

const SubtitleContainer = styled.div`
  color: white;
  text-align: center;
  font-family: "Jost";
  font-size: 1.75rem;
  /* align-items: center; */
/* border: 1px solid blue; */
/* border: 1px solid white; */
/* display: flex; */
  /* width: 30%; */
  /* margin: 1.5rem auto; */
  line-height: 1.75;
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

// const LoginImage = styled.div`
//   background: url(${splashscreen});
//   background-size: cover !important;                 
//   background-repeat: no-repeat !important;
//   background-position: center center !important;   
//   width: 50%;
//   height: 100%;
//   flex-grow: 1;
//   z-index: 3;
// `

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
  cursor: pointer;
  /* background: ${props => props.theme.spotifygreen};
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-weight: bold; */
  background-color: #fefefe;
  text-transform: uppercase;
  font-family: "Jost-Bold";
  font-size: 1rem;
  padding: 2rem 3rem;
  margin: 1.5rem 0rem;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  &:hover {
    background: #bcbcbc;
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
      <LoginContainer>
        <LoginRow>
          <LogoContainer><img src={LogoDarkBg} /></LogoContainer>
        </LoginRow>
        <LoginRow>
          <TitleContainer><img src={CloudyDayClubTextWhite} /></TitleContainer>
        </LoginRow>
        <LoginRow>
          <SubtitleContainer>
            <p>Your Spotify playlists, with a sprinkle of color<br></br> for those drab cloudy days.</p>
          </SubtitleContainer>
        </LoginRow>
        <LoginRow>
          <a href={LOGIN_URI} className='button'> 
            <LoginButton>
              Login with Spotify Premium
            </LoginButton>
          </a>
        </LoginRow>
      </LoginContainer>
      {/* <img src={LogoDarkBg} /> */}
        {/* <ColorContainer className="slideUp" />
        <LoginContainer className="becomeTransparent">
          <Login>
            <h1 id="login-page-header" className="fadeIn4sAfter2s">
              <span role="img" aria-label="cloud">☁️</span> Day Club
            </h1>
            <LoginPageText className="fadeIn6sAfter3s">
              Your <span className="whiteToGreen">Spotify Playlists</span>, with a splash of
              <br/> 
                <span className="colourSpan">
                  <span className="whiteToPurple"> c</span>
                  <span className="whiteToBlue"  >o</span> 
                  <span className="whiteToGreen" >l</span> 
                  <span className="whiteToYellow">o</span> 
                  <span className="whiteToOrange">u</span> 
                  <span className="whiteToRed"   >r </span>  
                </span>
              for those cloudy days.
            </LoginPageText>
            <a href={LOGIN_URI} className="fadeIn6sAfter3s"> 
              <LoginButton>
                Login with Spotify Premium
              </LoginButton>
            </a>
            <Notices className="fadeIn8sAfter4s">
            Dear music loving friend:
            <br/>
              <a href="https://developer.spotify.com/documentation/web-playback-sdk/#supported-browsers">
                Spotify's Web Player SDK does not support Safari or mobile devices yet. 
              </a>
            <br />Cloudy Day Club works on Chrome, Brave, Firefox, and Edge.</Notices>
          </Login>
          </LoginContainer> */}
      {/* <LoginImage id="login-image" className="fadeIn2sAfter1s"/> */}

    </PageContainer>
  </ThemeProvider>
);


