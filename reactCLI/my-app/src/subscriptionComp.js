import "./App.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function SubscriptionComp(props) {
  const [member, setMember] = useState({});
  const [movie, setMovie] = useState({});

  useEffect(async () => {
    if (props.isMember) {
      const req = await axios.get(`/api/members/${props.memberID}`);
      setMember(req.data);
    } else {
      const req = await axios.get(`/api/movies/${props.movieID}`);
      setMovie(req.data);
    }
  }, []);

  return (
    <div>
      {props.isMember ? (
        <div>
          <Link to={`/member/${props.memberID}`}>{member.fullName}</Link>
          ,&nbsp;
          <span>{props.subscriptionDate.substring(0, 10)}</span>
        </div>
      ) : (
        <div>
          <Link to={`/movie/${props.movieID}`}>{movie.name}</Link>,&nbsp;
          <span>{props.subscriptionDate.substring(0, 10)}</span>
        </div>
      )}
    </div>
  );
}

export default SubscriptionComp;
