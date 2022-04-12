import React from "react";
import "../App.css";
import style from "./HomePage.module.css";
import img from '../assets/monalia.png'
import { render } from "react-dom";
// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

const createFetch=(path, method, body)=>{
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


class ClassUserPictures extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          picture:[],
      };
        
    };
    componentDidMount(){
        this.getPictures();
    }
    getPictures(){
        console.log("getting pictures");
        if(this.props.members === undefined || this.props.members.length == 0){
            this.setState({picture: [<div className={style.noMemberPics}>No members yet</div>]});
            return 
        }
        const length = Math.min(this.props.members.length, 3);
        for(var i=0; i < length; i++){
            createFetch('/users/'+this.props.members[i], 'get', null)
            .then((res)=>res.json())
            .then((result)=>{
                this.setState({picture: [...this.state.picture, <img className={style.classStudentPicture} src={"https://webdev.cse.buffalo.edu/"+result.attributes.profilePicture}/>]});
            },(error)=>{
                alert('In class user picture');
            });
        }

        if(length > 2){
            this.setState({picture: [...this.state.picture, <div className={style.moreMemberPics}>+{length-3}</div>]});
        }
    }

    render(){
        return(<>{this.state.picture}</>)
    }
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        all_classes:[],
        all_students:[],
        display_classes:[],
        display_students:[],
        profile_pictures:{}
    };

    this.add_all_users();
    this.add_all_classes();

  }

  add_all_users=()=>{
    createFetch('/users', 'get', null)
    .then((res)=>res.json())
    .then((result)=>{
        result[0] = result[0].filter((user)=>user.attributes && user.attributes.rating);
        result[0].sort((a,b)=>Number(b.attributes.rating)-Number(a.attributes.rating));
        var current_pictures = {};
        for(const student of result[0]){
            current_pictures[student.id] = "https://webdev.cse.buffalo.edu/"+student.attributes.profilePicture;
        }
        var display = [];
        if(result.length === 0){
            display = [];
        }else if(result.length === 1){
            display  = [0];
        }else{
            display  = [0, 1];
        }
        this.setState({display_students: display, profile_pictures: current_pictures, all_students: result[0]});
    }, (error)=>{
        alert('get all users failed');
    })
  }

  add_all_classes=()=>{
    createFetch('/groups', 'get', null)
    .then((res)=>res.json())    
    .then((result)=>{
        result[0] = result[0].filter((class_) => class_.attributes && class_.attributes.classpostcounter !== undefined);
        result[0].sort((a,b)=>Number(b.attributes.classpostcounter)-Number(a.attributes.classpostcounter));
        this.setState({all_classes: result[0]});
        var display = [];
        if(result[0].length === 0){
            display = [];
        }else if(result[0].length === 1){
            display  = [0];
        }else{
            display  = [0, 1];
        }
        this.setState({display_classes: display});
        console.log("allClasses", result[0]);
    }, (error)=>{
        alert('get all classes failed');
    })
  }

  moveLeftStudents=()=>{
      this.setState({display_students: [this.state.display_students[0]-1, this.state.display_students[0]]});
  }
  moveRightStudents=()=>{
    this.setState({display_students: [this.state.display_students[1], this.state.display_students[1]+1]});
  }
  moveLeftClass=()=>{
    this.setState({display_classes: [this.state.display_classes[0]-1, this.state.display_classes[0]]});
  }
  moveRightClass=()=>{
    this.setState({display_classes: [this.state.display_classes[1], this.state.display_classes[1]+1]});
  }

  render() {

    return (
        <div className={style.container}>
            <div className={style.seekerContainer}>
                <div className={style.header}>
                    Top Study Seekers
                </div>
                <div className={style.outterBox}>
                    { this.state.display_students.length >= 2 && this.state.display_students[0] !== 0 &&
                        <div onClick={this.moveLeftStudents} className={style.leftArrowContainer}><div className={style.leftArrow}></div></div>
                    }
                    {this.state.display_students.map((idx) =>(

                    <div className={style.studentCard}>
                        <div className={style.imageContainer}>
                            <img src={"https://webdev.cse.buffalo.edu/"+this.state.all_students[idx].attributes.profilePicture} alt="" className={style.profilePicture}/>
                            <div className={style.nameContainer}>
                                <span className={style.name}>{this.state.all_students[idx].attributes.firstName+" " + this.state.all_students[idx].attributes.lastName[0]+"."}</span>
                                <div className={style.stars}>{[...Array(Number(this.state.all_students[idx].attributes.rating))].map(()=><>&#9733;</>)}({this.state.all_students[idx].attributes.rating})</div>
                            </div>  
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.schoolContainer}>
                                <span className={style.schoolLabel}>SCHOOL</span>
                                <span className={style.schoolName}>University at Buffalo</span>
                            </div>
                            <div className={style.majorContainer}>
                                <span className={style.majorLabel}>MAJOR</span>
                                <span className={style.majorName}>{this.state.all_students[idx].attributes.major}</span>
                            </div>
                            <div className={style.yearContainer}>
                                <span className={style.yearLabel}>YEAR</span>
                                <span className={style.yearName}>{this.state.all_students[idx].attributes.year}</span>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.connect}>Connect</button>
                            <button className={style.viewProfile}>View Profile</button>
                        </div>
                    </div>  

                    ))}
                    { this.state.display_students.length >= 2 && this.state.display_students[1] !== this.state.all_students.length-1 &&
                        <div onClick={this.moveRightStudents} className={style.rightArrowContainer}><div className={style.rightArrow}></div></div>
                    }
                </div>
            </div>

            <div className={style.topClassContainer}>
                <div className={style.header}>
                    Trending Classes
                </div>
                <div className={style.outterBox}>
                    { 
                        this.state.display_classes.length >= 2 && this.state.display_classes[0] !== 0 &&
                        <div onClick={this.moveLeftClass} className={style.leftArrowContainer}><div className={style.leftArrow}></div></div>
                    }
                    {this.state.display_classes.map((idx)=>(
                    <div className={style.classCard}>
                        <div className={style.className}>
                            {this.state.all_classes[idx].name}
                        </div>
                        <div className={style.universityName}>
                            University at Buffalo
                        </div>
                        <div className={style.studentCount}>
                             {this.state.all_classes[idx].attributes.membercount} students
                        </div>
                        <div className={style.studentPictures}>
                            {
                            this.state.all_classes[idx].attributes.classmemberids.length?
                            this.state.all_classes[idx].attributes.classmemberids.slice(0,3).map((class_member)=>(
                            <>
                            {/* this.state.profile_pictures[class_member] */}
                                <img className={style.classStudentPicture} src={img} />
                            </>)):
                            <div className={style.noMemberPics}>No members yet</div>
                            }
                        </div>
                        <button className={style.viewClass}>
                            View Class
                        </button>
                    </div>
                    ))}
                    { this.state.display_classes.length >= 2 && this.state.display_classes[1] !== this.state.all_classes.length-1 &&
                        <div onClick={this.moveRightClass} className={style.rightArrowContainer}><div className={style.rightArrow}></div></div>
                    }
                </div>
            </div>

        </div>
    );
  }
}