import React from 'react';
import Header from "../../components/header";
import Form from "../../components/form";
import LogoutButton from "./components/logout-button";

class Main extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.status == "try" && <Form handleClickStatus={(status) => this.props.handleClickStatus(status)} />}
                {this.props.status == "login" && <LogoutButton handleClickStatus={(status) => this.props.handleClickStatus(status)} />}
            </React.Fragment>
        );
    }
}

export default Main;
