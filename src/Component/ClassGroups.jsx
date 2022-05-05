import React, { Component } from "react";
import "../App.css";
import styles from "./classgroup.module.css";
import starIcon from "../assets/unlitstar.svg";
import { Link } from "react-router-dom";

var user_image_map = {};

export default class ClassPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      createStatus: "public",
      createGroupName: "",
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      publicProfilePicture: [],
      classid: -1,
    };
  }

  componentDidMount() {
    this.fetchGroups();
  }

  async fetchGroups() {
    await fetch(process.env.REACT_APP_API_PATH + "/groups/", {
      method: "GET",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        let holdergroup = [];
        for (var i = 0; i < result[0].length; i++) {
          // console.log(result[0][i])
          if (result[0][i].attributes == null) {
            continue;
          }
          if (!result[0][i].attributes.isClass && result[0][i].attributes.id) {
            if (
              result[0][i].attributes.id ==
              window.location.pathname.split("/").pop()
            ) {
              if (result[0][i].attributes.status == "public") {
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
                      this.forceUpdate();
                    });
                }
                holdergroup.push(result[0][i]);
                this.setState({
                  groups: holdergroup,
                });
                if (this.state.membercount !== 0) {
                  console.log("IMAGES");
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
                        console.log("RESULT", result);
                        user_image_map[result.id] =
                          result.attributes.profilePicture;
                        console.log(user_image_map);
                      })
                      .catch((error) => console.log("error", error));
                  }
                }
              }
              // else if (
              //   result[0][i].attributes.status == "private" &&
              //   result[0][i].attributes.members.includes(
              //     Number(this.props.userid)
              //   )
              // ) {
              //   this.setState({
              //     groupname: result[0][i].name,
              //     status: result[0][i].attributes.status,
              //     membercount: result[0][i].attributes.members.length,
              //     members: result[0][i].attributes.members,
              //     groupid: result[0][i].id,
              //     postcounter: result[0][i].attributes.postcounter,
              //     classid: result[0][i].attributes.id,
              //     rating: result[0][i].attributes.rating,
              //   });
              //   if (this.state.classid !== -1) {
              //     fetch(
              //       process.env.REACT_APP_API_PATH +
              //         "/groups/" +
              //         this.state.classid,
              //       {
              //         method: "get",
              //         headers: {
              //           "Content-Type": "application/json",
              //           Authorization:
              //             "Bearer " + sessionStorage.getItem("token"),
              //         },
              //       }
              //     )
              //       .then((res) => res.json())
              //       .then((result) => {
              //         this.setState({
              //           name: result.name,
              //         });
              //         this.forceUpdate();
              //       });
              //   }
              //   holdergroup.push(result[0][i]);
              //   this.setState({
              //     groups: holdergroup,
              //   });
              //   if (this.state.membercount !== 0) {
              //     let holderPrivatePictures = [];
              //     for (var a = 0; a < this.state.membercount; a++) {
              //       fetch(
              //         process.env.REACT_APP_API_PATH +
              //           "/users/" +
              //           this.state.members[a],
              //         {
              //           method: "GET",
              //           headers: {
              //             accept: "*/*",
              //             Authorization:
              //               "Bearer " + sessionStorage.getItem("token"),
              //           },
              //         }
              //       )
              //         .then((response) => response.json())
              //         .then((result) => {
              //           if (
              //             !result.attributes.profilePicture &&
              //             !holderPrivatePictures.includes(
              //               "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
              //             )
              //           ) {
              //             holderPrivatePictures.push(
              //               "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
              //             );
              //             this.setState({
              //               privateProfilePicture: holderPrivatePictures,
              //             });
              //             this.forceUpdate();
              //           } else if (
              //             result.attributes.profilePicture &&
              //             !holderPrivatePictures.includes(
              //               result.attributes.profilePicture
              //             )
              //           ) {
              //             holderPrivatePictures.push(
              //               result.attributes.profilePicture
              //             );
              //             this.setState({
              //               privateProfilePicture: holderPrivatePictures,
              //             });
              //             this.forceUpdate();
              //           }
              //         })
              //         .catch((error) => console.log("error", error));
              //     }
              //   }
              // } else if (
              //   result[0][i].attributes.status == "private" &&
              //   !result[0][i].attributes.members.includes(
              //     Number(this.props.userid)
              //   )
              // ) {
              //   console.log("you are not in this group");
              //   this.setState({
              //     groupname: "Private Group",
              //     status: result[0][i].attributes.status,
              //     membercount: result[0][i].attributes.members.length,
              //     members: result[0][i].attributes.members,
              //     groupid: result[0][i].id,
              //     postcounter: result[0][i].attributes.postcounter,
              //     classid: result[0][i].attributes.id,
              //     rating: result[0][i].attributes.rating,
              //   });
              //   if (this.state.classid !== -1) {
              //     let privateGroup = result[0][i];
              //     privateGroup.name = "Private Group";
              //     holdergroup.push(privateGroup);
              //     console.log("private groups", privateGroup);
              //     this.setState({
              //       groups: holdergroup,
              //     });
              //   }
              //   if (this.state.membercount !== 0) {
              //     let holderPrivatePictures = [];
              //     for (var c = 0; c < this.state.membercount; c++) {
              //       holderPrivatePictures.push(
              //         "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
              //       );
              //       this.setState({
              //         privateProfilePicture: holderPrivatePictures,
              //       });
              //       this.forceUpdate();
              //     }
              //   }
              // }
            }
          }
          this.forceUpdate();
        }
      });
    console.log(this.state.privateProfilePicture);
    console.log(this.state.publicProfilePicture);
  }

  async removeHandler_Leave(id, name) {
    var newList = [];
    await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
      method: "GET",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("result1", result);
        this.setState({
          members: result.attributes.members,
          isClass: false,
          status: result.attributes.status,
          postcounter: result.attributes.postcounter,
          rating: result.attributes.rating,
          classid: result.attributes.id,
        });
        console.log(this.state.members);
        this.forceUpdate();
        newList = this.state.members.filter(
          (userid) => userid !== Number(this.state.userid)
        );
        console.log(newList);
      })
      .catch((error) => console.log("error", error));
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
    var newList = [];
    console.log(id, name);
    await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
      method: "GET",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        this.setState({
          groupname: result.name,
          members: result.attributes.members,
          isClass: false,
          status: result.attributes.status,
          postcounter: result.attributes.postcounter,
          rating: result.attributes.rating,
          classid: result.attributes.id,
        });
        console.log(this.state.members);
        this.forceUpdate();
        newList = this.state.members;
        newList.push(this.props.userid);
        console.log("updated list", newList);
      })
      .catch((error) => console.log("error", error));
    await fetch(process.env.REACT_APP_API_PATH + "/groups/" + id, {
      method: "PATCH",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        name: this.state.groupname,
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

  async createGroup(id) {
    await fetch(
      "https://webdev.cse.buffalo.edu/hci/api/api/commitment/groups",
      {
        method: "POST",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: this.state.createGroupName,
          attributes: {
            isClass: false,
            members: [id],
            status: this.state.createStatus,
            postcounter: this.state.postcounter,
            rating: this.state.rating,
            id: Number(window.location.pathname.split("/").pop()),
          },
        }),
      }
    )
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
    this.forceUpdate();
    window.location.reload();
  }

  render() {
    const { error, groups } = this.state;
    const handleChange = (event) => {
      this.setState({ createStatus: event.target.value });
    };
    const handleSubmit = (event) => {
      event.preventDefault();
      this.setState({ createGroupName: event.target.value });
    };
    return (
      <div className="post">
        <div className={styles.groupdiv}>
          <div id="creategroup" className={styles.classgrouplist}>
            <div className={styles.container}>
              <form onSubmit={handleSubmit}>
                <input
                  value={this.state.createGroupName}
                  className={styles.createName}
                  onChange={(e) =>
                    this.setState({ createGroupName: e.target.value })
                  }
                />
              </form>
              <p className={styles.membercount}>0 Student(s)</p>
            </div>
            <div className={styles.container}>
              <form onSubmit={handleChange}>
                <select
                  value={this.state.createStatus}
                  onChange={handleChange}
                  className={styles.createStatus}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </form>
            </div>
            <div className={styles.container}>
              <p className={styles.rating}>Average Rating</p>
              <div className={styles.stardiv}>
                <img className={styles.star} src={starIcon} alt="star" />
                <img className={styles.star} src={starIcon} alt="star" />
                <img className={styles.star} src={starIcon} alt="star" />
                <img className={styles.star} src={starIcon} alt="star" />
                <img className={styles.star} src={starIcon} alt="star" />
              </div>
            </div>
          </div>
          <button
            className={styles.createbutton}
            onClick={() => this.createGroup(this.props.userid)}
          >
            Create
          </button>
        </div>
        {groups.map((group) => (
          <>
            <div className={styles.groupdiv}>
              <Link
                to={/groups/ + group.id}
                onClick={() => this.setState({ name: group.name })}
              >
                <div className={styles.classgrouplist}>
                  <div className={styles.container}>
                    {group.name !== "Private Group" && (
                      <p className={styles.name}>
                        {this.state.name + ": " + group.name}
                      </p>
                    )}
                    {group.name == "Private Group" && (
                      <p className={styles.name}>{group.name}</p>
                    )}
                    <p className={styles.membercount}>
                      {group.attributes.members.length} Student(s)
                    </p>
                  </div>
                  <div className={styles.container1}>
                    <p className={styles.num_students}>
                      {group.attributes.members.length} Student(s)
                    </p>
                    <p className={styles.students}>Student(s)</p>
                    <div className={styles.students_circle_pfp}>
                      {group.attributes.status == "public" &&
                        group.attributes.members.length === 1 && (
                          <img
                            className={styles.profilepicture}
                            src={
                              "https://webdev.cse.buffalo.edu" +
                              user_image_map[group.attributes.members[0]]
                            }
                            alt={
                              group.attributes.members[0] + "'s Profile Avatar"
                            }
                          />
                        )}
                      {group.attributes.status == "public" &&
                        group.attributes.members.length === 2 && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={
                                group.attributes.members[0] +
                                "'s Profile Avatar"
                              }
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={
                                group.attributes.members[1] +
                                "'s Profile Avatar"
                              }
                            />
                          </>
                        )}
                      {group.attributes.status == "public" &&
                        (group.attributes.members.length === 3 ||
                          group.attributes.members.length > 3) && (
                          <>
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[0]]
                              }
                              alt={
                                group.attributes.members[0] +
                                "'s Profile Avatar"
                              }
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[1]]
                              }
                              alt={
                                group.attributes.members[1] +
                                "'s Profile Avatar"
                              }
                            />
                            <img
                              className={styles.profilepicture}
                              src={
                                "https://webdev.cse.buffalo.edu" +
                                user_image_map[group.attributes.members[2]]
                              }
                              alt={
                                group.attributes.members[2] +
                                "'s Profile Avatar"
                              }
                            />
                          </>
                        )}
                      {/* {group.attributes.status == "private" && group.attributes.members.length === 1 &&
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt=""/>
								}
								{group.attributes.status == "private" && group.attributes.members.length === 2 &&
									<>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="Profile Avatar"/>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="Profile Avatar"/>
									</>
								}
								{group.attributes.status == "private" && (group.attributes.members.length === 3 || group.attributes.members.length > 3) &&
								<>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="Profile Avatar"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="Profile Avatar"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[2]} alt="Profile Avatar"/>
								</>
								} */}
                    </div>
                  </div>
                  <div className={styles.container}>
                    <p className={styles.rating}>Average Rating</p>
                    <div className={styles.stardiv}>
                      <img className={styles.star} src={starIcon} alt="star" />
                      <img className={styles.star} src={starIcon} alt="star" />
                      <img className={styles.star} src={starIcon} alt="star" />
                      <img className={styles.star} src={starIcon} alt="star" />
                      <img className={styles.star} src={starIcon} alt="star" />
                    </div>
                  </div>
                </div>
              </Link>
              {group.attributes.members.includes(Number(this.props.userid)) && (
                <button
                  className={styles.leavebutton}
                  onClick={() => this.removeHandler_Leave(group.id, group.name)}
                >
                  Leave
                </button>
              )}
              {!group.attributes.members.includes(
                Number(this.props.userid)
              ) && (
                <button
                  className={styles.joinbutton}
                  onClick={() => this.removeHandler_Join(group.id, group.name)}
                >
                  Join
                </button>
              )}
            </div>
          </>
        ))}
      </div>
    );
  }
}
