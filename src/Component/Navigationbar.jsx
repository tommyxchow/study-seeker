import React from "react";
import "../App.css";
import navbar from "./nav.module.css";
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
            <li><h className={navbar.home}>Home</h></li>
            <li><h className={navbar.search}>Search</h></li>
            <li><h className={navbar.profile}>Profile</h></li>
            <li><h className={navbar.groups}>Groups</h></li>
            <li><h className={navbar.connections}>Connections</h></li>
            <li><h className={navbar.logouttext}>Logout</h></li>
            <li><h className={navbar.logoutarrow}></h></li>
            <li><h className={navbar.logoutbackground}></h></li>
        </ul>
     </div>
  );
  }

}
export default Navigationbar;
