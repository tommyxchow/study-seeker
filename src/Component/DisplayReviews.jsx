import React, { Component } from "react";
import { Link } from "react-router-dom";
import blockIcon from "../assets/block_white_216x216.png";
import downarrow from "../assets/cse370downarrow.png";
import uparrow from "../assets/cse370uparrow.png";
import litStar from "../assets/star.png";
import unblockIcon from "../assets/thumbsup.png";
import starIcon from "../assets/unlitstar.svg";
import styles from "./displayreview.module.css";
import ReviewForm from "./ReviewsForm";
import deleteIcon from "../assets/delete.png";

export default class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      profilePicture:
        "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      name: "",
      userid: sessionStorage.getItem("user"),
      connections: [],
      star: [],
    };
  }

  componentDidMount() {
    console.log(this.props.profileId);
    this.loadFriends();
  }

  loadFriends() {
    fetch(
      process.env.REACT_APP_API_PATH +
        "/posts?recipientUserID=" +
        this.props.profileId,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then(
        (result) => {
          if (result[0][0]) {
            this.setState({
              isLoaded: true,
              posts: result[0],
            });
          }
          console.log("all posts", result);
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
    console.log("Shows post");
    console.log(this.state.posts);
  }

  getStar(rating) {
    this.setState({
      star: [],
    });
    if (rating === 1) {
      this.setState({
        star: [litStar, starIcon, starIcon, starIcon, starIcon],
      });
    } else if (rating === 2) {
      this.setState({ star: [litStar, litStar, starIcon, starIcon, starIcon] });
    } else if (rating === 3) {
      this.setState({ star: [litStar, litStar, litStar, starIcon, starIcon] });
    } else if (rating === 4) {
      this.setState({ star: [litStar, litStar, litStar, litStar, starIcon] });
    } else if (rating === 5) {
      this.setState({ star: [litStar, litStar, litStar, litStar, litStar] });
    } else {
      this.setState({
        star: [starIcon, starIcon, starIcon, starIcon, starIcon],
      });
    }
  }

  updateConnection(id, status) {
    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH + "/connections/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        attributes: { status: status, type: "friend" },
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            responseMessage: result.Status,
          });
          this.loadFriends();
        },
        (error) => {
          this.props.toggleModal("error!");
        }
      );
  }

  conditionalAction(status, id) {
    if (status === "active") {
      return (
        <img
          src={blockIcon}
          className="sidenav-icon deleteIcon"
          alt="Block User"
          title="Block User"
          onClick={(e) => this.updateConnection(id, "blocked")}
        />
      );
    } else {
      return (
        <img
          src={unblockIcon}
          className="sidenav-icon deleteIcon"
          alt="Unblock User"
          title="Unblock User"
          onClick={(e) => this.updateConnection(id, "active")}
        />
      );
    }
  }

  upvote(post) {
    console.log(post);
    if (!post.attributes.upvoted.includes(sessionStorage.getItem("user"))) {
      fetch(process.env.REACT_APP_API_PATH + "/posts/" + post.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          attributes: {
            ...post.attributes,
            downvoted: post.attributes.downvoted.filter(
              (item) => item !== sessionStorage.getItem("user")
            ),
            upvoted: [
              ...post.attributes.upvoted,
              sessionStorage.getItem("user"),
            ],
          },
        }),
      }).then(() => this.loadFriends());
    }
  }

  downvote(post) {
    if (!post.attributes.downvoted.includes(sessionStorage.getItem("user"))) {
      fetch(process.env.REACT_APP_API_PATH + "/posts/" + post.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({
          attributes: {
            ...post.attributes,
            upvoted: post.attributes.upvoted.filter(
              (item) => item !== sessionStorage.getItem("user")
            ),
            downvoted: [
              ...post.attributes.downvoted,
              sessionStorage.getItem("user"),
            ],
          },
        }),
      }).then(() => this.loadFriends());
    }
  }

  handleDeletePost(post) {
    
      fetch(process.env.REACT_APP_API_PATH + "/posts/" + post.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }).then(() => this.loadFriends()).then(()=> window.location.reload());
    
  }

  render() {
    //this.loadPosts();
    const { error, isLoaded, posts } = this.state;
    console.log(posts);
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return (
        <div>
          <p className={styles.reviewtextalign}>Reviews</p>
          {this.props.showForm && (
            <ReviewForm
              profileId={this.props.profileId}
              refreshPosts={() => this.loadFriends()}
            />
          )}
          <div style={{ padding: "3rem" }}>No reviews yet!</div>
        </div>
      );
    } else {
      return (
        <div>
          <p className={styles.reviewtextalign}>Reviews</p>
          {this.props.showForm && (
            <ReviewForm
              profileId={this.props.profileId}
              refreshPosts={() => this.loadFriends()}
            />
          )}
          <ul>
            {posts.map((post) => (
              <div key={post.id} className={styles.userlist}>
                {"review" in post.attributes && post.attributes.review && (
                  <>
                    <div className={styles.maincontainer}>
                      <div>
                        <div className={styles.stars}>
                          {post.attributes.rating === 0 && (
                            <>
                              <img
                                className={styles.star1}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={starIcon}
                                alt="star"
                              />
                            </>
                          )}
                          {post.attributes.rating === 1 && (
                            <>
                              <img
                                className={styles.star1}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={starIcon}
                                alt="star"
                              />
                            </>
                          )}
                          {post.attributes.rating === 2 && (
                            <>
                              <img
                                className={styles.star1}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={starIcon}
                                alt="star"
                              />
                            </>
                          )}
                          {post.attributes.rating === 3 && (
                            <>
                              <img
                                className={styles.star1}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={starIcon}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={starIcon}
                                alt="star"
                              />
                            </>
                          )}
                          {post.attributes.rating === 4 && (
                            <>
                              <img
                                className={styles.star1}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={starIcon}
                                alt="star"
                              />
                            </>
                          )}
                          {post.attributes.rating === 5 && (
                            <>
                              <img
                                className={styles.star1}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star2}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star3}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star4}
                                src={litStar}
                                alt="star"
                              />
                              <img
                                className={styles.star5}
                                src={litStar}
                                alt="star"
                              />
                            </>
                          )}
                        </div>
                      </div>
                      <div>
                        <Link
                          to={
                            post.author?.id != null &&
                            "/profile/" + post.author.id
                          }
                          state={{ timestamp: new Date().toString() }}
                        >
                          <img
                            src={
                              "https://webdev.cse.buffalo.edu" +
                              (post.author !== null
                                ? post.author.attributes.profilePicture
                                : "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png")
                            }
                            className={styles.picturecircle}
                            alt="Reviewer Profile Avatar"
                          ></img>
                        </Link>
                      </div>
                      <div>
                        <p className={styles.textsize}>
                          {post.author
                            ? post.author.attributes.firstName
                            : "DELETED"}{" "}
                          {post.author ? post.author.attributes.lastName : ""}
                        </p>
                        <p className={styles.reviewsize}>
                          <i>{'"' + post.content + '"'}</i>
                        </p>
                      </div>
                    </div>
                    <div className={styles.innercontent}>
                      <div className={styles.innercontent2}>
                        <img
                          className={styles.uparrow}
                          src={uparrow}
                          alt="uparrow"
                          onClick={() => this.upvote(post)}
                        />
                        <p>{post.attributes.upvoted.length}</p>
                      </div>
                      <div className={styles.innercontent2}>
                        <p>{post.attributes.downvoted.length}</p>
                        <img
                          className={styles.uparrow}
                          src={downarrow}
                          alt="downarrow"
                          onClick={() => this.downvote(post)}
                        />
                      </div>
                    </div>
                    {post.authorID === parseInt(sessionStorage.getItem("user")) && (
                      <div className={styles.alignDelete}>
                        <img 
                          className={styles.deleteIcon}
                          src={deleteIcon} 
                          alt="delete posts"
                          onClick={() => this.handleDeletePost(post)}
                          />
                    </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      );
    }
  }
}
