import React from "react";
import "../App.css";
import groupcss from "./group.module.css";
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
      profilePicture: []
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
                  let holderProfilePictures = [];
                  let holdergroup = [];
                  console.log("result2", result2);
                  console.log("result2[0] length", result2[0].length);
                  for(var i = 0; i < result2[0].length; i++) {
                    console.log(i);
                    // console.log("result2[0][i].attributes.groups.status",result2[0][i].attributes.groups.status)
                    if(result2[0][i].attributes.groups === undefined){
                      console.log("incorrect format")
                      console.log("api call", result2[0][i])
                      continue
                    }
                    if(result2[0][i].attributes.groups.status === "private"){
                      for(var j = 0; j < result2[0][i].attributes.groups.members.length; j++){
                        if(result2[0][i].attributes.groups.members[j] === Number(this.state.userid)){
                          this.setState({id: result2[0][i].id});
                          this.setState({groupname: result2[0][i].attributes.groups.name})
                          this.setState({name: result2[0][i].name});
                          this.setState({members: result2[0][i].attributes.groups.members});
                          this.setState({membercount: this.state.members.length});
                          this.setState({rating: result2[0][i].attributes.groups.rating});
                          this.setState({status: result2[0][i].attributes.groups.status});
                          console.log("id: ", this.state.id, ", name: ", this.state.name, ", members: ", this.state.members, ", membercount: ", this.state.membercount, ", rating: ", this.state.rating, ", status: ", this.state.status, ", groupname: ", this.state.groupname);
                          holdergroup.push(result2[0][i]);
                          console.log(holdergroup);
                          this.setState({
                            groups: holdergroup,
                          });
                        }
                        if(this.state.membercount !== 0){
                          console.log("we in business private");
                          console.log(this.state.membercount);
                          for(var a = 0; a < this.state.membercount; a++){
                            console.log(this.state.members[a]);
                            fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.members[a], {
                              method: "GET",
                              headers: {
                                "accept": "*/*",
                                'Authorization': 'Bearer '+sessionStorage.getItem("token"),
                              }
                            })
                            .then(response => response.json())
                            .then(result => {
                              if(!result.attributes.profilePicture && !holderProfilePictures.includes("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")){
                                holderProfilePictures.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png");
                                console.log("conditional 1");
                                console.log(holderProfilePictures);
                                this.setState({
                                  profilePicture: holderProfilePictures
                                })
                              }
                              if(result.attributes.profilePicture && !holderProfilePictures.includes(result.attributes.profilePicture)){
                                console.log(this.state.members);
                                holderProfilePictures.push(result.attributes.profilePicture);
                                console.log("conditional 2");
                                console.log(holderProfilePictures);
                                this.setState({
                                  profilePicture: holderProfilePictures
                                })
                              }
                              console.log("UPDATED HOLDERPFP1", this.state.profilePicture)
                            })
                            .catch(error => console.log('error', error));
                          }
                        }
                      }
                    }
                    else if(result2[0][i].attributes.groups.status === "public"){
                      for(var k = 0; k < result2[0][i].attributes.groups.members.length; k++){
                        if(result2[0][i].attributes.groups.members[k] === Number(this.state.userid)){
                          this.setState({id: result2[0][i].id});
                          this.setState({groupname: result2[0][i].attributes.groups.name})
                          this.setState({name: result2[0][i].name});
                          this.setState({members: result2[0][i].attributes.groups.members});
                          this.setState({membercount: this.state.members.length});
                          this.setState({rating: result2[0][i].attributes.groups.rating});
                          this.setState({status: result2[0][i].attributes.groups.status});
                          holdergroup.push(result2[0][i]);
                          console.log("id: ", this.state.id, ", name: ", this.state.name, ", members: ", this.state.members, ", membercount: ", this.state.membercount, ", rating: ", this.state.rating, ", status: ", this.state.status, ", groupname: ", this.state.groupname);
                          console.log(holdergroup);
                          this.setState({
                            groups: holdergroup
                          });
                        }
                        if(this.state.membercount !== 0){
                          console.log("we in business public");
                          console.log(this.state.membercount);
                          for(var b = 0; b < this.state.membercount; b++){
                            console.log(this.state.members[b]);
                            fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.members[b], {
                              method: "GET",
                              headers: {
                                "accept": "*/*",
                                'Authorization': 'Bearer '+sessionStorage.getItem("token"),
                              }
                            })
                            .then(response => response.json())
                            .then(result => {
                              if(!result.attributes.profilePicture && !holderProfilePictures.includes("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")){
                                console.log(this.state.members);
                                holderProfilePictures.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png");
                                console.log("conditional 3");
                                console.log(holderProfilePictures);
                                this.setState({
                                  profilePicture: holderProfilePictures
                                })
                              }
                              if(result.attributes.profilePicture && !holderProfilePictures.includes(result.attributes.profilePicture)){
                                console.log(this.state.members);
                                holderProfilePictures.push(result.attributes.profilePicture);
                                console.log("conditional 4");
                                console.log(holderProfilePictures);
                                this.setState({
                                  profilePicture: holderProfilePictures
                                })
                              }
                              console.log("UPDATED HOLDERPFP2", this.state.profilePicture)
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
    console.log(id);
    console.log(name);
    const newList = this.state.members.filter(userid => userid !== Number(this.state.userid));
    console.log(newList);
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
          members: newList,
          status: this.state.status,
          membercount: this.state.membercount
        }
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.forceUpdate();
  }

  render() {
    //this.loadPosts();
    const {error, isLoaded, groups} = this.state;
    const count = this.state.members.length;
    console.log("4TGWEJKLNASDJK ASJKLNASDNASLKD", groups);
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return <div> Loading... </div>;
    } else {
      return (
        <div className="post">
        <div className={groupcss.mygroups}>My Groups</div>
            {groups.map(group => (
              <>
              <p className={groupcss.groupname}>{group.name}</p>
              <div className={groupcss.line}></div>
              <a key={group.id} id="group" href={"./groups/" + group.id} className={groupcss.grouplist} onClick={() => this.setState({name: group.name})}>
              {console.log("react", this.state)}
              {console.log("react2",this.state.profilePicture)}
              {console.log("userid",this.state.userid)}
              {console.log("groupname", this.state.groupname)}
              <div className={groupcss.container}>
                <p className={groupcss.name}>{group.name+ ": " + this.state.groupname}</p>
                <p className={groupcss.membercount}>{this.state.membercount} Student(s)</p>
              </div>
              <div className={groupcss.container}>
                <p className={groupcss.students}>Student(s)</p>
                  {count >= 1 &&
                    <img className={groupcss.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.profilePicture[0]} alt="user profile 1"/>
                  }
                  {count >= 2 &&
                    <img className={groupcss.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.profilePicture[1]} alt="user profile 2"/>
                  }
                  {count >= 3 &&
                    <img className={groupcss.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.profilePicture[2]} alt="user profile 3"/>
                  }
              </div>
              <div className={groupcss.container}>
                <p className={groupcss.rating}>Average Rating</p>
                <div className={groupcss.stardiv}>
                  <img className={groupcss.star} src={starIcon} alt="star"/>
                  <img className={groupcss.star} src={starIcon} alt="star"/>
                  <img className={groupcss.star} src={starIcon} alt="star"/>
                  <img className={groupcss.star} src={starIcon} alt="star"/>
                  <img className={groupcss.star} src={starIcon} alt="star"/>
                </div>
              </div>
              <div className={groupcss.container} hidden>
                {"groupid: " + group.id} <br/>
                {"status: " + group.attributes.groups.status} <br/>
                {"members: " + group.attributes.groups.members}
                {"name: " + group.name}
              </div>
              </a>
              <button className={groupcss.leavebutton} onClick={() => this.removeHandler_Leave(group.id, group.name)}>Leave</button>
              </>
            ))}
        </div>
      );
    }
  }
}
