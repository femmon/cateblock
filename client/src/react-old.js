function Header(props) {
    return (
        <h1>
            <svg viewBox="0 0 130 35" height="30px">
                <text x="0" y="35">CatBlock</text>
            </svg>
        </h1>
    );
}

function SubHeader(props) {
    return <h2>What good thing happened today?</h2>;
}
// remove sub header and include directly in home

function Button(props) {
    let className = "button";
    if (props.style) {
        className += ` ${props.style}`;
    }
    return (<button className={className}>{props.content}</button>);
}

class TryButton extends React.Component {
    render() {
        return (<Button style="tryButton" content="Write it down!" />);
    }
}

class SignupButton extends React.Component {
    render() {
        return (<Button style="signupButton" content="Sign Up" />);
    }
}

class LoginButton extends React.Component {
    render() {
        return (<Button style="loginButton" content="Log In" />);
    }
}

class LogoutButton extends React.Component {
    render() {
        return (<Button style="logoutButton" content="Log Out" />);
    }
}

class Form extends React.Component {
    render() {
        return (<form>
            <label>Username<input></input></label>
            <label>Password<input type="password"></input></label>
            <SignupButton />
            <LoginButton />
        </form>);
    }
}

class home extends React.Component {
    render() {
        return (<React.Fragment>
            <Header />
            <SubHeader />
            {(this.props.status == "logout") && (<React.Fragment><TryButton /><Form /></React.Fragment>)}
        </React.Fragment>);
    }
}

class Main extends React.Component {
    render() {
        return (<React.Fragment>
            <Header />
            {(this.props.status == "try") && (<React.Fragment><Form /></React.Fragment>)}
            {(this.props.status == "login") && (<React.Fragment><LogoutButton /></React.Fragment>)}
        </React.Fragment>);
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: null
            // null, login, logout, try
        }
        this.handleTry = this.handleTry.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleTry() {
        this.setState({status: "try"});
    }
    handleLogout() {
        this.setState({status: "logout"});
    }
    componentDidMount() {
        fetch("https://jsonplaceholder.typicode.com/todos/1").then(res => res.json()).then(obj => {
            if (obj.id == 1) {
                this.setState({status: "login"});
            }
        }).catch(err => throw(err));
    }
    render() {
        switch (this.state.status) {
            case null:
            case "logout":
                return <home status={this.state.status} />;
                break;
            case "login":
            case "try":
                return <Main status={this.state.status} />

        }
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
