import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const GifGrid = (props) => {
  const { list, showFavorites, showFavoriteAdded } = props
  const columns = list.map( gif => {
      return  <Grid.Column key={gif.id}>
                {(window.location.pathname === '/favorites') ?
                  <button id="remove" onClick={() => props.handleFavoriteRemove(gif)}>x</button>
                  : null}
                <Image
                  src={gif.images.original.url}
                  size='large'
                  onClick={() => props.handleAddFavorite(gif)}
                  id={gif.id}
                  data-test="gif"
                  rounded/>
              </Grid.Column>
    })

  const handleClick = (e) => {
    e.preventDefault()
    props.toggleFavorites()
  }

  const buttonLink = () => {
    return (showFavorites) ?
    <Link to="/">{"back to search results"}</Link>
     :
     <Link to="/favorites">{"see favorites"}</Link>
  }
  return (
    <div style={{textAlign: "center"}} data-test="component-gifgrid">
      <button id="toggle" onClick={handleClick} data-test="see-favorites-button">
        {buttonLink()}
      </button>
      {(columns.length > 0) ? <p className="message" data-test="click-gif-message">click on gif to save to favorites</p> : <p></p>}
      {(showFavoriteAdded) ?
        <p className="message" data-test="add-message" style={{color: "green", fontStyle: "italic"}}>gif was added to favorites</p>
        : <p></p>
      }
      <Grid centered>
        <Grid.Row columns={3}>
          {columns}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default GifGrid
