import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import styles from "./nav.module.css";

/* The Navbar class provides navigation through react router anks.  Note the callback
   to the parent app class in the last entry... this is an example of calang a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {
  render() {
    return (
      <div className={styles.sidenav}>
        <Link to={"/home"} className={styles.home}>
          Home
        </Link>
      <div className={styles.between}/>
      <Link to= "./search">
        <div className={styles.search}>
          Search
        </div>
      </Link>
      <div className={styles.between}/>
      <a href="/profile">
        <div className={styles.profile}>
          Profile
        </div>
      </a>
      <div className={styles.between}/>
      <Link to="/groups">
        <div className={styles.groups}>
          Groups
        </div>
      </Link>
      <div className={styles.between}/>
      <Link to="/connections">
        <div className={styles.connections}>
          Connections
        </div>
      </Link>
      <div className={styles.spacer}></div>
      <Link to="/login">
        <div
          onClick={this.props.logout}
          className={styles.logouttext}
        >
          Logout
        </div>
      </Link>
    </div>
    );
  }
}

export default Navigationbar;
