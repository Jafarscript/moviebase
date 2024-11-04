import { Routes, Route } from "react-router-dom";
import SiderBar from "./components/SiderBar";
import Movies from "./pages/Movies";
import MoviesInfo from "./pages/MoviesInfo";
import Casts from "./pages/Casts";

const App = () => {
  // eslint-disable-next-line no-undef
  const apiKey = process.env.API_KEY;

  return (
    <div className="relative">
      <SiderBar />
      <section className="p-5 md:pl-24">
        
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
              />
            }
          />
          <Route
            path="/tv_shows"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}`}
                mediaType="tv"
              />
            }
          />
          <Route
            path="/trending"
            element={
              <Movies
                endpoint={`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`}
                mediaType="movie" // assuming mostly movies; adjust if needed
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
        </Routes>
      </section>
    </div>
  );
};

export default App;
