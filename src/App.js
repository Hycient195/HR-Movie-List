import React, { useState, useRef } from 'react'
import './App.css'
import 'h8k-components'

import { Movieform, Movieslist, Search } from './components'

const title = 'Favorite Movie Directory'

// export const MovieContext = React.createContext()



function App() {
  const movieListRef = useRef([])
  console.log(JSON.stringify(movieListRef) + "from app.js")
 
  return (
    // <MovieContext.Provider value={movieList} >
      <div>
        <h8k-navbar header={ title } />
        <div className='layout-row justify-content-center mt-100'>
          <div className='w-30 mr-75'>
            <Movieform movieListRef={movieListRef.current} />
          </div>
          <div className='layout-column w-30'>
            <Search />
            <Movieslist moviesList={movieListRef.current} /> 
            <div data-testid='noResult'>
              <h3 className='text-center'>No Results Found</h3>
            </div>
          </div>
        </div> 
      </div>
    // </MovieContext.Provider>
  )
}

export default App;
