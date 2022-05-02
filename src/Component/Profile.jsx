import React from "react";
import "../App.css";
import majorLogo from "../assets/education.png";
import emailLogo from "../assets/email.png";
import settingsLogo from "../assets/gear.png";
import yearLogo from "../assets/goal.png";
import privacyLogo from "../assets/privacy.png";
import Reviews from "./DisplayReviews";
import styles from "./profile.module.css";

// The Profile component shows data from the user table.  This is set up fairly generically to allow for you to customize
// user data by adding it to the attributes for each user, which is just a set of name value pairs that you can add things to
// in order to support your group specific functionality.  In this example, we store basic profile information for the user
let deleteAccount = false;
function confirmDeletePrompt() {
  //deleteAccount = window.confirm("Delete your account?");
  if (window.confirm("Delete your account?")) {
    this.deleteAccountHandler();
    this.props.toggleModal("account deleted");
  }
}

export default class Profile extends React.Component {
  // The constructor will hold the default values for the state.  This is also where any props that are passed
  // in when the component is instantiated will be read and managed.
  constructor(props) {
    super(props);
    this.state = {
      user_exist: true,
      username: "",
      firstname: "",
      lastname: "",
      favoritecolor: "",
      responseMessage: "",
      // NOTE : if you wanted to add another user attribute to the profile, you would add a corresponding state element here
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      backgroundPicture: "",
      rating: "",
      major: "",
      year: "",
      contact: "",
      privacy: "",
      edit: false,
      connection_id: -1,
      profile: this.props.userid === this.props.profileid,
      connection_status: "",
    };
    this.fieldChangeHandler.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      window.location.reload();
    }
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

