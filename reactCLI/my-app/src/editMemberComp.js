import "./App.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import cookie from "react-cookies";

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
  useEffect(async () => {
    if (storeMembers.length > 0) {
      setMember(
        storeMembers.filter((member) => member._id == params.memberID)[0]
      );
    } else {
      const req = await axios.get(`/api/members/${params.memberID}`);
      setMember(req.data);
    }
  }, []);

  useEffect(() => {
    console.log(member);
  }, [member]);

  return (
    <div className="App">
      Edit member <br />
      Member name :
      <input
        type="text"
        value={member.fullName}
        onChange={(e) => setMember({ ...member, fullName: e.target.value })}
      />
      <br />
      Email :{" "}
      <input
        type="text"
        value={member.email}
        onChange={(e) => setMember({ ...member, email: e.target.value })}
      />
      <br />
      image URL :{" "}
      <input
        type="text"
        value={member.city}
        onChange={(e) => setMember({ ...member, city: e.target.value })}
      />
      <br />
      <button
        style={{ marginRight: 5 }}
        onClick={async () => {
          dispatch({ type: "EDIT_MEMBER", payload: member });
          history.push("/members");
        }}
      >
        update
      </button>
      <button onClick={() => history.push("/members")}>cancel</button>
    </div>
  );
}

export default EditMemeberComp;