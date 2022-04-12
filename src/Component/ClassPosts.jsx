import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

export default class ClassPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      name: "",
    };
  }

  componentDidMount() {
    console.log(this.props.classId);
    fetch(
      process.env.REACT_APP_API_PATH +
        "/posts?recipientGroupID=" +
        this.props.classId,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({ posts: result[0] });
      });

    fetch(
      process.env.REACT_APP_API_PATH +
        "/users/" +
        sessionStorage.getItem("user"),
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          profilePicture: result.attributes.profilePicture,
          name: result.attributes.firstName + " " + result.attributes.lastName,
        });
      });
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
        content: event.target.post.value,
        recipientGroupID: this.props.classId,
      }),
    })
      .then((res) => res.json())
      .then((result) =>
        this.setState({ posts: [result, ...this.state.posts] })
      );

    event.target.post.value = "";
  };

  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.profileContainer}>
            <img
              className={styles.profilePicture}
              src={"https://webdev.cse.buffalo.edu" + this.state.profilePicture}
              alt="Profile Pic"
            ></img>
            {this.state.name}
          </div>
          <form
            onSubmit={this.submitHandler}
            id="postForm"
            className={styles.form}
          >
            <textarea
              name="post"
              form="postForm"
              className={styles.postInput}
              placeholder="Create a post"
              rows={5}
              cols={70}
            />
          </form>
          <button
            form="postForm"
            type="submit"
            value="submit"
            className={styles.postButton}
          >
            Post
          </button>
        </div>
        {this.state.posts.map((postInfo) => (
          <Post
            id={postInfo.authorID}
            name={`${postInfo.author.attributes.firstName} ${postInfo.author.attributes.lastName}`}
            profilePicture={postInfo.author.attributes.profilePicture}
            content={postInfo.content}
          />
        ))}
      </>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Link
          to={"/profile/" + this.props.id}
          className={styles.profileContainer}
        >
          <img
            className={styles.profilePicture}
            src={
              "https://webdev.cse.buffalo.edu" +
              (this.props.profilePicture ??
                "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
            }
            alt="Profile Pic"
          ></img>
          {this.props.name}
        </Link>
        <div className={styles.postText}>{this.props.content}</div>
      </div>
    );
  }
}