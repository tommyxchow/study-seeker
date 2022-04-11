import React, { Component } from "react";
import starEmpty from "../assets/star-empty.png";
import starFilled from "../assets/star-filled.png";
import styles from "./reviews.module.css";

export default class Reviews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingReview: null,
      rating: 5,
    };
  }

  componentDidMount() {
    fetch(
      process.env.REACT_APP_API_PATH +
        "/posts?recipientUserID=" +
        this.props.userId +
        "&attributes=" +
        encodeURIComponent(
          JSON.stringify({
            path: "review",
            equals: true,
          })
        ),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result[1] > 0) {
          this.setState({
            existingReview: result[0][0],
            rating: result[0][0].attributes.rating,
          });
          console.log(this.state.existingReview);
        }
      });
  }

  submitHandler = (event) => {
    event.preventDefault();

    console.log(event.target.review.value);

    //make the api call to post
    fetch(
      process.env.REACT_APP_API_PATH +
        (this.state.existingReview == null
          ? "/posts"
          : "/posts/" + this.state.existingReview.id),
      {
        method: this.state.existingReview == null ? "POST" : "PATCH",
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
      }
    )
      .then((res) => res.json())
      .then((result) => this.setState({ existingReview: result }));
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
          <input
            className={styles.input}
            name="review"
            placeholder="Write a review"
            defaultValue={
              this.state.existingReview == null
                ? ""
                : this.state.existingReview.content
            }
          ></input>
          <button className={styles.postButton} type="submit">
            {this.state.existingReview == null ? "Post" : "Update"}
          </button>
        </form>
      </div>
    );
  }
}
