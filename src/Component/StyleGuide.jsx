import React from "react";
import "../App.css";
import "./styleguide.css";
import logo from "../assets/cse370logo.png";
import layout from "../assets/cse370layout.png";
import mobile from "../assets/cse370mobile.png";
import landing from "../assets/cse370landing.png";

class StyleGuide extends React.Component {
  
    render() {
      return (
        <div >
            <div className="sidenavi">
                <h1>Style Guide</h1>
            </div>
            <div className="styleguide">
            <div className="outtercontent1">
            <div className="margin">

            <div className="td">
                <div className="box2">
                    <h3 className="text">Typography</h3>
                    <div className="box3">
                        <div className="exo"><b>Exo:</b> AaBbCcDd <b>AaBbCcDd</b></div>
                        <div className="sofia"><b>Sofia: </b> AaBbCcDd <b>AaBbCcDd</b></div>
                        <div className="roboto"><b>Roboto: </b> AaBbCcDd <b>AaBbCcDd</b></div>
                    </div>
            
                    <div className="size1">Text <p className="size8">70px - Landing page logo</p></div>
                    <div className="size2">Text <p className="size8">48px - Login page logo</p></div>
                    <div className="size3">Text <p className="size8">36px - Navigation bar text</p></div>
                    <div className="size4">Text <p className="size8">30px - Title</p></div>
                    <div className="size5">Text <p className="size8">24px - Text</p></div>
                    <div className="size6">Text <p className="size8">18px - Tagline/text</p></div>
                    <div className="size7">Text <p className="size8">14px - Help / guideline</p></div>
                    <div><h1 className="size9">Text</h1><p className="size8">h1 - Profile name</p></div>
                    <div><h2 className="size9">Text</h2><p className="size8">h1 - Title/Text</p></div>
                    <div><h3 className="size9">Text</h3><p className="size8">h1 - text</p></div>
                    <div><span ><b>Note: </b>Size of the font varies throughout the app</span></div>
                </div>
            </div>
            <div>
                <div className="box">
                        <h3 className="text">Color Palette</h3>
                    <div>
                        <table>
                        <tr><td><div className="colorbox1"></div></td><td><ul className="list">
                                                                            <li>Navigation Bar Color/</li>
                                                                            <li>Button color</li>
                                                                            <li>hex: #907671</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox2"></div></td><td><ul className="list">
                                                                            <li>Boxes Color</li>
                                                                            <li>hex #ede5e5</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox3"></div></td><td><ul className="list">
                                                                            <li>Text Color</li>
                                                                            <li>hex #000000</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox4"></div></td><td><ul className="list">
                                                                            <li>Background Color</li>
                                                                            <li>Modal Color</li>
                                                                            <li>Text Color</li>
                                                                            <li>hex #ffffff</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox5"></div></td><td><ul className="list">
                                                                            <li>Button Color</li>
                                                                            <li>hex #ff0000</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox6"></div></td><td><ul className="list">
                                                                            <li>Button Color</li>
                                                                            <li>hex #2ecc71</li>
                                                                            </ul></td></tr>
                        <tr><td><div className="colorbox7"></div></td><td><ul className="list">
                                                                            <li>Button Color</li>
                                                                            <li>hex #737373</li>
                                                                            </ul></td></tr>
                        </table>
                    </div>
                </div>
            </div>
            </div>
            <div className="with_logo">
            <div className="box5">
                <h3 className="text">Buttons</h3>
                        <button className="connectButton">Button 1</button><p className="size10"> Connect / Submit </p>
                    
                        <button className="disconnectButton">Button 2</button><p className="size10"> Disconnect / Block / Diactivate Account</p>

                        <button className="submitButton">Button 3</button><p className="size10"> Submit / Login / Reset / Signup</p>

                        <button className="filterButton">Button 3</button><p className="size10"> Filter </p>
                    
            </div>
            <div className="box4" >
                <img src={logo} className="logo"></img>
            </div>
            </div>
            
            
            {/*<td className="table">
            <div >
                <img src={logo} className="logo"></img>
            </div>
            </td>*/}

            
            
            </div>

             {/*----------------------------------------------------- */}
            <div className="box1">
                <h3 className="center">Layouts</h3>
                  <div className="fixlayout">
                    <div className="center">
                        <img src={landing} className="layout"></img>
                        <p >Landing page layout in desktop and mobile</p>
                    </div>
                    <div className="center">
                        <img src={layout} className="layout"></img>
                        <p >general destop layout</p>
                    </div>
                    <div  className="center">
                        <img src={mobile} className="mobile"></img>
                        <p >general mobile layout</p>
                    </div>
                    </div>
        
            </div>
            <div className="box1">
            <h3 className="center">Navigation Bar</h3>
            <span className="box1text">Navigation will be sticky at the left side of the page. Contains Home, Search, Profile, Groups, Connections, and Logout tabs </span>
            <br/>
            <span className="box1text"><b>Responsiveness:</b> Navigtion bar will appear by clicking on an icon at the top of the page and it will cover the whole page.</span>
            </div>

            <div className="box1">
            <h3 className="center">Error Handling</h3>
            <span className="box1text">We use simple modals with white background that will appear at the middle of the screen for every error handling and error messages.</span>
            <br/>
            <span className="box1text"><b>Responsiveness:</b> Modals will be height of 200px and width of 50%.</span>
            </div>
            </div>
        </div>
      );
    }
  }
  
  export default StyleGuide;