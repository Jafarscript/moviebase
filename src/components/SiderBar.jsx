/* eslint-disable react/prop-types */
import { RiMovie2Fill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import { BiMovie } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookBookmark } from "react-icons/bi";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { IoTvSharp } from "react-icons/io5";
import { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";
// import {}

const SiderBar = ({setOpenSidebar, openSidebar, setOpenSettings}) => {
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { darkTheme } = useContext(GlobalContext); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery(""); // Clear the input after search
      setOpenSidebar(false);
    }
  };

  const isActive = (path) => location.pathname === path;
  return (
    <section
      className={`fixed flex py-7 px-5  h-screen z-50 ${
        show ? "" : "md:w-[5rem]"
      } flex-col justify-between ${darkTheme ? 'bg-black text-white' : 'bg-[#f1f3f5]'}  transition-all duration-500 ${openSidebar ? "translate-x-0" : '-translate-x-[500px] md:translate-x-0'}`}
      onMouseLeave={() => {
        setShow(false);
        setOpenSidebar(false);
      }}
      onMouseEnter={() => {
        setOpenSidebar(true);
      }}

      
    >
      <ImCross className="absolute right-2 top-2 text-red-500 md:hidden transition-all" onClick={() => setOpenSidebar(false)} />
      <div className="text-center transition-all">
        <header className="flex items-center gap-4">
        <Link to='/'><RiMovie2Fill className="text-green-500 text-4xl" /></Link>
          <span className={`uppercase ${show ? "" : "md:hidden"}`}>MovieBase</span>
        </header>
        <nav className="mt-8 flex justify-center transition-all">
          <ul className={`flex gap-1 flex-col ${show ? '' : 'md:w-[60px]'} `}>
            <li
              onClick={() => setShow(true)}
              className={`flex items-center gap-4 ${darkTheme ? 'hover:bg-[#222] bg-[#222]' : 'hover:bg-[#dee2e6] bg-[#dee2e6]'}  px-4  py-2 rounded-lg relative group ${
                show ? `${darkTheme ? 'md:bg-[#222]' : 'md:bg-[#dee2e6]'}` : "md:py-4 md:w-full md:bg-transparent "
              }`}
            >
              <BsSearch
                className={`text-2xl  text-[#099268]  ${show ? "" : `${darkTheme ? 'md:text-white' : 'md:text-black'}`}`}
              />
              <form onSubmit={handleSearchSubmit} className={`${
                    show ? "" : "md:hidden"
                  }`}>
                <input
                  type="text"
                  placeholder="Search Movies..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={`bg-transparent outline-none transition-all text-base ${darkTheme ? 'text-white' : 'text-[#111]'} `}
                />
              </form>
              <p
                className={`absolute top-2 right-[-70px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                Search
              </p>
            </li>
            <Link onClick={() => {
              setOpenSidebar(false)
              setShow(false)
              }} to='/'>
            <li className={`flex items-center gap-4 p-4 rounded-lg relative group ${
                isActive("/") ? "bg-green-500 text-white" : `${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]' }`
              }`}>
              <AiOutlineHome className="text-2xl" />{" "}
              <span className={`font-semibold  ${show ? "" : "md:hidden"}`}>
                Home
              </span>
              <p
                className={`absolute top-4 right-[-65px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                Home
              </p>
            </li>
            </Link>
            {!show && (
              <li
                className={`md:flex items-center hidden gap-4 ${darkTheme ?  'hover:bg-[#222]' : 'hover:bg-[#dee2e6' } p-4 rounded-lg cursor-pointer relative group`}
                onClick={() => setShow(!show)}
              >
                <button>
                  <RiArrowRightDoubleFill className="text-2xl" />{" "}
                </button>
                <span className={` font-semibold text-white ${show ? "" : "md:hidden"}`}>
                  Expand
                </span>
                <p
                  className={`absolute top-4 right-[-74px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                    show ? "" : "xl:group-hover:block"
                  }`}
                >
                  Expand
                </p>
              </li>
            )}
            <Link to='/movie' onClick={() => {
              setOpenSidebar(false)
              setShow(false)
              }}>
            <li className={`flex items-center gap-4 p-4 rounded-lg relative group ${
                isActive("/movie") ? "bg-green-500 text-white" : `${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]' }`
              }`}>
              <BiMovie className="text-2xl" />{" "}
              <span className={`font-semibold ${show ? "" : "md:hidden"}`}>
                Movie
              </span>
              <p
                className={`absolute top-4 right-[-65px] hidden ${darkTheme ? 'text-white' : 'text-black'}  font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                Movie
              </p>
            </li>
            </Link>
            <Link to='/tv_shows' onClick={() => {
              setOpenSidebar(false)
              setShow(false)
              }}>
            <li className={`flex items-center gap-4 p-4 rounded-lg relative group ${
                isActive("/tv_shows") ? "bg-green-500 text-white" : `${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]' }`
              }`}>
              <IoTvSharp className="text-2xl" />
              <span className={`font-semibold ${show ? "block" : "md:hidden"}`}>
                TV Shows
              </span>
              <p
                className={`absolute top-4 right-[-90px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                TV Shows
              </p>
            </li>
            </Link>
            <Link to='/trending' onClick={() => {
              setOpenSidebar(false)
              setShow(false)
              }}>
            <li className={`flex items-center gap-4 p-4 rounded-lg relative group ${
                isActive("/trending") ? "bg-green-500 text-white" : `${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]' }`
              }`}>
              <FaHotjar className="text-2xl" />
              <span className={`font-semibold ${show ? "block" : "md:hidden"}`}>
                Trending
              </span>
              <p
                className={`absolute top-4 right-[-85px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                Trending
              </p>
            </li>
            </Link>
            <Link to='/bookmarks' onClick={() => {
              setOpenSidebar(false)
              setShow(false)
              }}>
            <li className={`flex items-center gap-4 p-4 rounded-lg relative group ${
                isActive("/bookmarks") ? "bg-green-500 text-white" : `${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]' }`
              }`}>
              <BiBookBookmark className="text-2xl" />
              <span className={`font-semibold ${show ? "" : "md:hidden"}`}>
                Bookmarks
              </span>
              <p
                className={`absolute top-4 right-[-100px] hidden ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
                  show ? "" : "xl:group-hover:block"
                }`}
              >
                Bookmarks
              </p>
            </li>
            </Link>
          </ul>
        </nav>
      </div>
      <button
      onClick={() => {
        setOpenSettings(true)
      }}
        className={`flex items-center gap-4 ${darkTheme ? 'hover:bg-[#222]' : 'hover:bg-[#dee2e6]'}  justify-self-end p-4 rounded-lg relative group ${
          show ? "" : "md:self-center"
        }`}
      >
        <FiSettings className="text-2xl" />
        <span className={`font-semibold ${show ? "" : "md:hidden"}`}>
          Settings
        </span>
        <p
          className={`absolute top-4 right-[-80px] hidden  ${darkTheme ? 'text-white' : 'text-black'} font-bold ${
            show ? "hidden" : "xl:group-hover:block"
          }`}
        >
          Settings
        </p>
      </button>
    </section>
  );
};

export default SiderBar;
