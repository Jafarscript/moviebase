import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import CastCard from "../components/CastCard";
import BackButton from "../components/BackButton";
import { BiBookBookmark } from "react-icons/bi";
import Loader from "../components/Loader";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { enqueueSnackbar } from "notistack";

const MoviesInfo = () => {
  const [info, setInfo] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [credits, setCredits] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openTrailer, setOpenTrailer] = useState(false);
  const { mediaType, id } = useParams();
  const { addMovieToBookMark, bookmark, removeMovieFromBookMark, darkTheme } = useContext(GlobalContext);

  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    setLoading(true);

    // Fetch movie information
    axios
      .get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`)
      .then((response) => setInfo(response.data))
      .catch((error) => {
        console.error(error);
        setLoading(true);
        setError(error.message);
      });

    // Fetch movie credits
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/credits?api_key=${apiKey}`
      )
      .then((response) => setCredits(response.data.cast || [])) // Ensure it's always an array
      .catch((error) => {
        console.error(error);
        setLoading(true);
        setError(error.message);
      });

    // Fetch trailer information
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${id}/videos?api_key=${apiKey}`
      )
      .then((response) => {
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(true);
        setError(error.message);
      });
  }, [mediaType, id, apiKey]);

  const isBookmarked = bookmark.some(
    (bookmark) => bookmark.id === id && bookmark.mediaType === mediaType
  );

  const handleBookmark = () => {
    if (isBookmarked) {
      removeMovieFromBookMark(id);
      enqueueSnackbar('Remove From BookMark')
    } else {
      addMovieToBookMark(id, mediaType);
      enqueueSnackbar('Added to BookMark')
    }
  };

  // console.log(info)


  return (
    <section className="md:w-[85%]">
      {loading ? (
        <Loader error={error} />
      ) : (
        <section>
          <BackButton />
          <div className="mt-5 h-[30vh] lg:h-[80vh] w-full relative">
            <img
              src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
              alt={info.title || info.name}
              className="w-full h-full"
            />
            <div className="absolute bottom-5 md:bottom-10 left-2 md:left-10 z-20">
              <h1 className="text-2xl md:text-3xl lg:text-6xl  font-bold text-[#099268] mb-4">
                {info.title || info.name}
              </h1>
              <button
                className="text-white hover:bg-[#099268] flex items-center px-4 py-3 rounded-lg gap-3 border border-[#099268]"
                onClick={() => setOpenTrailer(true)}
              >
                <FaPlay />{" "}
                <span className="md:block hidden">Watch Trailer</span>
              </button>
            </div>
            <div className="absolute w-full h-full bg-gradient-to-bl z-10 from-rightGradient to-leftGradient top-0 left-0"></div>

            {openTrailer &&
              (trailerKey ? (
                <iframe
                  className="absolute top-0 w-full h-full z-30 transition-all duration-300"
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="YouTube video player"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="absolute top-0 w-full h-full z-30 flex items-center justify-center text-white text-xl bg-black/70 p-4">
                  Unfortunately, we can&apos;t find the video trailer for this
                  one.
                </div>
              ))}

            {openTrailer && (
              <button
                className="bg-red-500 rounded-md p-1 text-2xl absolute top-0 z-30 -right-5 md:-right-8 text-white"
                onClick={() => setOpenTrailer(false)}
              >
                <IoClose />
              </button>
            )}
          </div>

          <div className="flex gap-1 md:gap-3 my-4 w-full flex-wrap">
            {info.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-1 bg-[#099268] text-white  rounded-lg text-shadow  md:text-lg"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <section className="flex justify-between flex-wrap">
            <div className="flex items-center gap-6 mb-4">
              <div className="flex flex-col items-center gap-2 p-6 min-w-28 border border-[#099268] rounded-md">
                <span className="text-3xl text-[#099268]">
                  {info.vote_average}
                </span>
                <span className="text-sm text-gray-500">{info.vote_count}</span>
              </div>
              {mediaType === 'movie' ? (
                <div>
                <p className="text-[#099268]">
                  Release Date:{" "}
                  <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.release_date}</span>
                </p>
                <p className="text-[#099268]">
                  Duration:{" "}
                  <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.runtime} min</span>
                </p>
                <p className="text-[#099268]">
                  Status: <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.status}</span>
                </p>
              </div>
              ) : (
                <div>
                <p className="text-[#099268]">
                  Release Date:{" "}
                  <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.first_air_date}</span>
                </p>
                <p className="text-[#099268]">
                  Number Of Seasons:{" "}
                  <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.number_of_seasons
                  }</span>
                </p>
                <p className="text-[#099268]">
                  Status: <span className={`${darkTheme ? 'text-white' : 'text-black'}`}>{info.status}</span>
                </p>
              </div>
              )}
            </div>
            <div>
              <button
                onClick={handleBookmark}
                className={`flex px-4 py-1 rounded-md ${isBookmarked ? 'bg-[#099268] text-white' : ' border border-[#099268] text-[#099268]'}  items-center gap-4  text-lg text-shadow`}
              >
                <BiBookBookmark /> {isBookmarked ? 'BookMarked' : "Bookmark"}
              </button>
            </div>
          </section>

          <h3 className="text-2xl font-bold mt-1">Overview</h3>
          <p className="text-lg">{info.overview}</p>

          {credits.length > 0 ? (
            <section className="mt-4">
              <h2 className="text-4xl font-medium">Casts</h2>
              <div className="flex gap-4 mt-4 flex-wrap w-full justify-center md:justify-start">
                {Array.isArray(credits) &&
                  credits
                    .slice(0, 10)
                    .map((member) => (
                      <CastCard member={member} key={member.id} />
                    ))}
                {credits.length > 10 && (
                  <Link
                    to={`/${mediaType}/${id}/cast`}
                    className="text-center flex items-center justify-center w-32 h-40 md:w-40 md:h-52 border-2 border-[#099268] rounded-md text-[#099268] group hover:bg-[#099268] hover:text-white"
                  >
                    Show All <span className="group-hover:translate-x-1  transition-all ease-linear text-lg duration-200">→</span>
                  </Link>
                )}
              </div>
            </section>
          ) : (
            <p>No cast information available.</p>
          )}
        </section>
      )}
    </section>
  );
};

export default MoviesInfo;
