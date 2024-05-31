/* eslint-disable no-unused-vars */
// import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import './Movies.css'


// eslint-disable-next-line react/prop-types
const Movies = ({endpoint}) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    axios.get(`${endpoint}&page=${page}`)
    .then(response =>{ setMovies(response.data.results);
    setPage(response.data.page);
    setTotalPages(response.data.total_pages)}
  )
    .catch(error => console.error(error))
  }, [endpoint, page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  if (!movies) return <div>Loading...</div>;

  return (
    <section className="flex flex-col gap-4">
      <div className="movie-list">
      {movies.map(movie => (
        <div key={movie.id} className="movie-item">
        <Link to={`/movie/${movie.id}`}>
          <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} className="w-full h-full" />
        </Link>
      </div>
      ))}
    </div>
    <div className="self-center flex gap-4 items-center">
        <button onClick={handlePreviousPage} disabled={page === 1} className="px-4 py-2 rounded-3xl text-white bg-[#099268] flex items-center justify-center">Previous</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={page === totalPages} className="px-4 py-2 rounded-3xl text-white bg-[#099268] items-center justify-center" >Next</button>
      </div>
    </section>
  )
}

export default Movies