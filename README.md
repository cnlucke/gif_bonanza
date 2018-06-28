# WELCOME TO GIF BONANZA!

## Quick Start
  * `npm install` or `yarn install`
  * `npm start` or `yarn start`

## Usage

### Search Page ('/')
  * Enter text in search field and click `Search` button to see available gifs.
  * Click on a gif to save to favorites. (Note: Favorites are persisted on refresh through use of localStorage.)

### Favorites Page ('/favorites')
  * View Favorites by clicking button `see favorites` from the Search page. This will take you to the Favorites page with path '/favorites'.
  * Entering a search term in the input field and clicking `Search` button causes page to navigate away from '/favorites' path back to the Search page where you can view the search results.
  * You can also return to search results from Favorites page by clicking button `back to search results`
  * Remove gif from the Favorites page by clicking the 'X' in the top right corner of the gif.

## Tests

Basic unit tests have been written using Jest and Enzyme. To execute the tests from the root directory, run `yarn test`.
