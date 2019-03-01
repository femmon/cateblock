import React from "react";
import ReactDOM from "react-dom";
import Home from "./screens/home";
import Main from "./screens/main";
import "./style.css";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
            // null, login, logout, try
        }
        this.handleClickStatus = this.handleClickStatus.bind(this);
    }
    handleClickStatus(status) {
        this.setState({status});
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
        if (window.location.pathname !== "/") return this.setState({status: "lost"});
        return this.checkSession();
    }
    render() {
        switch (this.state.status) {
            case "lost":
                return (
                    <div>
                        <h1>404</h1>
                        <p>Hey there buddy. Are you lost</p>
                        <button onClick={() => {
                            window.history.replaceState({}, "", "/");
                            this.checkSession();
                        }}>Go to home page</button>
                    </div>);
            case null:
            case "logout":
                return <Home status={this.state.status} handleClickStatus={(status) => this.handleClickStatus(status)} />;
            case "login":
            case "try":
                return <Main status={this.state.status} handleClickStatus={(status) => this.handleClickStatus(status)} />;
            default:
                throw new Error("Not supported status");
        }
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
