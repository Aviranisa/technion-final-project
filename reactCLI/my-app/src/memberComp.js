import "./App.css";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import SubscriptionsComp from "./subscriptionsComp";
import { useEffect, useState } from "react";
import axios from "axios";

function MemberComp(props) {
  const [currentMember, setMember] = useState({});
  const params = useParams("memberID");
  const dispatch = useDispatch();
  let history = useHistory();
  const deleteMember = () => {
    dispatch({
      type: "DELETE_MEMBER",
      payload: props.memberID || params.memberID,
    });
  };

  useEffect(() => {
    (async () => {
      let req = await axios.get(
        `/api/members/${props.memberID || params.memberID}`
      );
      setMember(await req.data);
    })();
  }, []);

  const editMember = () => {
    history.push(`/editMember/${props.memberID || params.memberID}`);
  };
  return (
    <div className="member" key={props.memberID || params.memberID}>
      <strong>{currentMember.fullName}</strong>
      Email : <strong>{currentMember.email}</strong>
      City : <strong>{currentMember.city}</strong>
      <button
        className="btn"
        onClick={() => editMember()}
        style={{ marginRight: 5 }}
      >
        Edit
      </button>
      <button className="btn" onClick={() => deleteMember()}>
        Delete
      </button>
      <div>
        <SubscriptionsComp
          key={props.memberID || params.memberID}
          memberID={props.memberID || params.memberID}
        />
      </div>
    </div>
  );
}

export default MemberComp;
