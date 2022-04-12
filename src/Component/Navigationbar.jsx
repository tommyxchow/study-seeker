import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import styles from "./nav.module.css";
import {Link} from "react-router-dom";

/* The Navbar class provides navigation through react router anks.  Note the callback
   to the parent app class in the last entry... this is an example of calang a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {
  render() {
    return (
      <div className={styles.sidenav}>

        <Link to="/home" className={styles.home}>
          Home
        </Link>
        <a href="./" className={styles.search}>
          Search

        <a href="/" className={styles.home}>
          Home
        </a>
        <div className={styles.between}/>
        <a href= "/">
          <div className={styles.search}>
            Search
          </div>
        </a>
        <div className={styles.between}/>
        <a href="/profile">
          <div className={styles.profile}>
            Profile
          </div>
        </a>
        <div className={styles.between}/>
        <a href="/groups">
          <div className={styles.groups}>
            Groups
          </div>
        </a>
        <div className={styles.between}/>
        <a href="/connections">
          <div className={styles.connections}>
            Connections
          </div>
        </a>
        <div className={styles.spacer}></div>
        <a href="/login">
          <div
            onClick={this.props.logout}
            className={styles.logouttext}
          >
            Logout
          </div>
        </a>
      </div>
    );
  }
}

export default Navigationbar;
