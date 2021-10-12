import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import SubscriptionsComp from "./subscriptionsComp";
import { useEffect, useState } from "react";
import axios from "axios";
import cookie from "react-cookies";

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

  useEffect(async () => {
    let req = await axios.get(
      `/api/members/${props.memberID || params.memberID}`
    );
    setMember(await req.data);
  }, []);

  const editMember = () => {
    history.push(`/editMember/${props.memberID || params.memberID}`);
  };
  return (
    <div
      style={{
        border: "1px solid",
        height: "auto",
        width: 250,
        margin: "auto",
      }}
      key={props.memberID || params.memberID}
      className="App"
    >
      <strong>{currentMember.fullName}</strong>
      <br />
      Email : <strong>{currentMember.email}</strong>
      <br />
      City : <strong>{currentMember.city}</strong>
      <br />
      <button onClick={() => editMember()} style={{ marginRight: 5 }}>
        Edit
      </button>
      <button onClick={() => deleteMember()}>Delete</button>
      <div>
        <SubscriptionsComp memberID={props.memberID || params.memberID} />
      </div>
    </div>
  );
}

export default MemberComp;
