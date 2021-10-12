import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MovieComp from "./movieComp";
import { Link } from "react-router-dom";

function MoviesComp() {
  const storeMovies = useSelector((state) => state.movies);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(async () => {
    const req = await axios.get("/api/movies/");
    dispatch({ type: "LOAD_MOVIES", payload: req.data });
    if (searchValue === "") {
      setMovies(req.data);
    }
  }, []);

  useEffect(async () => {
    search(searchValue);
  }, [searchValue]);

  const search = (value) => {
    console.log(value);
    if (value === "") {
      setMovies(storeMovies);
    } else {
      setMovies(
        storeMovies.filter((movie) =>
          movie.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  return (
    <div className="App">
      <br />
      <Link to="/addMovie"> Add new movie</Link> &nbsp;
      <input
        type="text"
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
      <button
        onClick={() => {
          search(searchValue);
        }}
      >
        Search
      </button>
      {movies.map((movie) => {
        return (
          <div
            style={{
              border: "1px solid",
              height: "auto",
              width: 200,
              margin: "auto",
            }}
            key={movie._id}
          >
            <MovieComp
              movieID={movie._id}
              movieName={movie.name}
              yearPremiered={movie.yearPremiered}
              genres={movie.genres}
              image={movie.image}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MoviesComp;
