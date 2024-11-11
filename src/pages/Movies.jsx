import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./Movies.css";
import Loader from "../components/Loader";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { GlobalContext } from "../context/GlobalState";

// eslint-disable-next-line react/prop-types
const Movies = ({ endpoint, mediaType = "movie", showGenre = false}) => {
  // Default to "movie"
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(sessionStorage.getItem("page") || 1);
  const [inputPage, setInputPage] = useState(page);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const location = useLocation(); // Access the current route location
  // const history = useHistory(); // Access history to navigate
  const { darkTheme } = useContext(GlobalContext);

  useEffect(() => {
    const savedGenre = sessionStorage.getItem("selectedGenre");
  if (savedGenre) {
    setSelectedGenre(savedGenre);
  }
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
      sessionStorage.setItem("selectedGenre", selectedGenre || "");
  
  }, [endpoint, page,selectedGenre]);

  useEffect(() => {
    const [mediaType] = location.pathname.split('/').slice(1);
  
    // Check if the media type has changed
    if (mediaType !== sessionStorage.getItem('previousMediaType')) {
      sessionStorage.clear();
      setPage(1);
      setSelectedGenre('')
      sessionStorage.setItem('previousMediaType', mediaType);
    }
  }, [location.pathname]);
  


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
            <p className={`text-center ${darkTheme ? "text-white" : "text-gray-500"} text-xl mt-8`}>
              No results found.
            </p>
          ) : (
            <section className="flex flex-col gap-4 mt-4">
              {showGenre && <Header  setSelectedGenre={setSelectedGenre} mediaType={mediaType} selectedGenre={selectedGenre} />}
              <div className="movie-list">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} mediaType={mediaType} />
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
                className="w-10 text-black text-center outline-none"
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
