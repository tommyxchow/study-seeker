import React from "react";
import "../App.css";

import groupcss from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";
import { Link } from "react-router-dom";

export default class GroupDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      userid: props.userid,
      groups: [],
      name: "",
      groupname: "",
      members: [],
      rating: 0,
      membercount: 0,
      status: "",
      postcounter: 0,
      groupid: -1,
      profilePicture: "",
      username: "",
      usernameList: [],
      classid: -1,
    };
  }

  componentDidMount() {
    this.loadGroups();
  }

  loadGroups() {
    fetch(
      process.env.REACT_APP_API_PATH +
        "/groups/" +
        window.location.pathname.split("/").pop(),
      {
        method: "GET",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log("result", result);
            this.setState({
              isLoaded: true,
              groupname: result.name,
              status: result.attributes.status,
              members: result.attributes.members,
              membercount: result.attributes.members.length,
              id: result.id,
              postcounter: result.attributes.postcounter,
              classid: result.attributes.id,
              rating: result.attributes.rating,
            });
            if (this.state.classid !== -1) {
              fetch(
                process.env.REACT_APP_API_PATH +
                  "/groups/" +
                  this.state.classid,
                {
                  method: "get",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                  },
                }
              )
                .then((res) => res.json())
                .then((result) => {
                  this.setState({
                    name: result.name,
                  });
                  console.log(this.state.name);
                });
            }
            console.log("this.state", this.state);
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      )
      .then((response) => {
        console.log(this.state.membercount);
        const usernameList = [];
        for (var i = 0; i < this.state.membercount; i++) {
          console.log("newthing", this.state.members[i]);
          fetch(
            process.env.REACT_APP_API_PATH + "/users/" + this.state.members[i],
            {
              method: "GET",
              headers: {
                accept: "*/*",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
              },
            }
          )
            .then((response) => response.json())
            .then((result) => {
              if (result.attributes.profilePicture) {
                if (result.id === Number(this.state.userid)) {
                  console.log("this is you");
                  this.setState({
                    username:
                      result.attributes.firstName +
                      " " +
                      result.attributes.lastName +
                      " (You)",
                  });
                  this.setState({
                    profilePicture: result.attributes.profilePicture,
                  });
                  usernameList.push([
                    result.attributes.firstName +
                      " " +
                      result.attributes.lastName +
                      " (You)",
                    result.attributes.profilePicture,
                    result.id,
                  ]);
                  //profilePictureList.push(result.attributes.profilePicture)
                } else {
                  this.setState({
                    username:
                      result.attributes.firstName +
                      " " +
                      result.attributes.lastName,
                  });
                  this.setState({
                    profilePicture: result.attributes.profilePicture,
                  });
                  usernameList.push([
                    result.attributes.firstName +
                      " " +
                      result.attributes.lastName,
                    result.attributes.profilePicture,
                    result.id,
                  ]);
                  //profilePictureList.push(result.attributes.profilePicture)
                }
              }
              if (!result.attributes.profilePicture) {
                console.log("we got no pfp");
                this.setState({
                  username:
                    result.attributes.firstName +
                    " " +
                    result.attributes.lastName,
                });
                this.setState({
                  profilePicture:
                    "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
                });
                usernameList.push([
                  result.attributes.firstName +
                    " " +
                    result.attributes.lastName,
                  "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
                  result.id,
                ]);
                // profilePictureList.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
              }
              this.setState({ usernameList: usernameList });
              // this.setState({profilePictureList: profilePictureList})
              this.forceUpdate();
            })
            .catch((error) => console.log("error", error));
        }
      });
  }

  async removeHandler_Leave(id, name) {
    const newList = this.state.members.filter(
      (userid) => userid !== Number(this.state.userid)
    );
    console.log(newList);
    await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
      method: "PATCH",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
          isClass: false,
          members: newList,
          status: this.state.status,
          postcounter: this.state.postcounter,
          rating: this.state.rating,
          id: this.state.classid,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    this.forceUpdate();
    window.location.reload();
  }

  async removeHandler_Join(id, name) {
    const newList = this.state.members;
    newList.push(Number(this.props.userid));
    console.log(newList);
    this.setState({ members: newList });
    await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
      method: "PATCH",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
          isClass: false,
          members: newList,
          status: this.state.status,
          postcounter: this.state.postcounter,
          rating: this.state.rating,
          id: this.state.classid,
        },
      }),
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    this.forceUpdate();
    window.location.reload();
  }

  async updateStatus_private(id, name) {
    if (this.state.members.includes(Number(this.props.userid))) {
      await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
        method: "PATCH",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          attributes: {
            isClass: false,
            members: this.state.members,
            status: "private",
            postcounter: this.state.postcounter,
            rating: this.state.rating,
            id: this.state.classid,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      this.forceUpdate();
      window.location.reload();
    } else {
      this.props.toggleModal(
        "You are not in the group! Please join before changing privacy settings."
      );
    }
  }

  async updateStatus_public(id, name) {
    if (this.state.members.includes(Number(this.props.userid))) {
      await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
        method: "PATCH",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          attributes: {
            isClass: false,
            members: this.state.members,
            status: "public",
            postcounter: this.state.postcounter,
            rating: this.state.rating,
            id: this.state.classid,
          },
        }),
      })
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
      this.forceUpdate();
      window.location.reload();
    } else {
      this.props.toggleModal(
        "You are not in the group! Please join before changing privacy settings."
      );
    }
  }

  render() {
    const groups = this.state;
    return (
      <>
        <div className={groupcss.div1}>
          <div className={groupcss.groupdetailname}>
            {this.state.name + ": " + this.state.groupname}
          </div>
          {groups.members.includes(Number(this.props.userid)) && (
            <button
              className={groupcss.groupleavebutton}
              onClick={() =>
                this.removeHandler_Leave(groups.id, groups.groupname)
              }
            >
              Leave
            </button>
          )}
          {!groups.members.includes(Number(this.props.userid)) && (
            <button
              className={groupcss.groupjoinbutton}
              onClick={() =>
                this.removeHandler_Join(groups.id, groups.groupname)
              }
            >
              Join
            </button>
          )}
        </div>
        <div className={groupcss.div2}>
          <div className={groupcss.text}>Average Rating</div>
          <div className={groupcss.stardivgroupdetails}>
            <img
              className={groupcss.stargroupdetails}
              src={starIcon}
              alt="star"
            />
            <img
              className={groupcss.stargroupdetails}
              src={starIcon}
              alt="star"
            />
            <img
              className={groupcss.stargroupdetails}
              src={starIcon}
              alt="star"
            />
            <img
              className={groupcss.stargroupdetails}
              src={starIcon}
              alt="star"
            />
            <img
              className={groupcss.stargroupdetails}
              src={starIcon}
              alt="star"
            />
          </div>
        </div>
        <div className={groupcss.text}>Status: {groups.status}</div>
        <button
          className={groupcss.buttondiv}
          onClick={() => this.updateStatus_public(groups.id, groups.groupname)}
        >
          Public
        </button>
        <button
          className={groupcss.buttondiv}
          onClick={() => this.updateStatus_private(groups.id, groups.groupname)}
        >
          Private
        </button>
        <div className={groupcss.text}>
          {"Members (" + groups.membercount + ")"}
        </div>
        <div className={groupcss.div1}>
          {this.state.usernameList.map((names) => {
            console.log(this.state.usernameList);
            return (
              <div className={groupcss.membersdiv}>
                <Link to={/profile/ + names[2]}>
                  <img
                    className={groupcss.profilepicturegroupdetails}
                    src={"https://webdev.cse.buffalo.edu" + names[1]}
                    alt="profile pic"
                  />
                </Link>
                <div className={groupcss.membernames}>{names[0]}</div>
                <div className={groupcss.memberstardiv}>
                  <img
                    className={groupcss.stargroupdetails}
                    src={starIcon}
                    alt="star"
                  />
                  <img
                    className={groupcss.stargroupdetails}
                    src={starIcon}
                    alt="star"
                  />
                  <img
                    className={groupcss.stargroupdetails}
                    src={starIcon}
                    alt="star"
                  />
                  <img
                    className={groupcss.stargroupdetails}
                    src={starIcon}
                    alt="star"
                  />
                  <img
                    className={groupcss.stargroupdetails}
                    src={starIcon}
                    alt="star"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
