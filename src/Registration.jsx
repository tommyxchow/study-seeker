import React from "react";
import "./App.css";
import {BackgroundImage} from "./LandingPage.jsx"
import {LogoText} from "./LandingPage.jsx"




  function UserCredentialsBox(props){
    return(
        <div className="user-credentials-box">
            {props.children}
        </div>
    );
}
function CredentialsTextForm(){
    return(
        <div className="formMargin">
        <form className="registrationForm" action="/">
          <div>
            <input
              className="textBox"
              type="text"
              id="fname"
              name="firstname"
              placeholder="First Name"
            />
            <input
              className="textBox"
              type="text"
              id="lname"
              name="lastname"
              placeholder="Last Name"
            />
          </div>
          <input
            className="emailTextbox"
            type="email"
            id="email"
            name="email"
            placeholder="Email Address"
          />
          <div className="passwordRow">
            <input
              className="textBox"
              type="password"
              id="password"
              name="password"
              placeholder="Password"
            />
            <input
              className="textBox"
              type="password"
              id="confirmPass"
              name="password"
              placeholder="Confirm Password"
            />
          </div>
          <span className="passwordReqText">
            <br />
            Password must be at least 8 characters in length
          </span>
          <input
            className="buttonSubmitForm"
            type="submit"
            defaultValue="Sign Up"
          />
        </form>
      </div>
    );
}
class Registration extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" type="text/css" href="styleStudy.css" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Exo:wght@700&family=Sofia&display=swap"
    rel="stylesheet"
  />

  <BackgroundImage>
      <UserCredentialsBox> 
          <LogoText/>
          <CredentialsTextForm/>
      </UserCredentialsBox>
  </BackgroundImage>
</>
        );

    }

}
export default Registration