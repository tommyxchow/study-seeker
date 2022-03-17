import React, { useState } from "react";
import "../App.css";

import litStarIcon from "../assets/litstar.svg";
import starIcon from "../assets/unlitstar.svg";
import connections from "./connections.module.css";

var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"))

var requestOptionsGet = {
  method: 'GET',
  headers: myHeaders,
};

var raw = JSON.stringify({
  "fromUserID": 10,
  "toUserID": 2,
  "attributes": {
    "status": "accepted"
  }
});

var requestOptionsPatch = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
};

var requestOptionsDelete = {
  method: 'DELETE',
  headers: myHeaders,
};

export default class ConnectionRequest extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      accepted_friends:[],
      responseMessage: "",                                      //List of accepted friends( used for my connection list )
      connection_id: -1,
      connection_id_list: [],
      fromUserID: "",
      profile: this.props.userid,
  }; 
  this.fieldChangeHandler.bind(this);
  }

  componentDidMount(){
    this.fetchUserIDs();
    this.findUserPicture();
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
    });
  }

  removeHandler_Accept(givenName,givenID){                        //handle and remove connection after being accepted
    console.log('this is: ', givenName);
    console.log('userid: ', this.state.fromUserID);
    console.log('connectionid: ', this.state.connection_id);
    const newList=this.state.names.filter(name => name[0] !== givenID);
    const newConnectionList=this.state.connection_id_list.filter(id => id[0] !== this.state.connection_id);
    this.setState(prevState => ({
        accepted_friends: [givenName, ...prevState.accepted_friends]
      }))
    this.setState({names: newList});
    this.setState({connection_id: newConnectionList[0]});
    // fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" + this.state.connection_id, requestOptionsPatch)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    this.forceUpdate();
    console.log('added: ', this.state.accepted_friends);
    console.log('connection-id:', this.state.connection_id);    
    console.log('connection-id-list:', this.state.connection_id_list);
    console.log('new connection-id-list:', newConnectionList);
  }

  removeHandler_Reject(givenName,givenID){                        //handle and remove connection after being rejected
    console.log('this is: ', givenName);
    console.log('userid: ', this.state.fromUserID);
    console.log('connectionid: ', this.state.connection_id);
    const newList=this.state.names.filter(name => name[0] !== givenID);
    const newConnectionList=this.state.connection_id_list.filter(id => id[0] !== this.state.connection_id);
    this.setState({names: newList});
    this.setState({connection_id: newConnectionList[0]});
    // fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" + this.state.connection_id, requestOptionsDelete)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));
    this.forceUpdate();
    console.log('added: ', this.state.accepted_friends);
    console.log('names: ', this.state.names);
    console.log('connection-id:', this.state.connection_id);
    console.log('connection-id-list:', this.state.connection_id_list);
    console.log('new connection-id-list:', newConnectionList);
  }

  fetchUserIDs(){
    const json = [];
    var arrConnections = [];
    var arrUserID = [];
    var connectionToID = [];
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/?toUserID=" + sessionStorage.getItem("user"), requestOptionsGet)
      .then(response => response.json())
      .then(result => {
        console.log(result);
         for(var i = 0; i < result.length; i++){
           json.push(result[0][i]);
         }
        for (var a = 0; a < json.length; a++){
          // console.log(json[a].id);
          arrConnections.push(json[a].id);
          // console.log(json[a].fromUserID);
          arrUserID.push(json[a].fromUserID);
          connectionToID.push([json[a].id,json[a].fromUserID]);
        }
        console.log("arrConnections", arrConnections[0]);
        console.log("arrUserID" ,arrUserID[0]);
        // this.setState({fromUserID: this.state.names.concat(arrUserID)});
        this.setState({connection_id_list: this.state.connection_id_list.concat(arrConnections)});
        for(var b = 0; b < arrConnections.length; b++){
          this.setState({connection_id: arrConnections[b]});
          this.setState({fromUserID: arrUserID[b]});
          fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" + arrConnections[b], requestOptionsGet)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            this.setState({names: this.state.names.concat(result.fromUser.attributes.firstName + " " + result.fromUser.attributes.lastName[0] + ".")});
            // this.setState({connection_id: result.id});
            // this.setState({fromUserID: result.fromUserID});
          })
          .catch(error => console.log('error', error));
        }
      })
      .catch(error => console.log('error', error));
    // console.log("Testing", this.props);
    // console.log("Testing", this.state);
    console.log("user:", sessionStorage.getItem("user"));
    console.log("arrConnections", arrConnections);
    console.log("connection_id_list", this.state.connection_id_list);
    console.log("connection to ID", connectionToID);
    console.log("fromUserID", this.state.fromUserID);
    console.log("connection_id", this.state.connection_id);
  }
