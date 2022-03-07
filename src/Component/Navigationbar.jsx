import React from "react";
import "../App.css";
import {
   Link
} from 'react-router-dom';

/* The Navbar class provides navigation through react router links.  Note the callback
   to the parent app class in the last entry... this is an example of calling a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {

  render() {
    return (
        <div className="sidenav">                      
        <ul id="side-menu-items">
            <li><h className="home">Home</h></li>
            <li><h className="search">Search</h></li>
            <li><h className="profile">Profile</h></li>
            <li><h className="groups">Groups</h></li>
            <li><h className="navconnections">Connections</h></li>
            <li><h className="logout-text">Logout</h></li>
            <li><h className="logout-arrow"></h></li>
            <li><h className="logout-background"></h></li>
        </ul>
     </div>
  );
  }

}
export default Navigationbar;
