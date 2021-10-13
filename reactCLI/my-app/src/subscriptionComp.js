import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SubscriptionComp(props) {
  const [member, setMember] = useState({});
  const [movie, setMovie] = useState({});
  const [date, setDate] = useState("");

  useEffect(() => {
    if (props.isMember) {
      (async () => {
        const req = await axios.get(`/api/members/${props.memberID}`);
        setMember(req.data);
        setDate(props.subscriptionDate);
      })();
    } else {
      (async () => {
        const req = await axios.get(`/api/movies/${props.movieID}`);
        setMovie(req.data);
        setDate(props.subscriptionDate);
      })();
    }
  }, []);

  return (
    <div>
      {props.isMember ? (
        <div>
          <Link className="App-link2" to={`/member/${props.memberID}`}>
            {member.fullName}
          </Link>
          ,&nbsp;
          <span>{date.substring(0, 10)}</span>
        </div>
      ) : (
        <div>
          <Link className="App-link2" to={`/movie/${props.movieID}`}>
            {movie.name}
          </Link>
          ,&nbsp;
          <span>{date.substring(0, 10)}</span>
        </div>
      )}
    </div>
  );
}

export default SubscriptionComp;
