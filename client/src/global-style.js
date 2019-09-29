import {createGlobalStyle} from "styled-components";
import staticClouds from "./static-clouds.png";

const GlobalStyle = createGlobalStyle`
    html {
        font-family: "Nunito", sans-serif;

        // "background-size: cover" + "background-attachment: fixed" directly on
        // html create the desirable effect on destop browser, but
        // "background-attachment: fixed" doesn't work on (some) mobile browsers.
        // Use "position: fixed" ::before so don't need to add another component.
        &::before {
            // To replace "background-attachment: fixed"
            position: fixed;
            left: 0;
            top: 0;
            // Use viewport units instead of percentage (100%) so that the
            // (dis)apprearance of URL bar in mobile browser doesn't change the
            // size of this ::before (This behavior works on Safari and Chrome
            // for IOS, doesn't on Firefox for IOS)
            width: 100vw;
            height: 100vh;

            background-color: #c9e8f2;
            // The image flickers in development build, relates to this
            // https://github.com/styled-components/styled-components/issues/1593
            background-image: url(${staticClouds});
            background-repeat: no-repeat;
            background-size: cover;
            content: "";
            z-index: -2;
        }
    }

    * {
        box-sizing: border-box;
    }
`;

export default GlobalStyle;
