import React from "react";
import styled from "styled-components";
import staticCloudsSrc from "./static-clouds.png";

const StaticClouds = styled.div`
    // To replace "background-attachment: fixed" (which doesn't work on
    // (some) mobile browsers)
    position: fixed;
    left: 0;
    top: 0;

    // Use viewport units instead of percentage (100%) so that the
    // (dis)apprearance of URL bar in mobile browser doesn't change the
    // size of this ::before (This behavior works on Safari and Chrome
    // for IOS, doesn't on Firefox for IOS)
    width: 100vw;
    height: 100vh;

    background-color: ${props => props.theme.blueBackground};
    // The image flickers in development build, relates to this
    // https://github.com/styled-components/styled-components/issues/1593
    background-image: url(${staticCloudsSrc});
    background-repeat: no-repeat;
    background-size: cover;
    content: "";
    z-index: -2;
`;

export default StaticClouds;
