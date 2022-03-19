import React from "react";
import "../App.css";

export function BackgroundImage(props) {
  return <div className="background-image">{props.children}</div>;
}

function LandingPageBox(props) {
  return <div className="landing-page-box">{props.children}</div>;
}

export function LogoText(props) {
  return (
    <div>
      <span className="logo-text">
        Study
        <br />
        Seeker
        <br />
      </span>
      <span className="logo-subtext">{props.subtitle}</span>
    </div>
  );
}

export function ButtonSubmitForm(props) {
  return (
    <form action={props.link}>
      <button className="buttonSubmitForm">{props.buttonText}</button>
    </form>
  );
}
/*
function ButtonSubmitForm({link, buttonText}){
    return(
        <form action={link}>
        <button className="buttonSubmitForm">{buttonText}</button>
      </form>
    );
}
*/

class LandingPage extends React.Component {
  render() {
    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" type="text/css" href="styleStudy.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Exo:wght@700&family=Sofia&display=swap"
          rel="stylesheet"
        />

        <BackgroundImage>
          <LandingPageBox>
            <LogoText subtitle={"SEEK FRIENDS TO STUDY"} />
            <div>
              <ButtonSubmitForm link={"./register"} buttonText={"Sign Up"} />
              <ButtonSubmitForm link={"./login"} buttonText={"Login"} />
            </div>
          </LandingPageBox>
        </BackgroundImage>
      </>
    );
  }
}
export default LandingPage;
