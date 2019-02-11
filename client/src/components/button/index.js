import React from 'react';

function Button(props) {
    let className = "button";
    if (props.style) {
        className += ` ${props.style}`;
    }
    return (<button className={className} onClick={props.onClick}>{props.content}</button>);
}

export default Button;
