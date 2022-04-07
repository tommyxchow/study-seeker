import React from "react";
import "../App.css";
import blockIcon from "../assets/block_white_216x216.png";
import unblockIcon from "../assets/thumbsup.png";
import groupcss from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";

export default class GroupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: props.userid,
      groups: [],
      mygroups: [],
      mygroupIDs: [],
      name: "",
      members: [],
      rating: 0,
      membercount: 0,
      status: ""
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
              // groups: result[0]
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
                  console.log("result2", result2);
                  console.log("result2[0]", result2[0]);
                  for(var i = 0; i < result2[0].length; i++) {
                    console.log(i);
                    console.log(result2[0][i].attributes.status)
                    if(result2[0][i].attributes.status === "private"){
                      console.log("YOOOO", result2[0][i].name);
                      console.log("attributes.members length", result2[0][i].attributes.members.length)
                      for(var j = 0; j < result2[0][i].attributes.members.length; j++){
                        if(result2[0][i].attributes.members[j] === Number(this.state.userid)){
                          console.log("YesOOOO");
                          console.log("hello its me", result2[0][i]);
                          this.setState({id: result2[0][i].id});
                          this.setState({name: result2[0][i].name});
                          this.setState({members: result2[0][i].attributes.members});
                          this.setState({membercount: this.state.members.length});
                          this.setState({rating: result2[0][i].attributes.rating});
                          this.setState({status: result2[0][i].attributes.status});
                          console.log("id: ", this.state.id, ", name: ", this.state.name, ", members: ", this.state.members, ", membercount: ", this.state.membercount, ", rating: ", this.state.rating, ", status: ", this.state.status);
                          holdergroup.push(result2[0][i]);
                          console.log(holdergroup);
                          this.setState({
                            groups: holdergroup,
                          });
                        }
                      }
                      // console.log("result2[0][0]", result2[0][0].attributes.status);
                      // let memberships = [];
                      // let membershipIDs = [];
                      // if (Array.isArray(result2)){
                      //   console.log("GOT MEMBERS ", result2[0]);
                      //   // membershipIDs = result2[0].map(groupmember => groupmember.groupID);
                      //   // memberships = result2[0];
                      //   console.log("GROUP LIST", memberships);
                      // }else{
                      //   console.log("else statement");
                      //   membershipIDs.push(result2.groupID);
                      //   memberships.push(result2);
                      // }
                      // this.setState({
                      //   isLoaded: true,
                      //   mygroupIDs: membershipIDs,
                      //   mygroups: memberships
                      // });
                    }
                    else if(result2[0][i].attributes.status === "public"){
                      console.log("YOOOO", result2[0][i].name);
                      console.log("attributes.members length", result2[0][i].attributes.members.length)
                      for(var k = 0; k < result2[0][i].attributes.members.length; k++){
                        if(result2[0][i].attributes.members[k] === Number(this.state.userid)){
                          console.log("YesOOOO");
                          console.log("hello its me", result2[0][i]);
                          this.setState({id: result2[0][i].id});
                          this.setState({name: result2[0][i].name});
                          this.setState({members: result2[0][i].attributes.members});
                          this.setState({membercount: this.state.members.length});
                          this.setState({rating: result2[0][i].attributes.rating});
                          this.setState({status: result2[0][i].attributes.status});
                          holdergroup.push(result2[0][i]);
                          console.log(holdergroup);
                          this.setState({
                            groups: holdergroup
                          });
                        }
                      }
                    }
                  }
                  // console.log("result2[0][0]", result2[0][0].attributes.status);
                  // let memberships = [];
                  // let membershipIDs = [];
                  // if (Array.isArray(result2)){
                  //   console.log("GOT MEMBERS ", result2[0]);
                  //   membershipIDs = result2[0].map(groupmember => groupmember.groupID);
                  //   memberships = result2[0];
                  //   console.log("GROUP LIST", memberships);
                  // }else{
                  //   membershipIDs.push(result2.groupID);
                  //   memberships.push(result2);
                  // }
                  // this.setState({
                  //   isLoaded: true,
                  //   mygroupIDs: membershipIDs,
                  //   mygroups:memberships
                  // });
                }
              },
              error => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
            );
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  getGroupMemberId = (groupid) => {
    console.log("LOOKING FOR GROUP", groupid);
    for (const membership of this.state.mygroups) {
      console.log("MEMBERSHIP",membership);
      if(membership.groupID === groupid){
        console.log("returning ", membership.id);
        return membership.id;
      }else{
        console.log(membership.groupID, "is not ", groupid)
      }
    };
    return -1;
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
              {console.log("react", this.state.groups)}
              {console.log("react2",this.state.mygroups)}
              {console.log("react3",this.state.mygroupIDs)}
              {console.log("userid",this.state.userid)}
              <div className={groupcss.container}>
                <p className={groupcss.name}>{group.name}</p>
                <p className={groupcss.membercount}>{this.state.membercount} Student(s)</p>
              </div>
              <div className={groupcss.container}>
                <p className={groupcss.students}>Student(s)</p>
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
                {"status: " + group.attributes.status} <br/>
                {"members: " + group.attributes.members}
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
