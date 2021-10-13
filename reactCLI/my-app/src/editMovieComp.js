import "./App.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function EditMovieComp(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const storeMovies = useSelector((state) => state.movies);
  const params = useParams("id");
  const [genre, setGenre] = useState("");
  const [movie, setMovie] = useState({});
  useEffect(() => {
    if (storeMovies.length > 0) {
      setMovie(storeMovies.filter((movie) => movie._id === params.movieID)[0]);
    } else {
      (async () => {
        let req = await axios.get(
          `/api/movies/${props.movieID || params.movieID}`
        );
        setMovie(await req.data);
      })();
    }
  }, []);

  const deleteGenre = (genreIndex) => {
    movie.genres.splice(genreIndex, 1);
    dispatch({ type: "EDIT_MOVIE", payload: movie });
  };

  const addGenre = (genre) => {
    movie.genres.push(genre);
    dispatch({ type: "EDIT_MOVIE", payload: movie });
  };

  return (
    <div className="App" className="addNewAndEdit">
      <span className="App-header">Edit Movie</span> <br />
      Movie name :
      <input
        className="input"
        type="text"
        value={movie.name}
        onChange={(e) => setMovie({ ...movie, name: e.target.value })}
      />
      <br />
      year Premiered :{" "}
      <input
        className="input"
        type="text"
        value={movie.yearPremiered}
        onChange={(e) =>
          setMovie({ ...movie, yearPremiered: parseInt(e.target.value) })
        }
      />
      <br />
      Genres :
      <input
        className="input"
        id="addGenreInput"
        type="text"
        placeholder="Add genres"
        onChange={(e) => setGenre(e.target.value)}
      />
      <button
        className="btn"
        onClick={(e) => {
          document.getElementById("addGenreInput").value = "";
          addGenre(genre);
        }}
      >
        add genre
      </button>
      <br />
      <select className="input" id="genres">
        {movie.genres &&
          movie.genres.map((genre, i) => {
            return (
              <option className="input" key={i} value={i}>
                {genre}
              </option>
            );
          })}
      </select>
      <button
        className="btn"
        onClick={() => {
          deleteGenre(document.getElementById("genres").value);
        }}
      >
        delete genre
      </button>
      <br />
      image URL :{" "}
      <input
        className="input"
        type="text"
        value={movie.image}
        onChange={(e) => setMovie({ ...movie, image: e.target.value })}
      />
      <br />
      <button
        className="btn"
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "EDIT_MOVIE", payload: movie });
          history.push("/movies");
        }}
      >
        update
      </button>
      <button className="btn" onClick={() => history.push("/movies")}>
        cancel
      </button>
    </div>
  );
}

export default EditMovieComp;
