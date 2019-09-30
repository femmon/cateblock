import React from "react";
import styled from "styled-components";
import Logo from "../../components/logo";
import Button from "../../components/button";
import Background from "../../components/background";
import FormContainer from "../../components/form-container";

let transitionTime = "1s";

const Header = styled.header`
    text-align: center;

    opacity: 1;
    transition: ${transitionTime} ease-in;
`;

const MainContainer = styled.main`
    display: flex;
    align-items: center;

    overflow-x: hidden;
`;

const LeftBox = styled.div`
    flex: 1;

    position: relative;
    right: 0;
    opacity: 1;
    transition: ${transitionTime} ease-in;
    button {
        float: right;
    }
`;

const RightBox = styled.div`
    flex: 1;

    position: relative;
    left: 0;
    opacity: 1;
    transition: ${transitionTime} ease-in;`;

function Home(props) {
    function changeScreenAnimation() {
        return new Promise(res => {
            let head = document.querySelector("header");
            head.style.opacity = 0.25;

            let sides = document.querySelectorAll("main > div");
            sides[0].style.right = "25%";
            sides[0].style.opacity = 0.25;
            sides[1].style.left = "25%";
            sides[1].style.opacity = 0.25;
            setTimeout(res, Number(transitionTime.replace("s", "")) * 1000);
        });
    }
    return (<>
        <Header>
            <Logo />
            <h2>What good thing happened today?</h2>
        </Header>

        {props.status === "logout" && (
            <MainContainer>
                <LeftBox>
                    <Button
                        onClick={() => {
                            changeScreenAnimation().then(props.handleStateTry);
                        }}
                        emphasis
                    >Write it down!</Button>
                </LeftBox>

                <RightBox>
                    <FormContainer
                        handleStateLogin={username => {
                            changeScreenAnimation()
                            .then(() => props.handleStateLogin(username));
                        }}
                    />
                </RightBox>
            </MainContainer>
        )}

        <Background />
    </>);
}

export default Home;