//test tommys image
  findUserPicture(){
    var path = "";
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/users/12", requestOptionsGet)
      .then(response => response.json())
      .then(result => {
        path = (JSON.stringify(result.attributes.profilePicture));
      })
      .catch(error => console.log('error', error));
      console.log(path)
      return path;
  }
// Mona L. id = 35, connectionID = 193, Lisa M. id = 34, connectionID = 194
  render() {
    // console.log("arrUserID", arrUserID);
    // this.setState({
    //   names: [...this.state.names, arrUserID]
    // })
    // console.log("Testing", this.props);
    // console.log("Testing", this.state);
      return (
          <div className="App">
                  <div className={connections.requests}>Connection Requests</div>
                  <div className={connections.line1}></div>
                  <div className={connections.topcontainer}>
                  {this.state.names.map((name) => {
                    return(<div key={name}>
                      <div className={connections.topdiv}>
                        <img className={connections.picturecircle} img src={"https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"} alt="default img"/> 
                        <div className={connections.name}>{name}</div>
                        <div className={connections.stars}>
                          <img className={connections.star1} img src={starIcon} alt="star"/>
                          <img className={connections.star2} img src={starIcon} alt="star"/>
                          <img className={connections.star3} img src={starIcon} alt="star"/>
                          <img className={connections.star4} img src={starIcon} alt="star"/>
                          <img className={connections.star5} img src={starIcon} alt="star"/>
                        </div>
                        <button className={connections.acceptbutton} onClick={() => this.removeHandler_Accept(name,name[0])}>Accept</button>
                        <button className={connections.rejectbutton} onClick={() => this.removeHandler_Reject(name,name[0])}>Reject</button>
                      </div>

                    {/* <div className={connections.topdiv}>
                      <img className={connections.picturecircle} img src={lisaMoan} alt="default img"/> 
                      <div className={connections.name}>Test</div>
                      <div className={connections.stars}>
                        <img className={connections.star1} img src={starIcon} alt="star"/>
                        <img className={connections.star2} img src={starIcon} alt="star"/>
                        <img className={connections.star3} img src={starIcon} alt="star"/>
                        <img className={connections.star4} img src={starIcon} alt="star"/>
                        <img className={connections.star5} img src={starIcon} alt="star"/>
                      </div>
                      <button className={connections.acceptbutton} onClick={this.sayHello}>Accept</button>
                      <button className={connections.rejectbutton} onClick={this.sayHello}>Reject</button>
                    </div> */}
                  
                  </div>)
                  })}
                  </div>
                  <div className={connections.connections}>Connections</div>
                  <div className={connections.line2}> </div>
                  <div className={connections.container}>
                  {this.state.accepted_friends.map((name) => {
                    return(<div key={name}>
                      <div className={connections.div}>
                          <img className={connections.picturecircle} img src={"https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"} alt="default img"/> 
                          <div className={connections.name}>{name}</div>
                          <div className={connections.stars}>
                              <img className={connections.star1} img src={starIcon} alt="star"/>
                              <img className={connections.star2} img src={starIcon} alt="star"/>
                              <img className={connections.star3} img src={starIcon} alt="star"/>
                              <img className={connections.star4} img src={starIcon} alt="star"/>
                              <img className={connections.star5} img src={starIcon} alt="star"/>
                          </div>
                      </div>
                  </div>
                  )
                  })}
                  </div>
                  <img className={connections.picturecircle} img src={"https://webdev.cse.buffalo.edu/hci/api/uploads/files/x9sRVcdg8C5vip7apFO5cuR1jus4w00_6oOtB2bFKqg.png"} alt="img of Lisa Moan" hidden />
          </div>
      );
    }
}