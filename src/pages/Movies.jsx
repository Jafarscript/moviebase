import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiExpand } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import "./Movies.css";

// eslint-disable-next-line react/prop-types
const Movies = ({ endpoint, mediaType = "movie" }) => { // Default to "movie"
  const [movies, setMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${endpoint}&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        setPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [endpoint, page]);

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

  return (
    <section>
      {loading ? (
        <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[50vh]">
          <TfiReload className="text-green-500 text-4xl animate-spin" />
          Loading.... Please wait
        </div>
      ) : (
        <section className="flex flex-col gap-4">
          <div className="movie-list">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-item relative"
                onMouseEnter={() => setHoveredMovieId(movie.id)}
                onMouseLeave={() => setHoveredMovieId(null)}
              >
                <Link to={`/${mediaType}/${movie.id}`}> {/* Add mediaType to path */}
                  <img
                    src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
                    alt={movie.title || movie.name}
                    className="w-full h-full"
                  />
                </Link>
                <Link
                  to={`/${mediaType}/${movie.id}`}
                  className={`absolute inset-0 bg-black/80 flex flex-col justify-end items-center p-2 
                    transition-all duration-300 
                    ${hoveredMovieId === movie.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}
                  `}
                >
                  <p className="absolute top-2/4 bottom-2/4 text-green-500 text-xl flex gap-2 items-center justify-center">
                    <BiExpand /> More
                  </p>
                  <h1 className="bg-[#dee2e6] text-center w-full rounded-lg py-4 px-2">
                    {movie.title || movie.name}
                  </h1>
                </Link>
              </div>
            ))}
          </div>
          <div className="self-center flex gap-4 items-center">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-3xl text-white bg-[#099268] flex items-center justify-center"
            >
              Previous
            </button>
            <span>
              Page <input type="number" value={page} className="w-10 text-center outline-none" onChange={(e) => setPage(e.target.value)} /> of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="px-4 py-2 rounded-3xl text-white bg-[#099268] items-center justify-center"
            >
              Next
            </button>
          </div>
        </section>
      )}
    </section>
  );
};

export default Movies;
