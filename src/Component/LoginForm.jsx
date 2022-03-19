import React from "react";
import "../App.css";
import styles from "./auth.module.css";

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
  myChangeHandler = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  passwordChangeHandler = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  // when the user hits submit, process the login through the API
  submitHandler = (event) => {
    //keep the form from actually submitting
    event.preventDefault();

    //make the api call to the authentication page
    fetch(process.env.REACT_APP_API_PATH + "/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.username,
        password: this.state.password,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Testing");
          if (result.userID) {
            // set the auth token and user ID in the session state
            sessionStorage.setItem("token", result.token);
            sessionStorage.setItem("user", result.userID);

            this.setState({
              sessiontoken: result.token,
              alanmessage: result.token,
            });

            // call refresh on the posting list
            this.refreshPostsFromLogin();
          } else {
            // if the login failed, remove any infomation from the session state
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("user");
            this.setState({
              sessiontoken: "",
              alanmessage: result.message,
            });
          }
        },
        (error) => {
          alert("User does not exist or password is invalid.");
        }
      );
  };

  render() {
    // console.log("Rendering login, token is " + sessionStorage.getItem("token"));

    if (!sessionStorage.getItem("token")) {
      return (
        <div className={styles.container}>
          <div className={styles.background}>
            <div className={styles.content}>
              <strong className={styles.logoText}>
                Study
                <br />
                Seeker
              </strong>
              <b className={styles.subtitle}>LOG IN TO YOUR ACCOUNT</b>
              <form className={styles.form} onSubmit={this.submitHandler}>
                <input
                  className={styles.input}
                  type="email"
                  name="login"
                  placeholder="Email"
                  onChange={this.myChangeHandler}
                  required
                />
                <input
                  className={styles.input}
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.passwordChangeHandler}
                  required
                />
                <a className={styles.forgotPassword} href="./reset-password">
                  forgot password?
                </a>
                <input type="submit" value="Login" className={styles.button} />
              </form>
              <a className={styles.noAccount} href="./register">
                don't have an account?
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      console.log("Returning welcome message");
      if (this.state.username) {
        return <p>Welcome, {this.state.username}</p>;
      } else {
        return <p>{this.state.alanmessage}</p>;
      }
    }
  }
}
