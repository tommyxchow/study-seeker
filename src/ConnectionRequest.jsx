import React from "react";
import "./App.css";

import personIcon from "./assets/Ibn_Khaldun.png";
import starIcon from "./assets/star1.png";
import personIcon2 from "./assets/group.png";
import Navigationbar from "./Component/Navigationbar.jsx";
import connections from "./Component/connections.module.css";

export default class ConnectionRequest extends React.Component{
    constructor(props) {
        super(props);

        this.state ={
            names: [
                [ 1,"Ibn Khaldun", personIcon],
                [2,"Mona Lisa", personIcon2]
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
                 <header className = "App-header">
                     
                    <Navigationbar/>                            {/*Navigation bar*/} 

                    <div className="fixed">
                    <h3 className="text-font">Connection Requests</h3>
                    <div className={connections.line1}></div>
                     
                     {this.state.names.map((name) => {                //Connection Requests
                         return(<p key={name}>
                             <div>
                             <table className="same-line">

                                <tr className="same-line"><td>                          {/*contains profile picture, name and rating of the person who sent request (in a block on table row)*/}
                                    <ul className="table">
                                    <li><img src={name[2]} alt={name[1]} title={name[1]} className="person-image"/></li> 
                                    <div className="text-center"><li> {name[1]}</li>
                                    <li><img src={starIcon} className="star"/><img src={starIcon} className="star"/><img src={starIcon} className="star"/><img src={starIcon} className="star"/><img src={starIcon} className="star"/></li></div>
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

                    <h className={connections.connections}>Connections</h>
                    <div className={connections.line2}> </div>
                     </div>

                 </header>
            </div>
        );
    }
}