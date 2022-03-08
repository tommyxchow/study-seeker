import React from "react";
import "./App.css";

function BackgroundImage(props){
    return(
        <div className="background-image">
            {props.children}
        </div>
    );
}

function LandingPageBox(props){
    return(
        <div className="landing-page-box">
            {props.children}
        </div>
    );
}

function LogoText(){
    return(
        <span className="logo-text">
        Study
        <br />
        Seeker
        <br />
      </span>
    );
}
function LogoSubtext(){
    return( <span className="logo-subtext">SEEK FRIENDS TO STUDY</span>);
}
function ButtonSubmitForm(props){
    return(
        <form action= {props.link} >
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

    constructor(props) {
        super(props);
    }
    render () {
        return (
            <>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="stylesheet" type="text/css" href="styleStudy.css" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
            <link
            href="https://fonts.googleapis.com/css2?family=Exo:ital,wght@1,600&family=Sofia&display=swap"
            rel="stylesheet"/>

            <BackgroundImage>
                <LandingPageBox>
                    <LogoText/>
                    <LogoSubtext/>
                    <ButtonSubmitForm link ={"/register/"} buttonText={"Sign Up"}/>
                    <ButtonSubmitForm link ={"https://www.google.com/"} buttonText={"Login"} />
                </LandingPageBox>
            </BackgroundImage>
            </>
        );

    }

}
export default LandingPage