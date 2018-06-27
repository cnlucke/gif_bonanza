import React, { Component } from 'react';
import './App.css';
import Search from './Search'
import GifGrid from './GifGrid'

class App extends Component {
  state = {
    searchResults: [],
    favorites: [],
    showFavorites: false,
  }

  handleSearchResults = (results) => {
    this.setState({
      searchResults: results
    }, () => console.log("searchResults:", this.state.searchResults))
  }

  handleFavorite = (gif) => {
    this.setState({
      favorites: [...this.state.favorites, gif]
    }, () => console.log("favorites:", this.state.favorites))
  }

  toggleFavorites = () => {
    this.setState({ showFavorites: !this.state.showFavorites })
  }

  render() {
    console.log("showFavorites:", this.state.showFavorites)
    console.log("favorites:", this.state.favorites)
    console.log("searchResults:", this.state.searchResults)
    const list = this.state.showFavorites ? this.state.favorites : this.state.searchResults
    console.log("list:", list)
    return (
      <div>
        <Search handleSearchResults={this.handleSearchResults}/>
        <GifGrid
          list={list}
          toggleFavorites={this.toggleFavorites}
          clickFavorites={this.clickFavorites}/>
      </div>
    );
  }
}

export default App;
