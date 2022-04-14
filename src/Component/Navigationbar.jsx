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
        : { color: "red" };

    return (
      <div className={styles.sidenav}>
        {/* <NavLink to= "/"> */}
        <NavLink to="/" style={navStyle}>
          <div className={styles.home}>Home</div>
        </NavLink>
        {/* </NavLink> */}
        <div className={styles.between} />
        <NavLink to="/search" style={navStyle}>
          <div className={styles.search}>Search</div>
        </NavLink>
        <div className={styles.between} />
        <NavLink to="/profile" style={navStyle}>
          <div className={styles.profile}>Profile</div>
        </NavLink>
        <div className={styles.between} />
        <NavLink to="/groups" style={navStyle}>
          <div className={styles.groups}>Groups</div>
        </NavLink>
        <div className={styles.between} />
        <NavLink to="/connections" style={navStyle}>
          <div className={styles.connections}>Connections</div>
        </NavLink>
        <div className={styles.spacer}></div>
        <NavLink to="/" style={navStyle}>
          <div onClick={this.props.logout} className={styles.logouttext}>
            Logout
          </div>
        </NavLink>
      </div>
    );
  }
}

export default Navigationbar;
