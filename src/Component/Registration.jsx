import React from "react";
import { Navigate } from "react-router-dom";
import "../App.css";
import { BackgroundImage, LogoText } from "./LandingPage.jsx";

function UserCredentialsBox(props) {
  return <div className="user-credentials-box">{props.children}</div>;
}

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      alanmessage: "",
      sessiontoken: "",
      registered: false,
    };
    this.refreshPostsFromLogin = this.refreshPostsFromLogin.bind(this);
  }
  // once a user has successfully logged in, we want to refresh the post
  // listing that is displayed.  To do that, we'll call the callback passed in
  // from the parent.
  refreshPostsFromLogin() {
    console.log("CALLING LOGIN IN LOGINFORM");
    this.props.login();
  }

  // change handlers keep the state current with the values as you type them, so
  // the submit handler can read from the state to hit the API layer

  firstNameChangeHandler = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };
  lastNameChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };
  emailChangeHandler = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  confirmPasswordChangeHandler = (event) => {
    this.setState({
      confirmPassword: event.target.value,
    });
  };

  // when the user hits submit, process the login through the API
  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();
    //checks if passowrds match
    if (this.state.password === this.state.confirmPassword) {
      //make the api call to the authentication page
      fetch(process.env.REACT_APP_API_PATH + "/auth/signup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          attributes: {
            username: this.state.firstName,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            major: "",
            year: "",
            contact: "",
            privacy: "Everyone",
            profilePicture:
              "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
            backgroundPicture: "",
            rating: 0,
            block_list:[]
          },
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          if (result.userID) {
            this.setState({
              firstName: result.firstName,
              lastName: result.lastName,
              email: result.email,
              password: result.password,
              confirmPassword: result.confirmPassword,
              sessiontoken: result.token,
              alanmessage: result.token,
            });
            alert("You have registered successfully.");
            this.setState({ registered: true });
          } else {
            alert("error!");

            // if the signup failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message,
            });
          }
        });
    } else {
      alert("Passwords do not match!");
    }
  };

  render() {
    if (this.state.registered) return <Navigate to="/login" />;

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="styleStudy.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@700&family=Sofia&display=swap"
          rel="stylesheet"
        />

        <BackgroundImage>
          <UserCredentialsBox>
            <LogoText subtitle="SIGN UP TO FIND YOUR NEXT STUDY BUDDY" />
            <div className="formMargin">
              <form className="registrationForm" onSubmit={this.submitHandler}>
                <div className="nameBoxes">
                  <input
                    className="textBox"
                    type="text"
                    id="fname"
                    name="firstname"
                    placeholder="First Name"
                    onChange={this.firstNameChangeHandler}
                  />
                  <input
                    className="textBox"
                    type="text"
                    id="lname"
                    name="lastname"
                    placeholder="Last Name"
                    onChange={this.lastNameChangeHandler}
                  />
                </div>
                <input
                  className="emailTextbox"
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={this.emailChangeHandler}
                />
                <div className="passwordRow">
                  <input
                    className="textBox"
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.passwordChangeHandler}
                  />
                  <input
                    className="textBox"
                    type="password"
                    id="confirmPass"
                    name="password"
                    placeholder="Confirm Password"
                    onChange={this.confirmPasswordChangeHandler}
                  />
                </div>
                <input
                  className="buttonSubmitForm"
                  type="submit"
                  defaultValue="Sign Up"
                />
              </form>
            </div>
          </UserCredentialsBox>
        </BackgroundImage>
      </>
    );
  }
}
export default Registration;
