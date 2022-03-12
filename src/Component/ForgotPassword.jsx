import React, { Component } from "react";
import styles from "./auth.module.css";

export class ForgotPassword extends Component {
  requestReset(e) {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_PATH + "/auth/request-reset", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: e.target.email.value,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Reset Token Sent to Email!");
      } else {
        alert("Invalid Email.");
      }
    });
  }

  resetPassword(e) {
    e.preventDefault();

    fetch(process.env.REACT_APP_API_PATH + "/auth/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: e.target.token.value,
        password: e.target.newPassword.value,
      }),
    }).then((res) => {
      if (res.ok) {
        alert("Password Reset!");
      } else {
        alert("Invalid or Expired Token.");
      }
    });
  }

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
            <form className={styles.form} onSubmit={this.requestReset}>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Email"
                required
              />
              <input
                type="submit"
                value="Send Email"
                className={styles.button}
              />
            </form>
            <form className={styles.form} onSubmit={this.resetPassword}>
              <input
                className={styles.input}
                type="text"
                name="token"
                placeholder="Token"
                required
              />
              <input
                className={styles.input}
                type="password"
                name="newPassword"
                placeholder="New Password"
                required
              />
              <input type="submit" value="Reset" className={styles.button} />
            </form>
            <a className={styles.noAccount} href="/">
              go back to login
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
