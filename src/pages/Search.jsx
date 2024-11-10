import { useLocation } from "react-router-dom";
import Movies from "./Movies";
import { useState } from "react";
import { BiMovie } from "react-icons/bi";
import { IoTvSharp } from "react-icons/io5";

const Search = () => {
  const location = useLocation();
  const [tab, setSelectedTab] = useState("movie");

  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  const query = new URLSearchParams(location.search).get("query");

  if (!query) {
    return <p>Please enter a search query.</p>;
  }

  return (
    <section>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setSelectedTab("movie")}
          className={`${tab === "movie" ? 'bg-[#099268] text-white' : 'border border-[#099268] text-[#099268]'} px-3 py-1 rounded-sm flex items-center  gap-2`}
        >
        <BiMovie /> Movie
        </button>
        <button
          onClick={() => setSelectedTab("tv")}
          className={`${tab === "tv" ? 'bg-[#099268] text-white' : 'border border-[#099268] text-[#099268]'} px-3 py-1 rounded-sm flex items-center  gap-2`}
        >
         <IoTvSharp /> TV
        </button>
      </div>

      {tab === 'movie' && (<section>
        <Movies
          endpoint={`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`}
          mediaType="movie"
        />
      </section>)}
      
      {tab === 'tv' && (
        <section>
        <Movies
          endpoint={`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${query}`}
          mediaType="tv"
        />
      </section>
      )}
    </section>
  );
};

export default Search;
