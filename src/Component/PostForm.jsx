import React from "react";
import "../App.css";
import PostingList from "./PostingList.jsx";
import style from "./postform.module.css";
import yearLogo from "../assets/goal.png";


// The post form component holds both a form for posting, and also the list of current posts in your feed.  This is primarily to 
// make updating the list simpler.  If the post form was contained entirely in a separate component, you would have to do a lot of calling around
// in order to have the list update.  Communication between components in react is ... fun. 
export default class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      about:false,
      students:false,
      Alumni:false,
      Fall_2021:false,
      Spring_2021:false,
    };
    this.postListing = React.createRef();
  }

  // the handler for submitting a new post.  This will call the API to create a new post.
  // while the test harness does not use images, if you had an image URL you would pass it
  // in the attributes field.  Posts also does double duty as a message; if you want in-app messaging
  // you would add a recipientUserID for a direct message, or a recipientGroupID for a group chat message.
  // if the post is a comment on another post (or comment) you would pass in a parentID of the thing
  // being commented on.  Attributes is an open ended name/value segment that you can use to add 
  // whatever custom tuning you need, like category, type, rating, etc.
  submitHandler = event => {

    //keep the form from actually submitting via HTML - we want to handle it in react
    event.preventDefault();

    //make the api call to post
    fetch(process.env.REACT_APP_API_PATH+"/posts", {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        authorID: sessionStorage.getItem("user"),
        content: this.state.post_text
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            postmessage: result.Status
          });
          alert("Post was successful");
          // once a post is complete, reload the feed
          this.postListing.current.loadPosts();
        },
        error => {
          alert("error!");
        }
      );
  };

  // this method will keep the current post up to date as you type it,
  // so that the submit handler can read the information from the state.
  myChangeHandler = event => {
    this.setState({
      post_text: event.target.value
    });
  };

  // the login check here is redundant, since the top level routing also is checking,
  // but this could catch tokens that were removed while still on this page, perhaps due to a timeout?
  render() {
    if (!sessionStorage.getItem("token")) {
      console.log("NO TOKEN");
      return ("Please log in to make and view posts");

    }else{
      console.log("Rendering postings ",this.props.refresh);
    }
    return (
      <div className={style.container}>
  
        <div className={style.classHeader}>
          <div className={style.classNameLine}>
            <div className={style.className}>
              CSE 370
            </div>
            <input className={style.classJoin} type='button' value='Join'></input>
          </div>
          <div className={style.classSmallDiscription}>Applied Human Computer Interaction and Interface Design</div>
        </div>
        <div className={style.aboutHeader}>
          <div className={style.aboutLine}>
            <div className={style.about}>About</div>
            <div className={style.arrow} onClick={()=>this.setState({about:!this.state.about})}>
              {this.state.about?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>
          {this.state.about && <>
            <div className={style.instructorLine}>
              <div className={style.instructor}>Instructor:</div>
              <div className={style.instructorName}>Alan Hunt</div>
            </div>
            <div className={style.classDiscription}>
              This is an undergraduate-level course intended for junior and senior-level students that will teach them introductory concepts of human computer interaction. The main topics covered in this course will be interface and experience design, interface development in a variety of environments, and evaluation of design via multiple methods including usability studies.
            </div>
          </>
          }
        </div>

        <div className={style.studentHeader}>
          <div className={style.studentLine}>
            <div className={style.student}>Students (Spring 2022)</div>
            <div className={style.arrow} onClick={()=>this.setState({students:!this.state.students})}>
              {this.state.students?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>
          
            {this.state.students && <><div className={style.allStudents}>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>

            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div>
            <div className={style.studentCard}>
              <img className={style.studentImage} src={yearLogo}></img>
              <div className={style.studentName}>
                Swastik Naik
              </div>
            </div> 
          </div>
          </>}
        </div>

        <div className={style.alumniHeader}>
          <div className={style.alumniLine}>
            <div className={style.alumni}>Alumni</div>
            <div className={style.arrow} onClick={()=>this.setState({Alumni:!this.state.Alumni})}>
              {this.state.Alumni?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>
          {this.state.Alumni && <>
          <div className={style.allClasses}>
            <div className={style.class}>
              <div className={style.alumniClassLine}>
                <div className={style.alumniClassName}>Fall 2021</div>
                <div className={style.alumniClassArrow} onClick={()=>this.setState({Fall_2021:!this.state.Fall_2021})}>
                  {this.state.Fall_2021?<>&#x2191;</>:<>&#x2193;</>}
                </div>
              </div>
              {this.state.Fall_2021 &&
              <>
              <div className={style.alumniClassStudent}>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
              </div></>}
            </div>

            <div className={style.class}>
              <div className={style.alumniClassLine}>
                <div className={style.alumniClassName}>Spring 2021</div>
                <div className={style.alumniClassArrow} onClick={()=>this.setState({Spring_2021:!this.state.Spring_2021})}>
                  {this.state.Spring_2021?<>&#x2191;</>:<>&#x2193;</>}
                </div>
              </div>
              {this.state.Spring_2021 &&
              <>
              <div className={style.alumniClassStudent}>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo}></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
              </div></>}
            </div>
            
          </div>
          </>}
        </div>

      </div>
    );
  }
}
