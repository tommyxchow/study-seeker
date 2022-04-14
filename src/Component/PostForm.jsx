import React from "react";
import "../App.css";
import PostingList from "./PostingList.jsx";
import style from "./postform.module.css";
import yearLogo from "../assets/goal.png";
import ClassPosts from "./ClassPosts";
import Groups from "./ClassGroups";


// The post form component holds both a form for posting, and also the list of current posts in your feed.  This is primarily to 
// make updating the list simpler.  If the post form was contained entirely in a separate component, you would have to do a lot of calling around
// in order to have the list update.  Communication between components in react is ... fun. 
export default class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      instructor: "",
      about: "",
      about_bool:false,
      students:false,
      Alumni:false,
      Fall_2021:false,
      Spring_2021:false,
      post: false,
      join: false,
      groups: false,
      current_members: []
    };
    this.postListing = React.createRef();
  }

  createFetch(path, method, body) {
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
        authorID: this.props.userid,
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

  addUser =(id)=>{
    this.createFetch('/users/'+id, 'get', null)
    .then((res) => res.json())
    .then(result_user=>{
      this.setState({current_members:[[result_user.id, 
                                      result_user.attributes.firstName, 
                                      result_user.attributes.lastName,
                                      result_user.attributes.profilePicture]
                                      ,...this.state.current_members
                                      ]});
      if(this.props.userid === result_user.id){
        this.setState({join:true});
      }
    }, error=>{alert("get user error")});
  }

  handleJoin = event =>{
    const path = "/groups/"+this.props.classId;
    const method = "PATCH";
      this.createFetch(path, "get", null)
      .then(res => res.json())
      .then(
        result => {
          result.attributes.classmemberids.push(this.props.userid);
          delete result.id;
          this.createFetch(path, method, result)
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                responseMessage: result.Status,
                join: true,
              });
              this.addUser(this.props.userid);
            },
            (error) => {
              alert(error);
            }
          );
        },
        error => {
          alert("error in get");
        }
      );
  }

  handleLeave = event =>{
    const path = "/groups/"+this.props.classId;
    const method = "PATCH";
      this.createFetch(path, "get", null)
      .then(res => res.json())
      .then(
        result => {
          result.attributes.classmemberids = result.attributes.classmemberids.filter((id)=>{return id!=this.props.userid});
          delete result.id;
          this.createFetch(path, method, result)
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({
                responseMessage: result.Status,
                join: false,
                current_members: this.state.current_members.filter((item)=>item[0]!=this.props.userid)
              });
            },
            (error) => {
              alert(error);
            }
          );
        },
        error => {
          alert("error in remove get");
        }
      );
  }

  componentDidMount(){
    this.createFetch('/groups/'+this.props.classId, 'get', null)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({"name":result.name, "instructor": result.attributes.instructor,
                      "about": result.attributes.about})
        const members = result.attributes.classmemberids;
        members.map(this.addUser);
      },
      error =>{alert("error in get (mount)")}
    );
  }

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
              {this.state.name}
            </div>{!this.state.join?
            <input className={style.classJoin} type='button' value='Join' onClick={this.handleJoin}></input>
            :
            <input className={style.classLeave} type='button' value='Leave' onClick={this.handleLeave}></input>
            }
          </div>
          <div className={style.classSmallDiscription}>Applied Human Computer Interaction and Interface Design</div>
        </div>
        <div className={style.aboutHeader}>
          <div className={style.aboutLine}>
            <div className={style.about}>About</div>
            <div className={style.arrow} onClick={()=>this.setState({about_bool:!this.state.about_bool})}>
              {this.state.about_bool?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>
          {this.state.about_bool && <>
            <div className={style.instructorLine}>
              <div className={style.instructor}>Instructor:</div>
              <div className={style.instructorName}>{this.state.instructor}</div>
            </div>
            <div className={style.classDiscription}>
              {this.state.about}
            </div>
          </>
          }
        </div>

        <div className={style.studentHeader}>
          <div className={style.studentLine}>
            <div className={style.student}>Students</div>
            <div className={style.arrow} onClick={()=>this.setState({students:!this.state.students})}>
              {this.state.students?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>
            {this.state.students && 
            <div className={style.allStudents}>{
            this.state.current_members.map((member)=>(
            <>
              <div className={style.studentCard}>
                <img className={style.studentImage} src={"https://webdev.cse.buffalo.edu/"+member[3]} alt="student profile"></img>
                <div className={style.studentName}>
                  {member[1]+" "+member[2][0]+"."}
                </div>
              </div>
            </>
          ))}
          </div>}
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
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
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
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
                <div className={style.studentCard}>
                  <img className={style.studentImage} src={yearLogo} alt="goal pic"></img>
                  <div className={style.studentName}>
                    Swastik Naik
                  </div>
                </div>
              </div></>}
            </div>
            
          </div>
          </>}
        </div>
        <div className={style.postsHeader}>
          <div className={style.postsLine}>
            <div className={style.posts}>Posts</div>
            <div className={style.arrow} onClick={()=>this.setState({post:!this.state.post})}>
              {this.state.post?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>{this.state.post && 
            <ClassPosts classId={this.props.classId} userid={this.props.userid}/>
          }
        </div>

        <div className={style.groupsHeader}>
          <div className={style.groupsLine}>
            <div className={style.groups}>Groups</div>
          <div className={style.arrow} onClick={()=>this.setState({groups:!this.state.groups})}>
              {this.state.groups?<>&#x2191;</>:<>&#x2193;</>}
            </div>
          </div>
          <hr className={style.horizontalLine}/>{this.state.groups &&
            <Groups classId= {this.props.classId} userid={this.props.userid}/>
            }
        </div>
      </div>
    );
  }
}
