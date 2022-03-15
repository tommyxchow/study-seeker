import React from "react";
import "../App.css";

import personIcon from "../assets/Ibn_Khaldun.png";
import litStarIcon from "../assets/litstar.svg";
import starIcon from "../assets/unlitstar.svg";
import personIcon2 from "../assets/zhuangzi.svg";
import connections from "./connections.module.css";
import lisaMoan from "../assets/lisamoan.png";
import lisa from "./lisa.module.css";
import jayHou from "../assets/jayhou.png";
import jay from "./jay.module.css";
import monaLia from "../assets/monalia.png";
import mona from "./mona.module.css";
import tommypic from "../assets/tommy.png";
import tommy from "./tommy.module.css";

var myHeaders = new Headers();
myHeaders.append("accept", "*/*");
myHeaders.append("Authorization", "Bearer commitment|RdOfs4E9XUmXFx-hfpsBFLk6Yh3ShUcggDN8oOrCApQ");
myHeaders.append("Content-Type", "application/json");

// var raw = JSON.stringify({
//   "fromUserID": 10,
//   "toUserID": 9,
//   "attributes": {
//     "additionalProp1": {}
//   }
// });    

var requestOptionsGet = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
};

// var requestOptionsPost = {
//     method: 'POST',
//     headers: myHeaders,
//     body: raw,
//     redirect: 'follow'
//   };

    
fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/1", requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/17", requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections/41", requestOptionsGet)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

// fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/connections", requestOptionsPost)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));


export default class ConnectionRequest extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            names: [
                [ 1,"Ibn Khaldun", personIcon],
                [2,"Zhuangzi", personIcon2]
        ],
        accepted_friends:[]                                          //List of accepted friends( used for my connection list )
        }; 
        
    }



    removeHandler_Accept(givenName,givenID){                        //handle and remove connection after being accepted
        console.log('this is: ', givenName);
        const newList=this.state.names.filter(name => name[0] !== givenID);
        this.setState(prevState => ({
            accepted_friends: [givenName, ...prevState.accepted_friends]
          }))
        this.state.names=newList;
        console.log('added: ', this.state.accepted_friends);
        this.forceUpdate();
    }
   


    removeHandler_Reject(givenName,givenID){                        //handle and remove connection after being rejected
        console.log('this is: ', givenName);
        const newList=this.state.names.filter(name => name[0] !== givenID);
        this.state.names=newList;
        console.log('added: ', this.state.accepted_friends);
        this.forceUpdate();
    }



    render() {
        return (
            <div className="App">
                    <div className="fixed">
                    <h className={connections.requests}>Connection Requests</h>
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
                                    <div className="text-center"><li><button className="accept-button" onClick={() => this.removeHandler_Accept(name,name[0])}>Accept</button></li>
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
                        <div className={lisa.div}>
                            <img className={lisa.picture} img src={lisaMoan} alt="img of Lisa Moan"/> 
                            <text className={lisa.name}>Lisa Moan</text>
                            <div className={lisa.stars}>
                                <img className={lisa.star1} img src={litStarIcon} alt="star"/>
                                <img className={lisa.star2} img src={litStarIcon} alt="star"/>
                                <img className={lisa.star3} img src={starIcon} alt="star"/>
                                <img className={lisa.star4} img src={starIcon} alt="star"/>
                                <img className={lisa.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={jay.div}>
                            <img className={jay.picture} img src={jayHou} alt="img of Jay Hou"/> 
                            <text className={jay.name}>Jay Hou</text>
                            <div className={jay.stars}>
                                <img className={jay.star1} img src={litStarIcon} alt="star"/>
                                <img className={jay.star2} img src={litStarIcon} alt="star"/>
                                <img className={jay.star3} img src={starIcon} alt="star"/>
                                <img className={jay.star4} img src={starIcon} alt="star"/>
                                <img className={jay.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={mona.div}>
                            <img className={mona.picture} img src={monaLia} alt="img of Mona Lia" /> 
                            <text className={mona.name}>Mona Lia</text>
                            <div className={mona.stars}>
                                <img className={mona.star1} img src={litStarIcon} alt="star"/>
                                <img className={mona.star2} img src={litStarIcon} alt="star"/>
                                <img className={mona.star3} img src={litStarIcon} alt="star"/>
                                <img className={mona.star4} img src={litStarIcon} alt="star"/>
                                <img className={mona.star5} img src={starIcon} alt="star"/>
                            </div>
                        </div>
                        <div className={tommy.div}>
                            <img className={tommy.picture} img src={tommypic} alt="img of Tommy"/>
                            <text className={tommy.name}>Tommy</text>
                            <div className={tommy.stars}>
                                <img className={tommy.star1} img src={litStarIcon} alt="star"/>
                                <img className={tommy.star2} img src={litStarIcon} alt="star"/>
                                <img className={tommy.star3} img src={litStarIcon} alt="star"/>
                                <img className={tommy.star4} img src={litStarIcon} alt="star"/>
                                <img className={tommy.star5} img src={litStarIcon} alt="star"/>
                            </div>
                        </div>
                    </div>

            </div>
        );
    }
}