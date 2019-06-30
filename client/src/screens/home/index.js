import React from "react";
import Logo from "../../components/logo";
import Button from "../../components/button";
import FormContainer from "../../components/form-container";

function Home(props) {
    return (
        <React.Fragment>
            <Logo />
            <h2>What good thing happened today?</h2>
            {props.status === "logout" && (
                <React.Fragment>
                    <Button
                        className="tryButton"
                        content="Write it down!"
                        onClick={() => props.handleStateTry()}
                    />
                    <FormContainer handleStateLogin={() => props.handleStateLogin()} />
                </React.Fragment>
            )}
        </React.Fragment>
    );
}

export default Home;
