import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const GifGrid = (props) => {
  const { list, showFavorites, showFavoriteAdded } = props
  const columns = list.map( gif => {
      return  <Grid.Column key={gif.id}>
                <Image
                  src={gif.images.original.url}
                  size='large'
                  onClick={() => props.handleFavorite(gif)}
                  id={gif.id}
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
  console.log("GifGrid showFavoriteAdded:", showFavoriteAdded)
  return (
    <div style={{textAlign: "center"}}>
      <button id="toggle" onClick={handleClick}>
        {buttonLink()}
      </button>
      {(columns.length > 0) ? <p className="message">click on gif to save to favorites</p> : <p></p>}
      {(showFavoriteAdded) ?
        <p className="message" style={{color: "red", fontStyle: "italic"}}>gif was added to favorites</p>
        : <p></p>
      }
      <Grid>
        <Grid.Row columns={4}>
          {columns}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default GifGrid
