import React from "react";
import MovingClouds from "./components/moving-clouds";
import StaticClouds from "./components/static-clouds";

function Background(props) {
    return (
        <div>
            <MovingClouds />
            <StaticClouds />
        </div>
    );
}

export default Background;
