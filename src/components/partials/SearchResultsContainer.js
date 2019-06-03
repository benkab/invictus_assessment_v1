import React from 'react';
import '../../App.css'

class SearchResultsContainer extends React.Component {

  render(props) {
    return (
      <div 
        className="row search-results-container">
        <p>Search results</p>
        {
          this.props.hasDoneSearching === false && this.props.artists.length === 0 &&
          <p>Searching...</p>
        }
        {
          this.props.hasDoneSearching === true && this.props.artists.length === 0 &&
          <p>No artist found.</p>
        }
        {
          this.props.hasDoneSearching === true && this.props.artists.length !== 0 &&
          <ul>
            {
              this.props.artists.map(artist => {
                return (
                  <li
                    onClick={() => this.props.searchForAlbums(artist)}
                    key={artist.id}>{artist.name}</li>
              )
            })}
          </ul>
        }
      </div>
    );
  }
}

export default SearchResultsContainer;