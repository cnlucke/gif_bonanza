import _ from 'lodash'
import React, { Component } from 'react'
import { Grid, Image } from 'semantic-ui-react'
// https://api.giphy.com/v1/gifs/search?api_key=bA5hdtPeLmhh5ADZ45ZopEfJpPvE5Ow8&q=dogs&limit=25&offset=0&rating=G&lang=en

const GifGrid = (props) => {

  console.log("Grid props:", props)
  const { results } = props
  const columns = results.map( gif => {
      return  <Grid.Column key={gif.id}>
                <Image src={gif.images.original.url} size='large' rounded='true'/>
              </Grid.Column>
    })

  console.log("columns:", columns)
  return (
    <div>
      <Grid>
        <Grid.Row columns={4}>
          {columns}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default GifGrid
