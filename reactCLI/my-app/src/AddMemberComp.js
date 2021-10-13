import "./App.css";
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";

function AddMemberComp(props) {
  const history = useHistory();
  let dispatch = useDispatch();

  const [newMember, setMember] = useState({
    fullName: "",
    email: "",
    city: "",
  });

  return (
    <div className="App" className="addNew">
      <span className="App-header">Add Member</span> <br />
      <input
        className="input"
        type="text"
        placeholder="Full name"
        onChange={(e) => setMember({ ...newMember, fullName: e.target.value })}
      />
      <br />
      <input
        className="input"
        type="text"
        placeholder="Email"
        onChange={(e) => setMember({ ...newMember, email: e.target.value })}
      />
      <br />
      <input
        className="input"
        type="text"
        placeholder="City"
        onChange={(e) =>
          setMember({
            ...newMember,
            city: e.target.value,
          })
        }
      />
      <br />
      <button
        className="btn"
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "ADD_MEMBER", payload: newMember });
          history.push("/members");
        }}
      >
        save
      </button>
      <button className="btn" onClick={() => history.push("/members")}>
        cancel
      </button>
    </div>
  );
}
export default AddMemberComp;
