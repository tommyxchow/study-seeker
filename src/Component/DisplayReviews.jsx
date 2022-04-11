import React, { Component } from "react";
import blockIcon from "../assets/block_white_216x216.png";
import downarrow from "../assets/cse370downarrow.png";
import uparrow from "../assets/cse370uparrow.png";
import litStar from "../assets/star.png";
import unblockIcon from "../assets/thumbsup.png";
import starIcon from "../assets/unlitstar.svg";
import styles from "./displayreview.module.css";
import ReviewForm from "./ReviewsForm";

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
          console.log(this.state.posts);
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
          alert("error!");
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

  render() {
    //this.loadPosts();
    const { error, isLoaded, posts } = this.state;
    if (error) {
      return <div> Error: {error.message} </div>;
    } else if (!isLoaded) {
      return (
        <div>
          <ReviewForm
            profileId={this.props.profileId}
            refreshPosts={() => this.loadFriends()}
          />
          <div style={{ padding: "3rem" }}>No reviews yet!</div>
        </div>
      );
    } else {
      return (
        <div>
          <ReviewForm
            profileId={this.props.profileId}
            refreshPosts={() => this.loadFriends()}
          />
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
                        <img
                          src={
                            "https://webdev.cse.buffalo.edu" +
                            post.author.attributes.profilePicture
                          }
                          className={styles.picturecircle}
                          alt="Reviewer Profile Pic"
                        ></img>
                      </div>
                      <div>
                        <p className={styles.textsize}>
                          {post.author.attributes.firstName}{" "}
                          {post.author.attributes.lastName}
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
                        />
                        <p>0</p>
                      </div>
                      <div className={styles.innercontent2}>
                        <p>0</p>
                        <img
                          className={styles.uparrow}
                          src={downarrow}
                          alt="downarrow"
                        />
                      </div>
                    </div>
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
