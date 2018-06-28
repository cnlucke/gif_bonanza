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

  componentDidMount() {
    const currentFavorites = JSON.parse(localStorage.getItem("favoritesArray")) || []
    console.log("on mount: currentFavorites", JSON.parse(localStorage.getItem("favoritesArray")))
    this.setState({ favorites: currentFavorites }, () => console.log("on mount: this.state.favorites", this.state.favorites))

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
    console.log("this.state.favorites on add:", this.state.favorites)
    console.log("this.state.favorites type:", Array.isArray(this.state.favorites))
    if (!this.state.favorites.find(item => item.id === gif.id)) {
      this.setState({
        favorites: [...this.state.favorites, gif]
      }, () => {
        this.toggleFavoriteAdded()
        console.log("pushing to localStorage!")
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

  toggleFavorites = () => {
    this.setState({ showFavorites: !this.state.showFavorites })
  }

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
    if (window.location.pathname === '/favorites') {
      console.log("this.getFavorites:", this.getFavorites())
      console.log("localStorage:", JSON.parse(localStorage.getItem("favoritesArray")))
      console.log("this.state.favorites:", this.state.favorites)
      return this.getFavorites()
    } else {
      return this.state.showFavorites ? this.getFavorites() : this.state.searchResults
    }
  }

  render() {
    if (window.location.pathname === '/favorites') {
      console.log("App.js list:", Array.from(this.state.favorites))
    }
    return (
      <div>
        <Search handleSearchResults={this.handleSearchResults}/>
        <GifGrid
          list={this.getList()}
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
