import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import styles from "./nav.module.css";
import optionIcon from "../assets/cse370navbar.png"

/* The Navbar class provides navigation through react router anks.  Note the callback
   to the parent app class in the last entry... this is an example of calang a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {

  optionHandler(){
    if (document.getElementById("myNav").className===styles.sidenav){
      document.getElementById("myNav").className=styles.sidenav2;
    }
    else{
      document.getElementById("myNav").className=styles.sidenav;
    }
    
  }

  render() {
    const navStyle = ({ isActive }) =>
      isActive
        ? { textDecoration: "underline", textDecorationColor: "white" }
        : undefined;

    return (
      
      <div id="myNav" className={styles.sidenav}>
        <div className={styles.topnav}>
        <button className={styles.optionbutton} onClick={this.optionHandler}>
          <img src={optionIcon} className={styles.icon} alt='Navigation Bar Hamburger Icon'></img>
        </button>
        <span className={styles.logotext}>
        Study
        <br />
        Seeker
        <br />
        </span>
        <button className={styles.optionbutton}></button>
        </div>
        <NavLink to="/" style={navStyle}>
          <div className={styles.topfixnavItem} onClick={this.optionHandler}>Home</div>
        </NavLink>
        <NavLink to="/search" style={navStyle}>
          <div className={styles.navItem} onClick={this.optionHandler}>Search</div>
        </NavLink>
        <NavLink to="/profile" style={navStyle}>
          <div className={styles.navItem} onClick={this.optionHandler}>Profile</div>
        </NavLink>
        <NavLink to="/groups" style={navStyle}>
          <div className={styles.navItem} onClick={this.optionHandler}>Groups</div>
        </NavLink>
        <NavLink to="/connections" style={navStyle}>
          <div className={styles.navItem} onClick={this.optionHandler}>Connections</div>
        </NavLink>
        <div className={styles.spacer}></div>
        <NavLink to="/styleguide" style={navStyle} className={styles.navItem} onClick={this.optionHandler}>
          Style Guide
        </NavLink>
        <NavLink to="/" onClick={this.props.logout} className={styles.fixnavItem}>
          Logout
        </NavLink>
        
        
      </div>
      
    );
  }
}

export default Navigationbar;
