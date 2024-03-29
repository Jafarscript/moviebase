import { RiMovie2Fill } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
import { FaHotjar } from "react-icons/fa";
import { BiMovie } from "react-icons/bi";
import { AiOutlineHome } from "react-icons/ai";
import { BiBookBookmark } from "react-icons/bi";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import { useState } from "react";
// import {}

const SiderBar = () => {
  const [show, setShow] = useState(false);
  return (
    <section
      className={`fixed flex py-7 px-5  h-screen ${
        show ? "" : "w-[5rem]"
      } flex-col justify-between bg-[#f1f3f5] transition-all`}
      onMouseLeave={() => setShow(false)}
    >
      <div className="text-center transition-all">
        <header className="flex items-center gap-4">
          <RiMovie2Fill className="text-green-500 text-4xl" />
          <span className={`uppercase ${show ? "" : "hidden"}`}>MovieBase</span>
        </header>
        <nav className="mt-8 flex justify-center transition-all">
          <ul className="flex gap-1 flex-col">
            <li
              className={`flex items-center gap-4 h-auto hover:bg-[#dee2e6] px-4 py-2 rounded-lg relative group ${
                show ? "bg-[#dee2e6]" : ""
              }`}
            >
              <BsSearch
                className={`text-2xl ${show ? "text-[#099268]" : ""}`}
              />
              <input
                type="text"
                placeholder="Search Movies..."
                className={`${
                  show ? "" : "hidden"
                } bg-transparent outline-none transition-all text-base text-[#111]`}
              />
              <p
                className={`absolute top-2 right-[-70px] hidden  ${
                  show ? "" : "group-hover:block"
                }`}
              >
                Search
              </p>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#dee2e6] p-4 rounded-lg relative group">
              <AiOutlineHome className="text-2xl" />{" "}
              <span className={`font-semibold  ${show ? "" : "hidden"}`}>
                Home
              </span>
              <p
                className={`absolute top-4 right-[-65px] hidden ${
                  show ? "" : "group-hover:block"
                }`}
              >
                Home
              </p>
            </li>
            {!show && (
              <li
                className="flex items-center gap-4 hover:bg-[#dee2e6] p-4 rounded-lg cursor-pointer relative group"
                onClick={() => setShow(!show)}
              >
                <button>
                  <RiArrowRightDoubleFill className="text-2xl" />{" "}
                </button>
                <span className={` font-semibold ${show ? "" : "hidden"}`}>
                  Expand
                </span>
                <p
                  className={`absolute top-4 right-[-74px] hidden ${
                    show ? "" : "group-hover:block"
                  }`}
                >
                  Expand
                </p>
              </li>
            )}
            <li className="flex items-center gap-4 hover:bg-[#dee2e6] p-4 rounded-lg relative group">
              <BiMovie className="text-2xl" />{" "}
              <span className={`font-semibold ${show ? "" : "hidden"}`}>
                Movie
              </span>
              <p
                className={`absolute top-4 right-[-65px] hidden ${
                  show ? "" : "group-hover:block"
                }`}
              >
                Movie
              </p>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#dee2e6] p-4 rounded-lg relative group">
              <FaHotjar className="text-2xl" />
              <span className={`font-semibold ${show ? "block" : "hidden"}`}>
                Trending
              </span>
              <p
                className={`absolute top-4 right-[-85px] hidden ${
                  show ? "" : "group-hover:block"
                }`}
              >
                Trending
              </p>
            </li>
            <li className="flex items-center gap-4 hover:bg-[#dee2e6] p-4 rounded-lg relative group">
              <BiBookBookmark className="text-2xl" />
              <span className={`font-semibold ${show ? "" : "hidden"}`}>
                Bookmarks
              </span>
              <p
                className={`absolute top-4 right-[-100px] hidden ${
                  show ? "" : "group-hover:block"
                }`}
              >
                Bookmarks
              </p>
            </li>
          </ul>
        </nav>
      </div>
      <button
        className={`flex items-center gap-4 hover:bg-[#dee2e6] justify-self-end p-4 rounded-lg relative group ${
          show ? "" : "self-center"
        }`}
      >
        <FiSettings className="text-2xl" />
        <span className={`font-semibold ${show ? "" : "hidden"}`}>
          Settings
        </span>
        <p
          className={`absolute top-4 right-[-80px] hidden group-hover:block ${
            show ? "hidden" : ""
          }`}
        >
          Settings
        </p>
      </button>
    </section>
  );
};

export default SiderBar;
