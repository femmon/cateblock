import React from "react";
import Button from "../../../button";

function LoginButton(props) {
    return (<Button className="loginButton" content="Log In" onClick={(event) => props.handleClickLogin(event)} />);
}

export default LoginButton;
