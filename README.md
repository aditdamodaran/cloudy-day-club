[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<p align="center">
  <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/237/cloud_2601.png" alt="Logo" width="80" height="80">
  <h3 align="center">Cloudy Day Club</h3>


[![Product Name Screen Shot][product-screenshot]](https://example.com)

  <p align="center">
	<b>Cloudy Day Club is a Spotify Web Player with a splash of color for those drab cloudy days.</b> Listen to your favorite songs on your most recent playlists on the browser of your choice. 
    <br /><i>Please note, you must be a Premium Spotify User to sign in.</i>
    <br />
    <br />
    <a href="https://cloudy-day-club.herokuapp.com/">Go to Site.</a>
    ·
    <a href="https://github.com/aditdamodaran/cloudy-day-club/issues">Report Bug</a>
    ·
    <a href="https://github.com/aditdamodaran/cloudy-day-club/issues">Request Feature</a>
  </p>



## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
* [Limits](#limits)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)



## About

[![Product Name Screen Shot][product-screenshot-2]](https://example.com)

Spotify's web and desktop apps are amazing feats of engineering, but the experience is primarily through audio that plays in the background. The mobile app is pushing these boundaries with repeating GIFs curated by artists and lyrics served from Genius. 

On gray cloudy days, I personally find myself drawn to vibrant colors and good music. Cloudy Day Club is a minimalist interface for playing your Spotify Playlists, with a touch of color based on the cover art of the song you're playing.



### Built With

* [Spotify's Web Playback SDK API](https://developer.spotify.com/documentation/web-playback-sdk/quick-start/)
* [React](https://reactjs.org/), [Redux](https://redux.js.org/), [Axios](https://www.axios.com/), [Styled Components](https://styled-components.com/docs/api) on the Front-End
* [Express](https://expressjs.com/) and [Node.js](https://nodejs.org/en/) on the Back-End
* [Reach Router](https://reach.tech/router/)
* [Heroku](https://www.heroku.com/) for Deployment
* [Color-Thief-Node](https://www.npmjs.com/package/color-thief-node) for adjusting the interface based on album artwork
* [Lodash](https://lodash.com/) and [Color](https://www.npmjs.com/package/color) for miscellaneous tasks

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). Special thanks to [Brittany Chiang](https://brittanychiang.com/) for creating and open-sourcing [Spotify Profile](https://github.com/bchiang7/spotify-profile), which I referenced extensively throughout. 



## Getting Started

To get a local copy up and running follow these steps.

From the root directory (/cloudy-day-club), install the backend using the following command:

```sh
yarn && yarn install
```

From the root directory (/cloudy-day-club), install the frontend using the following command:

```sh
cd client && yarn
```

Change back into the root directory:

```sh
cd ..
```

You'll need to run the following command to create a ".env" file. This will be used for authenticating the application from your local computer with Spotify. 

```sh
touch .env
```

You need to obtain a CLIENT_ID and CLIENT_SECRET from Spotify. [Instructions  on how to do that are here.](https://developer.spotify.com/documentation/general/guides/app-settings/) Once you have these, open the .env file with a text-editor and type your respective credentials as follows:

```sh
CLIENT_ID=COPY_AND_PASTE_IT_FROM_SPOTIFY_HERE
CLIENT_SECRET=COPY_AND_PASTE_IT_FROM_SPOTIFY_HERE
```

And that's it! Save the .env file and you're all set to run the development server. From the root directory:

```sh
yarn run dev
```



## Limits

Spotify's API limits the application to 50 of your most recent playlists, and a maximum of 100 songs per playlist. If some songs or playlists do not appear, this is likely why.



## Roadmap

This is in its early stages (deployed Sept. 15th, 2020). I have a lot of work to do, which I am very excited about. Feel free to send me a message on LinkedIn or GitHub if you'd like to contribute. Happy to discuss what you think could be improved.

**KNOWN ISSUES:**

1. Better Bundling. The optimized bundle right now is 92MB, which is enormous. My first goal is to reduce this footprint substantially.
2. Clearing console logs and other occasional errors.
3. Refactoring and commenting for clarity.
4. Ensuring there are no expensive blocking chunks of code (I believe I've used async/await correctly for the most part, but I want to double check this).

**PROPOSED FEATURES:**

1. Definitely aware that the player itself is lackluster right now (only the toggle pause and play functionalities are working). I hope to make a draggable slider that can be used for scrubbing in songs, as well as better controls for volume, skipping, shuffling, etc.
2. User Profiles
3. Navigation Improvements (i.e. a back-button on the Playlist component)
4. Better animations and coloring on the Player (i.e. for songs with cover art that has multiple colors and maybe something more interesting than the fade in/out animation)
5. Data Visualizations of Song Audio Features. Really excited about ways to visualize song valence, instrumentalness, acousticness, wordiness, and more. That data has already been queried and combined in the Playlist component. It just needs a nice front-end to be integrated.
6. Clustering of processes on the backend to utilize all CPU cores.

If you have thoughts on which of these features would be the most useful for you, let me know!



## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

To save you time, just let me know if you plan to make a feature. I'm happy to offer any guidance I can.



## License

Distributed under the MIT License. See `LICENSE` for more information.



[contributors-shield]: https://img.shields.io/github/contributors/aditdamodaran/cloudy-day-club.svg?style=flat-square
[contributors-url]: https://github.com/aditdamodaran/cloudy-day-club/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/aditdamodaran/cloudy-day-club.svg?style=flat-square
[forks-url]: https://github.com/aditdamodaran/cloudy-day-club/network/members
[stars-shield]: https://img.shields.io/github/stars/aditdamodaran/cloudy-day-club?style=flat-square
[stars-url]: https://github.com/aditdamodaran/cloudy-day-club/stargazers
[issues-shield]: https://img.shields.io/github/issues/aditdamodaran/cloudy-day-club?style=flat-square
[issues-url]: https://github.com/aditdamodaran/cloudy-day-club/issues
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=flat-square&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/adit-damodaran-1a0245108
[product-screenshot]: https://lh3.googleusercontent.com/pw/ACtC-3eY9tq4mF3FnyNijQy2DgVvAuWBUZNN3tdKx3D0HQHq_WDltQdIervZsJEDwcebvy-2jQNTOv6X8QL-q_rlymNBnlcMaET6BN4ahxE2Q0NHCAQsdRu0pR6NZGOeO1XAbFhtpLpFNoOnna3-8IpTtTX4=w2640-h1650-no?authuser=0
[product-screenshot-2]: https://lh3.googleusercontent.com/uR1EwtwHC33RDaDzbnFk3c2oS5fU-Jm-pI0XBNh10G2_aapVP8Ir-udgjEiy-uhRBR8NCUJ8Nyddvz6CiMRbL2Pq4GUfrxmFO5P2bq1sZ_a18d__ZAjX46GF4Cb3HZXM60TV2bBZTaDvm-bnhQQ-Z_5eUVJ2_C32HweG4NAKrNjh7M_Qn7RYpB2Wfx7vdxDE0ycnmCAFdZOHecJdHQTsdlyi5w91ldbHZfFLpEoty9SSkB9dDOuKprkVaRrGtELr4oxKIN6na649Z90hgV40_mtGfG_Gg-U1KWzB_ArSTkSdyRCTAQTA8wpGL3eEsPIUztdrNoxBUKwzU0_wJgogXgbYCwbgobVyUyETN_VyJSQimzvgWeMM84TTCy-H1z1FpKh6JMVVqKSRopjcy8bgJIaw31nGqEwbuyu9fg303sWDJbjap3DF4AZIikxTh3nyMHdOcGycs7eMsPTHROnMNq4Hx7bcfXfqE72XdVCl5XFb8Xqgku6oWZaVZGjv-w-77j6eJ55SwprcfWhStit6Sc3EFpisaEA-BtzZsB2tE-YRQBV2K1piy08_l9Dy9jwSN7QzoFaBx9Ly2V8yOGxbJ8H6UqJNzTUl7N-5roI_N2cKaOmoOw_ff4l16ptNhtzOcUuGNYH516fXTY4uNPQtdP7Yj0Vi0XH9pBeS_PFkio8akpNaw-4Kh9CxYhXuog=w2624-h1640-no?authuser=0
