import "./App.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import cookie from "react-cookies";

function EditMovieComp(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const storeMovies = useSelector((state) => state.movies);
  const params = useParams("id");
  const [genre, setGenre] = useState("");
  const [movie, setMovie] = useState({});
  useEffect(async () => {
    if (storeMovies.length > 0) {
      setMovie(storeMovies.filter((movie) => movie._id == params.id)[0]);
    } else {
      let req = await axios.get(
        `/api/movies/${props.movieID || params.movieID}`
      );
      setMovie(await req.data);
    }
  }, [movie]);

  const deleteGenre = (genreIndex) => {
    movie.genres.splice(genreIndex, 1);
    dispatch({ type: "EDIT_MOVIE", payload: movie });
  };

  const addGenre = (genre) => {
    movie.genres.push(genre);
    dispatch({ type: "EDIT_MOVIE", payload: movie });
  };

  return (
    <div className="App">
      Edit Movie <br />
      Movie name :
      <input
        type="text"
        value={movie.name}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      />
      <br />
      year Premiered :{" "}
      <input
        type="text"
        value={movie.yearPremiered}
        onChange={(e) =>
          setMovie({ ...movie, yearPremiered: parseInt(e.target.value) })
        }
      />
      <br />
      Genres :
      <input
        id="addGenreInput"
        type="text"
        placeholder="Add genres"
        onChange={(e) => setGenre(e.target.value)}
      />
      <button
        onClick={(e) => {
          document.getElementById("addGenreInput").value = "";
          addGenre(genre);
        }}
      >
        add genre
      </button>
      <br />
      <select id="genres">
        {movie.genres &&
          movie.genres.map((genre, i) => {
            return <option value={i}>{genre}</option>;
          })}
      </select>
      <button
        onClick={() => {
          deleteGenre(document.getElementById("genres").value);
        }}
      >
        delete
      </button>
      <br />
      image URL :{" "}
      <input
        type="text"
        value={movie.image}
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
      />
      <br />
      <button
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "EDIT_MOVIE", payload: movie });
          history.push("/movies");
        }}
      >
        update
      </button>
      <button onClick={() => history.push("/movies")}>cancel</button>
    </div>
  );
}

export default EditMovieComp;
