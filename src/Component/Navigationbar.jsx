import React from "react";
import "../App.css";
import styles from "./nav.module.css";

/* The Navbar class provides navigation through react router anks.  Note the callback
   to the parent app class in the last entry... this is an example of calang a function
   passed in via props from a parent component */
class Navigationbar extends React.Component {
  render() {
    return (
      <div className={styles.sidenav}>
        <a href="./" className={styles.home}>
          Home
        </a>
        <a href="./" className={styles.search}>
          Search
        </a>
        <a href="./profile" className={styles.profile}>
          Profile
        </a>
        <a href="./" className={styles.groups}>
          Groups
        </a>
        <a href="./connections" className={styles.connections}>
          Connections
        </a>
        <div className={styles.spacer}></div>
        <a
          onClick={this.props.logout}
          href="./login"
          className={styles.logouttext}
        >
          Logout
        </a>
      </div>
    );
  }
}

export default Navigationbar;
