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
            <li><h3>Home</h3></li>
            <li><h3>Search</h3></li>
            <li><h3>My Profile</h3></li>
            <li><h3>My Groups</h3></li>
            <li><h3>My Connections</h3></li>
        </ul>
     </div>
  );
  }

}
export default Navigationbar;
