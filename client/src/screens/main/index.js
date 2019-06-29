import React from "react";
import Header from "../../components/header";
import FormContainer from "../../components/form-container";
import Button from "../../components/button";
import Content from "./components/content";

class Main extends React.Component {
    handleClick(path) {
        fetch(`/accounts/${path}`, {
            method: "DELETE"
        }).then(res => {
            if (res.status === 200) {
                this.props.handleStateLogout();
            }
        }).catch(err => {throw err});
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.status === "try" && (
                    <FormContainer
                        handleStateLogin={this.props.handleStateLogin}
                    />
                )}
                {this.props.status === "login" && (
                    <React.Fragment>
                        <Button
                            className="deleteAccButton"
                            content="Delete Account"
                            onClick={() => this.handleClick("")}
                        />
                        <Button
                            className="logoutButton"
                            content="Log Out"
                            onClick={() => this.handleClick("session")}
                        />
                    </React.Fragment>
                )}
                {/* function returnAccount() {
                    let logoutButton = <LogoutButton handleClickStatus={(status) => this.props.handleClickStatus(status)} />
                    return <Hamburger child={[accountSetting, logoutButton]}>
                } */}
                {/* {this.props.status === "login" && returnAccount()} */}
                <Content status={this.props.status} />
            </React.Fragment>
        );
    }
}

export default Main;
