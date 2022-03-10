import React from "react";
import "./App.css";
import {BackgroundImage} from "./LandingPage.jsx"
import {LogoText} from "./LandingPage.jsx"

import {ButtonSubmitForm} from "./LandingPage.jsx"
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
    href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@1,600&family=Sofia&display=swap"
    rel="stylesheet"
  />

  <BackgroundImage>
  <div className="user-credentials-box">
      <LogoText/>

      <form action="/">
        <input
          type="text"
          id="fname"
          name="firstname"
          placeholder="First Name"
        />
        <input type="text" id="lname" name="lastname" placeholder="Last Name" />
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email Address"
        />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <input
          type="text"
          id="confirmPass"
          name="password"
          placeholder="Confirm Password"
        />
        <input
          type="submit"
          className="buttonSubmitForm"
          defaultValue="Sign Up"
        />
      </form>
      <ButtonSubmitForm link ={"https://www.google.com/"} buttonText={"Login"} />
    </div>
  </BackgroundImage>
</>

        );

    }

}
export default Registration