import React from "react";
import Header from "../../components/header";
import Form from "../../components/form";
import LogoutButton from "./components/logout-button";
import Content from "./components/content";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickDeleteAccount = this.handleClickDeleteAccount.bind(this);
    }
    handleClickDeleteAccount() {
        fetch("/accounts", {method: "DELETE"}).then(res => {
            if (res.status === 200) {
                this.props.handleClickStatus("logout");
            }
        }).catch(err => {throw err});
    }
    render() {
        return (
            <React.Fragment>
                <Header />
                {this.props.status === "try" && <Form handleClickStatus={(status) => this.props.handleClickStatus(status)} />}
                {this.props.status === "login" && (
                    <React.Fragment>
                        <div onClick={this.handleClickDeleteAccount}>Delete Account</div>
                        <LogoutButton handleClickStatus={(status) => this.props.handleClickStatus(status)} />
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
