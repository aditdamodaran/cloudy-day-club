import axios from 'axios';

const backendURL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8888/colors'
    : 'https://www.cloudyday.club/colors';

export const getAlbumPrimaryColor = (url) => axios.post(backendURL, {url})