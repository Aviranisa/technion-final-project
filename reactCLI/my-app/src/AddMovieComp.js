import "./App.css";
import { useState, useEffect } from "react";
import cookie from "react-cookies";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

function AddMovieComp(props) {
  const history = useHistory();
  let dispatch = useDispatch();

  const [newMovie, setMovie] = useState({
    name: "",
    yearPremiered: 0,
    genre: "",
    genres: [],
    image: "",
  });

  return (
    <div className="App">
      Add Movie <br />
      <input
        type="text"
        placeholder="Movie name"
        onChange={(e) => setMovie({ ...newMovie, name: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Year premiered"
        onChange={(e) =>
          setMovie({ ...newMovie, yearPremiered: parseInt(e.target.value) })
        }
      />
      <br />
      <input
        type="text"
        placeholder="genres"
        onChange={(e) =>
          setMovie({
            ...newMovie,
            genre: e.target.value,
          })
        }
      />
      <button
        onClick={(e) => {
          setMovie({
            ...newMovie,
            genres: [...newMovie.genres, newMovie.genre],
          });
        }}
      >
        add genre
      </button>
      <br />
      <input
        type="text"
        placeholder="image URI"
        onChange={(e) => setMovie({ ...newMovie, image: e.target.value })}
      />
      <br />
      <button
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "ADD_MOVIE", payload: newMovie });
          history.push("/movies");
        }}
      >
        save
      </button>
      <button onClick={() => history.push("/movies")}>cancel</button>
    </div>
  );
}

export default AddMovieComp;
