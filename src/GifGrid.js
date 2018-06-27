import React from 'react'
import { Grid, Image } from 'semantic-ui-react'
// https://api.giphy.com/v1/gifs/search?api_key=bA5hdtPeLmhh5ADZ45ZopEfJpPvE5Ow8&q=dogs&limit=25&offset=0&rating=G&lang=en

const GifGrid = (props) => {
  console.log("GifGrid props:", props)
  const { list } = props
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
    console.log("clicked favorites")
    e.preventDefault()
    props.toggleFavorites()
  }

  return (
    <div style={{textAlign: "center"}}>
      {(columns.length > 0) ? <p>click on gif to save to favorites</p> : null}
      <button onClick={handleClick}>see favorites</button>
      <Grid>
        <Grid.Row columns={4}>
          {columns}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default GifGrid
