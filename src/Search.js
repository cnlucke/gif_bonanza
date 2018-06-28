import React, { Component } from 'react'

// look up how to hide this better
const NUM_GIFS = 24

export default class Search extends Component {
  state = {
    value: '',
    isLoading: false,
    results: [],
  }
  componentWillMount() {
    this.resetComponent()
  }

  globalStyle = {
    // border: '3px solid',
    borderRadius: '25px',
    height: '40px',
    width: '300px',
    display: 'inline-block',
    margin: '10px',
    paddingLeft: '10px',
  }

  submitStyle = {
    // border: '3px solid',
    borderRadius: '25px',
    height: '40px',
    width: '100px',
    display: 'inline-block',
    margin: '10px',
  }

  // https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=dogs&limit=25&offset=0&rating=G&lang=en
  handleSearchSubmit = (event) => {
    event.preventDefault();
    window.history.pushState("", "", '/');
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${this.state.value}&limit=${NUM_GIFS}&offset=0&rating=G&lang=en`)
    .then(res => res.json())
    .then(results => this.props.handleSearchResults(results.data))
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleChange = (e) => {
    this.setState({ isLoading: true, value: e.target.value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
    }, 300)
  }

  render() {
    return (
      <form onSubmit={this.handleSearchSubmit} style={{textAlign: "center"}}>
        <input
        type="search"
        value={this.state.value}
        onChange={this.handleChange}
        style={this.globalStyle}
        placeholder="enter search term"
        />
        <input
        type="submit"
        value="Search"
        style={this.submitStyle}
        />
      </form>
    )
  }
}
