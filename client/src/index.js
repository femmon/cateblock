import React from "react";
import ReactDOM from "react-dom";
import Home from "./screens/home";
import Main from "./screens/main";

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
    componentDidMount() {
        fetch("/in-or-out", {method: "POST"}).then(res => res.text()).then(text => {
            if (text == "In") {
                this.setState({status: "login"});
            } else {
                this.setState({status: "logout"});
            }
        }).catch(err => {throw err});
    }
    render() {
        switch (this.state.status) {
            case null:
            case "logout":
                return <Home status={this.state.status} handleClickStatus={(status) => this.handleClickStatus(status)} />;
                break;
            case "login":
            case "try":
                return <Main status={this.state.status} handleClickStatus={(status) => this.handleClickStatus(status)} />

        }
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
