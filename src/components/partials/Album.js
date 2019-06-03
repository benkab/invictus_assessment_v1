import React from 'react';
import '../../App.css'
import TextTruncate from 'react-text-truncate';

class Album extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      albumHovered: false
    }
  }

  refractorSearchTerm = (term) => {
    return 'Search results for "' + term + '"'
  }

  getArtistPlaylist = () => {
    this.props.getArtistPlaylist(this.props.album)
  }

  render(props) {
    return (
      <div 
        onClick={() => this.getArtistPlaylist()}
        onMouseEnter={() => {this.setState({albumHovered: true})}}
        onMouseLeave={() => {this.setState({albumHovered: false})}}
        className={"col-lg-4 col-md-4 col-sm-4 col-xs-6 album " + (this.state.albumHovered === true ? 'album-hovered' : '')}>
        <div className="thumbnail">
          <img src={this.props.album.cover_big} alt="album-image-cover"/>
        </div>
        <TextTruncate
          line={1}
          className="albums-title"
          truncateText="…"
          text={this.props.album.title}
        />
        <small>(click for more info open section below)</small>
      </div>
    );
  }
}

export default Album;