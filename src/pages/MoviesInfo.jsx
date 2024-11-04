import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MoviesInfo = () => {
  const [info, setInfo] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [openTrailer, setOpenTrailer] = useState(false);
  const { mediaType, id } = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${apiKey}`)
      .then((response) => setInfo(response.data))
      .catch((error) => console.error(error));

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
      .catch((error) => console.error(error));
  }, [mediaType, id, apiKey]);

  console.log(info);

  return (
    <section className="lg:w-[84%]">
      {loading ? (
        <div className="flex flex-col gap-4 w-full items-center justify-center min-h-[50vh]">
          <TfiReload className="text-green-500 text-4xl animate-spin" />
          Loading.... Please wait
        </div>
      ) : (
        <section>
          <button
            onClick={() => navigate(-1)}
            className="text-green-700 text-base hover:bg-green-700 hover:text-white border-green-700 px-5 py-1 border rounded-md flex items-center justify-center gap-2 font-medium"
          >
            <MdArrowBackIosNew className="text-xs" /> Back
          </button>
          <div className="mt-5 h-[30vh] lg:h-[80vh] w-full relative">
            <img
              src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
              alt={info.title || info.name}
              className="w-full h-full"
            />
            <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 z-20">
              <h1 className="text-6xl hidden lg:block font-bold text-[#099268] mb-4">
                {info.title || info.name}
              </h1>
              <button
                className="text-white hover:bg-green-700 flex items-center px-4 py-3 rounded-lg gap-3 border border-green-700"
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
                className="bg-red-500 rounded-md p-1 text-2xl absolute top-0 -right-8 text-white"
                onClick={() => setOpenTrailer(false)}
              >
                <IoClose />
              </button>
            )}
          </div>

          <div className="flex gap-3 my-4">
            {info.genres.map((genre) => (
              <span
                key={genre.id}
                className="px-4 py-1 bg-[#099268] text-white rounded-lg text-lg"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-6 mb-4">
            <div className="flex flex-col items-center gap-2 p-6 border border-[#099268] rounded-md">
              <span className="text-3xl text-[#099268]">{info.vote_average}</span>
              <span className="text-sm text-gray-500">{info.vote_count}</span>
            </div>
            <div>
              <p className="text-[#099268]">
                Release Date: <span className="text-black">{info.release_date}</span>
              </p>
              <p className="text-[#099268]">Duration: <span className="text-black">{info.runtime} min</span></p>
              <p className="text-[#099268]">Status: <span className="text-black">{info.status}</span></p>
            </div>
          </div>

          <p className="text-lg">{info.overview}</p>
        </section>
      )}
    </section>
  );
};

export default MoviesInfo;
