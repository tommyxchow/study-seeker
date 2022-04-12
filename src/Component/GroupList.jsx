import React from "react";
import "../App.css";
import styles from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";

export default class GroupList extends React.Component {
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
      publicProfilePicture: [],
      privateProfilePicture: [],
      groupid: 0
    };
  }

  componentDidMount() {
    this.loadGroups();
  }

  loadGroups() {

    fetch(process.env.REACT_APP_API_PATH+"/groups", {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
     })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            console.log(result[0]);
            
            this.setState({
              isLoaded: true,
            });
          }
          fetch(process.env.REACT_APP_API_PATH+"/groups/?attributes.members", {
            method: "get",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+sessionStorage.getItem("token")
            }
           })
            .then(res2 => res2.json())
            .then(
              result2 => {
                if (result2) {
                  let holdergroup = [];
                  for(var i = 0; i < result2[0].length; i++) {
                    if(result2[0][i].attributes.groups === undefined){
                      continue
                    }
                    if(result2[0][i].attributes.groups.status === "private"){
                      for(var j = 0; j < result2[0][i].attributes.groups.members.length; j++){
                        if(result2[0][i].attributes.groups.members[j] === Number(this.state.userid)){
                          this.setState({
                            name: result2[0][i].name,
                            status: result2[0][i].attributes.groups.status,
                            membercount: result2[0][i].attributes.groups.membercount,
                            members: result2[0][i].attributes.groups.members,
                            id: result2[0][i].id,
                            postcounter: result2[0][i].attributes.postcounter,
                            groupid: result2[0][i].attributes.groups.groupid,
                            groupname: result2[0][i].attributes.groups.name,
                            rating: result2[0][i].attributes.groups.rating
                          });
                          holdergroup.push(result2[0][i]);
                          this.setState({
                            groups: holdergroup,
                          });
                        }
                        if(this.state.membercount !== 0){
                          let holderPrivatePictures = [];
                          for(var a = 0; a < this.state.membercount; a++){
                            fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.members[a], {
                              method: "GET",
                              headers: {
                                "accept": "*/*",
                                'Authorization': 'Bearer '+sessionStorage.getItem("token"),
                              }
                            })
                            .then(response => response.json())
                            .then(result => {
                              if(!result.attributes.profilePicture && !holderPrivatePictures.includes("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")){
                                holderPrivatePictures.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png");
                                this.setState({
                                  privateProfilePicture: holderPrivatePictures
                                })
                                this.forceUpdate();
                              }
                              else if(result.attributes.profilePicture && !holderPrivatePictures.includes(result.attributes.profilePicture)){
                                holderPrivatePictures.push(result.attributes.profilePicture);
                                this.setState({
                                  privateProfilePicture: holderPrivatePictures
                                })
                                this.forceUpdate();
                              }
                            })
                            .catch(error => console.log('error', error));
                          }
                        }
                      }
                    }
                    else if(result2[0][i].attributes.groups.status === "public"){
                      for(var k = 0; k < result2[0][i].attributes.groups.members.length; k++){
                        if(result2[0][i].attributes.groups.members[k] === Number(this.state.userid)){
                          this.setState({
                            name: result2[0][i].name,
                            status: result2[0][i].attributes.groups.status,
                            membercount: result2[0][i].attributes.groups.membercount,
                            members: result2[0][i].attributes.groups.members,
                            id: result2[0][i].id,
                            postcounter: result2[0][i].attributes.postcounter,
                            groupid: result2[0][i].attributes.groups.groupid,
                            groupname: result2[0][i].attributes.groups.name,
                            rating: result2[0][i].attributes.groups.rating
                          });
                          holdergroup.push(result2[0][i]);
                          this.setState({
                            groups: holdergroup
                          });
                        }
                        if(this.state.membercount !== 0){
                          let holderPublicPictures = [];
                          for(var b = 0; b < this.state.membercount; b++){
                            fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.members[b], {
                              method: "GET",
                              headers: {
                                "accept": "*/*",
                                'Authorization': 'Bearer '+sessionStorage.getItem("token"),
                              }
                            })
                            .then(response => response.json())
                            .then(result => {
                              if(!result.attributes.profilePicture && !holderPublicPictures.includes("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")){
                                holderPublicPictures.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png");
                                this.setState({
                                  publicProfilePicture: holderPublicPictures
                                });
                                this.forceUpdate();
                              }
                              else if(result.attributes.profilePicture && !holderPublicPictures.includes(result.attributes.profilePicture)){
                                holderPublicPictures.push(result.attributes.profilePicture);
                                this.setState({
                                  publicProfilePicture: holderPublicPictures
                                });
                                this.forceUpdate();
                              }
                            })
                            .catch(error => console.log('error', error));
                          }
                        }
                      }
                    }
                  }
                }
              },
              error => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            )
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  removeHandler_Leave(id, name){
    const newList = this.state.members.filter(userid => userid !== Number(this.state.userid));
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/groups/" + id, {
      method: "PATCH",
      headers: {
        "accept": "*/*",
        'Authorization': 'Bearer '+sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
          groups: {
            groupid: this.state.groupid,
            name: this.state.groupname,
            members: newList,
            status: this.state.status,
            membercount: this.state.membercount -1
          },
          postcounter: this.state.postcounter
        }
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.forceUpdate();
    window.location.reload();
  }

  render() {
    //this.loadPosts();
    const {error, isLoaded, groups} = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
        <div className={styles.mygroups}>My Groups</div>
            {groups.map(group => (
              <>
              <p className={styles.groupname}>{group.name}</p>
              <div className={styles.line}></div>
              <div className= {styles.groupdiv}>
              <a key={group.id} id="group" href={"/groups/" + group.id} className={styles.grouplist} onClick={() => this.setState({name: group.name})}>
              <div className={styles.container}>
                <p className={styles.name}>{group.name+ ": " + this.state.groupname}</p>
                <p className={styles.membercount}>{group.attributes.groups.membercount} Student(s)</p>
              </div>
              <div className={styles.container}>
                <p className={styles.students}>Student(s)</p>
                  {group.attributes.groups.status === "public" && group.attributes.groups.membercount === 1 &&
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
                  }
                  {group.attributes.groups.status === "public" && group.attributes.groups.membercount === 2 &&
                    <>
                      <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
                      <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
                    </>
                  }
                  {group.attributes.groups.status === "public" && (group.attributes.groups.membercount === 3 || group.attributes.groups.membercount > 3) &&
                  <>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 2"/>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[2]} alt="user profile 3"/>
                  </>
                  }
                  {group.attributes.groups.status === "private" && group.attributes.groups.membercount === 1 &&
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
                  }
                  {group.attributes.groups.status === "private" && group.attributes.groups.membercount === 2 &&
                    <>
                      <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
                      <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="user profile 2"/>
                    </>
                  }
                  {group.attributes.groups.status === "private" && (group.attributes.groups.membercount === 3 || group.attributes.groups.membercount > 3) &&
                  <>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 2"/>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="user profile 2"/>
                    <img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[2]} alt="user profile 3"/>
                  </>
                  }
              </div>
              <div className={styles.container}>
                <p className={styles.rating}>Average Rating</p>
                <div className={styles.stardiv}>
                  <img className={styles.star} src={starIcon} alt="star"/>
                  <img className={styles.star} src={starIcon} alt="star"/>
                  <img className={styles.star} src={starIcon} alt="star"/>
                  <img className={styles.star} src={starIcon} alt="star"/>
                  <img className={styles.star} src={starIcon} alt="star"/>
                </div>
              </div>
              <div className={styles.container} hidden>
                {"groupid: " + group.id} <br/>
                {"status: " + group.attributes.groups.status} <br/>
                {"members: " + group.attributes.groups.members}
                {"name: " + group.name}
              </div>
              </a>
              <button className={styles.leavebutton} onClick={() => this.removeHandler_Leave(group.id, group.name)}>Leave</button>

              </div>
              </>
            ))}
        </div>
      );
    }
  }
}
