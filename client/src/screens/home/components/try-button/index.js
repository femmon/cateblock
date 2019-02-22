import React from "react";
import Button from "../../../../components/button";

function TryButton(props) {
    return (<Button className="tryButton" content="Write it down!" onClick={() => props.handleClickStatus("try")} />);
}

export default TryButton;
