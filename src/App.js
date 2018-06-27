import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Search from './Search'
import GifGrid from './GifGrid'

class App extends Component {
  state = {
    searchResults: [],
    favorites: [],
    showFavorites: false,
    showFavoriteAdded: false,
  }

  handleSearchResults = (results) => {
    this.setState({
      searchResults: results,
      showFavorites: false,
    })
  }

  handleFavorite = (gif) => {
    if (!this.state.favorites.includes(gif)) {
      this.setState({
        favorites: [...this.state.favorites, gif]
      }, this.toggleFavoriteAdded)
    }
  }

  toggleFavorites = () => {
    this.setState({ showFavorites: !this.state.showFavorites })
  }

  toggleFavoriteAdded = () => {
    console.log("TOgGLE FAVE ADDED!!")
    this.setState({ showFavoriteAdded: true }, () => console.log("show favorite added"))

    window.setTimeout(() => {
      this.setState({
        showFavoriteAdded: false
      }, () => console.log("don't show any more..."));
    }, 2000);
  }

  render() {
    const list = this.state.showFavorites ? this.state.favorites : this.state.searchResults
    return (
      <div>
        <Search handleSearchResults={this.handleSearchResults}/>
        <Route exact path="/" render={() => (
          <GifGrid
            list={list}
            showFavorites={this.state.showFavorites}
            toggleFavorites={this.toggleFavorites}
            handleFavorite={this.handleFavorite}
            showFavoriteAdded={this.state.showFavoriteAdded}
            clickFavorites={this.clickFavorites}/>
        )} />
        <Route exact path="/favorites" render={() => (
          <GifGrid
            list={list}
            showFavorites={this.state.showFavorites}
            toggleFavorites={this.toggleFavorites}
            handleFavorite={this.handleFavorite}
            clickFavorites={this.clickFavorites}/>
        )} />
      </div>
    );
  }
}

export default App;
