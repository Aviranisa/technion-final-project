import "./App.css";
import LoginComp from "./LoginComp.js";
import { Switch, Route, Link } from "react-router-dom";
import MoviesComp from "./moviesComp";
import MovieComp from "./movieComp";
import AddMovieComp from "./AddMovieComp.js";
import AddMemberComp from "./AddMemberComp";
import MembersComp from "./membersComp";
import MemberComp from "./memberComp";
import EditMemberComp from "./editMemberComp";
import EditMovieComp from "./editMovieComp";
import SubscriptionsComp from "./subscriptionsComp";
import cookies from "react-cookies";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

function App() {
  const [webapp_token, setCookie, removeCookie] = useCookies(["webapp_token"]);
  const storeLoggedIn = useSelector((state) => state.loggedIn);
  const storeUser = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cookies.load("webapp_token")) {
      if (!storeUser.id) {
        (async () => {
          let res = await axios.post("/api/auth/", { withCredentials: true });
          if (res.status === 200) {
            dispatch({ type: "SET_USER_DETAILS", payload: res.data });
          } else {
            dispatch({ type: "SET_USER_DETAILS" });
          }
        })();
      }
    } else {
      dispatch({ type: "SET_USER_DETAILS" });
    }
  }, []);

  const logout = async () => {
    removeCookie("webapp_token");
    dispatch({ type: "SET_USER_DETAILS" });
  };
  if (storeLoggedIn) {
    return (
      <div className="App">
        Welcome {storeUser.fullName}
        <button onClick={() => logout()}>Logout</button>
        <br />
        <Link to="/movies">Movies</Link>&nbsp;
        <Link to="/members">members</Link>
        <Switch>
          <Route exact path="/">
            <MoviesComp />
          </Route>
          <Route path="/movies">
            <MoviesComp />
          </Route>
          <Route path="/movie/:movieID">
            <MovieComp />
          </Route>
          <Route path="/addMovie">
            <AddMovieComp />
          </Route>
          <Route path="/editMovie/:movieID">
            <EditMovieComp />
          </Route>
          <Route path="/members">
            <MembersComp />
          </Route>
          <Route path="/editMember/:memberID">
            <EditMemberComp />
          </Route>
          <Route path="/addMember">
            <AddMemberComp />
          </Route>
          <Route path="/subscription">
            <SubscriptionsComp />
          </Route>
          <Route path="/member/:memberID">
            <MemberComp />
          </Route>
        </Switch>
      </div>
    );
  } else {
    return (
      <div className="App">
        <span>Welcome</span>
        <LoginComp />
      </div>
    );
  }
}

export default App;