  createFetch(path, method, body) {
    const supplyPath = process.env.REACT_APP_API_PATH + path;
    const supplyMethod = {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    if (body !== null) {
      supplyMethod.body = JSON.stringify(body);
    }
    return fetch(supplyPath, supplyMethod);
  }

  componentDidMount() {
    console.log("In profile");
    this.createFetch("/users/" + this.props.profileid, "get", null)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            if (result.attributes) {
              this.setState({
                // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
                // try and make the form component uncontrolled, which plays havoc with react
                user_exist: true,
                username: result.attributes.username || "",
                firstname: result.attributes.firstName || "First Name",
                lastname: result.attributes.lastName || "Last Name",
                // new attributes
                major: result.attributes.major || "Major",
                year: result.attributes.year || "Year",
                contact: result.attributes.contact || "Contact",
                privacy: result.attributes.privacy || "Everyone",
                profilePicture:
                  result.attributes.profilePicture ||
                  "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
                backgroundPicture: result.attributes.backgroundPicture || "",
                rating: result.attributes.rating || "0",
                edit: false,
                connection_status: "Not sent",
              });
            }
          }
        },
        (error) => {
          this.setState({ user_exist: false });
          // this.props.toggleModal("Testing------------------");
        }
      )
      .then(this.getConnection);
  }

  // This is the function that will get called when the submit button is clicked, and it stores
  // the current values to the database via the api calls to the user and user_preferences endpoints
  submitHandler = (event) => {
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();
    this.setState({
      edit: false,
      major: event.target.major.value,
      year: event.target.year.value,
      contact: event.target.contact.value,
      privacy: event.target.privacy.value,
    });

    console.log(this.state.profilePicture);
    console.log(this.state.backgroundPicture);

    //make the api call to the user controller, and update the user fields (username, firstname, lastname)
    const body = {
      attributes: {
        username: this.state.username,
        firstName: this.state.firstname,
        lastName: this.state.lastname,

        // new attributes
        major: event.target.major.value,
        year: event.target.year.value,
        contact: event.target.contact.value,
        privacy: event.target.privacy.value,
        profilePicture: this.state.profilePicture,
        backgroundPicture: this.state.backgroundPicture,
      },
    };

    this.createFetch("/users/" + sessionStorage.getItem("user"), "PATCH", body)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
        },
        (error) => {
          this.props.toggleModal("error!");
        }
      );
  };

  getConnection = () => {
    if (this.props.userid !== this.props.profileid) {
      this.createFetch(
        "/connections?anyUserID=" + this.props.userid,
        "GET",
        null
      )
        .then((res) => res.json())
        .then(
          (result) => {
            console.log(
              "connection",
              this.props.userid,
              this.props.profileid,
              result
            );

            let connections = result[0].filter((connection) => {
              console.log("TEST1", connection);
              console.log(this.props.profileid);
              return (
                connection.fromUserID.toString() === this.props.profileid ||
                connection.toUserID.toString() === this.props.profileid
              );
            });

            if (connections.length > 0) {
              this.setState({
                connection_id: connections[0].id,
                connection_status: connections[0].attributes.status,
              });
            }

            console.log("TEST", connections);
          },
          (error) => {
            this.props.toggleModal("error! checkConnection");
          }
        );
    }
  };

  connectionHandler = (event, status = "pending") => {
    event.preventDefault();
    if (this.state.connection_id === -1) {
      const body = {
        fromUserID: Number(this.props.userid),
        toUserID: Number(this.props.profileid),
        attributes: {
          status: status,
        },
      };
      this.createFetch("/connections", "POST", body)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              connection_id: result.id,
              connection_status: status,
            });
          },
          (error) => {
            this.props.toggleModal("error");
          }
        );
    } else if (status === "block") {
      const body = {
        fromUserID: Number(this.props.userid),
        toUserID: Number(this.props.profileid),
        attributes: {
          status: status,
        },
      };
      this.createFetch(
        "/connections/" + this.state.connection_id,
        "PATCH",
        body
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              connection_status: status,
            });
          },
          (error) => {
            this.props.toggleModal("error");
          }
        );
    } else {
      console.log("/connections/" + this.state.connection_id);
      this.createFetch(
        "/connections/" + this.state.connection_id,
        "DELETE",
        null
      )
        .then((res) => res.text)
        .then(
          (result) => {
            this.setState({
              blocked: status !== "unblock",
              connection_status: "Not sent",
            });
            this.getConnection();
          },
          (error) => {
            this.props.toggleModal(error);
          }
        );
    }
  };

  handleUpload = (e, backgroundPicture = false) => {
    const newPic = e.target.files[0];
    console.log(newPic);

    const formData = new FormData();
    console.log(this.props.profileid);
    formData.append("uploaderID", this.props.profileid);
    formData.append(
      "attributes",
      JSON.stringify(
        backgroundPicture ? { background: "true" } : { background: "false" }
      )
    );
    formData.append("file", newPic);

    fetch(process.env.REACT_APP_API_PATH + "/file-uploads", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: formData,
    }).then((_) =>
      fetch(
        process.env.REACT_APP_API_PATH +
          "/file-uploads?uploaderID=" +
          this.props.profileid +
          "&attributes=" +
          encodeURIComponent(
            JSON.stringify(
              backgroundPicture
                ? {
                    path: "background",
                    equals: "true",
                  }
                : {
                    path: "background",
                    equals: "false",
                  }
            )
          ),
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      )
        .then((res) => res.json())
        .then((result) =>
          this.setState(
            backgroundPicture
              ? {
                  backgroundPicture: result[0][result[0].length - 1]["path"],
                }
              : {
                  profilePicture: result[0][result[0].length - 1]["path"],
                }
          )
        )
    );
  };

  // This is the function that will get called when the delete account button is clicked
  deleteAccountHandler = (event) => {
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();
    this.createFetch(
      "/users/" + this.props.userid + "?relatedObjectsAction=anonymize",
      "delete",
      null
    )
      .then((res) => res.text())
      .then(
        (result) => {
          console.log(result);
        },
        (error) => {
          this.props.toggleModal(error);
        }
      );
  };

  // This is the function that draws the component to the screen.  It will get called every time the
  // state changes, automatically.  This is why you see the username and firstname change on the screen
  // as you type them.
  render() {
    console.log("Testing", this.props);
    const profileFields = ["Major", "Year", "Contact", "Privacy"];
    const profileDetails = [
      this.state.major,
      this.state.year,
      this.state.contact,
    ];
    const profileDetailIcons = [majorLogo, yearLogo, emailLogo, privacyLogo];

    const connectionStatus = {
      "Not sent": "Connect",
      pending: "Pending",
      accepted: "Disconnect",
    };

    const blockStatus = {
      "Not sent": "Block",
      pending: "Block",
      block: "Unblock",
    };

    return (
      <div className={styles.container}>
        {this.state.user_exist ? (
          <>
            <div className={styles.backgroundOverlay}></div>
            <img
              src={
                "https://webdev.cse.buffalo.edu" + this.state.backgroundPicture
              }
              className={styles.backgroundPicture}
              alt="Cover"
            />
            {this.state.edit && (
              <>
                <label
                  className={styles.uploadButtonBackground}
                  htmlFor="backgroundPic"
                >
                  Click to Change
                </label>
                <input
                  type="file"
                  id="backgroundPic"
                  accept="image/*"
                  onChange={(e) => this.handleUpload(e, true)}
                  style={{ display: "none" }}
                />
              </>
            )}
            <div className={styles.profileHeader}>
              <img
                src={
                  "https://webdev.cse.buffalo.edu" + this.state.profilePicture
                }
                className={styles.profilePicture}
                alt="Profile Avatar"
              />
              {this.state.edit && (
                <>
                  <label className={styles.uploadButton} htmlFor="profilePic">
                    Click to Change
                  </label>
                  <input
                    type="file"
                    id="profilePic"
                    accept="image/*"
                    onChange={this.handleUpload}
                    style={{ display: "none" }}
                  />
                </>
              )}
              {this.state.edit && (
                <button
                  onClick={(e) => {
                    if (window.confirm("Delete your account?")) {
                      this.deleteAccountHandler(e);
                      this.props.toggleModal("Your account has been deleted.");
                      sessionStorage.removeItem("token");
                      sessionStorage.removeItem("user");
                      this.setState({ sessiontoken: "" });
                      window.location.replace(process.env.PUBLIC_URL + "/");
                    } else {
                      this.props.toggleModal("Your account is not deleted");
                    }
                  }}
                  className={styles.deleteAccountButton}
                >
                  Delete Account
                </button>
              )}
              {!this.state.edit && (
                <div className={styles.nameConnectButtonHeader}>
                  <h1 className={styles.profileName}>
                    {this.state.firstname} {this.state.lastname}
                  </h1>
                </div>
              )}
              {!this.state.profile &&
                this.state.connection_status !== "block" &&
                (this.state.connection_status !== "Not sent" ? (
                  <button
                    className={styles.disconnectButton}
                    onClick={(event) => this.connectionHandler(event)}
                  >
                    {connectionStatus[this.state.connection_status]}
                  </button>
                ) : (
                  <button
                    className={styles.connectButton}
                    onClick={(event) =>
                      this.connectionHandler(event, "pending")
                    }
                  >
                    {connectionStatus[this.state.connection_status]}
                  </button>
                ))}
              {!this.state.profile &&
                (this.state.connection_status !== "block" ? (
                  <button
                    className={styles.blockButton}
                    onClick={(event) => this.connectionHandler(event, "block")}
                  >
                    Block
                  </button>
                ) : (
                  <button
                    className={styles.blockButton}
                    onClick={(event) =>
                      this.connectionHandler(event, "unblock")
                    }
                  >
                    {blockStatus[this.state.connection_status]}
                  </button>
                ))}
            </div>

            <div className={styles.body}>
              <div className={styles.profileDetails}>
                {this.state.edit ? (
                  <>
                    <form
                      className={styles.form}
                      onSubmit={this.submitHandler}
                      id="edit"
                    >
                      {profileFields.map((e, index) => (
                        <label className={styles.formLabel}>
                          <img
                            src={profileDetailIcons[index]}
                            alt={e}
                            className={styles.profileDetailIcon}
                          />
                          <input
                            type="text"
                            defaultValue={this.state[e.toLowerCase()]}
                            name={e.toLowerCase()}
                            placeholder={e}
                          />
                        </label>
                      ))}
                    </form>
                    <div className={styles.editButtons}>
                      <input
                        form="edit"
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
                    {this.state.profile && (
                      <div className={styles.profileDetailItem}>
                        <img
                          src={settingsLogo}
                          className={styles.profileDetailIcon}
                          alt="Settings"
                          onClick={() => this.setState({ edit: true })}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <Reviews
              profileId={this.props.profileid}
              showForm={
                sessionStorage.getItem("user") !== this.props.profileid &&
                this.state.connection_status === "accepted"
              }
            />
          </>
        ) : (
          <>User does not exist</>
        )}
      </div>
    );
  }
}
