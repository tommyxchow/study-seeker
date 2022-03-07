import React from "react";
import "./App.css";

import personIcon from "./assets/Ibn_Khaldun.png";
import starIcon from "./assets/unlitstar.svg";
import litStarIcon from "./assets/litstar.svg";
import personIcon2 from "./assets/group.png";
import Navigationbar from "./Component/Navigationbar.jsx";
import lisaMoan from "./assets/lisamoan.png";
import monaLia from "./assets/monalia.png";
import jayHou from "./assets/jayhou.png";
import tommy from "./assets/tommy.png";

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
                    <h className="requests">Connection Requests</h>
                    <div className="line1"></div>

                     {this.state.names.map((name) => {                //Connection Requests
                         return(<p key={name}>
                             <div>
                             <table className="same-line">

                                <tr className="same-line"><td>                          {/*contains profile picture, name and rating of the person who sent request (in a block on table row)*/}
                                    <ul className="table">
                                    <li><img src={name[2]} alt={name[1]} title={name[1]} className="person-image"/></li> 
                                    <div className="text-center"><li> {name[1]}</li>
                                    <li><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={litStarIcon} className="star"/><img src={starIcon} className="star"/></li></div>
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

                    <h className="connections">Connections</h>
                    <div className="line2"> </div>
                    <img className="lisa-moan" img src={lisaMoan} alt="img of Lisa Moan"/> 
                    <text className="lisa-moan-text">Lisa Moan</text>
                    <img className="LMstar1" img src={litStarIcon} alt="star"/>
                    <img className="LMstar2" img src={litStarIcon} alt="star"/>
                    <img className="LMstar3" img src={starIcon} alt="star"/>
                    <img className="LMstar4" img src={starIcon} alt="star"/>
                    <img className="LMstar5" img src={starIcon} alt="star"/>
                    <img className="jay-hou" img src={jayHou} alt="img of Jay Hou"/> 
                    <text className="jay-hou-text">Jay Hou</text>
                    <img className="JHstar1" img src={litStarIcon} alt="star"/>
                    <img className="JHstar2" img src={litStarIcon} alt="star"/>
                    <img className="JHstar3" img src={starIcon} alt="star"/>
                    <img className="JHstar4" img src={starIcon} alt="star"/>
                    <img className="JHstar5" img src={starIcon} alt="star"/>
                    <img className="mona-lia" img src={monaLia} alt="img of Mona Lia" /> 
                    <text className="mona-lia-text">Mona Lia</text>
                    <img className="MLstar1" img src={litStarIcon} alt="star"/>
                    <img className="MLstar2" img src={litStarIcon} alt="star"/>
                    <img className="MLstar3" img src={litStarIcon} alt="star"/>
                    <img className="MLstar4" img src={litStarIcon} alt="star"/>
                    <img className="MLstar5" img src={starIcon} alt="star"/>
                    <img className="tommy" img src={tommy} alt="img of Tommy"/>
                     <text className="tommy-text">Tommy</text>
                    <img className="Tstar1" img src={litStarIcon} alt="star"/>
                    <img className="Tstar2" img src={litStarIcon} alt="star"/>
                    <img className="Tstar3" img src={litStarIcon} alt="star"/>
                    <img className="Tstar4" img src={litStarIcon} alt="star"/>
                    <img className="Tstar5" img src={litStarIcon} alt="star"/>
                    
                     </div>
 

                 </header>

            </div>
        );
    }
}