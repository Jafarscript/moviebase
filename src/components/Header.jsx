/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

const Header = ({ setSelectedGenre, mediaType, selectedGenre }) => {
  const [genres, setGenres] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { darkTheme } = useContext(GlobalContext);
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    // Fetch genres from TMDb API
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/genre/${mediaType}/list?api_key=${apiKey}`
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      }
    };

    fetchGenres();
  }, [apiKey, mediaType]);

  

  const clearFilter = () => {
    setSelectedGenre(null)
    sessionStorage.removeItem('selectedGenre')
    setShowDropdown(false);
  }

  const handleGenreSelect = (genreId) => {
    setGenres(genreId)
    if(genreId === selectedGenre){
        clearFilter();
    }else{
        setSelectedGenre(genreId);
    }
    setShowDropdown(false);
  };


  return (
    <header className="flex justify-between items-center text-black mb-5">
      <h1 className={` ${darkTheme ? 'text-white' : ''} text-2xl font-bold capitalize`}>{mediaType} Explorer</h1>
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="bg-green-600 px-4 py-2 rounded text-white"
        >
          Select Genre
        </button>
        {showDropdown && (
          <div className="absolute top-full w-auto h-[70vh]  overflow-x-hidden overflow-y-scroll bg-white text-black rounded shadow-lg mt-2 z-50 transition-all no-scrollbar scroll-smooth">
            <button onClick={clearFilter} className="block px-4 py-2 hover:bg-gray-200 w-full text-left">
                Clear Filter
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                className={`block px-4 py-2 hover:bg-gray-200 w-full text-left ${selectedGenre === genre.id && 'bg-[#099268] text-white'}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;