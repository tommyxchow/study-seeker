import React, { Component } from "react";
import starEmpty from "../assets/star-empty.png";
import starFilled from "../assets/star-filled.png";
import styles from "./reviews.module.css";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.userId);
    this.state = {
      rating: 5,
    };
  }

  submitHandler = (event) => {
    event.preventDefault();

    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH + "/posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: event.target.review.value,
        recipientUserID: this.props.userId,
        attributes: {
          review: true,
          rating: this.state.rating,
        },
      }),
    }).then((res) => res.json());

    event.target.review.value = "";
  };

  render() {
    return (
      <div className={styles.container}>
        <p>Reviews</p>
        <form className={styles.form} onSubmit={this.submitHandler}>
          {[...Array(this.state.rating)].map((x, i) => (
            <img
              src={starFilled}
              alt="Filled Star"
              onClick={() => this.setState({ rating: i + 1 })}
            />
          ))}
          {[...Array(5 - this.state.rating)].map((x, i) => (
            <img
              src={starEmpty}
              alt="Empty Star"
              onClick={() =>
                this.setState({ rating: this.state.rating + i + 1 })
              }
            />
          ))}
          <input name="review" placeholder="Write a review"></input>
          <button type="submit">Post</button>
        </form>
      </div>
    );
  }
}
