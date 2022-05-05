import React from "react";
import "../App.css";
import styles from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";
import { Link } from "react-router-dom";

var user_image_map = {};

export default class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameexists: false,
      isLoaded: false,
      userid: props.userid,
      groups: [],
      name: "",
      groupname: "",
      classname: "",
      members: [],
      rating: 0,
      membercount: 0,
      status: "",
      postcounter: 0,
      publicProfilePicture: [],
      groupid: -1,
      classid: -1,
    };
  }

  componentDidMount() {
    this.loadGroups();
  }

  loadGroups() {
    fetch(process.env.REACT_APP_API_PATH + "/groups", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            this.setState({
              isLoaded: true,
            });
            let holdergroup = [];
            for (var i = 0; i < result[0].length; i++) {
              if (result[0][i].attributes == null) {
                continue;
              }
              if (!result[0][i].attributes.isClass) {
                if (result[0][i].attributes.status == "private") {
                  for (
                    var j = 0;
                    j < result[0][i].attributes.members.length;
                    j++
                  ) {
                    if (
                      result[0][i].attributes.members[j] == this.props.userid
                    ) {
                      console.log("groupid",this.state.groupid);
                      this.setState({
                        groupname: result[0][i].name,
                        status: result[0][i].attributes.status,
                        membercount: result[0][i].attributes.members.length,
                        members: result[0][i].attributes.members,
                        groupid: result[0][i].id,
                        postcounter: result[0][i].attributes.postcounter,
                        classid: result[0][i].attributes.id,
                        rating: result[0][i].attributes.rating,
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
                              Authorization:
                                "Bearer " + sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((result) => {
                            this.setState({
                              name: result.name,
                            });
                            console.log("privatename: ", this.state.name);
                          });
                      }
                      holdergroup.push(result[0][i]);
                      this.setState({
                        groups: holdergroup,
                      });
                    }
                    if (this.state.membercount !== 0) {
                      for (var a = 0; a < this.state.membercount; a++) {
                        fetch(
                          process.env.REACT_APP_API_PATH +
                            "/users/" +
                            this.state.members[a],
                          {
                            method: "GET",
                            headers: {
                              accept: "*/*",
                              Authorization:
                                "Bearer " + sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((response) => response.json())
                          .then((result) => {
                            user_image_map[result.id] = result.attributes.profilePicture;
                          })
                          .catch((error) => console.log("error", error));
                      }
                    }
                  }
                } else if (result[0][i].attributes.status == "public") {
                  for (
                    var k = 0;
                    k < result[0][i].attributes.members.length;
                    k++
                  ) {
                    if (
                      result[0][i].attributes.members[k] == this.state.userid
                    ) {
                      this.setState({
                        groupname: result[0][i].name,
                        status: result[0][i].attributes.status,
                        membercount: result[0][i].attributes.members.length,
                        members: result[0][i].attributes.members,
                        groupid: result[0][i].id,
                        postcounter: result[0][i].attributes.postcounter,
                        classid: result[0][i].attributes.id,
                        rating: result[0][i].attributes.rating,
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
                              Authorization:
                                "Bearer " + sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((res) => res.json())
                          .then((result) => {
                            this.setState({
                              name: result.name,
                            });
                            console.log("publicname: ", this.state.name);
                          });
                      }
                      holdergroup.push(result[0][i]);
                      this.setState({
                        groups: holdergroup,
                      });
                    }
                    if (this.state.membercount !== 0) {
                      for (var b = 0; b < this.state.membercount; b++) {
                        fetch(
                          process.env.REACT_APP_API_PATH +
                            "/users/" +
                            this.state.members[b],
                          {
                            method: "GET",
                            headers: {
                              accept: "*/*",
                              Authorization:
                                "Bearer " + sessionStorage.getItem("token"),
                            },
                          }
                        )
                          .then((response) => response.json())
                          .then((result) => {
                            user_image_map[result.id] = result.attributes.profilePicture;
                          })
                          .catch((error) => console.log("error", error));
                      }
                    }
                  }
                }
              }
            }
          }
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  async removeHandler_Leave(id, name) {
    const newList = this.state.members.filter(
      (userid) => userid !== Number(this.state.userid)
    );
    // console.log(newList);
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

  render() {
    const { error, isLoaded, groups } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
          <div className={styles.mygroups}>My Groups</div>
          <div className={styles.line}></div>
          {groups.map((group) => (
            <>
              <div className={styles.groupdiv}>
                <Link
                  to={/groups/ + group.id}
                  onClick={() =>
                    this.setState({ name: group.name, groupid: group.id })
                  }
                  className={styles.link}
                >
                  <div className={styles.grouplist}>
                    <div className={styles.container}>
                      <p className={styles.name}>
                        {this.state.name + ": " + group.name}
                      </p>
                      <p className={styles.membercount}>
                        {group.attributes.members.length} Student(s)
                      </p>
                    </div>

                    <div className={styles.studentsContainer}>
                      <p className={styles.students}>Student(s)</p>
                      {group.attributes.status === "public" &&
                        group.attributes.members.length === 1 && (
                          <img
                            className={styles.profilepicture}
                            src={
                              "https://webdev.cse.buffalo.edu" +
                              user_image_map[group.attributes.members[0]]
                            }
                            alt={group.attributes.members[0]+"'s Profile Avatar"}
                          />
                        )}
                      {group.attributes.status === "public" &&
                        group.attributes.members.length === 2 && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={group.attributes.members[0]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={group.attributes.members[1]+"'s Profile Avatar"}
                            />
                          </>
                        )}
                      {group.attributes.status === "public" &&
                        (group.attributes.members.length === 3 ||
                          group.attributes.members.length > 3) && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={group.attributes.members[0]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={group.attributes.members[1]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[2]]
                              }
                              alt={group.attributes.members[2]+"'s Profile Avatar"}
                            />
                          </>
                        )}
                      {group.attributes.status === "private" &&
                        group.attributes.members.length === 1 && (
                          <img
                            className={styles.profilepicture}
                            src={
                              "https://webdev.cse.buffalo.edu" +
                              user_image_map[group.attributes.members[0]]
                            }
                            alt={group.attributes.members[0]+"'s Profile Avatar"}
                          />
                        )}
                      {group.attributes.status === "private" &&
                        group.attributes.members.length === 2 && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={group.attributes.members[0]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={group.attributes.members[1]+"'s Profile Avatar"}
                            />
                          </>
                        )}
                      {group.attributes.status === "private" &&
                        (group.attributes.members.length === 3 ||
                          group.attributes.members.length > 3) && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={group.attributes.members[0]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={group.attributes.members[1]+"'s Profile Avatar"}
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[2]]
                              }
                              alt={group.attributes.members[2]+"'s Profile Avatar"}
                            />
                          </>
                        )}
                    </div>

                    <div className={styles.container}>
                      <p className={styles.rating}>Average Rating</p>
                      <div className={styles.stardiv}>
                        <img
                          className={styles.star}
                          src={starIcon}
                          alt="star"
                        />
                        <img
                          className={styles.star}
                          src={starIcon}
                          alt="star"
                        />
                        <img
                          className={styles.star}
                          src={starIcon}
                          alt="star"
                        />
                        <img
                          className={styles.star}
                          src={starIcon}
                          alt="star"
                        />
                        <img
                          className={styles.star}
                          src={starIcon}
                          alt="star"
                        />
                      </div>
                    </div>
                    <div className={styles.container} hidden>
                      {"id: " + group.id} <br />
                      {"status: " + group.attributes.status} <br />
                      {"members: " + group.attributes.members}
                      {"name: " + group.name}
                    </div>
                  </div>
                </Link>
                <button
                  className={styles.leavebutton}
                  onClick={() => this.removeHandler_Leave(group.id, group.name)}
                >
                  Leave
                </button>
              </div>
            </>
          ))}
        </div>
      );
    }
  }
}
