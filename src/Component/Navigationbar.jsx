import React from "react";
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
<<<<<<< HEAD
        {/* <Link to= "/"> */}
          <a href="/" className={styles.home}>
            Home
          </a>
        {/* </Link> */}
        <div className={styles.between}/>
        <Link to= "./">
          <div className={styles.search}>
            Search
          </div>
        </Link>
        <div className={styles.between}/>
        <a href="/profile">
          <div className={styles.profile}>
            Profile
          </div>
=======
        <a href="./" className={styles.home}>
          Home
        </a>
        <a href="./" className={styles.search}>
          Search
        </a>
        <a href="./profile" className={styles.profile}>
          Profile
        </a>
        <a href="./posts" className={styles.groups}>
          Groups
        </a>
        <a href="./connections" className={styles.connections}>
          Connections
>>>>>>> dev
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
