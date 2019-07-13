import React from "react";
import Logo from "../../components/logo";
import Button from "../../components/button";
import FormContainer from "../../components/form-container";

function Home(props) {
    return (<React.Fragment>
        <header css={`text-align: center`}>
            <Logo />
            <h2>What good thing happened today?</h2>
        </header>

        {props.status === "logout" && (
            <main>
                <div>
                    <Button
                        className="tryButton"
                        content="Write it down!"
                        onClick={() => props.handleStateTry()}
                    />
                </div>

                <div>
                    <FormContainer
                        handleStateLogin={() => props.handleStateLogin()}
                    />
                </div>
            </main>
        )}
    </React.Fragment>);
}

export default Home;
