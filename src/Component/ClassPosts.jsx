import React, { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./post.module.css";

const createFetch = (path, method, body) => {
  const supplyPath = process.env.REACT_APP_API_PATH + path;
  const supplyMethod = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  if (body != null) {
    supplyMethod.body = JSON.stringify(body);
  }
  return fetch(supplyPath, supplyMethod);
};

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
        result[0].forEach((post) => {
          console.log(
            (post.author !== null &&
            post.author.attributes.block_list !== undefined
              ? post.author.attributes.block_list
              : []
            ).includes(sessionStorage.getItem("user"))
          );
        });
        result[0] = result[0].filter(
          (post) =>
            !(
              post.author !== null &&
              post.author.attributes.block_list !== undefined
                ? post.author.attributes.block_list
                : []
            ).includes(sessionStorage.getItem("user"))
        );
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
          profilePicture: result.attributes.profilePicture
            ? result.attributes.profilePicture
            : "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
          name: result.attributes.firstName + " " + result.attributes.lastName,
        });
      });
  }

  submitHandler = (event) => {
    event.preventDefault();

    if (event.target.post.value === "") {
      this.props.toggleModal("Please enter text into the box before posting.");
      return;
    }

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
      .then((result) => {
        this.setState({ posts: [result, ...this.state.posts] });
        createFetch("/groups/" + this.props.classId, "get", null)
          .then((res) => res.json())
          .then(
            (result) => {
              delete result.id;
              result.attributes.classpostcounter = this.state.posts.length;
              console.log("class to patch", result);
              createFetch("/groups/" + this.props.classId, "PATCH", result)
                .then((res) => res.json())
                .then(
                  (result) => {},
                  (error) => {
                    this.props.toggleModal(error);
                  }
                );
            },
            (error) => {
              this.props.toggleModal("error in post counter");
            }
          );
      });

    event.target.post.value = "";
  };

  render() {
    return (
      <>
        <div className={styles.containerRow}>
          <div className={styles.profileContainer}>
            <img
              className={styles.profilePicture}
              src={"https://webdev.cse.buffalo.edu" + this.state.profilePicture}
              alt="Profile Avatar"
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
            postId={postInfo.id}
            authorId={postInfo.authorID}
            name={`${
              postInfo.author ? postInfo.author.attributes.firstName : "DELETED"
            }`}
            profilePicture={
              postInfo.author ? postInfo.author.attributes.profilePicture : null
            }
            content={postInfo.content}
            replies={postInfo.reactions}
          />
        ))}
      </>
    );
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReply: false,
    };
  }

  render() {
    return (
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <Link
            to={"/profile/" + this.props.authorId}
            className={styles.profileContainer}
          >
            <img
              className={styles.profilePicture}
              src={
                "https://webdev.cse.buffalo.edu" +
                (this.props.profilePicture ??
                  "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
              }
              alt="Profile Avatar"
            ></img>
            <div className={styles.profileName}>{this.props.name}</div>
          </Link>
          <div className={styles.postText}>{this.props.content}</div>
          <button
            onClick={() => this.setState({ showReply: !this.state.showReply })}
          >
            {this.state.showReply ? "Cancel" : "Reply"}
          </button>
        </div>
        {this.state.showReply && (
          <div className={styles.replies}>
            {this.props.replies.map((replyInfo) => (
              <h1>{replyInfo.name}</h1>
            ))}
            <form id="postForm" className={styles.replyForm}>
              <textarea
                name="post"
                form="postForm"
                className={styles.postInput}
                placeholder="Reply"
                rows={5}
                cols={70}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      replierInfo: null,
    };
  }

  componentDidMount() {
    fetch(process.env.REACT_APP_API_PATH + "/users/" + this.props.replierId, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => this.setState({ replierInfo: result }));
  }

  render() {
    return (
      <div className={styles.containerCol}>
        <div className={styles.containerRow}>
          <Link
            to={"/profile/" + this.props.authorId}
            className={styles.profileContainer}
          >
            <img
              className={styles.profilePicture}
              src={
                "https://webdev.cse.buffalo.edu" +
                (this.props.profilePicture ??
                  "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
              }
              alt="Profile Avatar"
            ></img>
            <div className={styles.profileName}>{this.props.name}</div>
          </Link>
          <div className={styles.postText}>{this.props.content}</div>
          <button
            onClick={() => this.setState({ showReply: !this.state.showReply })}
          >
            {this.state.showReply ? "Cancel" : "Reply"}
          </button>
        </div>
        {this.state.showReply && (
          <div className={styles.replies}>
            {this.props.replies.map((replyInfo) => (
              <h1>{replyInfo.name}</h1>
            ))}
            <form id="postForm" className={styles.replyForm}>
              <textarea
                name="post"
                form="postForm"
                className={styles.postInput}
                placeholder="Reply"
                rows={5}
                cols={70}
              />
            </form>
          </div>
        )}
      </div>
    );
  }
}
