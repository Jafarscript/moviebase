import { Link } from "react-router-dom";
import { BiExpand } from "react-icons/bi";
import PropTypes from "prop-types";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";


// eslint-disable-next-line react/prop-types
const MovieCard = ({ movie, mediaType }) => {
    const { darkTheme } = useContext(GlobalContext);
    // const [hoveredMovieId, setHoveredMovieId] = useState(null);
  return (
    <div
      className="movie-item relative"
    >
      <Link to={`/${mediaType}/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`}
          alt={movie.title || movie.name}
          className="w-full h-full"
        />
      </Link>
      <Link
        to={`/${mediaType}/${movie.id}`}
        className="absolute inset-0 bg-black/80 flex flex-col justify-end items-center p-2 transition-all duration-300 opacity-0 hover:opacity-100 hover:translate-y-0"
      >
        <p className="absolute top-2/4 bottom-2/4 text-green-500 flex gap-2 items-center justify-center text-sm md:text-lg">
          <BiExpand /> More
        </p>
        <h1 className={`${darkTheme ? "bg-[#222] text-white" : 'text-black bg-[#dee2e6]'}  text-center text-xs md:text-base w-full rounded-lg py-4 px-2`}>
          {movie.title || movie.name}
        </h1>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  mediaType: PropTypes.string.isRequired,
};

export default MovieCard;
