import _ from 'lodash'
import React, { Component } from 'react'
import GifGrid from './GifGrid'

// look up how to hide this better
const API = 'bA5hdtPeLmhh5ADZ45ZopEfJpPvE5Ow8'
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
    border: '3px solid blue',
    borderRadius: '25px',
    height: '60px',
    width: '300px',
    display: 'block',
    margin: '0 auto',
    marginTop: '20px',
    marginBottom: '20px',
  }

  // https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=dogs&limit=25&offset=0&rating=G&lang=en
  getGifs = () => {
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API}&q=${this.state.value}&limit=${NUM_GIFS}&offset=0&rating=G&lang=en`)
      .then(res => res.json())
      .then(results => this.setState({ results: results.data }))
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleSearchChange = (e) => {
    this.setState({ isLoading: true, value: e.target.value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()
      this.getGifs()
    }, 300)
  }

  render() {
    const { value, results } = this.state
    console.log("value in render:", value)
    return (
      <div>
        <input
          onChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          value={value}
          style={this.globalStyle}
        />
        <GifGrid results={results} />
      </div>
    )
  }
}
