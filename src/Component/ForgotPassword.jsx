import React, { Component } from "react";
import styles from "./auth.module.css";

export class ForgotPassword extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.background}>
          <div className={styles.content}>
            <strong className={styles.logoText}>
              Study
              <br />
              Seeker
            </strong>
            <b className={styles.subtitle}>RESET YOUR PASSWORD</b>
            <form className={styles.form}>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
              ></input>
            </form>
            <button className={styles.button}>Send</button>
            <form className={styles.form}>
              <input
                className={styles.input}
                type="text"
                name="token"
                placeholder="Token"
              ></input>
              <input
                className={styles.input}
                type="password"
                name="confirmPassword"
                placeholder="New Password"
              ></input>
            </form>

            <button className={styles.button}>Reset</button>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
