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
    <div
      style={{
        marginRight: "5px",
        marginLeft: "5px",
        border: "1px solid",
        padding: "10px",
      }}
      key={props.movieID || params.movieID}
      className="App"
    >
      <strong>{currentMovie.name}</strong> ,{" "}
      <strong>{currentMovie.yearPremiered}</strong>
      <br />
      <br />
      <img style={{ width: 150, height: 150 }} src={currentMovie.image}></img>
      <br />
      <strong>Geners</strong> :
      {currentMovie.genres &&
        currentMovie.genres.map((genre, i) => (
          <span key={i}>
            {genre}
            {i < currentMovie.genres.length - 1 && ", "}
          </span>
        ))}
      <br />
      <button onClick={() => editMovie()}>Edit</button>
      <button onClick={() => deleteMovie()}>Delete</button>
      <div>
        <SubscriptionsComp movieID={props.movieID || params.movieID} />
      </div>
    </div>
  );
}

export default MovieComp;
