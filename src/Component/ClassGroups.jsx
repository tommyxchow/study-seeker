import React, { Component } from "react";
import "../App.css";
import styles from "./classgroup.module.css"
import starIcon from "../assets/unlitstar.svg";

export default class ClassPosts extends Component {
	constructor(props) {
    super(props);
      this.state = {
        userid: props.userid,
        groups: [],
        name: "",
        groupname: "",
        members: [],
        rating: 0,
        membercount: 0,
        status: "",
        postcounter: 0,
        groupid: -1,
        createStatus: "public",
        createGroupName: "",
        profilePicture:
          "/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
      };
    }

	componentDidMount() {
		console.log("hey hey", this.props.classId);
		this.fetchGroups();
	}

	fetchGroups () {
		fetch(process.env.REACT_APP_API_PATH+"/groups/", {
        method: "GET",
				headers: {
					'accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+sessionStorage.getItem("token")
				}
      })
		.then((res) => res.json())
		.then((result) => {
      let holdergroup = [];
      for(var i = 0; i < result[0].length; i++) {
        // console.log(result[0][i])
        if(!result[0][i].attributes.isClass){
          if(result[0][i].attributes.id == this.props.classId){
            console.log("this is it dawg");
            this.setState({
              groupname: result[0][i].name,
              status: result[0][i].attributes.status,
              membercount: result[0][i].attributes.members.length,
              members: result[0][i].attributes.members,
              groupid: result[0][i].id,
              postcounter: result[0][i].attributes.postcounter,
              classid: result[0][i].attributes.id,
              rating: result[0][i].attributes.rating,
            });
            if(this.state.classid !== -1){
              fetch(process.env.REACT_APP_API_PATH+"/groups/"+this.state.classid, {
                method: "get",
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer '+sessionStorage.getItem("token")
                }
               })
              .then(res => res.json())
              .then(result => {
                this.setState({
                  name: result.name
                });
                this.forceUpdate();
                console.log(this.state.name);
              })
            }
            console.log(this.state);
            holdergroup.push(result[0][i]);
          }
        }
      }
			this.setState({
				groups: holdergroup
			});
		});
		this.forceUpdate();
	}

	removeHandler_Leave(id, name){
    const newList = this.state.members.filter(userid => userid !== Number(this.state.userid));
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/groups/" + id, {
      method: "PATCH",
      headers: {
        "accept": "*/*",
        'Authorization': 'Bearer '+sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
					classpostcounter: this.state.postcounter,
          classmembercount: this.state.classmembercounter,
          groups: {
            groupid: this.state.groupid,
            name: this.state.groupname,
            members: newList,
            status: this.state.status,
            membercount: this.state.membercount -1
          }
        }
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.forceUpdate();
    window.location.reload();
  }

	removeHandler_Join(id, name){
		const newList = this.state.members
		newList.push(this.props.userid);
		console.log(newList);
    fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/groups/" + id, {
      method: "PATCH",
      headers: {
        "accept": "*/*",
        'Authorization': 'Bearer '+sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
					classpostcounter: this.state.postcounter,
					classmembercount: this.state.classmembercounter,
          groups: {
            groupid: this.state.groupid,
            name: this.state.groupname,
            members: newList,
            status: this.state.status,
            membercount: this.state.membercount + 1
          }
        }
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.forceUpdate();
  }

	createGroup (id, name) {
		fetch("https://webdev.cse.buffalo.edu/hci/api/api/commitment/groups/" + id, {
      method: "PATCH",
      headers: {
        "accept": "*/*",
        'Authorization': 'Bearer '+sessionStorage.getItem("token"),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: id,
        name: name,
        attributes: {
			    classpostcounter: this.state.postcounter,
          classmembercount: this.state.classmembercounter,
          groups: {
            groupid: this.state.groupid + 1,
            name: this.state.createGroupName,
            members: [this.props.userID],
            status: this.state.createStatus,
            membercount: 1
          }
        }
      })
    })
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    this.forceUpdate();
	}


	render () {
		const {error, groups} = this.state;
    console.log("groups" ,groups);
		const handleChange = (event) => {
			this.setState({createStatus: event.target.value});
		}
		const handleSubmit = (event) => {
			event.preventDefault();
			this.setState({createGroupName: event.target.value});
		}
		return( 
			<div className="post">
						<div className= {styles.groupdiv}>
						<div id="creategroup" className={styles.classgrouplist}>
						<div className={styles.container}>
							<form onSubmit={handleSubmit}>
									<input
										value={this.state.createGroupName}
										className={styles.createName}
										onChange={(e) => this.setState({createGroupName: e.target.value})}
									/>
								</form>
							<p className={styles.membercount}>0 Student(s)</p>
						</div>
						<div className={styles.container}>
							<form onSubmit={handleChange}>
								<select value={this.state.createStatus} onChange={handleChange} className={styles.createStatus}>
									<option value="public">Public</option>
									<option value="private">Private</option>
								</select>
							</form>
						</div>
						<div className={styles.container}>
							<p className={styles.rating}>Average Rating</p>
							<div className={styles.stardiv}>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
							</div>
						</div>
						</div>
						<button className={styles.createbutton} onClick={() => this.createGroup(this.state.groupid, this.state.groupname)}>Create</button>

						</div>
					{groups.map(group => (
						<>
            {console.log(groups)}
            {console.log(group)}
						<div className= {styles.groupdiv}>
						<a key={group.id} id="group" href={"/groups/" + group.id} className={styles.classgrouplist} onClick={() => this.setState({name: group.name})}>
						<div className={styles.container}>
							<p className={styles.name}>{this.state.name+ ": " + group.name}</p>
							<p className={styles.membercount}>{group.attributes.members.length} Student(s)</p>
						</div>
						<div className={styles.container}>
							<p className={styles.students}>Student(s)</p>
								{/* {group.attributes.status === "public" && group.attributes.membercount === 1 &&
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
								}
								{group.attributes.status === "public" && group.attributes.membercount === 2 &&
									<>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
									</>
								}
								{group.attributes.status === "public" && (group.attributes.membercount === 3 || group.attributes.membercount > 3) &&
								<>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[2]} alt="user profile 3"/>
								</>
								}
								{group.attributes.status === "private" && group.attributes.membercount === 1 &&
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
								}
								{group.attributes.status === "private" && group.attributes.membercount === 2 &&
									<>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="user profile 2"/>
									</>
								}
								{group.attributes.status === "private" && (group.attributes.membercount === 3 || group.attributes.membercount > 3) &&
								<>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[2]} alt="user profile 3"/>
								</>
								} */}
						</div>
						<div className={styles.container}>
							<p className={styles.rating}>Average Rating</p>
							<div className={styles.stardiv}>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
								<img className={styles.star} src={starIcon} alt="star"/>
							</div>
						</div>
						</a>
						{group.members.includes(Number(this.props.userid)) && <button className={styles.leavebutton} onClick={() => this.removeHandler_Leave(group.id, group.name)}>Leave</button>}
						{!group.members.includes(Number(this.props.userid)) && <button className={styles.joinbutton} onClick={() => this.removeHandler_Join(group.id, group.name)}>Join</button>}
						</div>
						</>
					))}
			</div>
		)
	}
}