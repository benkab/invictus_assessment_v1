import React from 'react';
import '../../App.css'
import Album from './Album'

class Albums extends React.Component {

  constructor(props){
    super(props)
  }

  refractorSearchTerm = (term) => {
    return 'Search results for "' + term + '"'
  }

  render() {
    return (
      <div 
        className="row albums-container">
        <p className="albums-container-title">{this.refractorSearchTerm(this.props.searchTerm)}</p>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <p className="albums-container-second-title">ALBUMS</p>
          </div>
          <div className="row albums-scroll-container">
            {
              this.props.albums.map(album => {
                return (
                  <Album
                    getArtistPlaylist={this.props.getArtistPlaylist}
                    album={album}
                    key={album.id} />
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Albums;