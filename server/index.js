/*  Express Server + Node.js Backend 
    Spotify User Authentication with OAuth 2.0
    https://developer.spotify.com/documentation/general/guides/authorization-guide
*/

require('dotenv').config();

/**
 * PROCESS ENVIRONMENT CONFIGURATION
 */
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
let REDIRECT_URI = process.env.REDIRECT_URI || 'http://localhost:8888/callback';
let FRONTEND_URI = process.env.FRONTEND_URI || 'http://localhost:3000';
const PORT = process.env.PORT || 8888;

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:8888/callback';
  FRONTEND_URI = 'http://localhost:3000';
}

/**
 * NODE PACKAGES
 */
const express = require('express');
const request = require('request');
const cors = require('cors');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const path = require('path');
const bodyParser = require('body-parser');
const history = require('connect-history-api-fallback');
const { getColorFromURL } = require('color-thief-node');

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 * (https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js)
 */
const generateRandomString = function (length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


/**
 * EXPRESS SERVER SETUP
 */
const stateKey = 'spotify_auth_state';
const app = express();
// Priority serve any static files.
app.use(express.static(path.resolve(__dirname, '../client/build')));
app
  .use(express.static(path.resolve(__dirname, '../client/build')))
  .use(cors())
  .use(cookieParser())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(
    history({
      // verbose: true, // uncomment for debugging
      rewrites: [
        { from: /\/login/, to: '/login' },
        { from: /\/callback/, to: '/callback' },
        { from: /\/refresh_token/, to: '/refresh_token' }
      ],
    }),
  )
  .use(express.static(path.resolve(__dirname, '../client/build')));

/**
 * HOME ROUTE
 */
app.get('/', (req, res) => {
  console.log('Getting "/"')
  res.render(path.resolve(__dirname, '../client/build/index.html'));
})

/**
 * LOGIN ROUTE
 * (https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js)
 */
app.get('/login', function (req, res) {
  console.log('Getting "/login"')
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // SPOTIFY AUTHORIZATION SCOPES (https://developer.spotify.com/documentation/general/guides/scopes/)
  const scope =
    'streaming user-read-private user-read-email user-read-recently-played user-top-read user-follow-read user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: REDIRECT_URI,
      state: state,
    })}`,
  );
});


/**
 * CALLBACK ROUTE 
 * (https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js)
 */
app.get('/callback', function (req, res) {
  console.log('Getting "/callback"')
  // Requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  console.log(code, state, storedState)

  if (state === null || state !== storedState) {
    res.redirect(`/#${querystring.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
          'base64',
        )}`,
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // we can also pass the token to the browser to make requests from there
        res.redirect(
          `${FRONTEND_URI}/#${querystring.stringify({
            access_token,
            refresh_token,
          })}`,
        );
      } else {
        res.redirect(`/#${querystring.stringify({ error: 'invalid_token' })}`);
      }
    });
  }
});

/**
 * REFRESH TOKENS 
 * (https://github.com/spotify/web-api-auth-examples/blob/master/authorization_code/app.js)
 */
app.get('/refresh_token', function (req, res) {
  console.log('Getting "/refresh_token"')
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
        'base64',
      )}`,
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token,
    },
    json: true,
  };

  request.post(authOptions, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({ access_token });
    }
  });
});

/**
 * Colors Route
 * 1.) Frontend sends Cover Art URL in Request Body
 * 2.) Backend uses ColorThief to determine
 * the dominant color and sends it back
 * as a response.
 * (https://www.npmjs.com/package/color-thief-node)
 */
app.post('/colors', function(req, res) {
  (async () => {
    const dominantColor = await getColorFromURL(req.body.url);
    res.send(dominantColor)
  })();
})

/**
 * Let the Frontend handle any other requests
*/
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

// Start Server
app.listen(PORT,()=>console.log(`Server started on port: ${PORT}`))

