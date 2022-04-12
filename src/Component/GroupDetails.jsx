import React from "react";
import "../App.css";

import groupcss from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";

export default class GroupDetails extends React.Component {
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
      groupid: 0,
      profilePicture: "",
      username: "",
      usernameList: [],
    };
  }

  componentDidMount() {
    this.loadGroups();
  }


  loadGroups() {
    fetch(process.env.REACT_APP_API_PATH+window.location.pathname, {
      method: "GET",
      headers: {
      'accept': '*/*',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
    .then(res => res.json())
    .then(
        result => {
            if (result) {
            console.log("result", result);
            this.setState({
                isLoaded: true,
                name: result.name,
                status: result.attributes.groups.status,
                membercount: result.attributes.groups.membercount,
                members: result.attributes.groups.members,
                id: result.id,
                postcounter: result.attributes.postcounter,
                groupid: result.attributes.groups.groupid,
                groupname: result.attributes.groups.name,
                rating: result.attributes.groups.rating
            });
            console.log("this.state", this.state);
            }
        },
        error => {
            this.setState({
            isLoaded: true,
            error
            });
        })
    .then(response => {
      console.log(this.state.membercount)
      const usernameList = [];
      for(var i=0; i < this.state.membercount; i++){
        console.log("newthing", this.state.members[i]);
        fetch(process.env.REACT_APP_API_PATH+"/users/"+this.state.members[i], {
          method: "GET",
          headers: {
            "accept": "*/*",
            'Authorization': 'Bearer '+sessionStorage.getItem("token"),
          }
        })
        .then(response => response.json())
        .then(result => {
          console.log("results",result);
          if(result.attributes.profilePicture){
            if(result.id === Number(this.state.userid)){
              console.log("this is you");
              this.setState({username: result.attributes.firstName + " " + result.attributes.lastName + " (You)"})
              this.setState({profilePicture: result.attributes.profilePicture});
              usernameList.push([result.attributes.firstName + " " + result.attributes.lastName + " (You)", result.attributes.profilePicture]);
              //profilePictureList.push(result.attributes.profilePicture)
            }
            else {
              this.setState({username: result.attributes.firstName + " " + result.attributes.lastName})
              this.setState({profilePicture: result.attributes.profilePicture});
              usernameList.push([result.attributes.firstName + " " + result.attributes.lastName, result.attributes.profilePicture]);
              //profilePictureList.push(result.attributes.profilePicture)
            }
          }
          if(!result.attributes.profilePicture){
            console.log("we got no pfp");
            this.setState({username: result.attributes.firstName + " " + result.attributes.lastName})
            this.setState({profilePicture: "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"});
            usernameList.push([result.attributes.firstName + " " + result.attributes.lastName, "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"]);
            // profilePictureList.push("/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
          }
          this.setState({usernameList: usernameList});
          // this.setState({profilePictureList: profilePictureList})
          this.forceUpdate();
        })
        .catch(error => console.log('error', error));
      }
    })
        ;
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
              groups: {
                groupid: this.state.groupid,
                name: this.state.groupname,
                members: newList,
                status: this.state.status,
                membercount: this.state.membercount - 1
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

      updateStatus_private(id, name){
        fetch(process.env.REACT_APP_API_PATH + window.location.pathname, {
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
                members: this.state.members,
                status: "private",
                membercount: this.state.membercount,
                },
                postcounter: this.state.postcounter
            }})
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        this.forceUpdate();
        window.location.reload();
      }

      updateStatus_public(id, name){
        fetch(process.env.REACT_APP_API_PATH + window.location.pathname, {
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
                members: this.state.members,
                status: "public",
                membercount: this.state.membercount
              },
                postcounter: this.state.postcounter
            }})
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        this.forceUpdate();
        window.location.reload();
      }

    render(){
        const groups = this.state;
        console.log("groups:" ,this.state.usernameList);
        return(
            <>
            <div className={groupcss.div1}>
              <div className={groupcss.groupdetailname}>{this.state.name+ ": " + this.state.groupname}</div>
              <button className={groupcss.groupleavebutton} onClick={() => this.removeHandler_Leave(groups.id, groups.name)}>Leave</button>
            </div>
            <div className={groupcss.div2}>
              <div className={groupcss.text}>Average Rating</div>
              <div className={groupcss.stardivgroupdetails}>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
              </div>
            </div>
            <div className={groupcss.text}>Status: {groups.status}</div>
            <button className={groupcss.buttondiv} onClick={() => this.updateStatus_public(groups.id, groups.name)}>Public</button>
            <button className={groupcss.buttondiv} onClick={() => this.updateStatus_private(groups.id, groups.name)}>Private</button>
            <div className={groupcss.text}>{"Members (" +groups.membercount + ")"}</div>
            <div className={groupcss.div1}>
            {this.state.usernameList.map(names => {
              return (
              <div className={groupcss.membersdiv}>
              <img className={groupcss.profilepicturegroupdetails} src={"https://webdev.cse.buffalo.edu" + names[1]} alt="profile pic"/>
              <div className={groupcss.membernames}>{names[0]}</div>
              <div className={groupcss.memberstardiv}>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
                  <img className={groupcss.stargroupdetails} src={starIcon} alt="star"/>
              </div>
              </div>
              )
            })}
            </div>
            </>
        )
    }
}