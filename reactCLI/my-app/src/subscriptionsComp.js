import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SubscriptionComp from "./subscriptionComp";
import AddSubscription from "./AddSubscriptionComp";

function SubscriptionsComp(props) {
  const storeSubscriptions = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();
  const [newSubscription, setNewSubscription] = useState(false);

  useEffect(() => {
    (async () => {
      let req = await axios.get("/api/subscriptions/");
      dispatch({ type: "LOAD_SUBSCRIPTIONS", payload: req.data });
    })();
  }, []);

  return (
    <div className="App">
      {props.memberID && (
        <button
          className="btn"
          onClick={() => setNewSubscription(!newSubscription)}
        >
          Subscribe to new movie
        </button>
      )}
      {newSubscription && (
        <AddSubscription key={props.memberID} memberID={props.memberID} />
      )}
      <div className="subscription">
        {storeSubscriptions.map((subscription, index) => {
          if (subscription.movieID === props.movieID) {
            return (
              <div key={index}>
                <SubscriptionComp
                  key={index}
                  isMember={true}
                  memberID={subscription.memberID}
                  subscriptionDate={subscription.date}
                />
              </div>
            );
          } else if (subscription.memberID === props.memberID) {
            return (
              <div key={index}>
                <SubscriptionComp
                  key={index}
                  isMember={false}
                  movieID={subscription.movieID}
                  subscriptionDate={subscription.date}
                />
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default SubscriptionsComp;
