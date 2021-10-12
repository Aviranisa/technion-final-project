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
    <div className="App">
      Add Member <br />
      <input
        type="text"
        placeholder="Full name"
        onChange={(e) => setMember({ ...newMember, fullName: e.target.value })}
      />
      <br />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setMember({ ...newMember, email: e.target.value })}
      />
      <br />
      <input
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
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "ADD_MEMBER", payload: newMember });
          history.push("/members");
        }}
      >
        save
      </button>
      <button onClick={() => history.push("/members")}>cancel</button>
    </div>
  );
}
export default AddMemberComp;
