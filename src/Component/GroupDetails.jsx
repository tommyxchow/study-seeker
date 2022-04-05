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
                status: result.attributes.status,
                membercount: result.attributes.membercount,
                members: result.attributes.members,
                id: result.id
            });
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
              members: this.state.members,
              status: "private",
              membercount: this.state.membercount
            }
          })
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        this.forceUpdate();
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
              members: this.state.members,
              status: "public",
              membercount: this.state.membercount
            }
          })
        })
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
        this.forceUpdate();
      }


    render(){
        const groups = this.state;
        console.log("groups:" ,groups);
        console.log(window.location.pathname);
        return(
            <>
            <div className={groupcss.groupdetailname}>{groups.name}</div>
            <button className={groupcss.leavebutton} onClick={() => this.removeHandler_Leave(groups.id, groups.name)}>Leave</button>
            <div className={groupcss.text}>Average Rating</div>
            <div className={groupcss.text}>Status:</div>{groups.status}
            <br/>
            <button onClick={() => this.updateStatus_public(groups.id, groups.name)}>Public</button>
            <button onClick={() => this.updateStatus_private(groups.id, groups.name)}>Private</button>
            <div className={groupcss.text}>Members: {groups.members+""}</div>
            </>
        )
    }
}