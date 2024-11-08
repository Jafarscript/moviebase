/* eslint-disable no-undef */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const BookMark = () => {
  const { bookmark } = useContext(GlobalContext);
  const [movies, setMovies] = useState([]);
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    const fetchBookmarks = async () => {
        const moviePromises = bookmark.map(async ({ id, mediaType }) => {
          try {
            const response = await axios.get(
              `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`
            );
            // Attach the mediaType to the fetched movie data
            return { ...response.data, mediaType };
          } catch (error) {
            console.error("Error fetching movie:", error);
            return null; // Handle error case
          }
        });
  
        const fetchedMovies = await Promise.all(moviePromises);
        // Filter out any null values in case of errors
        setMovies(fetchedMovies.filter((movie) => movie));
      };

    fetchBookmarks();
  }, [bookmark, apiKey]);


  return (
    <section>
      <h1 className="text-2xl font-bold mb-4">Bookmarked Movies</h1>
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} mediaType={movie.mediaType} />
          ))
        ) : (
          <p>No bookmarks yet.</p>
        )}
      </div>
    </section>
  );
};

export default BookMark;
