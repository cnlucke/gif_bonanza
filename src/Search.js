import React, { Component } from 'react'

const NUM_GIFS = 24 // number of gifs to fetch at a time

export default class Search extends Component {
  state = {
    value: '',
    results: [],
  }
  componentWillMount() {
    this.resetComponent()
  }

  handleSearchSubmit = (event) => {
    event.preventDefault();
    window.history.pushState("", "", '/');
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${this.state.value}&limit=${NUM_GIFS}&offset=0&rating=G&lang=en`)
    .then(res => res.json())
    .then(results => this.props.handleSearchResults(results.data))
  }

  resetComponent = () => this.setState({ results: [], value: '' })

  handleChange = (e) => {
    this.setState({ value: e.target.value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
    }, 300)
  }

  render() {
    return (
      <form
        onSubmit={this.handleSearchSubmit}
        style={{textAlign: "center"}}
        data-test="component-search">
        <input
        id="search-input"
        type="search"
        name="search"
        value={this.state.value}
        onChange={this.handleChange}
        placeholder="enter search term"
        data-test="search-input"
        />
        <input
        type="submit"
        id="search-button"
        value="Search"
        data-test="search-button"
        />
      </form>
    )
  }
}
