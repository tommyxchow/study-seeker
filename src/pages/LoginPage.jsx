import React, { Component } from "react";
import styles from "./login.module.css";

export default class LoginPage extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.loginBackground}>
          <div className={styles.login}>
            <strong className={styles.logoText}>
              Study
              <br />
              Seeker
            </strong>
            <b className={styles.subtitle}>SEEK FRIENDS TO STUDY</b>
            <form className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="login"
                placeholder="Email"
              ></input>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Password"
              ></input>
            </form>
            <a className={styles.forgotPassword} href="/reset-password">
              forgot password?
            </a>
            <button className={styles.loginButton}>Login</button>
            <a className={styles.noAccount} href="/register">
              don't have an account?
            </a>
          </div>
        </div>
      </div>
    );
  }
}
