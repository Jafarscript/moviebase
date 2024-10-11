// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { TfiReload } from "react-icons/tfi";
import { FaPlay } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const MoviesInfo = () => {
  // eslint-disable-next-line no-unused-vars
  const [info, setInfo] = useState([]);
  const [trailerKey, setTrailerKey] = useState("");
  const [openTrailer, setOpenTailer] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
      .then((response) => {
        // console.log(response);
        setInfo(response.data);
      })
      .catch((error) => console.error(error));

    // fecth trailer key
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${apiKey}`
      )
      .then((response) => {
        const trailers = response.data.results.filter(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (trailers.length > 0) {
          setTrailerKey(trailers[0].key); // Set the first YouTube trailer key
        }
      })
      .catch((error) => console.error(error));
  }, [params.id, apiKey]);

  console.log(info);

  if (!info)
    return (
      <div className="flex w-full items-center justify-center min-h-[50vh]">
        <TfiReload className="text-green-500 text-4xl" />
      </div>
    );
  return (
    <section className="lg:w-[84%]">
      <button
        onClick={() => navigate(-1)}
        className="text-green-700 text-base hover:bg-green-700 hover:text-white border-green-700 px-5 py-1 border rounded-md flex items-center justify-center gap-2 font-medium"
      >
        <MdArrowBackIosNew className="text-xs" /> Back
      </button>
      <div className="mt-5 h-[30vh] lg:h-[80vh] w-full relative">
        <img
          src={`https://image.tmdb.org/t/p/w1280/${info.backdrop_path}`}
          alt={info.title}
          className="w-full h-full"
        />
        <div className="absolute bottom-5 md:bottom-10 left-5 md:left-10 z-20">
          <h1 className="text-6xl hidden lg:block font-bold text-green-400 mb-4">
            {info.title}
          </h1>
          <button className="text-white hover:bg-green-700 flex items-center px-4 py-3 rounded-lg gap-3 border border-green-700" onClick={() => setOpenTailer(true)}>
            <FaPlay /> <span className="md:block hidden">Watch Trailer</span>
          </button>
        </div>
        <div className="absolute w-full h-full bg-gradient-to-bl z-10 from-rightGradient to-leftGradient top-0 left-0"></div>
        {trailerKey ? (
          <iframe
            className={`absolute top-0 w-full h-full z-30 transition-all duration-300 ${openTrailer ? "" : "hidden"}`}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            title="YouTube video player"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="flex w-full items-center justify-center min-h-[50vh]">
            <TfiReload className="text-green-500 text-4xl" />
          </div>
        )}
        {openTrailer && 
        (<button className="bg-red-500 rounded-md p-1 text-2xl absolute top-0 -right-8 text-white" onClick={() => setOpenTailer(false)}><IoClose /></button>)
        }
      </div>
    </section>
  );
};

export default MoviesInfo;
