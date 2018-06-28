import React, { Component } from 'react';
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

  componentDidMount() {
    // Get favorites from localStorage if they exist
    const currentFavorites = JSON.parse(localStorage.getItem("favoritesArray"))
    this.setState({ favorites: currentFavorites })

    // for refresh at /favorites path
    if (window.location.pathname === '/favorites') {
      this.toggleFavorites()
    }
  }

  handleSearchResults = (results) => {
    this.setState({
      searchResults: results,
      showFavorites: false,
    })
  }

  handleAddFavorite = (gif) => {
    if (!this.state.favorites.find(item => item.id === gif.id)) {
      this.setState({
        favorites: [...this.state.favorites, gif]
      }, () => {
        this.toggleFavoriteAdded()
        localStorage.setItem('favoritesArray', JSON.stringify(this.state.favorites));
      })
    }
  }

  handleFavoriteRemove = (gif) => {
    if (this.state.favorites.find(item => item.id === gif.id)) {
      const newFavorites = this.state.favorites.filter(item => item.id !== gif.id)
      localStorage.setItem('favoritesArray', JSON.stringify(newFavorites));
      this.setState({
        favorites: newFavorites
      })
    }
  }

  toggleFavorites = () => this.setState({ showFavorites: !this.state.showFavorites })

  toggleFavoriteAdded = () => {
    this.setState({ showFavoriteAdded: true })

    window.setTimeout(() => {
      this.setState({
        showFavoriteAdded: false
      });
    }, 2000);
  }

  getFavorites = () => {
    return JSON.parse(localStorage.getItem("favoritesArray")) || this.state.favorites
  }

  getList = () => {
    return (window.location.pathname === '/favorites') ? this.getFavorites() : this.state.searchResults
  }

  render() {
    return (
      <div data-test="component-app">
        <h1 id="welcome">Welcome to Gif Bonanza!</h1>
        <Search handleSearchResults={this.handleSearchResults} history={this.props.history}/>
        <GifGrid
          list={Array.from(this.getList())}
          showFavorites={this.state.showFavorites}
          toggleFavorites={this.toggleFavorites}
          handleAddFavorite={this.handleAddFavorite}
          handleFavoriteRemove={this.handleFavoriteRemove}
          showFavoriteAdded={this.state.showFavoriteAdded}
          clickFavorites={this.clickFavorites}/>
      </div>
    );
  }
}

export default App;
