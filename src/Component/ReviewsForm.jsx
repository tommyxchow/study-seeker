import React, { Component } from "react";
import starEmpty from "../assets/star-empty.png";
import starFilled from "../assets/star-filled.png";
import styles from "./reviews.module.css";

export default class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingReview: null,
      rating: 5,
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
    };
  }

  componentDidMount() {
    fetch(
      process.env.REACT_APP_API_PATH +
        "/users/" +
        sessionStorage.getItem("user"),
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) =>
        this.setState({ profilePicture: result.attributes.profilePicture })
      );

    fetch(
      process.env.REACT_APP_API_PATH +
        "/posts?recipientUserID=" +
        this.props.profileId +
        "&authorID=" +
        sessionStorage.getItem("user") +
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
          recipientUserID: this.props.profileId,
          attributes: {
            review: true,
            rating: this.state.rating,
          },
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => this.setState({ existingReview: result }))
      .then(this.props.refreshPosts);
  };

  render() {
    return (
      <div className={styles.container}>
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
          <img
            className={styles.profilePicture}
            src={"https://webdev.cse.buffalo.edu" + this.state.profilePicture}
            alt="Profile Pic"
          />
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
