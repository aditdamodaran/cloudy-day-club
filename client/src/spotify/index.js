import axios from 'axios';
import { getHashParams } from '../utils';

const LOGIN_URI =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000'
    : 'https://cloudy-day-club.herokuapp.com';

// TOKENS ******************************************************************************************
const EXPIRATION_TIME = 3600 * 1000; // 3600 seconds * 1000 = 1 hour in milliseconds

const setTokenTimestamp = () => window.localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalAccessToken = token => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};
const setLocalRefreshToken = token => window.localStorage.setItem('spotify_refresh_token', token);
const getTokenTimestamp = () => window.localStorage.getItem('spotify_token_timestamp');
const getLocalAccessToken = () => window.localStorage.getItem('spotify_access_token');
const getLocalRefreshToken = () => window.localStorage.getItem('spotify_refresh_token');

// Refresh the token
const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    window.location.reload();
    return;
  } catch (e) {
    console.error(e);
  }
};

// Get access token off of query params (called on application init)
export const getAccessToken = () => {
  const { error, access_token, refresh_token } = getHashParams();

  if (error) {
    console.error("HASH PARAMS", error);
    refreshAccessToken();
  }

  // If token has expired
  if (Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();
  const localRefreshToken = getLocalRefreshToken();

  // If there is no REFRESH token in local storage, set it as `refresh_token` from params
  if (!localRefreshToken || localRefreshToken === 'undefined') {
    setLocalRefreshToken(refresh_token);
  }

  // If there is no ACCESS token in local storage, set it and return `access_token` from params
  if (!localAccessToken || localAccessToken === 'undefined') {
    setLocalAccessToken(access_token);
    return access_token;
  }

  return localAccessToken;
};

export const token = getAccessToken();

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location = LOGIN_URI;
};

// API CALLS ***************************************************************************************

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

/**
 * Get Current User's Profile
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
export const getUser = () => axios.get('https://api.spotify.com/v1/me', { headers });

/**
 * Get a List of Current User's Playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
export const getPlaylists = () => 
axios.get(
  'https://api.spotify.com/v1/me/playlists', { 
    params: {
    limit: 50
  }, 
  headers 
});

/**
 * Get a Playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, { headers });

/**
 * Get a Playlist's Tracks
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlists-tracks/
 */
export const getPlaylistTracks = playlistId =>
  axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, { headers });

/**
 * Return a comma separated string of track IDs from the given array of tracks
 */
const getTrackIds = tracks => tracks.map(({ track }) => track.id).join(',');

/**
 * Get Audio Features for Several Tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */
export const getAudioFeaturesForTracks = tracks => {
  const ids = getTrackIds(tracks);
  return axios.get(`https://api.spotify.com/v1/audio-features?ids=${ids}`, { headers });
};

/**
 * Get a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
export const getTrack = trackId =>
  axios.get(`https://api.spotify.com/v1/tracks/${trackId}`, { headers });

/**
 * Get Audio Analysis for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
export const getTrackAudioAnalysis = trackId =>
  axios.get(`https://api.spotify.com/v1/audio-analysis/${trackId}`, { headers });

/**
 * Get Audio Features for a Track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
export const getTrackAudioFeatures = trackId =>
  axios.get(`https://api.spotify.com/v1/audio-features/${trackId}`, { headers });

export const getUserInfo = () => {
  return axios
    .all([getUser(), getPlaylists()])
    .then(
      axios.spread((user, followedArtists, playlists, topArtists, topTracks) => {
        return {
          user: user.data,
          followedArtists: followedArtists.data,
          playlists: playlists.data,
          topArtists: topArtists.data,
          topTracks: topTracks.data,
        };
      }),
    );
};

export const getTrackInfo = trackId => {
  return axios
    .all([getTrack(trackId), getTrackAudioAnalysis(trackId), getTrackAudioFeatures(trackId)])
    .then(
      axios.spread((track, audioAnalysis, audioFeatures) => {
        return {
          track: track.data,
          audioAnalysis: audioAnalysis.data,
          audioFeatures: audioFeatures.data,
        };
      }),
    );
};

// WEB SDK PLAYER API ******************************************************************************

/**
 * Play a Track (from the start)
 * https://developer.spotify.com/documentation/web-playback-sdk/reference/
 */
export const playTrack = (trackUri, deviceId) => {
  const url = `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`;
  const body = { uris: [`spotify:track:${trackUri}`] };
  return axios.put(url, body, {headers});
}

/**
 * Pause a Track
 * https://developer.spotify.com/documentation/web-api/reference/player/pause-a-users-playback/
 */

export const pauseTrack = (deviceId) => {
  const url = `https://api.spotify.com/v1/me/player/pause`;
  const body = { device_id: deviceId };
  return axios.put(url, body, {headers});
}

/**
* Resume Playback
* https://developer.spotify.com/documentation/web-api/reference/player/start-a-users-playback/
*/
export const resumeTrack = (deviceId) => {
 const url = `https://api.spotify.com/v1/me/player/play`;
 const body = { device_id: deviceId };
 return axios.put(url, body, {headers});
}