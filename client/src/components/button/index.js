import React from 'react';

function Button(props) {
    let className = "button";
    if (props.style) {
        className += ` ${props.style}`;
    }
    return (<button className={className}>{props.content}</button>);
}

export default Button;
