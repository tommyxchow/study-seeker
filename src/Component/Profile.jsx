import React from "react";
import "../App.css";
import settingsLogo from "../assets/gear.png";
import defaultProfilePicture from "../assets/temp_profilepic.jpg";
import defaultBackgroundPicture from "../assets/background.jpg";
import emailLogo from "../assets/email.png";
import yearLogo from "../assets/goal.png";
import majorLogo from "../assets/education.png";
import passwordLogo from "../assets/password.png";
import privacyLogo from "../assets/privacy.png";
import styles from "./profile.module.css";

// The Profile component shows data from the user table.  This is set up fairly generically to allow for you to customize
// user data by adding it to the attributes for each user, which is just a set of name value pairs that you can add things to
// in order to support your group specific functionality.  In this example, we store basic profile information for the user

export default class Profile extends React.Component {
  // The constructor will hold the default values for the state.  This is also where any props that are passed
  // in when the component is instantiated will be read and managed.
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstname: "",
      lastname: "",
      favoritecolor: "",
      responseMessage: "",
      // NOTE : if you wanted to add another user attribute to the profile, you would add a corresponding state element here
      profilePicture: "",
      backgroundPicture: "",
      rating: "",
      major: "",
      year: "",
      contact: "",
      privacy: "",
      edit: false,
      connect: false,
      profile: this.props.userid == this.props.profileid
    };
    this.fieldChangeHandler.bind(this);
  }

  // This is the function that will get called every time we change one of the fields tied to the user data source.
  // it keeps the state current so that when we submit the form, we can pull the value to update from the state.  Note that
  // we manage multiple fields with one function and no conditional logic, because we are passing in the name of the state
  // object as an argument to this method.

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value,
    });
  }

  // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
  // values from the database via the API, and put them in the state so that they can be rendered to the screen.

  createFetch(path, method, body){
    const supplyPath = process.env.REACT_APP_API_PATH+path;
    const supplyMethod = {
      method: method,
      headers: {"Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token")
              }
    };
    if(body != null){
      supplyMethod.body = JSON.stringify(body);
    }
    return fetch(supplyPath, supplyMethod);
  }

  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    this.createFetch("/users/"+this.props.profileid, "get", null)
    .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            console.log(result);
            if (result.attributes) {
              this.setState({
                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                // try and make the form component uncontrolled, which plays havoc with react
                username: result.attributes.username || "",
                firstname: result.attributes.firstName || "First Name",
                lastname: result.attributes.lastName || "Last Name",
                favoritecolor: result.attributes.favoritecolor || "",
                // new attributes
                major: result.attributes.major || "Major",
                year: result.attributes.year || "Year",
                contact: result.attributes.contact || "Contact",
                privacy: result.attributes.privacy || "Everyone",
                profilePicture: result.attributes.profilePicture || "",
                backgroundPicture: result.attributes.backgroundPicture || "",
                rating: result.attributes.rating || "0",
                edit: false,
                connect: false
              });
            }
          }
        },
        (error) => {
          alert("error!");
        }
      );
  }

  // This is the function that will get called when the submit button is clicked, and it stores
  // the current values to the database via the api calls to the user and user_preferences endpoints
  submitHandler = (event) => {
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();

    //make the api call to the user controller, and update the user fields (username, firstname, lastname)
    const body = {attributes: {
      username: this.state.username,
      firstName: this.state.firstname,
      lastName: this.state.lastname,
      favoritecolor: this.state.favoritecolor,

      // new attributes
      major: this.state.major,
      year: this.state.year,
      contact: this.state.contact,
      privacy: this.state.privacy,
      profilePicture: this.state.profilePicture,
      backgroundPicture: this.state.backgroundPicture,
      rating: this.state.backgroundPicture,
    }};

    this.createFetch("/users/"+sessionStorage.getItem("user"), 'PATCH', body)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
        },
        (error) => {
          alert("error!");
        }
      );
  };

  connectionHandler = (event) =>{
    event.preventDefault();
    const body = {
      "fromUserID": Number(this.props.userid),
      "toUserID": Number(this.props.profileid),
      "attributes": {
        "additionalProp1": {}}};
    this.createFetch("/connections", 'POST', body)
    .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
        },
        (error) => {
          alert("error");
        }
      );
  };

  connectionButton(){

  }



  // This is the function that draws the component to the screen.  It will get called every time the
  // state changes, automatically.  This is why you see the username and firstname change on the screen
  // as you type them.
  render() {
    console.log("Testing", this.props);
    const profileFields = ["Major", "Year", "Contact", "Privacy", "Password"];
    const profileDetails = [
      this.state.major,
      this.state.year,
      this.state.contact,
    ];
    const profileDetailIcons = [
      majorLogo,
      yearLogo,
      emailLogo,
      privacyLogo,
      passwordLogo,
    ];

    return (
      <div className={styles.container}>
        <div className={styles.backgroundOverlay}></div>
        <img
          src={defaultBackgroundPicture}
          className={styles.backgroundPicture}
          alt="Cover"
        />
        {this.state.edit && (
          <h2 className={styles.editBackground}>Click to Change</h2>
        )}
        <div className={styles.profileHeader}>
          <div>
            <img
              src={defaultProfilePicture}
              className={styles.profilePicture}
              alt="Profile Pic"
            />
            {this.state.edit && (
              <p className={styles.editPicture}>Click to Change</p>
            )}
            {this.state.edit && (
              <button className={styles.deleteAccountButton}>
              Delete Account
              </button>
            )}
          </div>
          
          {!this.state.edit && (
            <div className={styles.nameConnectButtonHeader}><h1 className={styles.profileName}>
              {this.state.firstname} {this.state.lastname}</h1>
            </div>)}
          {!this.state.profile && (this.state.connect ? 
          (
            <button className={styles.disconnectButton} onClick={this.connectionHandler}>
            Disconnect
            </button>
            ):(
            <button className={styles.connectButton} onClick={this.connectionHandler}>
              Connect
            </button>)
            )}
            {
              !this.state.profile &&
              <button className={styles.blockButton}>Block</button>
            }
        </div>
        <div className={styles.body}>
          <div className={styles.profileDetails}>
            {this.state.edit ? (
              <>
                <form className={styles.form} onSubmit={this.submitHandler}>
                  {profileFields.map((e, index) => {
                    if (e === "Password") {
                      return (
                        <>
                          <label className={styles.formLabel}>
                            <img
                              src={passwordLogo}
                              alt={e}
                              className={styles.profileDetailIcon}
                            />
                            <input
                              type="password"
                              name={e.toLowerCase()}
                              placeholder={e}
                            />
                          </label>
                          <label className={styles.formLabel}>
                            <input
                              type="password"
                              name={e.toLowerCase()}
                              placeholder="Repeat Password"
                            />
                          </label>
                        </>
                      );
                    }
                    return (
                      <label className={styles.formLabel}>
                        <img
                          src={profileDetailIcons[index]}
                          alt={e}
                          className={styles.profileDetailIcon}
                        />
                        <input
                          type="text"
                          name={e.toLowerCase()}
                          placeholder={e}
                        />
                      </label>
                    );
                  })}
                </form>
                <div className={styles.editButtons}>
                  <input
                    className={styles.confirmButton}
                    type="submit"
                    value="Confirm"
                  />
                  <input
                    className={styles.cancelButton}
                    type="button"
                    value="Cancel"
                    onClick={() => this.setState({ edit: false })}
                  />
                </div>
              </>
            ) : (
              <>
                {profileDetails.map((e, index) => (
                  <div className={styles.profileDetailItem}>
                    <img
                      src={profileDetailIcons[index]}
                      alt={profileFields[index]}
                      className={styles.profileDetailIcon}
                    />
                    {e}
                  </div>
                ))}
                {this.state.profile &&
                (<div className={styles.profileDetailItem}>
                  <img
                    src={settingsLogo}
                    className={styles.profileDetailIcon}
                    alt="Settings"
                    onClick={() => this.setState({ edit: true })}
                  />
                </div>)}
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}
