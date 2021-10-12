const axios = require("axios");
function appReducer(
  state = {
    movies: [],
    user: {},
    members: [],
    subscriptions: [],
    currentMember: {},
    currentMovie: {},
    loggedIn: false,
  },
  action
) {
  switch (action.type) {
    case "LOAD_MOVIES":
      return { ...state, movies: action.payload };
    case "LOAD_MOVIE":
      return { ...state, currentMovie: action.payload };
    case "ADD_MOVIE":
      (async () => axios.post("/api/movies/", action.payload))();
      return { ...state, movies: [...state.movies, action.payload] };

    case "EDIT_MOVIE":
      let newMoviesArray = state.movies;
      let currentMovieIndex = newMoviesArray.findIndex(
        (movie) => movie._id === action.payload._id
      );
      newMoviesArray[currentMovieIndex] = action.payload;
      (async () =>
        axios.put(`/api/movies/${action.payload._id}`, action.payload))();
      return { ...state, movies: newMoviesArray };

    case "DELETE_MOVIE":
      let movieID = action.payload;
      let moviesArr = state.movies;
      let deleteMovieIndex = moviesArr.findIndex(
        (movie) => movie._id === movieID
      );
      moviesArr.splice(deleteMovieIndex, 1);
      (async () => axios.delete(`/api/movies/${action.payload}`))();
      return { ...state, movies: moviesArr };

    case "SET_USER_DETAILS":
      return {
        ...state,
        user: action.payload,
        loggedIn: action.payload === undefined ? false : true,
      };

    case "LOAD_MEMBERS":
      return { ...state, members: action.payload };

    case "ADD_MEMBER":
      (async () => axios.post("/api/members/", action.payload))();
      return { ...state, members: [...state.members, action.payload] };

    case "LOAD_MEMBER":
      return { ...state, currentMember: action.payload };

    case "EDIT_MEMBER":
      let newMemberArray = state.movies;
      let currentMemberIndex = newMemberArray.findIndex(
        (member) => member._id === action.payload._id
      );
      newMemberArray[currentMemberIndex] = action.payload;
      (async () =>
        axios.put(`/api/members/${action.payload._id}`, action.payload))();
      return { ...state, movies: newMemberArray };

    case "DELETE_MEMBER":
      let memberID = action.payload;
      let membersArr = state.members;
      let deleteMemberIndex = membersArr.findIndex(
        (member) => member._id === memberID
      );
      membersArr.splice(deleteMemberIndex, 1);
      (async () => axios.delete(`/api/members/${action.payload}`))();
      return { ...state, members: membersArr };

    case "LOAD_SUBSCRIPTIONS":
      return { ...state, subscriptions: action.payload };

    case "ADD_SUBSCRIPTION":
      (async () =>
        axios.post(`/api/subscriptions/${action.payload.movieID}`))();
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };

    default:
      return state;
  }
}

export default appReducer;
