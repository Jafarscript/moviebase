/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'

// eslint-disable-next-line react/prop-types
const CastCard = ({member}) => {
  return (
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
  )
}

export default CastCard