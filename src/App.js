import React from 'react';
import './App.css';
import SearchTopBar from './components/partials/SearchTopBar'
import Albums from './components/partials/Albums'
import Playlist from './components/partials/Playlist'
import { baseUrl } from './base'
import axios from "axios";

class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      artists: [],
      isSearching: false,
      hasDoneSearching: false,
      listOfArtists: [],
      isSearchingForAlbums: false,
      hasDoneSearchingForAlbums: false,
      albums: [],
      searchTerm: '',
      displyPlaylist: false,
      tracks: [],
      album: null
    }
    this.search = this.search.bind(this)
    this.clearSearch = this.clearSearch.bind(this)
    this.searchForAlbums = this.searchForAlbums.bind(this)
    this.getArtistPlaylist = this.getArtistPlaylist.bind(this)
  }

  search = (term) => {
    if(term){
      this.launchSearch(term)
    }
  }

  searchForAlbums = async (artist) => {
    var self = this
    this.setState({
      isSearching: false,
      isSearchingForAlbums: true,
      hasDoneSearchingForAlbums: false,
      searchTerm: artist.name,
      albums: [],
      displyPlaylist: false
    })
    await axios.get(baseUrl + 'artist/' + artist.id + '/albums')
      .then(function (response) {
        self.handleAlbumsResponse(response)
      })
      .catch(function (error) {
        self.setState({
          hasDoneSearchingForAlbums: true
        })
      });
  }

  handleAlbumsResponse = (response) => {
    this.setState({
      albums: response.data.data,
      tracks: []
    })
  }

  clearSearch = () => {
    this.setState({
      isSearching: false,
      isSearchingForAlbums: false,
      displyPlaylist: false
    })
  }

  launchSearch = async (term) => {
    var self = this
    this.setState({
      isSearching: true,
      hasDoneSearching: false
    })
    await axios.get(baseUrl + 'search?q=artist:"' + term + '"')
      .then(function (response) {
        self.handleResponse(response)
      })
      .catch(function (error) {
        self.setState({
          hasDoneSearching: true
        })
      });
  }

  getArtistPlaylist = async (album) => {
    var self = this
    this.setState({
      displyPlaylist: false
    })
    await axios.get(baseUrl + 'album/' + album.id)
      .then(function (response) {
        self.handlePlaylistResponse(response, album)
      })
      .catch(function (error) {});
  }

  handlePlaylistResponse = (response, album) => {
    let tracks = response.data.tracks
    this.setState({
      tracks: tracks.data,
      displyPlaylist: true,
      album: album
    })
  }

  handleResponse = (response) => {
    var self = this
    let listOfArtists = []
    response.data.data.filter(function(item){
      let artist = {
        key: item.id,
        id: item.artist.id,
        name: item.artist.name
      }
      listOfArtists.push(artist)
    })
    self.setState({listOfArtists: listOfArtists})
    self.filterArtists()
  }

  filterArtists = async () => {
    let allArtists = await this.state.listOfArtists
    let artists = await this.getArtists(allArtists, 'id')
    this.setState({
      hasDoneSearching: true,
      artists: artists
    })
  }

  getArtists = (arr, id) => {
    const list = arr
                  .map(e => e[id])
                  .map((e, i, final) => final.indexOf(e) === i && i)
                  .filter(e => arr[e]).map(e => arr[e]);
    return list;
  }

  render(){
    return (
      <div className="row app">
        <div className="container">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <SearchTopBar 
              searchForAlbums={this.searchForAlbums}
              clearSearch={this.clearSearch}
              isSearching={this.state.isSearching}
              hasDoneSearching={this.state.hasDoneSearching}
              artists={this.state.artists}
              search={this.search} />
            {
              this.state.isSearchingForAlbums === true &&
              <Albums 
                getArtistPlaylist={this.getArtistPlaylist}
                albums={this.state.albums}
                searchTerm={this.state.searchTerm}
              />
            }
            {
              this.state.displyPlaylist &&
              <Playlist 
                album={this.state.album}
                tracks={this.state.tracks} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
