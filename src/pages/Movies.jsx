import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import Loader from "../components/Loader";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { GlobalContext } from "../context/GlobalState";

// eslint-disable-next-line react/prop-types
const Movies = ({ endpoint, mediaType = "movie", showGenre = false }) => {
  // Default to "movie"
  const { darkTheme, page, setPage, selectedGenre, setSelectedGenre } = useContext(GlobalContext);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputPage, setInputPage] = useState(page);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation(); // Access the current route location

  useEffect(() => {
    let cancelled = false
    setLoading(true);

    // console.log(page)

    axios
      .get(`${endpoint}&page=${page}${selectedGenre ? `&with_genres=${selectedGenre}` : ""}`)
      .then((response) => {
        if(!cancelled){
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
        setInputPage(page);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false even on error
        setError(error.message);
      });


      return () => {
        cancelled = true
      }
  }, [endpoint, page, selectedGenre]);

  useEffect(() => {
    const currentMediaType = location.pathname.split("/")[1];
    const previousMediaType = sessionStorage.getItem("previousMediaType");

    if (currentMediaType !== previousMediaType) {
      // Update session storage and reset states
      sessionStorage.setItem("previousMediaType", currentMediaType);

      setTimeout(() => {
        setPage(1);
        setSelectedGenre(""); // Reset page to 1 with delay
      }, 100);
    }
  }, [location.pathname, setPage, setSelectedGenre]);

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

  const handleInputPageChange = (e) => {
    const value = e.target.value;
    // if (value > 0 && value <= totalPages) {
      setInputPage(value);
    // }
  };

  const handleInputPageSubmit = (e) => {
    e.preventDefault();
    setPage(inputPage);
  };

  return (
    <section>
      {loading ? (
        <Loader error={error} />
      ) : (
        <>
          {movies.length === 0 ? (
            <p className={`text-center ${darkTheme ? "text-white" : "text-gray-500"} text-xl mt-8`}>
              No results found.
            </p>
          ) : (
            <section className="flex flex-col gap-4 mt-4">
              {showGenre && (
                <Header setSelectedGenre={setSelectedGenre} mediaType={mediaType} selectedGenre={selectedGenre} />
              )}
              <div className="movie-list">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
                ))}
              </div>
            </section>
          )}
        </>
      )}
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
          <form onSubmit={handleInputPageSubmit} className="inline">
            <input
              type="number"
              value={inputPage}
              className="w-10 text-black text-center outline-none"
              onChange={handleInputPageChange}
              min="1"
              max={totalPages}
            />
          </form>{" "}
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
