import React from "react";
import "../App.css";
import "../styles.css";
import line9 from "../assets/line-9-16@2x.svg";
import line13 from "../assets/line-13-1@2x.svg";
import line14 from "../assets/line-14-1@2x.svg";
import ellipse10 from "../assets/ellipse-10-1@2x.png";
import ellipse9 from "../assets/ellipse-9-3@1x.png";
import ellipse11 from "../assets/ellipse-11-1@2x.png";
import maskgroup3 from "../assets/mask-group-3@2x.svg";
import maskgroup1 from "../assets/mask-group-4@2x.svg";
import litstar from "../assets/star-38-1@2x.svg";
import unlitstar from "../assets/star-48-3@2x.svg";
import LisaMoan from "../assets/person-viewing-3@2x.png";


function App() {
  return <MobileConnections personViewingProps={mobileConnectionsData.personViewingProps} />;
}

export default App;

function MobileConnections(props) {

  return (
    <div className="container-center-horizontal">
      <div className="mobile-connectionsscreen">
        <div className="flex-col">
          <MobileMenu />
          <div className="overlap-group10">
            <h1 className="titleexo-bold-black-36px">
              Connection Requests
            </h1>
            <img className="line-13" src={line13} alt="line13"/>
          </div>   
        </div>
        <div className="flex-row">
          <div className="group-container">
            <div className="overlap-group5">
              <img className="mask-group" src={maskgroup3} alt="img of ibn khaldun"/>
              <div className="ibn-khaldunexo-medium-black-18px">
                Ibn Khaldun
              </div>
              <img className="star-56" src={litstar} alt="one star"/>
              <img className="star-57" src={litstar} alt="one star" />
              <img className="star-58" src={litstar} alt="one star" />
              <img className="star-59" src={litstar} alt="one star" />
              <img className="star-60" src={litstar} alt="one star" />
            </div>
            <img className="mask-group-1" src={maskgroup1} alt="img of zhuangzi" />
          </div>
          <div className="overlap-group-container">
            <div className="overlap-group1">
              <div className="acceptexo-bold-black-18px">
                Accept
              </div>
            </div>
            <div className="overlap-group">
              <div className="rejectexo-bold-black-18px">
                Reject
              </div>
            </div>
            <div className="overlap-group3">
              <div className="acceptexo-bold-black-18px">
                Accept
              </div>
            </div>
            <div className="overlap-group2">
              <div className="rejectexo-bold-black-18px">
                Reject
              </div>
            </div>
          </div>
        </div>
        <div className="flex-col-1">
          <div className="flex-col-2">
            <div className="overlap-group6">
              <img className="star-61" src={litstar} alt="one star" />
              <img className="star-62" src={litstar} alt="one star" />
              <img className="star-63" src={litstar} alt="one star" />
              <img className="star-64" src={litstar} alt="one star" />
              <img className="star-65" src={litstar} alt="one star" />
              <div className="zhuangziexo-medium-black-18px">
                Zhuangzi
              </div>
            </div>
            <div className="overlap-group11">
              <div className="my-connectionsexo-bold-black-36px">
                My Connections
              </div>
              <img className="line-14" src={line14} alt="line" />
            </div>
            <div className="flex-row-1">
              <img className="LisaMoan" src={LisaMoan} alt="img of Lisa Moan" width="100" height="100"/>
              <img className="ellipse-10" src={ellipse10} alt="img of Jay Hou" width="500" height="600"/>
            </div>
            <div className="overlap-group-container-1">
              <div className="overlap-group4">
                <img className="star-68" src={litstar} alt="one star" />
                <img className="star-69" src={litstar} alt="one star" />
                <img className="star-70" src={litstar} alt="one star" />
                <img className="star-71" src={litstar} alt="one star" />
                <img className="star-72" src={unlitstar} alt="no star" />
                <div className="nameexo-medium-black-18px">
                  Lisa Moan
                </div>
              </div>
              <div className="overlap-group9">
                <div className="name-1exo-medium-black-18px">
                  Jay Hou
                </div>
                <img className="star-39" src={litstar} alt="one star" />
                <img className="star-49" src={litstar} alt="one star" />
                <img className="star-50" src={unlitstar} alt="no star" />
                <img className="star-51" src={unlitstar} alt="no star" />
                <img className="star-52" src={unlitstar} alt="no star" />
              </div>
            </div>
          </div>
          <div className="flex-row-2">
            <div className="overlap-group7">
              <img className="ellipse-9" src={ellipse9} />
              <div className="name-2exo-medium-black-18px">
                Mona Lisa
              </div>
              <img className="star-38" src={litstar} alt="one star" />
              <img className="star-40" src={litstar} alt="one star" />
              <img className="star-41" src={litstar} alt="one star" />
              <img className="star-42" src={litstar} alt="one star" />
              <img className="star-48" src={unlitstar} alt="no star" />
            </div>
            <div className="flex-col-3">
              <img className="ellipse-11" src={ellipse11} />
              <div className="overlap-group8">
                <div className="name-3exo-medium-black-18px">
                  Tommy
                </div>
                <img className="star-43" src={litstar} alt="one star" />
                <img className="star-44" src={litstar} alt="one star" />
                <img className="star-45" src={litstar} alt="one star" />
                <img className="star-46" src={litstar} alt="one star" />
                <img className="star-47" src={litstar} alt="one star" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileMenu() {
  return (
    <div className="mobile-menu">
      <Hamburger />
      <div className="study-seekersofia-normal-white-18px">
        Study
        <br />
        Seeker
      </div>
    </div>
  );
}

function Hamburger() {
  return (
    <div className="hamburger">
      <img className="line-9" src={line9} />
      <img className="line-10" src={line9} />
      <img className="line-11" src={line9} />
    </div>
  );
}

function PersonViewing(props) {
  const { src } = props;

  return <div className="person-viewing" style={{ backgroundImage: `url(${src})` }}></div>;
}

const personViewingData = {
  src: "person-viewing.png",
};

const mobileConnectionsData = {
  personViewingProps: personViewingData,
};