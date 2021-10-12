import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MemberComp from "./memberComp";
import { useHistory, Link } from "react-router-dom";
import cookie from "react-cookies";

function MembersComp() {
  const storeMembers = useSelector((state) => state.members);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(async () => {
    let req = await axios.get("/api/members/");
    dispatch({ type: "LOAD_MEMBERS", payload: req.data });
  }, [storeMembers]);

  return (
    <div className="App">
      <br />
      <Link to="/addMember"> Add new member</Link> &nbsp;
      {storeMembers.map((member) => {
        return (
          <div key={member.id}>
            <MemberComp
              memberID={member._id}
              memberFullName={member.fullName}
              memberEmail={member.email}
              memberCity={member.city}
            />
          </div>
        );
      })}
    </div>
  );
}

export default MembersComp;
