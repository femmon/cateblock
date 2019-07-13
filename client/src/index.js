import React from "react";
import ReactDOM from "react-dom";
import Home from "./screens/home";
import Main from "./screens/main";
import "normalize.css";
import "./style.css";
import GlobalStyle from "./global-style";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
        };
    }
    checkSession() {
        fetch("/accounts/session").then(res => res.text()).then(text => {
            if (text === "In") {
                this.setState({status: "login"});
            } else {
                this.setState({status: "logout"});
            }
        }).catch(err => {throw err});
    }
    componentDidMount() {
        if (window.location.pathname !== "/") {
            return this.setState({status: "lost"});
        }

        return this.checkSession();
    }
    render() {
        let Screen;

        switch (this.state.status) {
            case "lost":
                Screen = <div>
                    <h1>404</h1>
                    <p>Hey there buddy. Are you lost</p>
                    <button onClick={() => {
                        window.history.replaceState({}, "", "/");
                        this.checkSession();
                    }}>Go to home page</button>
                </div>;
                break;

            case null:
            case "logout":
                Screen = <Home
                    status={this.state.status}
                    handleStateLogin={() => this.setState({status: "login"})}
                    handleStateTry={() => this.setState({status: "try"})}
                />;
                break;

            case "login":
            case "try":
                Screen = <Main
                    status={this.state.status}
                    handleStateLogin={() => this.setState({status: "login"})}
                    handleStateLogout={() => this.setState({status: "logout"})}
                />;
                break;

            default:
                throw new Error("Not supported status");
        }
        return (<React.Fragment>
            <GlobalStyle />
            {Screen}
        </React.Fragment>);
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
