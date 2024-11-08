import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiExpand } from "react-icons/bi";
import "./Movies.css";
import Loader from "../components/Loader";
import Header from "../components/Header";

// eslint-disable-next-line react/prop-types
const Movies = ({ endpoint, mediaType = "movie"}) => {
  // Default to "movie"
  const [movies, setMovies] = useState([]);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(sessionStorage.getItem("page") || 1);
  const [inputPage, setInputPage] = useState(page);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState();
  const location = useLocation(); // Access the current route location
  // const history = useHistory(); // Access history to navigate

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${endpoint}&page=${page}${selectedGenre ? `&with_genres=${selectedGenre}` : ""}`)
      .then((response) => {
        setMovies(response.data.results);
        setPage(response.data.page);
        setTotalPages(response.data.total_pages);
        setLoading(false);
        setInputPage(page);
      })
      .catch((error) => {
        console.error(error);
        setLoading(true);
        setError(error.message);
      });
      
      sessionStorage.setItem("page", page);
  
  }, [endpoint, page,selectedGenre]);

  useEffect(() => {
    // Get the current path and search query
    const currentPathWithQuery = `${location.pathname}${location.search}`;
  
    // Reset page to 1 if the path + query changes (except when it's a page change)
    if (currentPathWithQuery !== sessionStorage.getItem("lastPathWithQuery")) {
      setPage(1);
    }
  
    // Store the current path with query in session storage
    sessionStorage.setItem("lastPathWithQuery", currentPathWithQuery);
  }, [location]);
  


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
        <Loader error={error} />
      ) : (
        <>
          {movies.length === 0 ? (
            <p className="text-center text-gray-500 text-xl mt-8">
              No results found.
            </p>
          ) : (
            <section className="flex flex-col gap-4">
              <Header  setSelectedGenre={setSelectedGenre} mediaType={mediaType} selectedGenre={selectedGenre} />
              <div className="movie-list">
                {movies.map((movie) => (
                  <div
                    key={movie.id}
                    className="movie-item relative"
                    onMouseEnter={() => setHoveredMovieId(movie.id)}
                    onMouseLeave={() => setHoveredMovieId(null)}
                  >
                    <Link to={`/${mediaType}/${movie.id}`} state={{ page }}>
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
                        ${
                          hoveredMovieId === movie.id
                            ? "opacity-100 translate-y-0"
                            : "opacity-0 translate-y-full pointer-events-none"
                        }`}
                    >
                      <p className="absolute top-2/4 bottom-2/4 text-green-500 flex gap-2 items-center justify-center text-sm md:text-lg">
                        <BiExpand /> More
                      </p>
                      <h1 className="bg-[#dee2e6] text-center text-xs md:text-base w-full rounded-lg py-4 px-2">
                        {movie.title || movie.name}
                      </h1>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </> )}
      <div className="self-center flex gap-4 justify-center items-center mt-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="px-4 py-2 rounded-3xl text-white bg-[#099268] flex items-center justify-center"
            >
              Previous
            </button>
            <span>
              Page{" "}
              <form onSubmit={() => setPage(inputPage)} className="inline">
              <input
                type="number"
                value={inputPage}
                className="w-10 text-center outline-none"
                onChange={(e) => setInputPage(e.target.value)}
              /></form>{" "}
              of {totalPages}
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
  );
};

export default Movies;
