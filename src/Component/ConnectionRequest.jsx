import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

import litStarIcon from "../assets/litstar.svg";
import starIcon from "../assets/unlitstar.svg";
import connections from "./connections.module.css";

var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"));

var requestOptionsGet = {
  method: "GET",
  headers: myHeaders,
};

var requestOptionsDelete = {
  method: "DELETE",
  headers: myHeaders,
};

var user_id_map = {};
var user_image_map = {};

export default class ConnectionRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      accepted_friends: [],
      responseMessage: "", //List of accepted friends( used for my connection list )
      connection_id: -1,
      connection_id_list: [],
      userID_list: [],
      fromUserID: -1,
      profile: this.props.userid,
      imageID: "",
    };
    this.fieldChangeHandler.bind(this);
  }

  componentDidMount() {
    this.fetchUserIDs();
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
    });
  }

  removeHandler_Accept(givenName) {
    console.log("this is: ", givenName);
    console.log("userid: ", this.state.fromUserID);
    console.log("connectionid: ", this.state.connection_id);
    const newList = this.state.names.filter((name) => name !== givenName);
    const newConnectionList = this.state.connection_id_list.filter(
      (id) => id !== this.state.connection_id
    );
    const newUserList = this.state.userID_list.filter(
      (id) => id !== this.state.fromUserID
    );
    this.setState((prevState) => ({
      accepted_friends: [givenName, ...prevState.accepted_friends],
    }));
    this.setState({ names: newList });
    this.setState({ connection_id: newConnectionList });
    this.setState({ fromUserID: newUserList });
    var raw = JSON.stringify({
      fromUserID: this.state.fromUserID,
      toUserID: this.state.profile,
      attributes: {
        status: "accepted",
      },
    });
    var requestOptionsPatch = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
    };
    fetch(
      "https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" +
        this.state.connection_id,
      requestOptionsPatch
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    this.forceUpdate();
  }

  removeHandler_Reject(givenName) {
    console.log("this is: ", givenName);
    console.log("userid: ", this.state.fromUserID);
    console.log("connectionid: ", this.state.connection_id);
    const newList = this.state.names.filter((name) => name !== givenName);
    const newConnectionList = this.state.connection_id_list.filter(
      (id) => id !== this.state.connection_id
    );
    const newUserList = this.state.userID_list.filter(
      (id) => id !== this.state.fromUserID
    );
    this.setState({ names: newList });
    this.setState({ connection_id: newConnectionList });
    this.setState({ fromUserID: newUserList });
    fetch(
      "https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" +
        this.state.connection_id,
      requestOptionsDelete
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    this.forceUpdate();
  }

  fetchUserIDs() {
    const json = [];
    var arrConnections = [];
    var arrUserID = [];
    var connectionToID = [];
    //fetch all requests sent to the user
    fetch(
      "https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/?toUserID=" +
        sessionStorage.getItem("user"),
      requestOptionsGet
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("fetch", result);
        for (var i = 0; i < result.length; i++) {
          if (result[0][i] === undefined) {
            break;
          } else if (result[0][i].attributes.status === "pending") {
            json.push(result[0][i]);
          }
        }
        console.log(json.length);
        for (var a = 0; a < json.length; a++) {
          console.log("JSONA", json[a]);
          arrConnections.push(json[a].id);
          arrUserID.push(json[a].fromUserID);
          connectionToID.push([json[a].id, json[a].fromUserID]);
          user_id_map[
            json[a].fromUser.attributes.firstName +
              " " +
              json[a].fromUser.attributes.lastName[0] +
              "."
          ] = json[a].fromUserID;
          // user_image_map[
          //   json[a].fromUser.attributes.firstName +
          //     " " +
          //     json[a].fromUser.attributes.lastName[0] +
          //     "."
          // ] = json[a].fromUserID.attributes.profilePicture;
        }
        for (var b = 0; b < arrConnections.length; b++) {
          fetch(
            "https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" +
              arrConnections[b],
            requestOptionsGet
          )
            .then((response) => response.json())
            .then((result) => {
              console.log("result__", result);
              console.log("result.attributes.status", result.attributes.status);
              if (result.attributes.status === "accepted") {
                this.setState((prevState) => ({
                  accepted_friends: [
                    result.fromUser.attributes.firstName +
                      " " +
                      result.fromUser.attributes.lastName[0] +
                      ".",
                    ...prevState.accepted_friends,
                  ],
                }));
              } else {
                this.setState({
                  names: this.state.names.concat(
                    result.fromUser.attributes.firstName +
                      " " +
                      result.fromUser.attributes.lastName[0] +
                      "."
                  ),
                });
                this.setState({
                  connection_id_list: this.state.connection_id_list.concat(
                    result.id
                  ),
                });
                this.setState({
                  userID_list: this.state.userID_list.concat(result.fromUserID),
                });
                this.setState({ connection_id: result.id });
                this.setState({ fromUserID: result.fromUserID });
                this.setState({
                  imageID: result.fromUser.attributes.profilePicture,
                });
                console.log("names", this.state.names);
                console.log(
                  "connection_id_list",
                  this.state.connection_id_list
                );
                console.log("fromUserID list", this.state.userID_list);
              }
            })
            .catch((error) => console.log("error", error));
        }
      })
      .catch((error) => console.log("error", error));
    fetch(
      "https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/",
      requestOptionsGet
    )
      .then((response) => response.json())
      .then((result) => {
        for (var i = 0; i < result[0].length; i++) {
          let name = "";
          let id = -1;
          if (result[0][i].attributes.status == null) {
            continue;
          }
          if (
            result[0][i].attributes.status == "accepted" &&
            result[0][i].fromUserID == this.props.userid
          ) {
            name =
              result[0][i].toUser.attributes.firstName +
              " " +
              result[0][i].toUser.attributes.lastName[0] +
              ".";
            id = result[0][i].toUser.id;
            this.setState({
              imageID: result[0][i].toUser.attributes.profilePicture,
            });
            if (!this.state.accepted_friends.includes(name)) {
              console.log(this.state.accepted_friends.includes(name));
              this.setState((prevState) => ({
                accepted_friends: [name, ...prevState.accepted_friends],
              }));
            }
            user_id_map[name] = id;
          } else if (
            result[0][i].attributes.status == "accepted" &&
            result[0][i].toUserID == this.props.userid
          ) {
            name =
              result[0][i].fromUser.attributes.firstName +
              " " +
              result[0][i].fromUser.attributes.lastName[0] +
              ".";
            id = result[0][i].fromUser.id;
            this.setState({
              imageID: result[0][i].fromUser.attributes.profilePicture,
            });
            if (!this.state.accepted_friends.includes(name)) {
              this.setState((prevState) => ({
                accepted_friends: [name, ...prevState.accepted_friends],
              }));
            }
            user_id_map[name] = id;
          }
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    let accepted = Array.from(new Set(this.state.accepted_friends));
    console.log("accepted", accepted);

    console.log("useridmap", user_id_map);
    console.log("STATE", this.state);
    return (
      <div className="App">
        <div className={connections.requests}>Connection Requests</div>
        <div className={connections.line1}></div>
        <div className={connections.topcontainer}>
          {this.state.names.map((name) => {
            return (
              <div key={name} className={connections.testdiv}>
                <div className={connections.topdiv}>
                  <img
                    className={connections.picturecircle}
                    src={"https://webdev.cse.buffalo.edu/" + this.state.imageID}
                    alt={name + "'s profile picture"}
                  />
                  <Link
                    to={"/profile/" + user_id_map[name]}
                    className={connections.name}
                  >
                    {name}
                  </Link>
                  <div className={connections.stars}>
                    <img
                      className={connections.star1}
                      src={starIcon}
                      alt="star 1"
                    />
                    <img
                      className={connections.star2}
                      src={starIcon}
                      alt="star 2"
                    />
                    <img
                      className={connections.star3}
                      src={starIcon}
                      alt="star 3"
                    />
                    <img
                      className={connections.star4}
                      src={starIcon}
                      alt="star 4"
                    />
                    <img
                      className={connections.star5}
                      src={starIcon}
                      alt="star 5"
                    />
                  </div>
                  <button
                    className={connections.acceptbutton}
                    onClick={() => this.removeHandler_Accept(name)}
                  >
                    Accept
                  </button>
                  <button
                    className={connections.rejectbutton}
                    onClick={() => this.removeHandler_Reject(name)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* {console.log("testing",this.state.accepted_friends)} */}
        <div className={connections.connections}>Connections</div>
        <div className={connections.line2}> </div>
        <div className={connections.container}>
          {accepted.map((name) => {
            return (
              <div key={name}>
                <div className={connections.div}>
                  <img
                    className={connections.picturecircle}
                    src={"https://webdev.cse.buffalo.edu/"}
                    alt={name + "'s profile picture"}
                  />
                  <Link
                    to={"/profile/" + user_id_map[name]}
                    className={connections.name}
                  >
                    {name}
                  </Link>
                  <div className={connections.stars}>
                    <img
                      className={connections.star1}
                      src={starIcon}
                      alt="star 1"
                    />
                    <img
                      className={connections.star2}
                      src={starIcon}
                      alt="star 2"
                    />
                    <img
                      className={connections.star3}
                      src={starIcon}
                      alt="star 3"
                    />
                    <img
                      className={connections.star4}
                      src={starIcon}
                      alt="star 4"
                    />
                    <img
                      className={connections.star5}
                      src={starIcon}
                      alt="star 5"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
