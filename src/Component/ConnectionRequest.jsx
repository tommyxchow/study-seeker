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

var requestOptionsGet = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/123", requestOptionsGet)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

// fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/17", requestOptionsGet)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/41", requestOptionsGet)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));

// fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections", requestOptionsPost)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


export default class ConnectionRequest extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            names: [
                [ 1,"Ibn Khaldun", personIcon],
                [2,"Zhuangzi", personIcon2]
        ],
        accepted_friends:[],                                      //List of accepted friends( used for my connection list )
        connection_id: -1,
        ConnectionRequests : []
    }; 
        
    }

    createFetch(path, method, body){
        const supplyPath = process.env.REACT_APP_API_PATH+path;
        const supplyMethod = {
          method: method,
          headers: {"Content-Type": "application/json",
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                  }
        };
        if(body != null){
          supplyMethod.body = JSON.stringify(body);
        }
        return fetch(supplyPath, supplyMethod);
    }

    checkConnection = () => {         
        if(this.props.userid !== this.props.profileid){
          this.createFetch("/connections?fromUserID="+this.props.userid+"&toUserID"+this.props.profileid, 'GET',null)
          .then((res) => res.json())
          .then(
            (result) => {
              this.state.connection_id=result[1]?result[0][0].id:-1
              this.setState({
                connection_id: result[1]?result[0][0].id:-1
              });
            },
            (error) => {
              alert("error!");
            }
          );
        }
        return -1;
    };
    
    connectionHandler = (event) =>{
        this.setState({ connect: true });
        event.preventDefault();
        this.checkConnection();
        const body = {
          "fromUserID": Number(this.props.userid),
          "toUserID": Number(this.props.profileid),
          "attributes": {
            "status": "pending"}};
        this.createFetch("/connections", 'POST', body)
        .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                responseMessage: result.Status,
              });
            },
            (error) => {
              alert("error");
            }
          );
      };
    
      acceptConnectionHandler = (event) =>{
        this.setState({ connect: true });
        event.preventDefault();
        this.checkConnection();
        const body = {
          "fromUserID": Number(this.props.userid),
          "toUserID": Number(this.props.profileid),
          "attributes": {
            "status": "accepted"}};
        this.createFetch("/connections", 'POST', body)
        .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                responseMessage: result.Status,
              });
            },
            (error) => {
              alert("error");
            }
          );
      };

    removeHandler_Accept(givenName,givenID){                        //handle and remove connection after being accepted
        console.log('this is: ', givenName);
        const newList=this.state.names.filter(name => name[0] !== givenID);
        this.setState(prevState => ({
            accepted_friends: [givenName, ...prevState.accepted_friends]
          }))
        this.setState({names: newList});
        // eslint-disable-next-line no-unused-expressions
        this.acceptConnectionHandler;
        console.log('added: ', this.state.accepted_friends);
        console.log(givenName[1]);
        this.forceUpdate();
    }
   


    removeHandler_Reject(givenName,givenID){                        //handle and remove connection after being rejected
        console.log('this is: ', givenName);
        const newList=this.state.names.filter(name => name[0] !== givenID);
        this.setState({names: newList});
        console.log('added: ', this.state.accepted_friends);
        this.forceUpdate();
    }



    render() {
        return (
            <div className="App">
                    <div className="fixed">
                    <div className={connections.requests}>Connection Requests</div>
                    <div className={connections.line1}></div>
                     
                     {this.state.names.map((name) => {                //Connection Requests
                         return(<p key={name}>
                             <div>
                             <table className="same-line">

                                <tr className="same-line"><td>                          {/*contains profile picture, name and rating of the person who sent request (in a block on table row)*/}
                                    <ul className="table">
                                    <li><img src={name[2]} alt={name[1]} title={name[1]} className="person-image"/></li> 
                                    <div className="text-center"><li> {name[1]}</li>
                                    <li><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/></li></div>
                                    </ul>
                                    </td></tr>

                                <tr className="same-line"><td>                          {/*Accept and Reject button */}
                                    <ul className="list-table">
                                    <div className="text-center"><li><button className="accept-button" onClick={() => {this.removeHandler_Accept(name,name[0])}}>Accept</button></li>
                                    <li><button className="reject-button" onClick={() => this.removeHandler_Reject(name,name[0])}>Reject</button></li></div>
                                    </ul>
                                    </td></tr>

                            </table>
                            </div>
                         </p>)
                     })}
                     </div>
                    <div className={connections.connections}>Connections</div>
                    <div className={connections.line2}> </div>
                    <div className={connections.container}>
                        <div className={connections.div}>
                            <img className={connections.picture} img src={lisaMoan} alt="img of Lisa Moan"/> 
                            <div className={connections.name}>Lisa M.</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={starIcon} alt="star"/>
                                <img className={connections.star4} img src={starIcon} alt="star"/>
                                <img className={connections.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={connections.div}>
                            <img className={connections.picture} img src={jayHou} alt="img of Jay Hou"/> 
                            <div className={connections.name}>Jay H.</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={starIcon} alt="star"/>
                                <img className={connections.star4} img src={starIcon} alt="star"/>
                                <img className={connections.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={connections.div}>
                            <img className={connections.picture} img src={monaLia} alt="img of Mona Lia" /> 
                            <div className={connections.name}>Mona L.</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={litStarIcon} alt="star"/>
                                <img className={connections.star4} img src={litStarIcon} alt="star"/>
                                <img className={connections.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={connections.div}>
                            <img className={connections.picture} img src={tommypic} alt="img of Tommy"/>
                            <div className={connections.name}>Tommy</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={litStarIcon} alt="star"/>
                                <img className={connections.star4} img src={litStarIcon} alt="star"/>
                                <img className={connections.star5} img src={litStarIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={connections.div}>
                            <img className={connections.picturecircle} img src={personIcon} alt="img of Ibn"/>
                            <div className={connections.name}>Ibn K.</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={litStarIcon} alt="star"/>
                                <img className={connections.star4} img src={litStarIcon} alt="star"/>
                                <img className={connections.star5} img src={litStarIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={connections.div}>
                            <img className={connections.picturecircle} img src={personIcon2} alt="img of Zhuang"/>
                            <div className={connections.name}>Zhuangzi</div>
                            <div className={connections.stars}>
                                <img className={connections.star1} img src={litStarIcon} alt="star"/>
                                <img className={connections.star2} img src={litStarIcon} alt="star"/>
                                <img className={connections.star3} img src={litStarIcon} alt="star"/>
                                <img className={connections.star4} img src={litStarIcon} alt="star"/>
                                <img className={connections.star5} img src={litStarIcon} alt="star"/>
                            </div>
                        </div>
                    </div>

            </div>
        );
    }
}