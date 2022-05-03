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
      <div>
        <div className="sidenavi">
          <h1>Style Guide</h1>
        </div>

        <table className="margin">
          <tr>
            <td className="td">
              <div className="box2">
                <h2 className="text">Typography</h2>
                <div className="box3">
                  <div className="exo">
                    <b>Exo:</b> AaBbCcDd <b>AaBbCcDd</b>
                  </div>
                  <div className="sofia">
                    <b>Sofia: </b> AaBbCcDd <b>AaBbCcDd</b>
                  </div>
                </div>

                <div className="size1">
                  Heading 1<p className="size8">70px - Landing page logo</p>
                </div>
                <div className="size2">
                  Heading 2<p className="size8">48px - Login page logo</p>
                </div>
                <div className="size3">
                  Heading 3<p className="size8">36px - Navigation bar text</p>
                </div>
                <div className="size4">
                  Text in 30px<p className="size8">30px - Title</p>
                </div>
                <div className="size5">
                  Text in 24px<p className="size8">24px - Text</p>
                </div>
                <div className="size6">
                  Text in 18px<p className="size8">18px - Tagline</p>
                </div>
                <div className="size7">
                  Text in 14px<p className="size8">14px - Help / guideline</p>
                </div>
                <div>
                  <h1 className="size9">h1 Heading</h1>
                  <p className="size8">h1 - Profile name</p>
                </div>
              </div>
            </td>
            <tr>
              <td>
                <div className="box">
                  <h2 className="text">Color Palette</h2>
                  <div>
                    <table>
                      <tr>
                        <td>
                          <div className="colorbox1"></div>
                        </td>
                        <td>
                          <ul className="list">
                            <li>Navigation Bar Color</li>
                            <li>hex: #907671</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="colorbox2"></div>
                        </td>
                        <td>
                          <ul className="list">
                            <li>Boxes Color</li>
                            <li>hex #ede5e5</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="colorbox3"></div>
                        </td>
                        <td>
                          <ul className="list">
                            <li>Text Color</li>
                            <li>hex #000000</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="colorbox4"></div>
                        </td>
                        <td>
                          <ul className="list">
                            <li>Background Color</li>
                            <li>hex #ffffff</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </td>
              <td>
                <table>
                  <tr>
                    <div className="box5">
                      <h2 className="text">Buttons</h2>
                      <button className="connectButton">Button 1</button>
                      <p className="size10"> Connect / Submit button</p>

                      <button className="disconnectButton">Button 2</button>
                      <p className="size10">
                        {" "}
                        Disconnect / Block / Diactivate Account
                      </p>

                      <button className="submitButton">Button 3</button>
                      <p className="size10"> Submit / Login / Reset / Signup</p>
                    </div>
                  </tr>
                  <tr>
                    <td className="td1">
                      <div className="box4">
                        <img
                          src={logo}
                          className="logo"
                          alt="Study Seeker Logo"
                        ></img>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            {/*<td className="table">
            <div >
                <img src={logo} className="logo"></img>
            </div>
            </td>*/}
          </tr>
        </table>
        <div className="box1">
          <h2 className="center">Layouts</h2>
          <table>
            <tr>
              <td>
                <div className="center">
                  <img
                    src={landing}
                    className="layout"
                    alt="Landing Page Layout"
                  ></img>
                  <p>Landing page layout in desktop and mobile</p>
                </div>
              </td>
              <td>
                <div className="center">
                  <img
                    src={layout}
                    className="layout"
                    alt="Desktop Layout"
                  ></img>
                  <p>general destop layout</p>
                </div>
              </td>
              <td>
                <div className="center">
                  <img
                    src={mobile}
                    className="mobile"
                    alt="Mobile Layout"
                  ></img>
                  <p>general mobile layout</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default StyleGuide;
