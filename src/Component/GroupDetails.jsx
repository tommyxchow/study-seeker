import React from "react";
import "../App.css";

import groupcss from "./group.module.css";
import starIcon from "../assets/unlitstar.svg";
import { idText } from "typescript";

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
      profilePicture: ""
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
                postcounter: result.attributes.groups.postcounter,
                groupid: result.attributes.groups.groupid,
                groupname: result.attributes.groups.name
            });
            console.log("this.state", this.state);
            }
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
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment" + window.location.pathname, {
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
                status: this.state.status,
                membercount: this.state.membercount,
                postcounter: this.state.postcounter}
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
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment" + window.location.pathname, {
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
                postcounter: this.state.postcounter}
            }})
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        this.forceUpdate();
        window.location.reload();
      }

      updateStatus_public(id, name){
        fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment" + window.location.pathname, {
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
                membercount: this.state.membercount,
                postcounter: this.state.postcounter}
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
        console.log("groups:" ,groups);
        console.log(window.location.pathname);
        return(
            <>
            <div className={groupcss.div1}>
              <div className={groupcss.groupdetailname}>{this.state.name+ ": " + this.state.groupname}</div>
              <button className={groupcss.leavebutton} onClick={() => this.removeHandler_Leave(groups.id, groups.name)}>Leave</button>
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
            <div className={groupcss.text}>{"Members (" +groups.membercount + ")"} {groups.members+""} {this.state.userid}</div>
            </>
        )
    }
}