import React from 'react';
import { getPlaylists } from '../spotify';
import { catchErrors } from '../utils'
import styled from 'styled-components/macro';
import PlaylistContainer from './PlaylistContainer'
import { cachePlaylists } from '../actions/cachePlaylists';
import { connect } from 'react-redux'

const PlaylistsGridContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`

const PlaylistsHeader= styled.h2`
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif; 
  font-size: 2rem;
`

const PlaylistsGrid= styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 1.2rem;
`

class Playlists extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      networkRequestMade: false
    }
  }

  componentDidMount() {
    catchErrors(this.getData());
    if (Object.keys(this.props.cache.playlists).length === 0){
      console.log('Network Request')
      catchErrors(this.getData());
    } 
  }

  async getData() {
    const { data } = await getPlaylists();
    this.setState({ playlists: data, networkRequestMade: true });
    this.props.cachePlaylists({ playlists: data })
  }

  render() {
    var { playlists } = this.state;
    if (Object.keys(this.props.cache.playlists).length !== 0 && !this.state.networkRequestMade) {
      console.log('Using Cache')
      playlists = this.props.cache.playlists;
    }
    // console.log(playlists)
    return (
      <PlaylistsGridContainer>
        <PlaylistsHeader>Playlists</PlaylistsHeader>
        <PlaylistsGrid id="playlist-grid">
          {playlists ? 
            playlists.items.map((playlist) => (
              <PlaylistContainer
                key={playlist.id}
                link={playlist.id}
                name={playlist.name}
                image={playlist.images[0].url}
              />
          )) : (
            <div>Loader</div>
          )}
        </PlaylistsGrid>
      </PlaylistsGridContainer>
    )
  }

}

const mapStateToProps = (state) => {
  const { cache } = state
  return { cache }
}

const mapDispatchToProps = (dispatch) => ({
  cachePlaylists: (playlists) => dispatch(cachePlaylists(playlists)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Playlists)