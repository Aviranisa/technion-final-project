import "./App.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

function AddSubscriptionComp(props) {
  let dispatch = useDispatch();
  const storeMovies = useSelector((state) => state.movies);
  const [subscription, setSubscription] = useState({
    movieID: "",
    date: "",
    memberID: props.memberID,
  });
  const [memberSubscriptions, setMemberSubscriptions] = useState([]);

  useEffect(() => {
    (async () => {
      let req = await axios.get("/api/movies/");
      dispatch({ type: "LOAD_MOVIES", payload: req.data });
      req = await axios.get(`/api/subscriptions/member/${props.memberID}`);
      setMemberSubscriptions(req.data);
    })();
  }, [subscription]);

  if (storeMovies.length > 0) {
    let moviesToSubscribe = [];
    storeMovies.map((storeMovie) => {
      if (
        memberSubscriptions.filter(
          (memberSubscription) => memberSubscription.movieID === storeMovie._id
        ).length === 0
      ) {
        moviesToSubscribe.push(storeMovie);
      }
    });
    if (moviesToSubscribe.length > 0) {
      subscription.movieID = moviesToSubscribe[0]._id;
      return (
        <div className="App">
          Add a new movie <br />
          <select
            onChange={(e) => {
              setSubscription({ ...subscription, movieID: e.target.value });
            }}
          >
            {moviesToSubscribe.map((movieToSubscribe) => {
              return (
                <option value={movieToSubscribe._id}>
                  {movieToSubscribe.name}
                </option>
              );
            })}
          </select>
          <input
            type="date"
            onChange={(e) =>
              setSubscription({ ...subscription, date: e.target.value })
            }
          />
          <br />
          <button
            onClick={() => {
              if (subscription.date !== "" && subscription.movieID !== "") {
                dispatch({ type: "ADD_SUBSCRIPTION", payload: subscription });
              }
            }}
          >
            Subscribe
          </button>
        </div>
      );
    } else {
      return <div className="App">No movies to add</div>;
    }
  } else {
    return <div className="App">No movies to add</div>;
  }
}

export default AddSubscriptionComp;
