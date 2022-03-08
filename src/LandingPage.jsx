import React from "react";
import "./App.css";

function Hello(){
    return(
        <div>hello! (this is just for experimenting)</div>
    );
}

class LandingPage extends React.Component {

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
    <div className="landing-page-box">
      <span className="logo-text">
        Study
        <br />
        Seeker
        <br />
      </span>
      <span className="logo-subtext">SEEK FRIENDS TO STUDY</span>
      <form action="/register/">
        <button className="buttonSubmitForm">Sign Up</button>
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
export default LandingPage