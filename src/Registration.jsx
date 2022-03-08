import React from "react";
import "./App.css";

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
  <div className="background-image">
    <div className="user-credentials-box">
      <span className="logo-text">
        Study
        <br />
        Seeker
        <br />
      </span>
      <span className="logo-subtext">SEEK FRIENDS TO STUDY</span>
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
      <form action="https://www.google.com/">
        <button className="buttonSubmitForm">Login</button>
      </form>
    </div>
  </div>
</>

        );

    }

}
export default Registration