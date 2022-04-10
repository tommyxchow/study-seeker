import React from "react";
import "../App.css";
import style from "./HomePage.module.css";
import img from '../assets/monalia.png'
// the login form will display if there is no session token stored.  This will display
// the login form, and call the API to authenticate the user and store the token in
// the session.

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      sessiontoken: "",
    };
  }
  render() {

    return (
        <div className={style.container}>
            <div className={style.seekerContainer}>
                <div className={style.header}>
                    Top Study Seekers
                </div>
                <div className={style.outterBox}>
                    <div className={style.leftArrow}>&#8592;</div>
                    <div className={style.studentCard}>
                        <div className={style.imageContainer}>
                            <img src={img} alt="" className={style.profilePicture}/>
                            <div className={style.nameContainer}>
                                <span className={style.name}>Mona Lisa</span>
                                <div className={style.stars}>&#9733;&#9733;&#9733;&#9733;&#9733;(4)</div>
                            </div>  
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.schoolContainer}>
                                <span className={style.schoolLabel}>SCHOOL</span>
                                <span className={style.schoolName}>University at Buffalo</span>
                            </div>
                            <div className={style.majorContainer}>
                                <span className={style.majorLabel}>MAJOR</span>
                                <span className={style.majorName}>Computer Scinece</span>
                            </div>
                            <div className={style.yearContainer}>
                                <span className={style.yearLabel}>YEAR</span>
                                <span className={style.yearName}>Junior</span>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.connect}>Connect</button>
                            <button className={style.viewProfile}>View Profile</button>
                        </div>
                    </div>

                    <div className={style.studentCard}>
                        <div className={style.imageContainer}>
                            <img src={img} alt="" className={style.profilePicture}/>
                            <div className={style.nameContainer}>
                                <span className={style.name}>Mona Lisa</span>
                                <div className={style.stars}>&#9733;&#9733;&#9733;&#9733;&#9733;(4)</div>
                            </div>  
                        </div>
                        <div className={style.infoContainer}>
                            <div className={style.schoolContainer}>
                                <span className={style.schoolLabel}>SCHOOL</span>
                                <span className={style.schoolName}>University at Buffalo</span>
                            </div>
                            <div className={style.majorContainer}>
                                <span className={style.majorLabel}>MAJOR</span>
                                <span className={style.majorName}>Computer Scinece</span>
                            </div>
                            <div className={style.yearContainer}>
                                <span className={style.yearLabel}>YEAR</span>
                                <span className={style.yearName}>Junior</span>
                            </div>
                        </div>
                        <div className={style.buttonContainer}>
                            <button className={style.connect}>Connect</button>
                            <button className={style.viewProfile}>View Profile</button>
                        </div>
                    </div>
                    <div className={style.rightArrow}>&#8594;</div>
                </div>
            </div>

            <div className={style.seekerContainer}>
                <div className={style.header}>
                    Trending Classes
                </div>
                <div className={style.outterBox}>
                    <div className={style.leftArrow}>&#8592;</div>
                    <div className={style.classCard}>
                        <div className={style.className}>
                            CSE 370
                        </div>
                        <div className={style.universityName}>
                            University at Buffalo
                        </div>
                        <div className={style.studentCount}>
                            60 students
                        </div>
                        <div className={style.studentPicture}>
                            <img src={img} alt="" className={style.classStudentPicture}/>
                            <img src={img} alt="" className={style.classStudentPicture}/>
                            <img src={img} alt="" className={style.classStudentPicture}/>
                        </div>
                        <button className={style.viewProfile}></button>
                    </div>
                    <div className={style.rightArrow}>&#8594;</div>
                </div>
            </div>

        </div>
    );
  }
}
