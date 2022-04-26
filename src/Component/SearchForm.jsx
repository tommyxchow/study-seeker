import { element } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import filterImg from "../assets/filter.png";
//import starIcon from "../assets/unlitstar.svg";
import starIconLit from "../assets/star-filled.png"
import starIcon from "../assets/star-empty.png"
import styles from "./search.module.css";


export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendname: "",
      friendid: "",
      responseMessage: "",
      users: [],
      allclasses: [],
      people: [],
      userInput: "",
      nextUserInput: "",
      userFound: true,
      filter: false,
      classFound: true,
      classes:[],
      groupFound: true,
      groups: [],
      getpic:""
    };
    this.fieldChangeHandler.bind(this);
  }

  fieldChangeHandler(field, e) {
    console.log("field change");
    this.setState({
      [field]: e.target.value
    });
  }

  selectAutocomplete(friendID) {
      this.setState({
        friendid:friendID
      })
      console.log("Set Friend ID to "+friendID)
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


  componentDidMount() {
    //make the api call to the user API to get the user with all of their attached preferences
    fetch(process.env.REACT_APP_API_PATH+"/users/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      }

    })
      .then(res => res.json())
      .then(
        result => {
          if (result) {
            let names = [];

            result[0].forEach(element => {if ("attributes" in element && element.attributes != null )
                                            {if ("firstName" in element.attributes)
                                            {if (element.attributes.firstName){names.push(element)}}}});

            this.setState({
              users: names,
              responseMessage: result.Status
            });
            console.log(names);
          }
        },
        error => {
          alert("error!");
        }
      );

      this.createFetch("/groups","GET",null)
      .then((res) => res.json())
          .then(
            (result) => {
              let class_search = [];
  
              result[0].forEach(element => {if ("attributes" in element && element.attributes != null )
                                              {if ( "isClass" in element.attributes && element.attributes.isClass && "name" in element && "classmemberids" in element.attributes)
                                              { class_search.push(element)}}});
              this.setState({
                  allclasses:class_search
                });
              console.log(class_search);
            },
            (error) => {
              alert(error);
            }
          );


  }

  submitHandler = event => {
    //keep the form from actually submitting
    event.preventDefault();

    console.log("friend is ");
    console.log(this.state.friendid);


    //make the api call to the user controller
    fetch(process.env.REACT_APP_API_PATH+"/connections", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+sessionStorage.getItem("token")
      },
      body: JSON.stringify({
        toUserID: this.state.friendid,
        fromUserID: sessionStorage.getItem("user"),
        attributes:{type:"friend", status:"active"}
      })
    })
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            responseMessage: result.Status
          });
        },
        error => {
          alert("error!");
        }
      );
  };

  
  submitHandler2 = event => {
    //keep the form from actually submitting
    event.preventDefault();

    console.log("friend is ");
    console.log(this.state.userInput);


    //make the api call to the user controller
    this.createFetch("/users","GET",null)
    .then((res) => res.json())
        .then(
          (result) => {
            let people_search = [];

            result[0].forEach(element => {if ("attributes" in element && element.attributes != null )
                                            {if ("firstName" in element.attributes)
                                            { 
                                              if ( (element.attributes.firstName.toLowerCase().indexOf(this.state.userInput.toLowerCase())) > -1 
                                                && sessionStorage.getItem("user") != element.id)
                                                {people_search.push(element)}}}});
            if(people_search.length!=0){

              this.setState({
                userFound: true,
                people:people_search
              });
            }
            else{
              this.setState({
                userFound:false,
                nextUserInput:this.state.userInput
              });
            }
            console.log(people_search);
          },
          (error) => {
            alert(error);
          }
        );

        this.createFetch("/groups","GET",null)
        .then((res) => res.json())
            .then(
              (result) => {
                let class_search = [];
    
                result[0].forEach(element => {if ("attributes" in element && element.attributes != null )
                                                {if ( "isClass" in element.attributes && element.attributes.isClass && "name" in element && "classmemberids" in element.attributes)
                                                { 
                                                  if ( (element.name.toLowerCase().indexOf(this.state.userInput.toLowerCase())) > -1)
                                                    {class_search.push(element)}}}});
                if(class_search.length!=0){
    
                  this.setState({
                    classFound: true,
                    classes:class_search
                  });
                }
                else{
                  this.setState({
                    classFound:false,
                    nextUserInput:this.state.userInput
                  });
                }
                console.log(class_search);
              },
              (error) => {
                alert(error);
              }
            );

            this.createFetch("/groups","GET",null)
        .then((res) => res.json())
            .then(
              (result) => {
                let group_search = [];
    
                result[0].forEach(element => {if ("attributes" in element && element.attributes != null )
                                                {if ( "isClass" in element.attributes && element.attributes.isClass==false && "name" in element)
                                                { 
                                                  if ( (element.name.toLowerCase().indexOf(this.state.userInput.toLowerCase())) > -1)
                                                    {group_search.push(element)}}}});
                if(group_search.length!=0){
    
                  this.setState({
                    groupFound: true,
                    groups:group_search
                  });
                }
                else{
                  this.setState({
                    groupFound: false,
                    nextUserInput:this.state.userInput
                  });
                }
                console.log(group_search);
              },
              (error) => {
                alert(error);
              }
            );
    
    
  };

  filterHandler = event=>{
    if (this.state.filter){
      this.setState({
        filter:false
      });
      
      
    }
    else{
      this.setState({
        filter:true
      });
      
    }
  }

  gotoProfile = dict =>{
    return "/profile/"+dict.id
  }

  gotoClass = dict =>{
    return "/class/"+dict.id
  }

  gotoGroup = dict =>{
    return "/groups/"+dict.id
  }

  getProfilePic = dict =>{
    if("profilePicture" in dict.attributes && dict.attributes.profilePicture!=""){
      return "https://webdev.cse.buffalo.edu"+dict.attributes.profilePicture
    }
    else{
      return "https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
    }
  }

  getProfilePic2 = ids =>{
    let profilepic="https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
    this.state.users.map((dict)=>{
      if (dict.id==ids){
        if ("profilePicture" in dict.attributes){
          profilepic="https://webdev.cse.buffalo.edu"+dict.attributes.profilePicture
        }
        else{
          profilepic="https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
        }
      }
    });
    return profilepic
  }

  getClassName = dict =>{
    let name_class="s"
    this.state.allclasses.map((element)=>{
      console.log("hiiiiii")
      console.log(element.id)
      console.log(dict.attributes.id)
      if(dict.attributes.id == element.id){
        name_class=element.name
        console.log("class")
        console.log(name_class)
      }

    });
    return (name_class)
  }


  

  getMajor = dict =>{
    if("major" in dict.attributes && dict.attributes.major!=""){
      return dict.attributes.major
    }
    else{
      return (<i>N/A</i>)
    }
  }

  getYear = dict =>{
    if("year" in dict.attributes && dict.attributes.year!=""){
      return dict.attributes.year
    }
    else{
      return (<i>N/A</i>)
    }
  }

  onChange = e => {
    const userInput = e.currentTarget.value;
    this.setState({
      userInput: e.currentTarget.value

    });
    
  };



  render() {
    const {
      onChange,
      state: { userInput}
    } = this;

    return (
      <form onSubmit={this.submitHandler2} className={styles.profileform}>
        <div className={styles.searchbar}>
          <div className={styles.fixseekers}>
            <div className={styles.sameline}>
            <div className={styles.mobilefilter}>
            <div className={styles.inputbar}>
              <label>
                <input
                  className={styles.inputs}
                  type="text"
                  onChange={onChange}
                  value={userInput}
                />
                <br/>
              </label>
            </div>

            <div className={styles.buttons2}>
                <div className={styles.filteralign}>
                  <button className={styles.searchbutton} type="submit" value="submit">Search</button>
                </div>
                <div className={styles.filteralign}>
                  <button className={styles.filterbutton} type="button" value="button" onClick={() => this.filterHandler() }>
                    <div className={styles.middle}>Filter
                      <img className={styles.filterimg} src={filterImg}></img>
                    </div>
                  </button>
                </div>
              </div>
            {/**-------------filter or mobile ---------------------- */}
            <div id="filtercontainer2" className={styles.filtercontainer2}>
                {this.state.filter && (
                
                  <div className={styles.filtercontent2}>
                    <div className={styles.outterfilter1}>
                    <div>
                      <p className={styles.size1}>Year</p>
                    </div>
                    <div className={styles.innerfilter1}>
                      <div className={styles.size2}>
                        <div className={styles.checklistcontainer}>
                          <div className={styles.checklist2}></div>
                          <div ><p>Freshman</p></div>
                        </div>
                      
                        <div className={styles.checklistcontainer}>
                          <div className={styles.checklist1}></div>
                          <div><p>Sophomore</p></div>
                        </div>

                        <div className={styles.checklistcontainer}>
                          <div className={styles.checklist2}></div>
                          <div><p>Junior</p></div>
                        </div>
                      </div>
                      <div className={styles.size2}>
                        <div className={styles.checklistcontainer}>
                          <div className={styles.checklist1}></div>
                          <div><p>Senior</p></div>
                        </div>

                        <div className={styles.checklistcontainer}>
                          <div className={styles.checklist1}></div>
                          <div><p>Grad/Phd</p></div>
                        </div>
                      </div>
                      </div>
                      </div>
                      <div className={styles.outterfilter2}>
                        <div>
                    <p className={styles.size1}>Stars</p>
                    <div className={styles.stars}>
                                  <img className={styles.star1}  src={starIcon} alt="star"/>
                                  <img className={styles.star2}  src={starIcon} alt="star"/>
                                  <img className={styles.star3}  src={starIcon} alt="star"/>
                                  <img className={styles.star4}  src={starIcon} alt="star"/>
                                  <img className={styles.star5}  src={starIcon} alt="star"/>
                    </div>
                    </div>
                    <div>
                    <p className={styles.size1}>Major</p>
                    <input type="text" className={styles.majorinput} placeholder="e.g. Biology"/>
                    </div>
                    </div>
                  </div>
              
                )}
              </div>
              {/**----------------------------------- */}
              </div>

            <div className={styles.fixlayout}>
              <div className={styles.buttons}>
                <div className={styles.filteralign}>
                  <button className={styles.searchbutton} type="submit" value="submit">Search</button>
                </div>
                <div className={styles.filteralign}>
                  <button className={styles.filterbutton} type="button" value="button" onClick={() => this.filterHandler() }>
                    <div className={styles.middle}>Filter
                      <img className={styles.filterimg} src={filterImg}></img>
                    </div>
                  </button>
                </div>
              </div>
              {/**-------------filter or desktop ---------------------- */}
              <div id="filtercontainer" className={styles.filtercontainer}>
                {this.state.filter && (
                
                  <div className={styles.filtercontent}>
                    <p className={styles.size1}>Year</p><br/>
                    <div className={styles.size2}>
                      <div className={styles.checklistcontainer}>
                        <div className={styles.checklist2}></div>
                        <div ><p>Freshman</p></div>
                      </div>
                      <div className={styles.checklistcontainer}>
                        <div className={styles.checklist1}></div>
                        <div><p>Sophomore</p></div>
                      </div>
                      <div className={styles.checklistcontainer}>
                        <div className={styles.checklist2}></div>
                        <div><p>Junior</p></div>
                      </div>
                      <div className={styles.checklistcontainer}>
                        <div className={styles.checklist1}></div>
                        <div><p>Senior</p></div>
                      </div>
                      <div className={styles.checklistcontainer}>
                        <div className={styles.checklist1}></div>
                        <div><p>Grad/Phd</p></div>
                      </div>
                    </div>
                    <p className={styles.size1}>Stars</p>
                    <div className={styles.stars}>
                                  <img className={styles.star1}  src={starIcon} alt="star"/>
                                  <img className={styles.star2}  src={starIcon} alt="star"/>
                                  <img className={styles.star3}  src={starIcon} alt="star"/>
                                  <img className={styles.star4}  src={starIcon} alt="star"/>
                                  <img className={styles.star5}  src={starIcon} alt="star"/>
                    </div><br/>
                    <p className={styles.size1}>Major</p>
                    <input type="text" className={styles.majorinput} placeholder="e.g. Biology"/>
                  </div>
              
                )}
              </div>
              {/**----------------------------------- */}
            </div>
            </div>
            
            <p className={styles.textsize}> Study Seekers</p>
            <div id="filter" className={styles.maincontainer}>
              {this.state.userFound && (
                this.state.people.map((dict)=> {
                  return (
              
                    <div className={styles.background}>
                      <div key={dict} className={styles.content}>
                        <div className={styles.outtercontent1}>
                          <div>
                            <img className={styles.picturecircle} src={this.getProfilePic(dict)} alt={dict.attributes.firstName}/>
                          </div>
                          <div className={styles.innercontent1}>
                            <p className={styles.size3}>{ dict.attributes.firstName + " " +  dict.attributes.lastName}</p>
                            {"rating" in dict.attributes && dict.attributes.rating==0 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIcon} alt="star"/>
                                <img className={styles.star2}  src={starIcon} alt="star"/>
                                <img className={styles.star3}  src={starIcon} alt="star"/>
                                <img className={styles.star4}  src={starIcon} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {"rating" in dict.attributes && dict.attributes.rating==1 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIconLit} alt="star"/>
                                <img className={styles.star2}  src={starIcon} alt="star"/>
                                <img className={styles.star3}  src={starIcon} alt="star"/>
                                <img className={styles.star4}  src={starIcon} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {"rating" in dict.attributes && dict.attributes.rating==2 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIconLit} alt="star"/>
                                <img className={styles.star2}  src={starIconLit} alt="star"/>
                                <img className={styles.star3}  src={starIcon} alt="star"/>
                                <img className={styles.star4}  src={starIcon} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {"rating" in dict.attributes && dict.attributes.rating==3 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIconLit} alt="star"/>
                                <img className={styles.star2}  src={starIconLit} alt="star"/>
                                <img className={styles.star3}  src={starIconLit} alt="star"/>
                                <img className={styles.star4}  src={starIcon} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {"rating" in dict.attributes && dict.attributes.rating==4 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIconLit} alt="star"/>
                                <img className={styles.star2}  src={starIconLit} alt="star"/>
                                <img className={styles.star3}  src={starIconLit} alt="star"/>
                                <img className={styles.star4}  src={starIconLit} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {"rating" in dict.attributes && dict.attributes.rating==5 && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIconLit} alt="star"/>
                                <img className={styles.star2}  src={starIconLit} alt="star"/>
                                <img className={styles.star3}  src={starIconLit} alt="star"/>
                                <img className={styles.star4}  src={starIconLit} alt="star"/>
                                <img className={styles.star5}  src={starIconLit} alt="star"/>
                                <p className={styles.size8}>({dict.attributes.rating})</p>
                              </div>
                            )}
                            {!("rating" in dict.attributes) && (
                              <div className={styles.stars}>
                                <img className={styles.star1}  src={starIcon} alt="star"/>
                                <img className={styles.star2}  src={starIcon} alt="star"/>
                                <img className={styles.star3}  src={starIcon} alt="star"/>
                                <img className={styles.star4}  src={starIcon} alt="star"/>
                                <img className={styles.star5}  src={starIcon} alt="star"/>
                                <p className={styles.size8}>(0)</p>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className={styles.outtercontent2}>
                          <div className={styles.innercontent2}>
                            <p className={styles.headersize}>SCHOOL</p>
                            <div className={styles.space}>
                              <p className={styles.infosize}>University at Buffalo</p>
                            </div>
                          </div>
                          <div className={styles.innercontent2}>
                            <p className={styles.headersize}>MAJOR</p>
                            <p className={styles.infosize}>{this.getMajor(dict)}</p>
                          </div>
                          <div className={styles.innercontent2}>
                            <p className={styles.headersize}>YEAR</p>
                            <p className={styles.infosize}>{this.getYear(dict)}</p>
                          </div>
                        </div>

                        <div className={styles.outtercontent3}>
                          <div className={styles.innercontent3}>
                            <div>
                          <button className={styles.connectbutton} type="button" value="connect">Connect</button>
                          </div>
                          <div className={styles.space}>
                          <Link to={this.gotoProfile(dict)} className={styles.profile}><button className={styles.profilebutton} type="button" value="profile">View Profile</button></Link>
                          </div>
                          </div>
                        </div>


                      </div> 
                    </div>
                  )
                }))}
              {!this.state.userFound && (
                <div>
                  <p><i>No students matching "{this.state.nextUserInput}"</i> </p>
                </div>
              )}
            </div>
            {/*---------------------------------------------------------- */}
            <p className={styles.textsize}>Classes</p>
            <div id="filter" className={styles.maincontainer}>
              {this.state.classFound && (
                this.state.classes.map((dict)=> {
                  return (
              
                    <div className={styles.background4}>
                      <div key={dict} className={styles.content2}>
                        <div className={styles.outtercontent4}>
                          {/*<div>
                            <img className={styles.picturecircle} src={this.getProfilePic(dict)} alt={dict.attributes.firstName}/>
                          </div>*/}
                            <p className={styles.size4}>{ dict.name}</p>
                            <p className={styles.headersize}>University at Buffalo</p>
                            <p className={styles.headersize}>{dict.attributes.classmemberids.length + " students"}</p>
                        </div>
                        
                        <div className={styles.outtercontent5}>
                          {dict.attributes.classmemberids.length > 0 && dict.attributes.classmemberids.length==1 && (
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[0])} />
                          )}
                          {dict.attributes.classmemberids.length > 0 && dict.attributes.classmemberids.length==2 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[1])} />
                            </div>
                          )}
                          {dict.attributes.classmemberids.length > 0 && dict.attributes.classmemberids.length==3 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[1])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[2])} />
                            </div>
                          )}
                          {dict.attributes.classmemberids.length > 0 && dict.attributes.classmemberids.length!=1 && dict.attributes.classmemberids.length!=2 && dict.attributes.classmemberids.length!=3 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[1])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.classmemberids[dict.attributes.classmemberids.length-1])} />
                            <div className={styles.background3}><p>{"+" + (dict.attributes.classmemberids.length-3)}</p></div>
                            </div>
                          )}
                          {dict.attributes.classmemberids.length <= 0 && (
                            <p className={styles.size5}>no members yet!!</p>
                          )}
                          
                          
                        </div>
                        

                        <div className={styles.outtercontent3}>
                        <Link to={this.gotoClass(dict)}><button className={styles.classbutton} type="button" value="profile">View Class</button></Link>
                          
                        </div>
                        


                      </div> 
                    </div>
                  )
                }))}
              {!this.state.classFound && (
                <div>
                  <p><i>No classes matching "{this.state.nextUserInput}"</i> </p>
                </div>
              )}
            </div>

            <p className={styles.textsize}>Groups</p>
            <div id="filter" className={styles.maincontainer}>
              {this.state.groupFound && (
                this.state.groups.map((dict)=> {
                  return (
              
                    <div className={styles.background2}>
                      <div key={dict} className={styles.content3}>
                        <div className={styles.outtercontent4}>
                          {/*<div>
                            <img className={styles.picturecircle} src={this.getProfilePic(dict)} alt={dict.attributes.firstName}/>
                          </div>*/}
                            <p className={styles.size6}>{dict.name}<br/><div className={styles.size7}>{this.getClassName(dict)}</div></p>
                            <p className={styles.headersize}>University at Buffalo</p>
                            <p className={styles.headersize}>{dict.attributes.members.length + " students"}</p>
                        </div>
                        <div className={styles.outtercontent5}>
                          {dict.attributes.members.length > 0 && dict.attributes.members.length==1 && (
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[0])} />
                          )}
                          {dict.attributes.members.length > 0 && dict.attributes.members.length==2 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[1])} />
                            </div>
                          )}
                          {dict.attributes.members.length > 0 && dict.attributes.members.length==3 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[1])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[2])} />
                            </div>
                          )}
                          {dict.attributes.members.length > 0 && dict.attributes.members.length!=1 && dict.attributes.members.length!=2 && dict.attributes.members.length!=3 && (
                            <div className={styles.innercontent5}>
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[0])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[1])} />
                            <img className={styles.picturecircle1} src={this.getProfilePic2(dict.attributes.members[dict.attributes.members.length-1])} />
                            <div className={styles.background3}><p>{"+" + (dict.attributes.members.length-3)}</p></div>
                            </div>
                          )}
                          {dict.attributes.members.length <= 0 && (
                            <p className={styles.size5}>no members yet!!</p>
                          )}
                          
                          
                        </div>

                        <div className={styles.outtercontent3}>
                        <Link to={this.gotoGroup(dict)}><button className={styles.groupbutton} type="button" value="profile">View Group</button></Link>
                          
                        </div>
                        
    
                      </div> 
                    </div>
                  )
                }))}
              {!this.state.groupFound && (
                <div>
                  <p><i>No groups matching "{this.state.nextUserInput}"</i> </p>
                </div>
              )}
            </div>

          </div>
            
          

          </div>

        {this.state.responseMessage}
      </form>
    );
  }
}

