import React from "react";
import Logo from "../../components/logo";
import Button from "../../components/button";
import Cloud from "../../components/cloud";
import AccessAccount from "./components/access-account";
import AccountSetting from "./components/account-setting";
import Content from "./components/content";
import Stack from "./components/stack";
import ViewButton from "./components/view-button";
import {ContentProvider} from "./components/content-context";
import {EditorProvider} from "./components/editor-context";

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
        return (<>
            <header css={`
                display: flex;
                justify-content: center;
                align-items: center;
            `}>
                <Logo />

                {this.props.status === "try" && (
                    <AccessAccount
                        handleStateLogin={username => {
                            this.props.handleStateLogin(username);
                        }}
                    />
                )}

                {this.props.status === "login" && <>
                    <AccountSetting
                        handleDeleteAccount={() => this.handleClick("")}
                        username={this.props.username}
                    />

                    <Button
                        onClick={() => this.handleClick("session")}
                    >Log Out</Button>
                </>}
            </header>

            <main>
                <ContentProvider status={this.props.status}>
                    <EditorProvider status={this.props.status}>
                        <Stack />

                        {this.props.status === "login" && (
                            <ViewButton />
                        )}

                        <Content status={this.props.status}/>
                    </EditorProvider>
                </ContentProvider>
            </main>

            <Cloud />
        </>);
    }
}

export default Main;
