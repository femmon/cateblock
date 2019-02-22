import React from "react";
import Button from "../../../button";

function SignupButton(props) {
    return (<Button className="signupButton" content="Sign Up" onClick={event => props.handleClickSignup(event)}/>);
}

export default SignupButton;
