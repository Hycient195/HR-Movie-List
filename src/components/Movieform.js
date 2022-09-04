import React, { useState, useContext } from 'react'
import fs from "fs"
// import MovieContext from "../App";

function Movieform({ movieListRef }) {
  const [ movieName, setMovieName ] = useState("")
  const [ movieRating, setMovieRating ] = useState(0)
  const [ movieDuration, setMovieDuration ] = useState("")
  const [ errorState, setErrorState ] = useState(false)

  // const MovieContextConsumer = useContext(MovieContext)
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(movieDuration)
    const duationRegex = /(Hrs|m)/ig
    if(duationRegex.test(movieDuration) == false){
      setErrorState(true)
    }
    else {
      if(movieDuration.trim().endsWith("M") | movieDuration.trim().endsWith("m")){
        let durationConverted = {
          hours: 0,
          minutes: 0
        }
        durationConverted.hours = Math.floor(movieDuration.trim().split(/([a-z]|[A-Z])/i)[0] / 60) 
        durationConverted.minutes = movieDuration.trim().split(/([a-z]|[A-Z])/i)[0] % 60
        // setMovieDuration(`${durationConverted.hours}.${durationConverted.minutes}Hrs`)
        const movieData = {
          name: movieName,
          rating: movieRating,
          duration: `${durationConverted.hours}.${durationConverted.minutes}Hrs`
        }
        movieListRef.push(movieData)

      }
      else {

       const movieData2 = {
          name: movieName,
          rating: movieRating,
          duration: movieDuration
        }
        movieListRef.push(movieData2)
      }
    }

    console.log(JSON.stringify(movieListRef) + "from movieform.js")
  }

  return (
    <section>
      <div className='card pa-30'>
        <form onSubmit={handleSubmit}>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              placeholder='Enter Movie Name'
              data-testid='nameInput'
              value={movieName}
              onChange={(e)=> setMovieName(e.target.value)}
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
              value={movieRating}
              onChange={(e)=> setMovieRating(e.target.value)}
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
              value={movieDuration}
              onChange={(e)=> setMovieDuration(e.target.value)}
            />
          </div>
          {/* Use this div when time format is invalid */}
          {
            errorState === true &&
            <div 
              className='alert error mb-30'
              data-testid='alert'
            >
              Please specify time in hours or minutes (e.g. 2.5h or 150m)
            </div> 
          }
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
  )
}

export default Movieform
