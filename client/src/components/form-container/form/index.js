import React from "react";
import Button from "../../button";

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    render() {
        return (
            <form>
                <label>Username
                    <input
                        name="username"
                        value={this.state.username}
                        onChange={this.handleChange}
                    ></input>
                </label>
                <label>Password
                    <input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    ></input>
                </label>
                <Button
                    className="signupButton"
                    content="Sign Up"
                    onClick={event => {
                        event.preventDefault();
                        this.props.handleClickSignup(this.state.username, this.state.password);
                    }}/>
                <Button
                    className="loginButton"
                    content="Log In"
                    onClick={event => {
                        event.preventDefault();
                        this.props.handleClickLogin(this.state.username, this.state.password);
                    }}
                />
            </form>
        );
    }
}

export default Form;
