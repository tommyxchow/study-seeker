import React from "react";
import "../App.css";
import gear from "../assets/gear.png"
import pp from "../assets/temp_profilepic.jpg"
import bgp from "../assets/background.jpg"
import discord from "../assets/discord.png"
import email from "../assets/email.png"
import year from "../assets/goal.png"
import transcript from "../assets/transcript.png"
import major from "../assets/education.png"
import star from "../assets/star.png"
import { string } from "prop-types";

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
      academicStanding: "",
      discord: "",
      email: "",
      privacy: "",
      year: "",
      edit: false
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
      [field]: e.target.value
    });
  }

  
  // This is the function that will get called the first time that the component gets rendered.  This is where we load the current
  // values from the database via the API, and put them in the state so that they can be rendered to the screen.  
  componentDidMount() {
    console.log("In profile");
    console.log(this.props);

    // fetch the user data, and extract out the attributes to load and display
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "get",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }
    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            console.log(result);
            if (result.attributes){
            this.setState({
              // IMPORTANT!  You need to guard against any of these values being null.  If they are, it will
              // try and make the form component uncontrolled, which plays havoc with react
              username: result.attributes.username || "",
              firstname: result.attributes.firstName || "Swastik",
              lastname: result.attributes.lastName || "Naik",
              favoritecolor: result.attributes.favoritecolor || "",
              // new attributes
              major: result.attributes.major || "Major",
              year: result.attributes.year || "Year",
              academicStanding: result.attributes.academicStanding || "Standing",
              discord: result.attributes.discord || "Discord",
              email: result.attributes.email || "Email",
              privacy: result.attributes.privacy || "Everyone",
              profilePicture: result.attributes.profilePicture || "",
              backgroundPicture: result.attributes.backgroundPicture || "",
              rating: result.attributes.rating || "0",
              year: result.attributes.year || "Year",
              edit: false
            });
          }
          }
        },
        error => {
          alert("error!");
        }
      );

    
  }

  // This is the function that will get called when the submit button is clicked, and it stores
  // the current values to the database via the api calls to the user and user_preferences endpoints
  submitHandler = event => {
    
    //keep the form from actually submitting, since we are handling the action ourselves via
    //the fetch calls to the API
    event.preventDefault();

    //make the api call to the user controller, and update the user fields (username, firstname, lastname)
    fetch(process.env.REACT_APP_API_PATH+"/users/"+sessionStorage.getItem("user"), {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        attributes: {
          username: this.state.username,
          firstName: this.state.firstname,
          lastName: this.state.lastname,
          favoritecolor: this.state.favoritecolor,
          
          // new attributes
          major: this.state.major,
          year: this.state.year,
          academicStanding: this.state.academicStanding,
          discord: this.state.discord,
          email: this.state.email,
          privacy: this.state.privacy,
          profilePicture: this.state.profilePicture,
          backgroundPicture: this.state.backgroundPicture,
          rating: this.state.backgroundPicture,
          year: this.state.year
        }
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );
  };

  // This is the function that draws the component to the screen.  It will get called every time the
  // state changes, automatically.  This is why you see the username and firstname change on the screen
  // as you type them.
  render() {
    return (
      <div className="profile">
        <div className="profile-header">
        <img
              src={bgp}
              className="background-picture"
              alt="settingsButton"/>
            <button
                className="edit-button"
                onClick={() => this.setState({ edit: !this.state.edit })}>
                <img
                  src={gear}
                  className="setting-icon"
                  alt="settingsButton"/>
            </button>
            <img
                  src={pp}
                  className="profile-picture"
                  alt="settingsButton"
                />
            <h1 className="profile-name">{this.state.firstname}</h1>
            <img
            src={star}
            className="profile-rating-1"
            alt="star"/> 
            <img
            src={star}
            className="profile-rating-2"
            alt="star"/> 
            <img
            src={star}
            className="profile-rating-3"
            alt="star"/> 
            <img
            src={star}
            className="profile-rating-4"
            alt="star"/> 
            <img
            src={star}
            className="profile-rating-5"
            alt="star"/> 
        {this.state.edit ? (
        <form className="profile-data-set" onSubmit={this.submitHandler}>  
        <table className="profile-data-edit-table">
          <tr className="profile-data-edit-row">
            <td className="profile-data-edit-icon">
              <img
                src={major}
                className="profile-data-icon"
                alt="majorIcon"/>
            </td>
            <td className="profile-data-edit-input">
              <input
                type="text"
                onChange={e => this.fieldChangeHandler("major", e)}
                value={this.state.major}
              />
            </td>
            <td className="profile-data-edit-icon">
            <img
              src={year}
              className="profile-data-icon"
              alt="yearIcon"/>
            </td>
            <td className="profile-data-edit-input">
            <input
              type="text"
              onChange={e => this.fieldChangeHandler("year", e)}
              value={this.state.year}
            />
            </td>
            <td className="profile-data-edit-icon">
              <img
              src={transcript}
              className="profile-data-icon"
              alt="transcriptIcon"/>
            </td>
            <td className="profile-data-edit-input">
            <input
              type="text"
              onChange={e => this.fieldChangeHandler("academicStanding", e)}
              value={this.state.academicStanding}
            />
            </td>
          </tr>
          <tr className="profile-data-edit-row">
            <td className="profile-data-edit-icon">
              <img
              src={discord}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-edit-input">
              <input
                type="text"
                onChange={e => this.fieldChangeHandler("discord", e)}
                value={this.state.discord}
              />
            </td>
            <td className="profile-data-edit-icon">
              <img
              src={email}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td colSpan={3} className="profile-data-edit-input">
              <input
                type="text"
                onChange={e => this.fieldChangeHandler("email", e)}
                value={this.state.email}
              />
            </td>
          </tr>
          <tr>
            <td className="profile-data-edit-icon"><img
              src={major}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-edit-input" ><input
              type="text"
              onChange={e => this.fieldChangeHandler("privacy", e)}
              value={this.state.privacy}
              />
            </td>
            <td className="profile-data-edit-icon">
            <img
              src={major}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td colSpan={3} className="profile-data-edit-input">
            <input
              type="text"
              onChange={e => this.fieldChangeHandler("year", e)}
              value={this.state.year}
              className="passwordInput"
            />
            <input
              type="text"
              onChange={e => this.fieldChangeHandler("year", e)}
              value={this.state.year}
              className="passwordInput"
            />
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td><input type="button" value="Cancel"/></td>
            <td></td>
            <td>
              <input type="submit" value="Submit"/>
            </td>
          </tr>
        </table>
        </form>
        ) : (
        <div className="profile-data-set">
        
        <table>
          <tr>
            <td className="profile-data-icon-element">
              <img
              src={major}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-text-element">
              <span>
                {this.state.major}
                </span>
            </td>
            <td className='profile-data-icon-element'>
              <img
              src={year}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-text-element">
              <span>{this.state.year}</span>
            </td>
            <td className="profile-data-icon-element">
              <img
              src={transcript}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-text-element">
              <span>{this.state.academicStanding}</span>
            </td>
          </tr>
          <tr>
            <td className="profile-data-icon-element">
              <img
              src={discord}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td className="profile-data-text-element">
              <span>{this.state.discord}</span>
            </td>
            <td className="profile-data-icon-element">
              <img
              src={email}
              className="profile-data-icon"
              alt="majorIcon"/>
            </td>
            <td colSpan={3} className="profile-data-text-element">  
              <span >{this.state.email}</span>
            </td>
              </tr>
            </table>
        </div>)}
        </div>
        <div className="user-data">
          <div>
            <h2>Current Classes</h2>
          </div>
          <div>
            <h2>Completed Classes</h2>
          </div>
          <div>
            <h2>Reviews</h2>
          </div>
          </div>
      </div>
    );
  }
}
