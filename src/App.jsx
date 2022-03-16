/*
  App.js is the starting point for the application.   All of the components in your app should have this file as the root.
  This is the level that will handle the routing of requests, and also the one that will manage communication between
  sibling components at a lower level.  It holds the basic structural components of navigation, content, and a modal dialog.
*/

import ConnectionRequest from "Component/ConnectionRequest";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import ForgotPasswordPage from "./Component/ForgotPassword.jsx";
import FriendForm from "./Component/FriendForm.jsx";
import FriendList from "./Component/FriendList.jsx";
import GroupList from "./Component/GroupList.jsx";
import LoginPage from "./Component/LoginForm.jsx";
import Modal from "./Component/Modal.jsx";
import Navbar from "./Component/Navigationbar.jsx";
import PostForm from "./Component/PostForm.jsx";
import Profile from "./Component/Profile.jsx";
import { useParams } from "react-router-dom";

import LandingPage from "./Component/LandingPage.jsx";
import Registration from "./Component/Registration.jsx";

// toggleModal will both show and hide the modal dialog, depending on current state.  Note that the
// contents of the modal dialog are set separately before calling toggle - this is just responsible
// for showing and hiding the component
function toggleModal(app) {
  app.setState({
    openModal: !app.state.openModal,
  });
}

// the App class defines the main rendering method and state information for the app
class App extends React.Component {
  // the only state held at the app level is whether or not the modal dialog
  // is currently displayed - it is hidden by default when the app is started.
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      refreshPosts: false,
      logout: false,
      login: false,
    };

    // in the event we need a handle back to the parent from a child component,
    // we can create a reference to this and pass it down.
    this.mainContent = React.createRef();

    // since we are passing the doRefreshPosts method to a child component, we need to
    // bind it
    this.doRefreshPosts = this.doRefreshPosts.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    this.setState({
      logout: true,
      login: false,
    });
  };

  login = () => {
    console.log("CALLING LOGIN IN APP");

    this.setState({
      login: true,
      logout: false,
      refreshPosts: true,
    });
  };

  // doRefreshPosts is called after the user logs in, to display relevant posts.
  // there are probably more elegant ways to solve this problem, but this is... a way
  doRefreshPosts = () => {
    console.log("CALLING DOREFRESHPOSTS IN APP");
    this.setState({
      refreshPosts: true,
    });
  };

  // This doesn't really do anything, but I included it as a placeholder, as you are likely to
  // want to do something when the app loads.  You can define listeners here, set state, load data, etc.
  componentDidMount() {
    window.addEventListener("click", (e) => {
      console.log("TESTING EVENT LISTENER");
    });
  }
  

  // As with all react files, render is in charge of determining what shows up on the screen,
  // and it gets called whenever an element in the state changes.  There are three main areas of the app,
  // the navbar, the main content area, and a modal dialog that you can use for ... you know, modal
  // stuff.  It's declared at this level so that it can overlay the entire screen.
  render() {
    return (
      // the app is wrapped in a router component, that will render the
      // appropriate content based on the URL path.  Since this is a
      // single page app, it allows some degree of direct linking via the URL
      // rather than by parameters.  Note that the "empty" route "/", which has
      // the same effect as /posts, needs to go last, because it uses regular
      // expressions, and would otherwise capture all the routes.  Ask me how I
      // know this.
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <div className="home">
              {sessionStorage.getItem("token") && (
                <Navbar
                  toggleModal={(e) => toggleModal(this)}
                  logout={this.logout}
                />
              )}

              <div className="maincontent" id="mainContent">
                <Routes>
                  <Route
                    path="/profile"
                    element={<ProfilePage login={this.login} />}
                  />
                  <Route 
                    path="/profile/:id"
                    element={<ProfilePage login={this.login}/>} 
                  />
                  <Route
                    path="/friends"
                    element={<Friends login={this.login} />}
                  />
                  <Route
                    path="/groups"
                    element={<Groups login={this.login} />}
                  />
                  <Route
                    path="/posts"
                    element={
                      <Posts
                        doRefreshPosts={this.doRefreshPosts}
                        login={this.login}
                        apprefresh={this.state.refreshPosts}
                      />
                    }
                  />
                  <Route path="/reset-password" element={<ForgotPassword />} />
                  <Route path="/connections" element={<Connections />} />
                  <Route
                    path="/"
                    element={
                      <Posts
                        doRefreshPosts={this.doRefreshPosts}
                        login={this.login}
                        apprefresh={this.state.refreshPosts}
                      />
                    }
                  />
                </Routes>
              </div>
            </div>
          </header>

          <Modal show={this.state.openModal} onClose={(e) => toggleModal(this)}>
            This is a modal dialog!
          </Modal>
        </div>
      </Router>
    );
  }
}

/*  BEGIN ROUTE ELEMENT DEFINITIONS */
// with the latest version of react router, you need to define the contents of the route as an element.  The following define functional components
// that will appear in the routes.

const LandingTHISWILLCHANGELATER = () => {
  // TODO: Change this later so that the default path leads to landing
 return (
   <LandingPage/>
 );
}

const Register = (props) => {
  // show the study seeker registration form
 return (
   <Registration/>
 );
}

const ProfilePage = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the settings page
  const user_id = sessionStorage.getItem("user");
  let { id } = useParams();
  id = !id ? user_id:id;
  
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT", );
    return (
      <div>
        <LoginPage login={props.login} />
      </div>
    );
  } 
  return (
    <div className="Profile">
      <Profile userid={user_id} profileid={id}/>
    </div>
  );
};

const Friends = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the friends page
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <LoginPage login={props.login} />
      </div>
    );
  }
  return (
    <div>
      <p>Friends</p>
      <FriendForm userid={sessionStorage.getItem("user")} />
      <FriendList userid={sessionStorage.getItem("user")} />
    </div>
  );
};

const Groups = (props) => {
  // if the user is not logged in, show the login form.  Otherwise, show the groups form
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <LoginPage login={props.login} />
      </div>
    );
  }
  return (
    <div>
      <p>Join a Group!</p>
      <GroupList userid={sessionStorage.getItem("user")} />
    </div>
  );
};

const Posts = (props) => {
  console.log("RENDERING POSTS");
  console.log(typeof props.doRefreshPosts);

  console.log("TEST COMPLETE");

  // if the user is not logged in, show the login form.  Otherwise, show the post form
  if (!sessionStorage.getItem("token")) {
    console.log("LOGGED OUT");
    return (
      <div>
        <LoginPage login={props.login} />
      </div>
    );
  } else {
    console.log("LOGGED IN");
    return (
      <div>
        <p>CSE 370 Social Media Test Harness</p>
        <PostForm refresh={props.apprefresh} />
      </div>
    );
  }
};

const Connections = (props) => {
  return <ConnectionRequest />;
};

const ForgotPassword = (props) => {
  return <ForgotPasswordPage />;
};

/* END ROUTE ELEMENT DEFINITIONS */

// export the app for use in index.js
export default App;
