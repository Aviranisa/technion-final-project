import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import SubscriptionsComp from "./subscriptionsComp";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function MovieComp(props) {
  const [currentMovie, setMovie] = useState({});
  const params = useParams("movieID");
  const dispatch = useDispatch();
  let history = useHistory();
  const deleteMovie = () => {
    dispatch({
      type: "DELETE_MOVIE",
      payload: props.movieID || params.movieID,
    });
  };

  useEffect(() => {
    (async () => {
      let req = await axios.get(
        `/api/movies/${props.movieID || params.movieID}`
      );
      setMovie(await req.data);
    })();
  }, []);

  const editMovie = () => {
    history.push(`/editMovie/${props.movieID || params.movieID}`);
  };
  return (
    <div className="movie" key={props.movieID || params.movieID}>
      <strong>{currentMovie.name}</strong> ,{" "}
      <strong>{currentMovie.yearPremiered}</strong>
      <img style={{ width: 195, height: 200 }} src={currentMovie.image}></img>
      <strong>Geners :</strong>
      {currentMovie.genres &&
        currentMovie.genres.map((genre, i) => (
          <span key={i}>
            {genre}
            {i < currentMovie.genres.length - 1 && ", "}
          </span>
        ))}
      <br />
      <button className="btn" onClick={() => editMovie()}>
        Edit
      </button>
      <button className="btn" onClick={() => deleteMovie()}>
        Delete
      </button>
      <div>
        <SubscriptionsComp movieID={props.movieID || params.movieID} />
      </div>
    </div>
  );
}

export default MovieComp;
