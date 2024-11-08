/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

// eslint-disable-next-line react/prop-types
const CastCard = ({ member }) => {
  return (
    <>
      {member.profile_path === null ? (
        <div className="text-center flex items-center flex-col justify-center w-32 h-40 md:w-40 md:h-52 border-2 border-[#099268] text-xl font-medium rounded-md text-[#099268] group hover:bg-[#099268] hover:text-white">
          <BsExclamationTriangle className="w-10 h-10" />
          Image Unavailable
        </div>
      ) : (
        <div
          // eslint-disable-next-line react/prop-types
          key={member.id}
          className="flex flex-col items-center gap-2"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.google.com/search?q=${member.name}`}
            className="w-32 h-40 md:w-40 md:h-52 rounded-md border-2 border-[#099268] overflow-hidden relative"
          >
            <img
              src={`https://image.tmdb.org/t/p/w1280/${member.profile_path}`}
              // eslint-disable-next-line react/prop-types
              alt={member.name}
              className="absolute h-full w-full hover:scale-110 transition duration-300"
            />
          </a>
          <p>{member.name}</p>
        </div>
      )}
    </>
  );
};

export default CastCard;
