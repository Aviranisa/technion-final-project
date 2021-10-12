import "./App.css";
import { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginComp() {
  const [loginObj, setLoginobj] = useState({ userName: "", password: "" });
  let history = useHistory();
  const dispatch = useDispatch();

  const login = async () => {
    let res = await axios.post("/api/login/", loginObj, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch({ type: "SET_USER_DETAILS", payload: res.data });
      window.location.reload();
      history.push("/movies");
    }
  };

  return (
    <div className="App">
      Username :
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => {
          setLoginobj({ userName: e.target.value });
        }}
      />
      <br />
      Password :
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setLoginobj({ ...loginObj, password: e.target.value });
        }}
      />
      <br />
      <button
        onClick={() => {
          login();
        }}
      >
        Login
      </button>
    </div>
  );
}

export default LoginComp;
