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
				groupid: 0,
				createStatus: "public",
				createGroupName: "",
				classmembercounter: 0,
				profilePicture:
					"/hci/api/uploads/files/DOo1Ebbt8dYT4-plb6G6NP5jIc9_l_gNlaYwPW4SaBM.png",
			};
		}

	componentDidMount() {
		console.log("hey hey", this.props.classId);
		this.fetchGroups();
	}

	fetchGroups () {
		fetch(process.env.REACT_APP_API_PATH+"/groups/"+this.props.classId,{
        method: "GET",
				headers: {
					'accept': '*/*'
				}	
      })
		.then((res) => res.json())
		.then((result) => {
			let holdergroup = [];
			console.log("result",result);
			this.setState({
				groupid: result.attributes.groups.groupid,
				membercount: result.attributes.groups.membercount,
				name: result.name,
				id: result.id,
				members: result.attributes.groups.members,
				status: result.attributes.groups.status,
				postcounter: result.attributes.classpostcounter,
				groupname: result.attributes.groups.name,
				rating: result.attributes.groups.rating,
				classmembercounter: result.attributes.classmembercounter
			});
			holdergroup.push(result);
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
		const {groups} = this.state;
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
						<div className= {styles.groupdiv}>
						<a key={group.id} id="group" href={"/groups/" + group.id} className={styles.classgrouplist} onClick={() => this.setState({name: group.name})}>
						<div className={styles.container}>
							<p className={styles.name}>{group.name+ ": " + this.state.groupname}</p>
							<p className={styles.membercount}>{group.attributes.groups.membercount} Student(s)</p>
						</div>
						<div className={styles.container}>
							<p className={styles.students}>Student(s)</p>
								{/* {group.attributes.groups.status === "public" && group.attributes.groups.membercount === 1 &&
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
								}
								{group.attributes.groups.status === "public" && group.attributes.groups.membercount === 2 &&
									<>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 1"/>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
									</>
								}
								{group.attributes.groups.status === "public" && (group.attributes.groups.membercount === 3 || group.attributes.groups.membercount > 3) &&
								<>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[0]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[1]} alt="user profile 2"/>
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.publicProfilePicture[2]} alt="user profile 3"/>
								</>
								}
								{group.attributes.groups.status === "private" && group.attributes.groups.membercount === 1 &&
									<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
								}
								{group.attributes.groups.status === "private" && group.attributes.groups.membercount === 2 &&
									<>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[0]} alt="user profile 1"/>
										<img className={styles.profilepicture} src={"https://webdev.cse.buffalo.edu"+ this.state.privateProfilePicture[1]} alt="user profile 2"/>
									</>
								}
								{group.attributes.groups.status === "private" && (group.attributes.groups.membercount === 3 || group.attributes.groups.membercount > 3) &&
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
						{group.attributes.groups.members.includes(Number(this.props.userid)) && <button className={styles.leavebutton} onClick={() => this.removeHandler_Leave(group.id, group.name)}>Leave</button>}
						{!group.attributes.groups.members.includes(Number(this.props.userid)) && <button className={styles.joinbutton} onClick={() => this.removeHandler_Join(group.id, group.name)}>Join</button>}
						</div>
						</>
					))}
			</div>
		)
	}
}