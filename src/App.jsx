import { Routes, Route, Link } from "react-router-dom";
import SiderBar from "./components/SiderBar";
import Movies from "./pages/Movies";
import MoviesInfo from "./pages/MoviesInfo";
import Casts from "./pages/Casts";
import { useContext,  useState } from "react";
import Search from "./pages/Search";
import { RiMovie2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { GlobalContext } from "./context/GlobalState";
import BookMark from "./pages/BookMark";
import SettingsModal from "./components/SettingComponents";


const App = () => {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;
  const [openSidebar, setOpenSidebar] = useState(false);

  const [openSettings, setOpenSettings] = useState(false);

  const { darkTheme } = useContext(GlobalContext);


  return (
      <div className="relative">
      <SiderBar setOpenSidebar={setOpenSidebar} openSidebar={openSidebar} setOpenSettings={setOpenSettings}  />
      {openSettings && (
          <SettingsModal
            setOpenSettings={setOpenSettings}
          />
        )}
      <section className={`p-5 md:pl-24 relative ${darkTheme? "bg-[#222] text-white": ''}  min-h-screen`} >
        <div className="flex justify-between items-center mb-2 md:hidden">
        <Link to='/'><RiMovie2Fill className="text-green-500 text-4xl" /></Link>
        <GiHamburgerMenu onClick={() => setOpenSidebar(true)} className="text-4xl" />
        </div>
        {openSidebar && <div onClick={() => setOpenSidebar(false)} className={`absolute top-0 left-0 w-full min-h-screen h-full ${darkTheme ? 'bg-black' : 'bg-gray-50'}  opacity-40 z-20`}></div>}
        <Routes>
          <Route
            path="/"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}`}
                mediaType="movie"
              />
            }
          />
          <Route
            path="/movie"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`}
                mediaType="movie"
                showGenre
              />
            }
          />
          <Route
            path="/tv_shows"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`}
                mediaType="tv"
                showGenre  
              />
            }
          />
          <Route
            path="/trending"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`}
                mediaType="movie"
                 // assuming mostly movies; adjust if needed
              />
            }
          />
          <Route
          path="/:mediaType/:id/cast"
          element={<Casts />} 
          />
          {/* Route updated to include mediaType */}
          <Route
            path="/:mediaType/:id"
            element={<MoviesInfo />}
          />
        <Route path="/search" element={<Search />} />
        <Route path="/bookmarks" element={<BookMark />} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
