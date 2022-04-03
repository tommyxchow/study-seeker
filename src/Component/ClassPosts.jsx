import React, { Component } from "react";
import testPic from "../assets/tommy.png";
import styles from "./post.module.css";

export default class ClassPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_PATH + "/posts", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        this.setState({ posts: result[0] });
      });
  }

  render() {
    console.log(this.state.posts);
    return (
      <>
        <CreatePost />
        {this.state.posts.map((postInfo) => (
          <Post
            name={`${postInfo.author.attributes.firstName} ${postInfo.author.attributes.lastName}`}
            profilePicture={postInfo.author.attributes.profilePicture}
            content={postInfo.content}
          />
        ))}
      </>
    );
  }
}

class CreatePost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      content: "",
    };
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
          <img
            className={styles.profilePicture}
            src={testPic}
            alt="Profile Pic"
          ></img>
          Tommy Chow
        </div>
        <textarea
          className={styles.postInput}
          placeholder="Create a post"
        ></textarea>
        <button className={styles.postButton}>Post</button>
      </div>
    );
  }
}

class Post extends Component {
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.profileContainer}>
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
        </div>
        <div className={styles.postText}>{this.props.content}</div>
      </div>
    );
  }
}
