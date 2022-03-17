import React, { useState } from "react";
import "../App.css";

import personIcon from "../assets/Ibn_Khaldun.png";
import litStarIcon from "../assets/litstar.svg";
import starIcon from "../assets/unlitstar.svg";
import personIcon2 from "../assets/zhuangzi.svg";
import connections from "./connections.module.css";
import lisaMoan from "../assets/lisamoan.png";
import jayHou from "../assets/jayhou.png";
import monaLia from "../assets/monalia.png";
import tommypic from "../assets/tommy.png";


var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer " + sessionStorage.getItem("token"))

var requestOptionsGet = {
  method: 'GET',
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
      fromUserID: [],
      profile: this.props.userid,
  }; 
  this.fieldChangeHandler.bind(this);
  }

  componentDidMount(){
    this.fetchUserIDs();
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
    });
  }

  removeHandler_Accept(givenName,givenID){                        //handle and remove connection after being accepted
    console.log('this is: ', givenName);
    const newList=this.state.names.filter(name => name[0] !== givenID);
    const newConnectionList=this.state.connection_id_list.filter(v => v[0] !== this.state.connection_id);
    this.setState(prevState => ({
        accepted_friends: [givenName, ...prevState.accepted_friends]
      }))
    this.setState({names: newList});
    // eslint-disable-next-line no-unused-expressions
    // console.log('added: ', this.state.accepted_friends);
    console.log(givenName[1]);
    this.forceUpdate();
    console.log('added: ', this.state.accepted_friends);
    console.log('connection-id:', this.state.connection_id);    
    console.log('connection-id-list:', this.state.connection_id_list);
    console.log('new connection-id-list:', newConnectionList);
  }

  removeHandler_Reject(givenName,givenID){                        //handle and remove connection after being rejected
    console.log('this is: ', givenName);
    const newList=this.state.names.filter(name => name[0] !== givenID);
    this.setState({names: newList});
    console.log('added: ', this.state.accepted_friends);
    console.log('names: ', this.state.names);
    console.log('connection-id:', this.state.connection_id);
    console.log('connection-id-list:', this.state.connection_id_list);
    this.forceUpdate();
  }

  fetchUserIDs(){
    const json = [];
    var arrConnections = [];
    var arrUserID = [];
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
        }
        // console.log("arrConnections", arrConnections);
        // console.log("arrUserID" ,arrUserID);
        //console.log("arrUserID", arrUserID);
        this.setState({fromUserID: this.state.names.concat(arrUserID)});
        this.setState({connection_id_list: this.state.connection_id_list.concat(arrConnections)});
        for(var b = 0; b < arrConnections.length; b++){
          fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/" + arrConnections[b], requestOptionsGet)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            this.setState({names: this.state.names.concat(result.fromUser.attributes.firstName + " " + result.fromUser.attributes.lastName[0] + ".")});
            this.setState({connection_id: result.id})
          })
          .catch(error => console.log('error', error));
        }
      })
      .catch(error => console.log('error', error));
    // console.log("Testing", this.props);
    // console.log("Testing", this.state);
    console.log("user:", sessionStorage.getItem("user"));
    console.log("arrConnections", arrConnections);
    console.log("connection_id", this.state.connection_id_list);
  }

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
                        <img className={connections.picturecircle} img src={lisaMoan} alt="default img"/> 
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
                          <img className={connections.picturecircle} img src={lisaMoan} alt="img of Lisa Moan"/> 
                          <div className={connections.name}>{name}</div>
                          <div className={connections.stars}>
                              <img className={connections.star1} img src={litStarIcon} alt="star"/>
                              <img className={connections.star2} img src={litStarIcon} alt="star"/>
                              <img className={connections.star3} img src={starIcon} alt="star"/>
                              <img className={connections.star4} img src={starIcon} alt="star"/>
                              <img className={connections.star5} img src={starIcon} alt="star"/>
                          </div>
                      </div>
                      {/* <div className={connections.div}>
                          <img className={connections.picturecircle} img src={jayHou} alt="img of Jay Hou"/> 
                          <div className={connections.name}>Jay H.</div>
                          <div className={connections.stars}>
                              <img className={connections.star1} img src={litStarIcon} alt="star"/>
                              <img className={connections.star2} img src={litStarIcon} alt="star"/>
                              <img className={connections.star3} img src={starIcon} alt="star"/>
                              <img className={connections.star4} img src={starIcon} alt="star"/>
                              <img className={connections.star5} img src={starIcon} alt="star"/>
                          </div>
                      </div> */}
                      {/* <div className={connections.div}>
                          <img className={connections.picturecircle} img src={tommypic} alt="img of Tommy"/>
                          <div className={connections.name}>Tommy</div>
                          <div className={connections.stars}>
                              <img className={connections.star1} img src={litStarIcon} alt="star"/>
                              <img className={connections.star2} img src={litStarIcon} alt="star"/>
                              <img className={connections.star3} img src={litStarIcon} alt="star"/>
                              <img className={connections.star4} img src={litStarIcon} alt="star"/>
                              <img className={connections.star5} img src={litStarIcon} alt="star"/>
                          </div>
                      </div> */}
                  </div>
                  )
                  })}
                  </div>
          </div>
      );
    }
}