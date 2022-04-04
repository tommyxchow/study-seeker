import React from "react";
import "../App.css";
import styles from "./search.module.css";
import starIcon from "../assets/unlitstar.svg";
import filterImg from "../assets/filter.png";


export default class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friendname: "",
      friendid: "",
      responseMessage: "",
      users: [],
      people: [],
      userInput: "",
      userFound: true,
      filter: false
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
                userFound:false
              });
            }
            console.log(people_search);
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
    return "./profile/"+dict.id
  }

  getProfilePic = dict =>{
    if("profilePicture" in dict.attributes && dict.attributes.profilePicture!=""){
      return "https://webdev.cse.buffalo.edu"+dict.attributes.profilePicture
    }
    else{
      return "https://webdev.cse.buffalo.edu/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png"
    }
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
            <p className={styles.textsize}> Study Seekers</p>
            <div className={styles.maincontainer}>
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
                            <div className={styles.stars}>
                                  <img className={styles.star1}  src={starIcon} alt="star"/>
                                  <img className={styles.star2}  src={starIcon} alt="star"/>
                                  <img className={styles.star3}  src={starIcon} alt="star"/>
                                  <img className={styles.star4}  src={starIcon} alt="star"/>
                                  <img className={styles.star5}  src={starIcon} alt="star"/>
                            </div>
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
                          <button className={styles.connectbutton} type="button" value="connect">Connect</button>
                          <div className={styles.space}>
                          <a href={this.gotoProfile(dict)} className={styles.profile}><button className={styles.profilebutton} type="button" value="profile">View Profile</button></a>
                          </div>
                          </div>
                        </div>


                      </div> 
                    </div>
                  )
                }))}
              {!this.state.userFound && (
                <div>
                  <p><i>No students matching "{this.state.userInput}"</i> </p>
                </div>
              )}
            </div>
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
              <div className={styles.filtercontainer}>
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
            </div>

          </div>

        {this.state.responseMessage}
      </form>
    );
  }
}

