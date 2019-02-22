import React from "react";

function Button(props) {
    let className = "button";
    if (props.className) {
        className += ` ${props.className}`;
    }
    return (<button className={className} onClick={props.onClick}>{props.content}</button>);
}

export default Button;
