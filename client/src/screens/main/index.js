import React from "react";
import Logo from "../../components/logo";
import Button from "../../components/button";
import AccessAccount from "./components/access-account";
import AccountSetting from "./components/account-setting";
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
        return (<React.Fragment>
            <header css={`
                display: flex;
                justify-content: center;
                align-items: center;
            `}>
                <Logo />

                {this.props.status === "try" && (
                    <AccessAccount
                        handleStateLogin={this.props.handleStateLogin}
                    />
                )}

                {this.props.status === "login" && <React.Fragment>
                    <AccountSetting
                        handleDeleteAccount={() => this.handleClick("")}
                    />

                    <Button
                        onClick={() => this.handleClick("session")}
                    >Log Out</Button>
                </React.Fragment>}
            </header>

            <main>
                <Content status={this.props.status} />
            </main>
        </React.Fragment>);
    }
}

export default Main;
