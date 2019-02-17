import React from "react";
import Header from "../../components/header";
import TryButton from "./components/try-button";
import Form from "../../components/form";

class Home extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                <h2>What good thing happened today?</h2>
                {this.props.status == "logout" && (
                    <React.Fragment>
                        <TryButton handleClickStatus={(status) => this.props.handleClickStatus(status)} />
                        <Form handleClickStatus={(status) => this.props.handleClickStatus(status)} />
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }
}

export default Home;
