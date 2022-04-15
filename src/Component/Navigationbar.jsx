import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import styles from "./nav.module.css";

/* The Navbar class provides navigation through react router anks.  Note the callback
   to the parent app class in the last entry... this is an example of calang a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {
  render() {
    const navStyle = ({ isActive }) =>
      isActive
        ? { textDecoration: "underline", textDecorationColor: "white" }
        : undefined;

    return (
      <div className={styles.sidenav}>
        <NavLink to="/" style={navStyle}>
          <div className={styles.navItem}>Home</div>
        </NavLink>
        <NavLink to="/search" style={navStyle}>
          <div className={styles.navItem}>Search</div>
        </NavLink>
        <NavLink to="/profile" style={navStyle}>
          <div className={styles.navItem}>Profile</div>
        </NavLink>
        <NavLink to="/groups" style={navStyle}>
          <div className={styles.navItem}>Groups</div>
        </NavLink>
        <NavLink to="/connections" style={navStyle}>
          <div className={styles.navItem}>Connections</div>
        </NavLink>
        <div className={styles.spacer}></div>
        <NavLink to="/styleguide" style={navStyle} className={styles.navItem}>
          Style Guide
        </NavLink>
        <NavLink to="/" onClick={this.props.logout} className={styles.navItem}>
          Logout
        </NavLink>
      </div>
    );
  }
}

export default Navigationbar;
