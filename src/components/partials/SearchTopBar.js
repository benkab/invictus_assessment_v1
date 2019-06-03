import React from 'react';
import '../../App.css'
import SearchResultsContainer from './SearchResultsContainer'

class SearchTopBar extends React.Component {

  constructor(props){
    super(props)
    this.searchTerm = React.createRef()
    this.state = {
      isTyping: false
    }
  }

  search = () => {
    if(this.searchTerm.current.value){
      this.setIsTyping()
      this.props.search(this.searchTerm.current.value)
    } else {
      this.clearSearch()
    }
  }

  clearSearch = () => {
    this.searchTerm.current.value = ''
    this.resetIsTyping()
    this.props.clearSearch()
  }

  setIsTyping = () => {
    this.setState({isTyping: true})
  }

  resetIsTyping = () => {
    this.setState({isTyping: false})
  }
  
  render(props) {
    return (
      <div className="row">
        <div className="col-lg-11 col-md-10 col-sm-9 col-xs-9 search-input-container">
          <input 
            onChange={() => this.search()}
            onFocus={() => this.search()}
            className="form-control" 
            ref={this.searchTerm}
            placeholder="Search for an artist"
          />
          {
            this.props.isSearching === true &&
            <SearchResultsContainer 
              searchForAlbums={this.props.searchForAlbums}
              isSearching={this.props.isSearching}
              hasDoneSearching={this.props.hasDoneSearching}
              artists={this.props.artists}
            />
          }
          {
            this.state.isTyping === true &&
            <span onClick={() => this.clearSearch()}>Clear</span>
          }
        </div>
        <div className="col-lg-1 col-md-2 col-sm-3 col-xs-3 search-button-container">
          <a 
            onClick={() => this.search()}
            className="btn btn-block 
            search-button">SEARCH</a>
        </div>
      </div>
    );
  }
}

export default SearchTopBar;