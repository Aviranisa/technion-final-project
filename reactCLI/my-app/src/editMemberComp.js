import "./App.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function EditMemeberComp(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const storeMembers = useSelector((state) => state.members);
  const params = useParams("memberID");
  const [member, setMember] = useState({
    fullName: "",
    email: "",
    city: "",
  });
  useEffect(() => {
    if (storeMembers.length > 0) {
      setMember(
        storeMembers.filter((member) => member._id === params.memberID)[0]
      );
    } else {
      (async () => {
        const req = await axios.get(`/api/members/${params.memberID}`);
        setMember(req.data);
      })();
    }
  }, []);

  return (
    <div className="App" className="addNewAndEdit">
      <span className="App-header">Edit member</span> <br />
      Member name :
      <input
        className="input"
        type="text"
        value={member.fullName}
        onChange={(e) => setMember({ ...member, fullName: e.target.value })}
      />
      <br />
      Email :{" "}
      <input
        className="input"
        type="text"
        value={member.email}
        onChange={(e) => setMember({ ...member, email: e.target.value })}
      />
      <br />
      image URL :{" "}
      <input
        className="input"
        type="text"
        value={member.city}
        onChange={(e) => setMember({ ...member, city: e.target.value })}
      />
      <br />
      <button
        className="btn"
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "EDIT_MEMBER", payload: member });
          history.push("/members");
        }}
      >
        update
      </button>
      <button className="btn" onClick={() => history.push("/members")}>
        cancel
      </button>
    </div>
  );
}

export default EditMemeberComp;
