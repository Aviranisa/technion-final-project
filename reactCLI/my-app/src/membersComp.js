import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import MemberComp from "./memberComp";
import { Link } from "react-router-dom";

function MembersComp() {
  const storeMembers = useSelector((state) => state.members);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let req = await axios.get("/api/members/");
      dispatch({ type: "LOAD_MEMBERS", payload: req.data });
    })();
  }, [storeMembers]);

  return (
    <div className="App">
      <br />
      <Link className="App-link" to="/addMember">
        {" "}
        Add new member
      </Link>
      <br />
      {storeMembers.map((member, index) => {
        return (
          <div className="members" key={index}>
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
