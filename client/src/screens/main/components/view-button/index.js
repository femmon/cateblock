import React from "react";
import {ContentConnect} from "../content-context";

function ViewButton(props) {
    return (<button onClick={props.view}>View more</button>);
}

export default ContentConnect(ViewButton);
