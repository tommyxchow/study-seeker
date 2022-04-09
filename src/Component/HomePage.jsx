import React from "react";
import "../App.css";

// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      sessiontoken: "",
    };
  }
  render() {

    return (
        <div className="container">
            <div className="seekerContainer">
                <div className="header">
                    Top Study Seekers
                </div>
                <div className="outterBox">
                    <div className="leftArrow">&#8592;</div>
                    <div className="classCard">
                        <div className="imageContainer">
                            <img src="" alt="" />
                            <div className="nameContainer">
                                <span className="name">Mona Lisa</span>
                                <div className="stars">&#9733;&#9733;&#9733;&#9733;&#9733;(4)</div>
                            </div>  
                        </div>
                        <div className="infoContainer">
                            <div className="schoolContainer">
                                <span className="schoolLabel">SCHOOL</span>
                                <span className="schoolName">University at Buffalo</span>
                            </div>
                            <div className="majorContainer">
                                <span className="majorLabel">MAJOR</span>
                                <span className="majorName">Computer Scinece</span>
                            </div>
                            <div className="yearContainer">
                                <span className="yearLabel">YEAR</span>
                                <span className="yearName">Junior</span>
                            </div>
                        </div>
                        <div className="buttonContainer">
                            <button className="connect">Connect</button>
                            <button className="viewProfile">View Profile</button>
                        </div>
                    </div>
                    <div className="rightArrow">&#8594;</div>
                </div>
            </div>

            <div className="classContainer">

            </div>

        </div>
    );
  }
}
