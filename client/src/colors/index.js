import axios from 'axios';

let backendURL = process.env.REDIRECT_URI || 'http://localhost:8888/colors'

export const getAlbumPrimaryColor = (url) => axios.post(backendURL, {url})